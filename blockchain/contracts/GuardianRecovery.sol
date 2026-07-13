// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IDigitalWill {
    function transferWillOwnership(address _oldOwner, address _newOwner) external;
}

interface IDigitalWillCore {
    function transferVaultOwnership(address _oldOwner, address _newOwner) external;
}

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

    address public admin;
    address public digitalWill;
    address public digitalWillCore;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setDigitalWill(address _digitalWill) external onlyAdmin {
        digitalWill = _digitalWill;
    }
    
    function setDigitalWillCore(address _digitalWillCore) external onlyAdmin {
        digitalWillCore = _digitalWillCore;
    }

    mapping(address => address[]) public guardians;
    mapping(address => RecoveryRequest) public recoveryRequests;
    mapping(address => uint256) public walletRecoveryNonces;
    // key is keccak256(wallet, nonce, guardian)
    mapping(bytes32 => bool) public hasApprovedRequest;
    
    // key is keccak256(wallet, nonce, guardian)
    mapping(bytes32 => bool) public hasVetoedRequest;
    mapping(address => uint256) public recoveryVetoes;

    // Track ownership transfers (recovered wallets)
    mapping(address => address) public walletNewOwner;
    mapping(address => address) public walletOriginalOwner;

    uint256 public constant REQUIRED_APPROVALS = 3;
    uint256 public constant RECOVERY_DELAY = 7 days;

    event RecoveryInitiated(address indexed wallet, address newOwner, uint256 nonce);
    event RecoveryApproved(address indexed wallet, address guardian, uint256 nonce);
    event RecoveryExecuted(address indexed wallet, address newOwner, uint256 nonce);
    event RecoveryCancelled(address indexed wallet, uint256 nonce);
    event RecoveryVetoed(address indexed wallet, address indexed guardian, uint256 nonce, uint256 totalVetoes);

    function addGuardian(address _guardian) external {
        require(guardians[msg.sender].length < 5, "Max 5 guardians allowed");
        
        for (uint i = 0; i < guardians[msg.sender].length; i++) {
            require(guardians[msg.sender][i] != _guardian, "Already a guardian");
        }
        
        guardians[msg.sender].push(_guardian);
    }

    function removeGuardian(address _guardian) external {
        address[] storage userGuardians = guardians[msg.sender];
        uint256 length = userGuardians.length;
        bool found = false;
        
        for (uint256 i = 0; i < length; i++) {
            if (userGuardians[i] == _guardian) {
                userGuardians[i] = userGuardians[length - 1];
                userGuardians.pop();
                found = true;
                break;
            }
        }
        require(found, "Guardian not found");
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
        recoveryVetoes[_wallet] = 0;

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
        // Can be cancelled by the owner immediately OR by a majority of guardians (2+ vetoes)
        require(msg.sender == _wallet || _isGuardian(_wallet, msg.sender), "Not authorized to cancel");
        
        RecoveryRequest storage req = recoveryRequests[_wallet];
        require(req.requestTime > 0, "No request pending");
        require(!req.executed, "Recovery already executed");
        
        if (msg.sender == _wallet) {
            req.executed = true;
            emit RecoveryCancelled(_wallet, req.nonce);
        } else {
            bytes32 vetoKey = keccak256(abi.encodePacked(_wallet, req.nonce, msg.sender));
            require(!hasVetoedRequest[vetoKey], "Already vetoed this request");
            
            hasVetoedRequest[vetoKey] = true;
            
            // Count active vetoes from current guardians dynamically
            uint256 activeVetoes = 0;
            address[] storage currentGuardians = guardians[_wallet];
            for (uint256 i = 0; i < currentGuardians.length; i++) {
                bytes32 key = keccak256(abi.encodePacked(_wallet, req.nonce, currentGuardians[i]));
                if (hasVetoedRequest[key]) {
                    activeVetoes++;
                }
            }
            recoveryVetoes[_wallet] = activeVetoes;
            
            emit RecoveryVetoed(_wallet, msg.sender, req.nonce, activeVetoes);
            
            // Require at least 2 guardians to veto/cancel the recovery request
            if (activeVetoes >= 2) {
                req.executed = true;
                emit RecoveryCancelled(_wallet, req.nonce);
            }
        }
    }

    function executeRecovery(address _wallet) external {
        RecoveryRequest storage req = recoveryRequests[_wallet];
        require(req.requestTime > 0, "No request pending");
        require(!req.executed, "Recovery already executed");
        
        // Count active approvals from current guardians dynamically
        uint256 activeApprovals = 0;
        address[] storage currentGuardians = guardians[_wallet];
        for (uint256 i = 0; i < currentGuardians.length; i++) {
            bytes32 approvalKey = keccak256(abi.encodePacked(_wallet, req.nonce, currentGuardians[i]));
            if (hasApprovedRequest[approvalKey]) {
                activeApprovals++;
            }
        }
        require(activeApprovals >= REQUIRED_APPROVALS, "Insufficient approvals from active guardians");
        require(
            req.requestTime + RECOVERY_DELAY < block.timestamp,
            "7-day security delay has not passed"
        );

        req.executed = true;
        
        // Record ownership transfer mappings
        walletNewOwner[_wallet] = req.newOwner;
        walletOriginalOwner[req.newOwner] = _wallet;
        
        // Call DigitalWill to transfer ownership of the will
        if (digitalWill != address(0)) {
            try IDigitalWill(digitalWill).transferWillOwnership(_wallet, req.newOwner) {} catch {}
        }
        
        // Call DigitalWillCore to transfer ownership of the vault
        if (digitalWillCore != address(0)) {
            try IDigitalWillCore(digitalWillCore).transferVaultOwnership(_wallet, req.newOwner) {} catch {}
        }
        
        emit RecoveryExecuted(_wallet, req.newOwner, req.nonce);
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

    function getOriginalWallet(address _newOwner) external view returns (address) {
        address orig = walletOriginalOwner[_newOwner];
        return orig != address(0) ? orig : _newOwner;
    }
}
