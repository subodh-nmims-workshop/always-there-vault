// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title DigitalWill Protocol
 * @dev Secure smart contract for the Last Wish Switch Protocol
 * Manages user heartbeats and triggers securely with protection against re-entrancy.
 */
contract DigitalWill is ReentrancyGuard, Ownable, Pausable {
    struct WillCondition {
        uint256 lastHeartbeat;
        uint256 heartbeatInterval; 
        uint256 gracePeriod;
        bool isTriggered;
        bool isActive;
    }

    // Mapping from Owner Wallet -> Conditions
    mapping(address => WillCondition) public wills;
    
    // Mapping from Owner Wallet -> Nominee Wallet -> isAuthorized
    mapping(address => mapping(address => bool)) public nominees;

    // Mapping from Owner Wallet -> Encrypted Payload (e.g., final Key Share)
    mapping(address => string) public onChainPayloads;

    event WillRegistered(address indexed owner, uint256 interval, uint256 gracePeriod);
    event HeartbeatLogged(address indexed owner, uint256 timestamp);
    event NomineeAuthorized(address indexed owner, address indexed nominee);
    event NomineeRevoked(address indexed owner, address indexed nominee);
    event LastWishTriggered(address indexed owner, uint256 timestamp);
    event PayloadReleased(address indexed owner, address indexed nominee);
    event WillPaused(address indexed owner);
    event WillResumed(address indexed owner);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Emergency pause by contract owner
     */
    function pauseProtocol() external onlyOwner {
        _pause();
    }

    /**
     * @dev Resume protocol by contract owner
     */
    function unpauseProtocol() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Register or update a digital will condition
     * @param interval The maximum time allowed between heartbeats (in seconds)
     * @param gracePeriod Additional buffer time after interval before triggering
     */
    function registerWill(uint256 interval, uint256 gracePeriod) external whenNotPaused {
        require(interval >= 1 days, "Interval must be at least 1 day");
        require(gracePeriod <= 30 days, "Grace period too long");
        
        WillCondition storage userWill = wills[msg.sender];
        userWill.heartbeatInterval = interval;
        userWill.gracePeriod = gracePeriod;
        userWill.lastHeartbeat = block.timestamp;
        userWill.isActive = true;
        userWill.isTriggered = false;

        emit WillRegistered(msg.sender, interval, gracePeriod);
    }

    /**
     * @dev Submit a heartbeat to prevent the lastwish switch from triggering
     */
    function ping() external whenNotPaused {
        WillCondition storage userWill = wills[msg.sender];
        require(userWill.isActive, "No active will found");
        require(!userWill.isTriggered, "Will already triggered");

        userWill.lastHeartbeat = block.timestamp;
        
        emit HeartbeatLogged(msg.sender, block.timestamp);
    }

    /**
     * @dev Add or remove an authorized nominee address
     */
    function setNominee(address nominee, bool status) external whenNotPaused {
        require(wills[msg.sender].isActive, "No active will found");
        require(nominee != msg.sender, "Cannot be your own nominee");
        
        nominees[msg.sender][nominee] = status;
        
        if (status) {
            emit NomineeAuthorized(msg.sender, nominee);
        } else {
            emit NomineeRevoked(msg.sender, nominee);
        }
    }

    /**
     * @dev Store an encrypted payload (like the 5th Shamir Share) on-chain
     */
    function setOnChainPayload(string calldata payload) external whenNotPaused {
        require(wills[msg.sender].isActive, "No active will found");
        onChainPayloads[msg.sender] = payload;
    }

    /**
     * @dev Check and trigger the switch (publicly callable)
     */
    function checkAndTrigger(address owner) external nonReentrant whenNotPaused {
        WillCondition storage userWill = wills[owner];
        require(userWill.isActive, "No active will found");
        require(!userWill.isTriggered, "Will already triggered");

        uint256 timeSinceHeartbeat = block.timestamp - userWill.lastHeartbeat;
        require(timeSinceHeartbeat > (userWill.heartbeatInterval + userWill.gracePeriod), "Safety window not yet breached");

        userWill.isTriggered = true;
        emit LastWishTriggered(owner, block.timestamp);
    }

    /**
     * @dev Claim payload by authorized nominee
     */
    function claimPayload(address owner) external nonReentrant whenNotPaused returns (string memory) {
        WillCondition memory userWill = wills[owner];
        require(userWill.isActive, "No active will found");
        require(userWill.isTriggered, "Last Wish switch has NOT been triggered yet");
        require(nominees[owner][msg.sender], "You are not an authorized nominee");

        emit PayloadReleased(owner, msg.sender);
        return onChainPayloads[owner];
    }
}
