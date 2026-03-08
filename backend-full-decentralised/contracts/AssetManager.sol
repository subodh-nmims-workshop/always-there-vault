// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AssetManager
 * @dev Decentralized Asset Management - Store asset metadata on-chain, files on IPFS
 */
contract AssetManager {
    enum AssetType { DOCUMENT, CRYPTO, BANK, OTHER }
    
    struct Asset {
        uint256 id;
        string name;
        AssetType assetType;
        string ipfsCID; // Encrypted asset data on IPFS
        string encryptedMetadata; // Additional encrypted info
        uint256 createdAt;
        uint256 updatedAt;
        bool isActive;
    }
    
    mapping(address => Asset[]) public userAssets;
    mapping(address => uint256) public assetCount;
    
    event AssetAdded(address indexed owner, uint256 indexed assetId, string name, uint256 timestamp);
    event AssetUpdated(address indexed owner, uint256 indexed assetId, uint256 timestamp);
    event AssetRemoved(address indexed owner, uint256 indexed assetId, uint256 timestamp);
    
    /**
     * @dev Add a new asset
     */
    function addAsset(
        string calldata _name,
        AssetType _assetType,
        string calldata _ipfsCID,
        string calldata _encryptedMetadata
    ) external returns (uint256) {
        uint256 assetId = assetCount[msg.sender];
        
        userAssets[msg.sender].push(Asset({
            id: assetId,
            name: _name,
            assetType: _assetType,
            ipfsCID: _ipfsCID,
            encryptedMetadata: _encryptedMetadata,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            isActive: true
        }));
        
        assetCount[msg.sender]++;
        
        emit AssetAdded(msg.sender, assetId, _name, block.timestamp);
        
        return assetId;
    }
    
    /**
     * @dev Update an asset
     */
    function updateAsset(
        uint256 _assetId,
        string calldata _name,
        string calldata _ipfsCID,
        string calldata _encryptedMetadata
    ) external {
        require(_assetId < userAssets[msg.sender].length, "Asset not found");
        
        Asset storage asset = userAssets[msg.sender][_assetId];
        require(asset.isActive, "Asset is not active");
        
        asset.name = _name;
        asset.ipfsCID = _ipfsCID;
        asset.encryptedMetadata = _encryptedMetadata;
        asset.updatedAt = block.timestamp;
        
        emit AssetUpdated(msg.sender, _assetId, block.timestamp);
    }
    
    /**
     * @dev Remove an asset (soft delete)
     */
    function removeAsset(uint256 _assetId) external {
        require(_assetId < userAssets[msg.sender].length, "Asset not found");
        
        Asset storage asset = userAssets[msg.sender][_assetId];
        require(asset.isActive, "Asset already removed");
        
        asset.isActive = false;
        asset.updatedAt = block.timestamp;
        
        emit AssetRemoved(msg.sender, _assetId, block.timestamp);
    }
    
    /**
     * @dev Get all assets for a user
     */
    function getAssets(address _owner) external view returns (Asset[] memory) {
        return userAssets[_owner];
    }
    
    /**
     * @dev Get active assets count
     */
    function getActiveAssetsCount(address _owner) external view returns (uint256) {
        Asset[] memory assets = userAssets[_owner];
        uint256 count = 0;
        
        for (uint256 i = 0; i < assets.length; i++) {
            if (assets[i].isActive) {
                count++;
            }
        }
        
        return count;
    }
    
    /**
     * @dev Get asset by ID
     */
    function getAsset(address _owner, uint256 _assetId) external view returns (Asset memory) {
        require(_assetId < userAssets[_owner].length, "Asset not found");
        return userAssets[_owner][_assetId];
    }
    
    /**
     * @dev Get assets by type
     */
    function getAssetsByType(address _owner, AssetType _assetType) external view returns (Asset[] memory) {
        Asset[] memory allAssets = userAssets[_owner];
        uint256 count = 0;
        
        // Count matching assets
        for (uint256 i = 0; i < allAssets.length; i++) {
            if (allAssets[i].assetType == _assetType && allAssets[i].isActive) {
                count++;
            }
        }
        
        // Create result array
        Asset[] memory result = new Asset[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allAssets.length; i++) {
            if (allAssets[i].assetType == _assetType && allAssets[i].isActive) {
                result[index] = allAssets[i];
                index++;
            }
        }
        
        return result;
    }
}
