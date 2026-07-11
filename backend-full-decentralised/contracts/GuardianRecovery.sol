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
        uint256 nonce;
    }

    mapping(address => address[]) public guardians;
    mapping(address => RecoveryRequest) public recoveryRequests;
    mapping(address => uint256) public walletRecoveryNonces;
    
    // key is keccak256(wallet, nonce, guardian)
    mapping(bytes32 => bool) public hasApprovedRequest;

    uint256 public constant REQUIRED_APPROVALS = 3;
    uint256 public constant RECOVERY_DELAY = 7 days;

    event RecoveryInitiated(address indexed wallet, address newOwner, uint256 nonce);
    event RecoveryApproved(address indexed wallet, address guardian, uint256 nonce);
    event RecoveryExecuted(address indexed wallet, address newOwner, uint256 nonce);
    event RecoveryCancelled(address indexed wallet, uint256 nonce);

    function addGuardian(address _guardian) external {
        require(guardians[msg.sender].length < 5, "Max 5 guardians allowed");
        
        for (uint i = 0; i < guardians[msg.sender].length; i++) {
            require(guardians[msg.sender][i] != _guardian, "Already a guardian");
        }
        
        guardians[msg.sender].push(_guardian);
    }

    function initiateRecovery(address _wallet, address _newOwner) external {
        require(_isGuardian(_wallet, msg.sender), "Not a guardian");
        
        RecoveryRequest storage req = recoveryRequests[_wallet];
        require(
            req.requestTime == 0 || req.executed || block.timestamp > req.requestTime + 14 days,
            "Pending recovery exists and is active"
        );

        uint256 nextNonce = walletRecoveryNonces[_wallet] + 1;
        walletRecoveryNonces[_wallet] = nextNonce;

        req.newOwner = _newOwner;
        req.requestTime = block.timestamp;
        req.approvals = 1;
        req.executed = false;
        req.nonce = nextNonce;

        bytes32 approvalKey = keccak256(abi.encodePacked(_wallet, nextNonce, msg.sender));
        hasApprovedRequest[approvalKey] = true;

        emit RecoveryInitiated(_wallet, _newOwner, nextNonce);
    }

    function approveRecovery(address _wallet) external {
        require(_isGuardian(_wallet, msg.sender), "Not a guardian");
        
        RecoveryRequest storage req = recoveryRequests[_wallet];
        require(req.requestTime > 0, "No request pending");
        require(!req.executed, "Recovery already executed");
        
        bytes32 approvalKey = keccak256(abi.encodePacked(_wallet, req.nonce, msg.sender));
        require(!hasApprovedRequest[approvalKey], "Already approved");

        req.approvals++;
        hasApprovedRequest[approvalKey] = true;

        emit RecoveryApproved(_wallet, msg.sender, req.nonce);
    }

    function cancelRecovery(address _wallet) external {
        // Can be cancelled by the wallet owner or by any guardian
        RecoveryRequest storage req = recoveryRequests[_wallet];
        require(req.requestTime > 0, "No request pending");
        require(!req.executed, "Recovery already executed");
        
        if (msg.sender == _wallet) {
            // Owner cancels it immediately
            req.executed = true; // Mark as done to prevent any further execution
            emit RecoveryCancelled(_wallet, req.nonce);
        } else {
            // Guardian cancels (requires caller to be a guardian)
            require(_isGuardian(_wallet, msg.sender), "Not authorized to cancel");
            req.executed = true; // Mark as done to prevent execution
            emit RecoveryCancelled(_wallet, req.nonce);
        }
    }

    function executeRecovery(address _wallet) external {
        RecoveryRequest storage req = recoveryRequests[_wallet];
        require(req.requestTime > 0, "No request pending");
        require(!req.executed, "Recovery already executed");
        require(req.approvals >= REQUIRED_APPROVALS, "Insufficient approvals");
        require(
            req.requestTime + RECOVERY_DELAY < block.timestamp,
            "7-day security delay has not passed"
        );

        req.executed = true;
        
        emit RecoveryExecuted(_wallet, req.newOwner, req.nonce);
        
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
