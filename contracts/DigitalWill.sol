// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

/**
 * @title DigitalWill Protocol
 * @dev Smart contract for the DeadMan Switch Protocol
 * Manages user heartbeats and triggers the release of the final Shamir share or IPFS CID pointers.
 */
contract DigitalWill {
    struct WillCondition {
        uint256 lastHeartbeat;
        uint256 heartbeatInterval; 
        bool isTriggered;
        bool isActive;
    }

    // Mapping from Owner Wallet -> Conditions
    mapping(address => WillCondition) public wills;
    
    // Mapping from Owner Wallet -> Nominee Wallet -> isAuthorized
    mapping(address => mapping(address => bool)) public nominees;

    // Mapping from Owner Wallet -> Encrypted Payload (e.g., final Key Share)
    mapping(address => string) public onChainPayloads;

    event WillRegistered(address indexed owner, uint256 interval);
    event HeartbeatLogged(address indexed owner, uint256 timestamp);
    event NomineeAuthorized(address indexed owner, address indexed nominee);
    event NomineeRevoked(address indexed owner, address indexed nominee);
    event DeadmanTriggered(address indexed owner, uint256 timestamp);
    event PayloadReleased(address indexed owner, address indexed nominee);

    /**
     * @dev Register or update a digital will condition
     * @param interval The maximum time allowed between heartbeats (in seconds)
     */
    function registerWill(uint256 interval) external {
        require(interval >= 1 days, "Interval must be at least 1 day");
        
        WillCondition storage userWill = wills[msg.sender];
        userWill.heartbeatInterval = interval;
        userWill.lastHeartbeat = block.timestamp;
        userWill.isActive = true;
        userWill.isTriggered = false;

        emit WillRegistered(msg.sender, interval);
    }

    /**
     * @dev Submit a heartbeat to prevent the deadman switch from triggering
     */
    function ping() external {
        WillCondition storage userWill = wills[msg.sender];
        require(userWill.isActive, "No active will found");
        require(!userWill.isTriggered, "Will already triggered");

        userWill.lastHeartbeat = block.timestamp;
        
        emit HeartbeatLogged(msg.sender, block.timestamp);
    }

    /**
     * @dev Add or remove an authorized nominee address
     */
    function setNominee(address nominee, bool status) external {
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
    function setOnChainPayload(string calldata payload) external {
        require(wills[msg.sender].isActive, "No active will found");
        onChainPayloads[msg.sender] = payload;
    }

    /**
     * @dev Check if the owner's deadman switch conditions are met (publicly callable by anyone, e.g. Cron Job)
     */
    function checkAndTrigger(address owner) external {
        WillCondition storage userWill = wills[owner];
        require(userWill.isActive, "No active will found");
        require(!userWill.isTriggered, "Will already triggered");

        uint256 timeSinceHeartbeat = block.timestamp - userWill.lastHeartbeat;
        require(timeSinceHeartbeat > userWill.heartbeatInterval, "Heartbeat interval not yet breached");

        userWill.isTriggered = true;
        emit DeadmanTriggered(owner, block.timestamp);
    }

    /**
     * @dev Returns true if the deadman switch has been triggered
     */
    function isTriggered(address owner) external view returns (bool) {
        return wills[owner].isTriggered;
    }

    /**
     * @dev Allows an authorized nominee to claim the on-chain payload IF the switch is triggered
     */
    function claimPayload(address owner) external returns (string memory) {
        WillCondition memory userWill = wills[owner];
        require(userWill.isActive, "No active will found");
        require(userWill.isTriggered, "Deadman switch has NOT been triggered yet");
        require(nominees[owner][msg.sender], "You are not an authorized nominee");

        emit PayloadReleased(owner, msg.sender);
        return onChainPayloads[owner];
    }
}
