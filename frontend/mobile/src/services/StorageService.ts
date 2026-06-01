/**
 * Professional Storage Service for Mobile App
 * Handles secure local storage, file management, and data persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import CryptoService from './CryptoService';

export interface StorageResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  path: string;
  encrypted: boolean;
  createdAt: number;
  modifiedAt: number;
  hash?: string;
}

export interface AssetStorage {
  assetId: string;
  name: string;
  type: string;
  encryptedData: string;
  keyShares: string[];
  beneficiaries: string[];
  createdAt: number;
  sensitivity: string;
}

class StorageService {
  private static instance: StorageService;
  private cryptoService: CryptoService;
  private documentsPath: string;
  private assetsPath: string;

  constructor() {
    this.cryptoService = CryptoService.getInstance();
    this.documentsPath = (FileSystem as any).documentDirectory || '';
    this.assetsPath = `${this.documentsPath}assets`;
    this.initializeDirectories();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Initialize required directories
   */
  private async initializeDirectories(): Promise<void> {
    try {
      const assetsExists = await FileSystem.getInfoAsync(this.assetsPath);
      if (!assetsExists.exists) {
        await FileSystem.makeDirectoryAsync(this.assetsPath, { intermediates: true });
      }
    } catch (error) {
      console.error('Failed to initialize directories:', error);
    }
  }

  /**
   * Store data securely in AsyncStorage
   */
  async storeData<T>(key: string, data: T, encrypt: boolean = true): Promise<StorageResult> {
    try {
      let dataToStore: string;
      
      if (encrypt) {
        const encryptionResult = await this.cryptoService.encryptData(JSON.stringify(data));
        dataToStore = JSON.stringify(encryptionResult);
      } else {
        dataToStore = JSON.stringify(data);
      }
      
      await AsyncStorage.setItem(key, dataToStore);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Storage failed'
      };
    }
  }

  /**
   * Retrieve data from AsyncStorage
   */
  async getData<T>(key: string, encrypted: boolean = true): Promise<StorageResult<T>> {
    try {
      const storedData = await AsyncStorage.getItem(key);
      
      if (!storedData) {
        return { success: false, error: 'Data not found' };
      }
      
      let parsedData: T;
      
      if (encrypted) {
        const encryptionResult = JSON.parse(storedData);
        const decryptedData = await this.cryptoService.decryptData(
          encryptionResult.encryptedData,
          encryptionResult.keyId, // In real implementation, retrieve key securely
          encryptionResult.iv
        );
        parsedData = JSON.parse(decryptedData);
      } else {
        parsedData = JSON.parse(storedData);
      }
      
      return { success: true, data: parsedData };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Retrieval failed'
      };
    }
  }

  /**
   * Remove data from AsyncStorage
   */
  async removeData(key: string): Promise<StorageResult> {
    try {
      await AsyncStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Removal failed'
      };
    }
  }

  /**
   * Store file securely
   */
  async storeFile(
    fileName: string,
    fileData: string,
    metadata: Partial<FileMetadata>,
    encrypt: boolean = true
  ): Promise<StorageResult<FileMetadata>> {
    try {
      const fileId = this.generateFileId();
      const filePath = `${this.assetsPath}/${fileId}_${fileName}`;
      
      let dataToWrite: string;
      let isEncrypted = false;
      
      if (encrypt) {
        const encryptionResult = await this.cryptoService.encryptData(fileData);
        dataToWrite = JSON.stringify(encryptionResult);
        isEncrypted = true;
      } else {
        dataToWrite = fileData;
      }
      
      await (FileSystem as any).writeAsStringAsync(filePath, dataToWrite, { encoding: (FileSystem as any).EncodingType.UTF8 });
      
      const fileStats = await FileSystem.getInfoAsync(filePath);
      const hash = this.cryptoService.generateHash(dataToWrite);
      
      const fileMetadata: FileMetadata = {
        id: fileId,
        name: fileName,
        size: fileStats.exists ? fileStats.size : 0,
        type: metadata.type || 'unknown',
        path: filePath,
        encrypted: isEncrypted,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        hash,
        ...metadata
      };
      
      // Store metadata
      await this.storeData(`file_metadata_${fileId}`, fileMetadata);
      
      return { success: true, data: fileMetadata };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'File storage failed'
      };
    }
  }

  /**
   * Retrieve file
   */
  async getFile(fileId: string, decrypt: boolean = true): Promise<StorageResult<{ data: string; metadata: FileMetadata }>> {
    try {
      const metadataResult = await this.getData<FileMetadata>(`file_metadata_${fileId}`);
      
      if (!metadataResult.success || !metadataResult.data) {
        return { success: false, error: 'File metadata not found' };
      }
      
      const metadata = metadataResult.data;
      const fileExists = await FileSystem.getInfoAsync(metadata.path);
      
      if (!fileExists.exists) {
        return { success: false, error: 'File not found' };
      }
      
      const fileData = await (FileSystem as any).readAsStringAsync(metadata.path, { encoding: (FileSystem as any).EncodingType.UTF8 });
      
      let processedData: string;
      
      if (decrypt && metadata.encrypted) {
        const encryptionResult = JSON.parse(fileData);
        processedData = await this.cryptoService.decryptData(
          encryptionResult.encryptedData,
          encryptionResult.keyId, // In real implementation, retrieve key securely
          encryptionResult.iv
        );
      } else {
        processedData = fileData;
      }
      
      return {
        success: true,
        data: {
          data: processedData,
          metadata
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'File retrieval failed'
      };
    }
  }

  /**
   * Delete file
   */
  async deleteFile(fileId: string): Promise<StorageResult> {
    try {
      const metadataResult = await this.getData<FileMetadata>(`file_metadata_${fileId}`);
      
      if (metadataResult.success && metadataResult.data) {
        const fileExists = await FileSystem.getInfoAsync(metadataResult.data.path);
        if (fileExists.exists) {
          await FileSystem.deleteAsync(metadataResult.data.path);
        }
      }
      
      await this.removeData(`file_metadata_${fileId}`);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'File deletion failed'
      };
    }
  }

  /**
   * List all stored files
   */
  async listFiles(): Promise<StorageResult<FileMetadata[]>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const metadataKeys = keys.filter(key => key.startsWith('file_metadata_'));
      
      const files: FileMetadata[] = [];
      
      for (const key of metadataKeys) {
        const result = await this.getData<FileMetadata>(key);
        if (result.success && result.data) {
          files.push(result.data);
        }
      }
      
      return { success: true, data: files };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'File listing failed'
      };
    }
  }

  /**
   * Store asset data
   */
  async storeAsset(asset: AssetStorage): Promise<StorageResult> {
    return this.storeData(`asset_${asset.assetId}`, asset, true);
  }

  /**
   * Get asset data
   */
  async getAsset(assetId: string): Promise<StorageResult<AssetStorage>> {
    return this.getData<AssetStorage>(`asset_${assetId}`, true);
  }

  /**
   * List all assets
   */
  async listAssets(): Promise<StorageResult<AssetStorage[]>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const assetKeys = keys.filter(key => key.startsWith('asset_'));
      
      const assets: AssetStorage[] = [];
      
      for (const key of assetKeys) {
        const result = await this.getData<AssetStorage>(key, true);
        if (result.success && result.data) {
          assets.push(result.data);
        }
      }
      
      return { success: true, data: assets };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Asset listing failed'
      };
    }
  }

  /**
   * Clear all data (for logout/reset)
   */
  async clearAllData(): Promise<StorageResult> {
    try {
      await AsyncStorage.clear();
      
      // Clear files directory
      const filesExist = await FileSystem.getInfoAsync(this.assetsPath);
      if (filesExist.exists) {
        const files = await FileSystem.readDirectoryAsync(this.assetsPath);
        for (const file of files) {
          await FileSystem.deleteAsync(`${this.assetsPath}/${file}`);
        }
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Data clearing failed'
      };
    }
  }

  /**
   * Get storage usage statistics
   */
  async getStorageStats(): Promise<StorageResult<{
    totalFiles: number;
    totalSize: number;
    encryptedFiles: number;
    assets: number;
  }>> {
    try {
      const filesResult = await this.listFiles();
      const assetsResult = await this.listAssets();
      
      if (!filesResult.success || !assetsResult.success) {
        return { success: false, error: 'Failed to get storage stats' };
      }
      
      const files = filesResult.data || [];
      const assets = assetsResult.data || [];
      
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      const encryptedFiles = files.filter(file => file.encrypted).length;
      
      return {
        success: true,
        data: {
          totalFiles: files.length,
          totalSize,
          encryptedFiles,
          assets: assets.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Stats calculation failed'
      };
    }
  }

  /**
   * Generate unique file ID
   */
  private generateFileId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  /**
   * Backup data to external storage (if available)
   */
  async createBackup(): Promise<StorageResult<string>> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allData: Record<string, any> = {};
      
      for (const key of allKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          allData[key] = value;
        }
      }
      
      const backupData = JSON.stringify(allData);
      const backupPath = `${this.documentsPath}/digital_will_backup_${Date.now()}.json`;
      
      await (FileSystem as any).writeAsStringAsync(backupPath, backupData, { encoding: (FileSystem as any).EncodingType.UTF8 });
      
      return { success: true, data: backupPath };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Backup creation failed'
      };
    }
  }

  /**
   * Store diagnostic logs locally
   */
  async saveDiagnosticLog(log: { time: string; status: string; message: string; color: string }): Promise<void> {
    try {
      const existingStr = await AsyncStorage.getItem('dwp_diagnostic_logs');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.push(log);
      if (existing.length > 50) {
        existing.shift();
      }
      await AsyncStorage.setItem('dwp_diagnostic_logs', JSON.stringify(existing));
    } catch (e) {
      console.warn('Failed to save mobile diagnostic log:', e);
    }
  }

  async getDiagnosticLogs(): Promise<any[]> {
    try {
      const existingStr = await AsyncStorage.getItem('dwp_diagnostic_logs');
      return existingStr ? JSON.parse(existingStr) : [];
    } catch (e) {
      console.warn('Failed to retrieve mobile diagnostic logs:', e);
      return [];
    }
  }
}

export default StorageService;