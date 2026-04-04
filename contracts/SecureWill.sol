// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

/**
 * @title SecureWill Protocol
 * @dev Enhanced security implementation for Digital Will Protocol
 */
contract SecureWill is AccessControl, ReentrancyGuard, Pausable {
    using EnumerableSet for EnumerableSet.AddressSet;
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    
    struct WillCondition {
        uint256 lastHeartbeat;
        uint256 heartbeatInterval;
        bool isTriggered;
        bool isActive;
    }

    mapping(address => WillCondition) public wills;
    mapping(address => mapping(address => bool)) public nominees;
    mapping(address => string) public onChainPayloads;

    // Rate limiting per user
    mapping(address => uint256) public lastHeartbeatUpdate;
    mapping(address => uint256) public heartbeatUpdateCount;
    
    uint256 public constant HEARTBEAT_LIMIT = 10; // per day
    uint256 public constant HEARTBEAT_WINDOW = 1 days;
    
    // Emergency pause mechanism
    mapping(address => bool) public pausedUsers;
    
    // Withdrawal delay for large transfers (if applicable)
    mapping(address => uint256) public withdrawalRequests;
    mapping(address => uint256) public pendingWithdrawals;
    uint256 public constant WITHDRAWAL_DELAY = 24 hours;
    uint256 public constant MAX_WITHDRAWAL_PERCENT = 20; // 20% max per day

    event WillRegistered(address indexed owner, uint256 interval);
    event HeartbeatLogged(address indexed owner, uint256 timestamp);
    event NomineeAuthorized(address indexed owner, address indexed nominee);
    event UserPaused(address indexed user, uint256 timestamp);
    event DeadmanTriggered(address indexed owner, uint256 timestamp);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    // Rate-limited heartbeat update
    function updateHeartbeat() external whenNotPaused {
        require(!pausedUsers[msg.sender], "User is paused");
        WillCondition storage userWill = wills[msg.sender];
        require(userWill.isActive, "No active will found");
        
        // Rate limiting
        uint256 day = block.timestamp / HEARTBEAT_WINDOW;
        
        if (lastHeartbeatUpdate[msg.sender] / HEARTBEAT_WINDOW != day) {
            heartbeatUpdateCount[msg.sender] = 0;
        }
        
        require(
            heartbeatUpdateCount[msg.sender] < HEARTBEAT_LIMIT,
            "Rate limit exceeded"
        );
        
        heartbeatUpdateCount[msg.sender]++;
        lastHeartbeatUpdate[msg.sender] = block.timestamp;
        userWill.lastHeartbeat = block.timestamp;
        
        emit HeartbeatLogged(msg.sender, block.timestamp);
    }

    function registerWill(uint256 interval) external whenNotPaused {
        require(interval >= 1 days, "Interval too short");
        wills[msg.sender] = WillCondition({
            lastHeartbeat: block.timestamp,
            heartbeatInterval: interval,
            isTriggered: false,
            isActive: true
        });
        emit WillRegistered(msg.sender, interval);
    }
    
    // Emergency pause for suspicious activity
    function pauseUser(address user) external onlyRole(ADMIN_ROLE) {
        pausedUsers[user] = true;
        emit UserPaused(user, block.timestamp);
    }

    function unpauseUser(address user) external onlyRole(ADMIN_ROLE) {
        pausedUsers[user] = false;
    }

    function setOnChainPayload(string calldata payload) external {
        require(wills[msg.sender].isActive, "No active will");
        onChainPayloads[msg.sender] = payload;
    }

    function claimPayload(address owner) external nonReentrant returns (string memory) {
        require(wills[owner].isTriggered, "Not triggered");
        require(nominees[owner][msg.sender], "Not authorized");
        return onChainPayloads[owner];
    }
}
