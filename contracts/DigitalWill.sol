// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

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
     * @param _interval The maximum time allowed between heartbeats (in seconds)
     */
    function registerWill(uint256 _interval) external {
        require(_interval >= 1 days, "Interval must be at least 1 day");
        
        WillCondition storage userWill = wills[msg.sender];
        userWill.heartbeatInterval = _interval;
        userWill.lastHeartbeat = block.timestamp;
        userWill.isActive = true;
        userWill.isTriggered = false;

        emit WillRegistered(msg.sender, _interval);
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
    function setNominee(address _nominee, bool _status) external {
        require(wills[msg.sender].isActive, "No active will found");
        require(_nominee != msg.sender, "Cannot be your own nominee");
        
        nominees[msg.sender][_nominee] = _status;
        
        if (_status) {
            emit NomineeAuthorized(msg.sender, _nominee);
        } else {
            emit NomineeRevoked(msg.sender, _nominee);
        }
    }

    /**
     * @dev Store an encrypted payload (like the 5th Shamir Share) on-chain
     */
    function setOnChainPayload(string calldata _payload) external {
        require(wills[msg.sender].isActive, "No active will found");
        onChainPayloads[msg.sender] = _payload;
    }

    /**
     * @dev Check if the owner's deadman switch conditions are met (publicly callable by anyone, e.g. Cron Job)
     */
    function checkAndTrigger(address _owner) external {
        WillCondition storage userWill = wills[_owner];
        require(userWill.isActive, "No active will found");
        require(!userWill.isTriggered, "Will already triggered");

        uint256 timeSinceHeartbeat = block.timestamp - userWill.lastHeartbeat;
        require(timeSinceHeartbeat > userWill.heartbeatInterval, "Heartbeat interval not yet breached");

        userWill.isTriggered = true;
        emit DeadmanTriggered(_owner, block.timestamp);
    }

    /**
     * @dev Returns true if the deadman switch has been triggered
     */
    function isTriggered(address _owner) external view returns (bool) {
        return wills[_owner].isTriggered;
    }

    /**
     * @dev Allows an authorized nominee to claim the on-chain payload IF the switch is triggered
     */
    function claimPayload(address _owner) external returns (string memory) {
        WillCondition memory userWill = wills[_owner];
        require(userWill.isActive, "No active will found");
        require(userWill.isTriggered, "Deadman switch has NOT been triggered yet");
        require(nominees[_owner][msg.sender], "You are not an authorized nominee");

        emit PayloadReleased(_owner, msg.sender);
        return onChainPayloads[_owner];
    }
}
