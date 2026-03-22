// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title GuardianRecovery
 * @dev Implements 3-of-5 Social Recovery for Guardian-based key sharing
 */
contract GuardianRecovery {
    struct RecoveryRequest {
        address newOwner;
        uint256 approvals;
        uint256 requestTime;
        bool executed;
        mapping(address => bool) hasApproved;
    }

    mapping(address => address[]) public guardians;
    mapping(address => RecoveryRequest) public recoveryRequests;

    uint256 public constant REQUIRED_APPROVALS = 3;
    uint256 public constant RECOVERY_DELAY = 7 days;

    event RecoveryInitiated(address indexed wallet, address newOwner);
    event RecoveryApproved(address indexed wallet, address guardian);
    event RecoveryExecuted(address indexed wallet, address newOwner);

    function addGuardian(address _guardian) external {
        require(guardians[msg.sender].length < 5, "Max 5 guardians allowed");
        
        for (uint i = 0; i < guardians[msg.sender].length; i++) {
            require(guardians[msg.sender][i] != _guardian, "Already a guardian");
        }
        
        guardians[msg.sender].push(_guardian);
    }

    function initiateRecovery(address _wallet, address _newOwner) external {
        require(_isGuardian(_wallet, msg.sender), "Not a guardian");
        require(recoveryRequests[_wallet].requestTime == 0 || recoveryRequests[_wallet].executed, "Pending recovery exists");

        RecoveryRequest storage req = recoveryRequests[_wallet];
        req.newOwner = _newOwner;
        req.requestTime = block.timestamp;
        req.approvals = 1;
        req.executed = false;
        req.hasApproved[msg.sender] = true;

        emit RecoveryInitiated(_wallet, _newOwner);
    }

    function approveRecovery(address _wallet) external {
        require(_isGuardian(_wallet, msg.sender), "Not a guardian");
        
        RecoveryRequest storage req = recoveryRequests[_wallet];
        require(req.requestTime > 0, "No request pending");
        require(!req.executed, "Recovery already executed");
        require(!req.hasApproved[msg.sender], "Already approved");

        req.approvals++;
        req.hasApproved[msg.sender] = true;

        if (req.approvals >= REQUIRED_APPROVALS) {
            _executeRecovery(_wallet, req.newOwner);
        }

        emit RecoveryApproved(_wallet, msg.sender);
    }

    function _executeRecovery(address _wallet, address _newOwner) internal {
        require(
            recoveryRequests[_wallet].requestTime + RECOVERY_DELAY < block.timestamp,
            "7-day security delay has not passed"
        );
        recoveryRequests[_wallet].executed = true;
        
        emit RecoveryExecuted(_wallet, _newOwner);
        // Ownership transfer logic to the central contract could be implemented here
    }

    function _isGuardian(address _wallet, address _guardian) internal view returns(bool) {
        for(uint i = 0; i < guardians[_wallet].length; i++) {
            if(guardians[_wallet][i] == _guardian) return true;
        }
        return false;
    }

    function getGuardians(address _wallet) external view returns (address[] memory) {
        return guardians[_wallet];
    }
}
