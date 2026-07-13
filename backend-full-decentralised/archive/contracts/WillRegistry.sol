// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WillRegistry
 * @dev Stores IPFS hashes of encrypted wills to ensure immutable proof of existence
 */
contract WillRegistry {
    struct Will {
        string ipfsHash;
        uint256 createdAt;
        uint256 lastHeartbeat;
        bool isActive;
        bool isExecuted;
        address[] beneficiaries;
        address[] guardians;
        address[] witnesses;
    }

    mapping(address => Will) public wills;
    mapping(address => uint256) public lastSeen;

    event WillCreated(address indexed owner, string ipfsHash);
    event HeartbeatSent(address indexed owner, uint256 timestamp);
    event WillExecuted(address indexed owner, uint256 timestamp);

    function createWill(
        string memory _ipfsHash,
        address[] memory _beneficiaries,
        address[] memory _guardians,
        address[] memory _witnesses
    ) external {
        require(bytes(wills[msg.sender].ipfsHash).length == 0, "Active will already exists");
        require(_beneficiaries.length > 0, "Must specify at least one beneficiary");
        require(_guardians.length >= 3, "Must specify at least 3 guardians for recovery");
        require(_witnesses.length >= 2, "Must specify at least 2 witnesses");

        wills[msg.sender] = Will({
            ipfsHash: _ipfsHash,
            createdAt: block.timestamp,
            lastHeartbeat: block.timestamp,
            isActive: true,
            isExecuted: false,
            beneficiaries: _beneficiaries,
            guardians: _guardians,
            witnesses: _witnesses
        });

        emit WillCreated(msg.sender, _ipfsHash);
    }

    function sendHeartbeat() external {
        require(wills[msg.sender].isActive, "No active will found for sender");
        wills[msg.sender].lastHeartbeat = block.timestamp;
        
        emit HeartbeatSent(msg.sender, block.timestamp);
    }

    function executeWill(address _owner) external {
        Will storage will = wills[_owner];
        
        require(will.isActive, "Will is not active");
        require(!will.isExecuted, "Will has already been executed");
        require(
            block.timestamp - will.lastHeartbeat > 30 days,
            "Heartbeat 30-day grace period has not passed."
        );

        will.isExecuted = true;
        will.isActive = false;

        emit WillExecuted(_owner, block.timestamp);
    }
}
