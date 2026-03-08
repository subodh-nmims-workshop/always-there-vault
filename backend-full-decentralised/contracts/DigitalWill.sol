// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

interface IERC721 {
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
}

/**
 * @title DigitalWill
 * @dev Decentralized Digital Will Management - NO BACKEND NEEDED!
 */
contract DigitalWill {
    struct Will {
        uint256 createdAt;
        uint256 lastUpdated;
        bool isActive;
        bool isTriggered;
        string ipfsCID; // Encrypted data stored on IPFS
    }
    
    struct Beneficiary {
        address beneficiaryAddress;
        string name;
        string encryptedShare; // Encrypted Shamir share or key
        uint256 sharePercentage;
        bool isActive;
        uint256 addedAt;
    }
    
    enum TokenType {
        ERC20,
        ERC721
    }
    
    struct TokenAsset {
        address token;
        TokenType tokenType;
        uint256 amountOrId;
        address beneficiaryAddress;
        bool isActive;
        uint256 registeredAt;
    }
    
    mapping(address => Will) public wills;
    mapping(address => Beneficiary[]) public beneficiaries;
    mapping(address => mapping(address => bool)) public isBeneficiary;
    mapping(address => TokenAsset[]) public tokenAssets;
    mapping(address => bool) public tokenAssetsExecuted;
    
    event WillCreated(address indexed owner, uint256 timestamp);
    event WillUpdated(address indexed owner, string ipfsCID, uint256 timestamp);
    event BeneficiaryAdded(address indexed owner, address indexed beneficiary, uint256 timestamp);
    event BeneficiaryRemoved(address indexed owner, address indexed beneficiary, uint256 timestamp);
    event WillTriggered(address indexed owner, uint256 timestamp);
    event AssetClaimed(address indexed owner, address indexed beneficiary, uint256 timestamp);
    event TokenAssetRegistered(address indexed owner, address indexed token, address indexed beneficiary, uint8 tokenType, uint256 amountOrId, uint256 timestamp);
    event TokenAssetExecuted(address indexed owner, address indexed token, address indexed beneficiary, uint8 tokenType, uint256 amountOrId, uint256 timestamp);
    
    /**
     * @dev Create a new digital will
     */
    function createWill(string calldata _ipfsCID) external {
        require(!wills[msg.sender].isActive, "Will already exists");
        
        wills[msg.sender] = Will({
            createdAt: block.timestamp,
            lastUpdated: block.timestamp,
            isActive: true,
            isTriggered: false,
            ipfsCID: _ipfsCID
        });
        
        emit WillCreated(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Update will data (IPFS CID)
     */
    function updateWill(string calldata _ipfsCID) external {
        require(wills[msg.sender].isActive, "No active will found");
        require(!wills[msg.sender].isTriggered, "Will already triggered");
        
        wills[msg.sender].ipfsCID = _ipfsCID;
        wills[msg.sender].lastUpdated = block.timestamp;
        
        emit WillUpdated(msg.sender, _ipfsCID, block.timestamp);
    }
    
    /**
     * @dev Add a beneficiary
     */
    function addBeneficiary(
        address _beneficiary,
        string calldata _name,
        string calldata _encryptedShare,
        uint256 _sharePercentage
    ) external {
        require(wills[msg.sender].isActive, "No active will found");
        require(!wills[msg.sender].isTriggered, "Will already triggered");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_beneficiary != msg.sender, "Cannot add yourself as beneficiary");
        require(!isBeneficiary[msg.sender][_beneficiary], "Beneficiary already exists");
        require(_sharePercentage > 0 && _sharePercentage <= 100, "Invalid share percentage");
        
        beneficiaries[msg.sender].push(Beneficiary({
            beneficiaryAddress: _beneficiary,
            name: _name,
            encryptedShare: _encryptedShare,
            sharePercentage: _sharePercentage,
            isActive: true,
            addedAt: block.timestamp
        }));
        
        isBeneficiary[msg.sender][_beneficiary] = true;
        
        emit BeneficiaryAdded(msg.sender, _beneficiary, block.timestamp);
    }
    
    /**
     * @dev Remove a beneficiary
     */
    function removeBeneficiary(address _beneficiary) external {
        require(wills[msg.sender].isActive, "No active will found");
        require(!wills[msg.sender].isTriggered, "Will already triggered");
        require(isBeneficiary[msg.sender][_beneficiary], "Beneficiary not found");
        
        Beneficiary[] storage userBeneficiaries = beneficiaries[msg.sender];
        
        for (uint256 i = 0; i < userBeneficiaries.length; i++) {
            if (userBeneficiaries[i].beneficiaryAddress == _beneficiary) {
                userBeneficiaries[i].isActive = false;
                break;
            }
        }
        
        isBeneficiary[msg.sender][_beneficiary] = false;
        
        emit BeneficiaryRemoved(msg.sender, _beneficiary, block.timestamp);
    }
    
    /**
     * @dev Trigger will (called by HeartbeatTracker or authorized party)
     */
    function triggerWill(address _owner) external {
        require(wills[_owner].isActive, "No active will found");
        require(!wills[_owner].isTriggered, "Will already triggered");
        
        wills[_owner].isTriggered = true;
        
        emit WillTriggered(_owner, block.timestamp);
    }
    
    /**
     * @dev Register an on-chain token asset to be transferred on trigger
     * @param _token ERC20 or ERC721 token contract
     * @param _tokenType 0 = ERC20, 1 = ERC721
     * @param _amountOrId ERC20 amount (wei) or ERC721 tokenId
     * @param _beneficiary Recipient wallet address
     */
    function registerTokenAsset(
        address _token,
        uint8 _tokenType,
        uint256 _amountOrId,
        address _beneficiary
    ) external {
        require(wills[msg.sender].isActive, "No active will found");
        require(!wills[msg.sender].isTriggered, "Will already triggered");
        require(_token != address(0), "Invalid token address");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_beneficiary != msg.sender, "Cannot self-assign token asset");
        
        TokenAsset memory asset = TokenAsset({
            token: _token,
            tokenType: TokenType(_tokenType),
            amountOrId: _amountOrId,
            beneficiaryAddress: _beneficiary,
            isActive: true,
            registeredAt: block.timestamp
        });
        
        tokenAssets[msg.sender].push(asset);
        
        emit TokenAssetRegistered(
            msg.sender,
            _token,
            _beneficiary,
            _tokenType,
            _amountOrId,
            block.timestamp
        );
    }
    
    /**
     * @dev Execute all registered token asset transfers after will is triggered.
     * Requires the owner to have approved this contract for ERC20/721 transfers beforehand.
     */
    function executeTokenAssets(address _owner) external {
        require(wills[_owner].isActive, "No active will found");
        require(wills[_owner].isTriggered, "Will not triggered yet");
        require(!tokenAssetsExecuted[_owner], "Token assets already executed");
        
        TokenAsset[] storage assets = tokenAssets[_owner];
        for (uint256 i = 0; i < assets.length; i++) {
            TokenAsset storage asset = assets[i];
            if (!asset.isActive) {
                continue;
            }
            
            if (asset.tokenType == TokenType.ERC20) {
                IERC20(asset.token).transferFrom(_owner, asset.beneficiaryAddress, asset.amountOrId);
            } else if (asset.tokenType == TokenType.ERC721) {
                IERC721(asset.token).safeTransferFrom(_owner, asset.beneficiaryAddress, asset.amountOrId);
            }
            
            asset.isActive = false;
            
            emit TokenAssetExecuted(
                _owner,
                asset.token,
                asset.beneficiaryAddress,
                uint8(asset.tokenType),
                asset.amountOrId,
                block.timestamp
            );
        }
        
        tokenAssetsExecuted[_owner] = true;
    }
    
    /**
     * @dev Claim assets (beneficiary only)
     */
    function claimAssets(address _owner) external returns (string memory ipfsCID, string memory encryptedShare) {
        require(wills[_owner].isActive, "No active will found");
        require(wills[_owner].isTriggered, "Will not triggered yet");
        require(isBeneficiary[_owner][msg.sender], "Not a beneficiary");
        
        // Get beneficiary's encrypted share
        Beneficiary[] memory userBeneficiaries = beneficiaries[_owner];
        string memory share;
        
        for (uint256 i = 0; i < userBeneficiaries.length; i++) {
            if (userBeneficiaries[i].beneficiaryAddress == msg.sender && userBeneficiaries[i].isActive) {
                share = userBeneficiaries[i].encryptedShare;
                break;
            }
        }
        
        emit AssetClaimed(_owner, msg.sender, block.timestamp);
        
        return (wills[_owner].ipfsCID, share);
    }
    
    /**
     * @dev Get will information
     */
    function getWill(address _owner) external view returns (
        uint256 createdAt,
        uint256 lastUpdated,
        bool isActive,
        bool isTriggered,
        string memory ipfsCID
    ) {
        Will memory will = wills[_owner];
        return (
            will.createdAt,
            will.lastUpdated,
            will.isActive,
            will.isTriggered,
            will.ipfsCID
        );
    }
    
    /**
     * @dev Get all beneficiaries
     */
    function getBeneficiaries(address _owner) external view returns (Beneficiary[] memory) {
        return beneficiaries[_owner];
    }
    
    /**
     * @dev Get active beneficiaries count
     */
    function getActiveBeneficiariesCount(address _owner) external view returns (uint256) {
        Beneficiary[] memory userBeneficiaries = beneficiaries[_owner];
        uint256 count = 0;
        
        for (uint256 i = 0; i < userBeneficiaries.length; i++) {
            if (userBeneficiaries[i].isActive) {
                count++;
            }
        }
        
        return count;
    }
}
