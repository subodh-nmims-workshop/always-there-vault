// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title DigitalWillCore
 * @dev Core smart contract for Decentralized AlwaysThere Vault
 */
contract DigitalWillCore is ReentrancyGuard, AccessControl, Pausable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;
    
    // Events
    event UserRegistered(address indexed user, uint256 heartbeatInterval, uint256 gracePeriod);
    event HeartbeatRecorded(address indexed user, uint256 timestamp, string method);
    event AssetRegistered(address indexed user, string indexed assetId, string ipfsHash);
    event BeneficiaryAdded(address indexed user, string indexed assetId, address indexed beneficiary, uint256 releaseDelay);
    event TriggerActivated(address indexed user, uint256 timestamp, string reason);
    event AssetReleased(address indexed user, string indexed assetId, address indexed beneficiary);
    event EmergencyOverride(address indexed user, address indexed initiator, string reason);
    
    // Structs
    struct UserConfig {
        uint256 heartbeatInterval;      // seconds between required heartbeats
        uint256 gracePeriod;            // additional time before trigger
        uint256 lastHeartbeat;          // timestamp of last heartbeat
        uint256 triggerTime;            // when system was triggered (0 = not triggered)
        bool isEmergencyOverride;       // emergency stop flag
        bool exists;                    // user exists flag
    }
    
    struct AssetRule {
        address beneficiary;            // who receives the asset
        uint256 releaseDelay;          // additional delay after trigger (seconds)
        bool enabled;                  // rule is active
        bool released;                 // asset has been released
    }
    
    struct Asset {
        string ipfsHash;               // IPFS hash of encrypted data
        string[] keyShareHashes;       // IPFS hashes of key shares
        uint256 createdAt;             // creation timestamp
        bool exists;                   // asset exists flag
    }
    
    // State variables
    mapping(address => UserConfig) public users;
    mapping(address => mapping(string => Asset)) public assets;
    mapping(address => mapping(string => AssetRule[])) public assetRules;
    mapping(address => string[]) public userAssets;
    
    // Constants
    uint256 public constant MIN_HEARTBEAT_INTERVAL = 7 days;
    uint256 public constant MAX_HEARTBEAT_INTERVAL = 365 days;
    uint256 public constant MIN_GRACE_PERIOD = 7 days;
    uint256 public constant MAX_GRACE_PERIOD = 180 days;
    uint256 public constant MAX_RELEASE_DELAY = 365 days;
    
    // Roles
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    function pause() external onlyRole(EMERGENCY_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(EMERGENCY_ROLE) {
        _unpause();
    }
    
    /**
     * @dev Record a heartbeat for a user via an authorized oracle
     */
    function recordHeartbeatByOracle(address user, string memory method) external onlyRole(ORACLE_ROLE) whenNotPaused {
        require(users[user].exists, "User not registered");
        require(!users[user].isEmergencyOverride, "Emergency override active");
        
        users[user].lastHeartbeat = block.timestamp;
        
        // Reset trigger if it was activated
        if (users[user].triggerTime > 0) {
            users[user].triggerTime = 0;
        }
        
        emit HeartbeatRecorded(user, block.timestamp, method);
    }
    
    // Modifiers
    modifier onlyRegisteredUser() {
        require(users[msg.sender].exists, "User not registered");
        _;
    }
    
    modifier onlyActiveUser() {
        require(users[msg.sender].exists, "User not registered");
        require(!users[msg.sender].isEmergencyOverride, "Emergency override active");
        _;
    }
    
    modifier assetExists(string memory assetId) {
        require(assets[msg.sender][assetId].exists, "Asset does not exist");
        _;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(EMERGENCY_ROLE, msg.sender);
    }
    
    /**
     * @dev Register a new user with heartbeat configuration
     */
    function registerUser(
        uint256 heartbeatInterval,
        uint256 gracePeriod
    ) external {
        require(!users[msg.sender].exists, "User already registered");
        require(heartbeatInterval >= MIN_HEARTBEAT_INTERVAL && heartbeatInterval <= MAX_HEARTBEAT_INTERVAL, "Invalid heartbeat interval");
        require(gracePeriod >= MIN_GRACE_PERIOD && gracePeriod <= MAX_GRACE_PERIOD, "Invalid grace period");
        
        users[msg.sender] = UserConfig({
            heartbeatInterval: heartbeatInterval,
            gracePeriod: gracePeriod,
            lastHeartbeat: block.timestamp,
            triggerTime: 0,
            isEmergencyOverride: false,
            exists: true
        });
        
        emit UserRegistered(msg.sender, heartbeatInterval, gracePeriod);
    }
    
    /**
     * @dev Record a heartbeat (proof of life)
     */
    function recordHeartbeat(
        string memory method,
        bytes memory signature
    ) external onlyActiveUser {
        // Verify signature if provided
        if (signature.length > 0) {
            bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, block.timestamp, method));
            bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
            address signer = ethSignedMessageHash.recover(signature);
            require(signer == msg.sender, "Invalid signature");
        }
        
        users[msg.sender].lastHeartbeat = block.timestamp;
        
        // Reset trigger if it was activated
        if (users[msg.sender].triggerTime > 0) {
            users[msg.sender].triggerTime = 0;
        }
        
        emit HeartbeatRecorded(msg.sender, block.timestamp, method);
    }
    
    /**
     * @dev Register a new asset
     */
    function registerAsset(
        string memory assetId,
        string memory ipfsHash,
        string[] memory keyShareHashes
    ) external onlyActiveUser {
        require(!assets[msg.sender][assetId].exists, "Asset already exists");
        require(bytes(ipfsHash).length > 0, "IPFS hash required");
        require(keyShareHashes.length == 5, "Must have exactly 5 key shares");
        
        assets[msg.sender][assetId] = Asset({
            ipfsHash: ipfsHash,
            keyShareHashes: keyShareHashes,
            createdAt: block.timestamp,
            exists: true
        });
        
        userAssets[msg.sender].push(assetId);
        
        emit AssetRegistered(msg.sender, assetId, ipfsHash);
    }
    
    /**
     * @dev Add beneficiary rule for an asset
     */
    function addBeneficiaryRule(
        string memory assetId,
        address beneficiary,
        uint256 releaseDelay
    ) external onlyActiveUser assetExists(assetId) {
        require(beneficiary != address(0), "Invalid beneficiary address");
        require(releaseDelay <= MAX_RELEASE_DELAY, "Release delay too long");
        
        assetRules[msg.sender][assetId].push(AssetRule({
            beneficiary: beneficiary,
            releaseDelay: releaseDelay,
            enabled: true,
            released: false
        }));
        
        emit BeneficiaryAdded(msg.sender, assetId, beneficiary, releaseDelay);
    }
    
    /**
     * @dev Check if user's system should be triggered
     */
    function checkTriggerCondition(address user) external view returns (bool shouldTrigger, string memory reason) {
        UserConfig memory config = users[user];
        
        if (!config.exists) {
            return (false, "User not registered");
        }
        
        if (config.isEmergencyOverride) {
            return (false, "Emergency override active");
        }
        
        if (config.triggerTime > 0) {
            return (true, "Already triggered");
        }
        
        uint256 timeSinceLastHeartbeat = block.timestamp - config.lastHeartbeat;
        uint256 totalAllowedTime = config.heartbeatInterval + config.gracePeriod;
        
        if (timeSinceLastHeartbeat > totalAllowedTime) {
            return (true, "Heartbeat timeout exceeded");
        }
        
        return (false, "User is active");
    }
    
    /**
     * @dev Trigger the system for a user (can be called by anyone)
     */
    function triggerSystem(address user) external nonReentrant whenNotPaused {
        (bool shouldTrigger, string memory reason) = this.checkTriggerCondition(user);
        require(shouldTrigger, reason);
        
        if (users[user].triggerTime == 0) {
            users[user].triggerTime = block.timestamp;
            emit TriggerActivated(user, block.timestamp, reason);
        }
    }
    
    /**
     * @dev Check if an asset is eligible for release
     */
    function isAssetEligibleForRelease(
        address user,
        string memory assetId,
        uint256 ruleIndex
    ) external view returns (bool eligible, uint256 releaseTime) {
        UserConfig memory config = users[user];
        
        if (!config.exists || config.triggerTime == 0) {
            return (false, 0);
        }
        
        AssetRule[] memory rules = assetRules[user][assetId];
        if (ruleIndex >= rules.length) {
            return (false, 0);
        }
        
        AssetRule memory rule = rules[ruleIndex];
        if (!rule.enabled || rule.released) {
            return (false, 0);
        }
        
        releaseTime = config.triggerTime + rule.releaseDelay;
        eligible = block.timestamp >= releaseTime;
        
        return (eligible, releaseTime);
    }
    
    /**
     * @dev Release an asset to a beneficiary
     */
    function releaseAsset(
        address user,
        string memory assetId,
        uint256 ruleIndex
    ) external nonReentrant whenNotPaused {
        (bool eligible,) = this.isAssetEligibleForRelease(user, assetId, ruleIndex);
        require(eligible, "Asset not eligible for release");
        
        AssetRule storage rule = assetRules[user][assetId][ruleIndex];
        require(msg.sender == rule.beneficiary, "Only beneficiary can claim");
        require(!rule.released, "Asset already released");
        
        rule.released = true;
        
        emit AssetReleased(user, assetId, rule.beneficiary);
    }
    
    /**
     * @dev Emergency override (stops all releases)
     */
    function enableEmergencyOverride(string calldata reason) external onlyRegisteredUser {
        users[msg.sender].isEmergencyOverride = true;
        users[msg.sender].triggerTime = 0; // Reset trigger
        
        emit EmergencyOverride(msg.sender, msg.sender, reason);
    }
    
    /**
     * @dev Update heartbeat configuration
     */
    function updateHeartbeatConfig(
        uint256 heartbeatInterval,
        uint256 gracePeriod
    ) external onlyActiveUser {
        require(heartbeatInterval >= MIN_HEARTBEAT_INTERVAL && heartbeatInterval <= MAX_HEARTBEAT_INTERVAL, "Invalid heartbeat interval");
        require(gracePeriod >= MIN_GRACE_PERIOD && gracePeriod <= MAX_GRACE_PERIOD, "Invalid grace period");
        
        users[msg.sender].heartbeatInterval = heartbeatInterval;
        users[msg.sender].gracePeriod = gracePeriod;
    }
    
    /**
     * @dev Get user's asset count
     */
    function getUserAssetCount(address user) external view returns (uint256) {
        return userAssets[user].length;
    }
    
    /**
     * @dev Get asset rules count
     */
    function getAssetRulesCount(address user, string memory assetId) external view returns (uint256) {
        return assetRules[user][assetId].length;
    }
    
    /**
     * @dev Get asset rule details
     */
    function getAssetRule(
        address user,
        string memory assetId,
        uint256 ruleIndex
    ) external view returns (
        address beneficiary,
        uint256 releaseDelay,
        bool enabled,
        bool released
    ) {
        AssetRule memory rule = assetRules[user][assetId][ruleIndex];
        return (rule.beneficiary, rule.releaseDelay, rule.enabled, rule.released);
    }
    
    /**
     * @dev Get user status
     */
    function getUserStatus(address user) external view returns (
        uint256 heartbeatInterval,
        uint256 gracePeriod,
        uint256 lastHeartbeat,
        uint256 triggerTime,
        bool isEmergencyOverride,
        bool exists
    ) {
        UserConfig memory config = users[user];
        return (
            config.heartbeatInterval,
            config.gracePeriod,
            config.lastHeartbeat,
            config.triggerTime,
            config.isEmergencyOverride,
            config.exists
        );
    }
}