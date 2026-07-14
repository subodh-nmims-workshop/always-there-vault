/**
 * Client-side Storage Service for Web App
 * Handles localStorage, IndexedDB, and encrypted data persistence
 * NOW WITH FOLDER SYSTEM - Like OneDrive!
 */

import WebCryptoService, { EncryptionResult, KeyDistribution } from './crypto';

export interface StoredFolder {
  id: string;
  name: string;
  type?: string; // Optional category type (photo, document, etc.)
  parentId: string | null; // null = root folder
  color?: string;
  icon?: string;
  beneficiaries: string[]; // Beneficiary IDs who can access
  createdAt: number;
  updatedAt: number;
}

export interface StoredAsset {
  id: string;
  name: string;
  type: string;
  folderId: string | null; // null = root, otherwise folder ID
  encryptedData: string;
  keyId: string;
  iv: string;
  ipfsHash?: string;
  beneficiaries: string[]; // Beneficiary IDs for this asset
  assignedBeneficiaryId?: string | null; // Single-nominee inheritance assignment
  createdAt: number;
  size: number;
  mimeType?: string;
}

export interface StoredBeneficiary {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  createdAt: number;
  enabled: boolean;
  isVerified?: boolean;
  verificationMethod?: 'email' | 'public_key';
  pgpPublicKey?: string;
}

export interface StoredHeartbeat {
  id: string;
  timestamp: number;
  method: string;
  signature?: string;
  verified: boolean;
}

export interface StoredTimeCapsule {
  id: string;
  assetId: string;
  beneficiaryId: string;
  scheduledDate: string;
  customMessage?: string;
  isDelivered: boolean;
  createdAt: string;
}

export interface AppState {
  folders: StoredFolder[];
  assets: StoredAsset[];
  beneficiaries: StoredBeneficiary[];
  heartbeats: StoredHeartbeat[];
  keyDistributions: KeyDistribution[];
  settings: {
    heartbeatInterval: number;
    gracePeriod: number;
    bufferMisses: number;
    timeLock: number;
    multiSig: 'off' | '2of3' | '3of5';
    sessionTimeout: number;
    encryptionEnabled: boolean;
    notificationsEnabled: boolean;
    emailNotification: string;
    telegramNotification: string;
    storageProvider: 'ipfs' | 'arweave';
    testnetMode: boolean;
    gasPrice: number | 'auto';
  };
  stats: {
    totalAssets: number;
    totalBeneficiaries: number;
    lastHeartbeat: number;
    systemStatus: 'secure' | 'warning' | 'error';
  };
}

class WebStorageService {
  private static instance: WebStorageService;
  private crypto: WebCryptoService;
  private dbName = 'digital-will-db';
  private dbVersion = 4;
  private db: IDBDatabase | null = null;
  private dbInitPromise: Promise<void> | null = null;

  private constructor() {
    this.crypto = WebCryptoService.getInstance();
    this.dbInitPromise = this.initIndexedDB();
  }

  public static getInstance(): WebStorageService {
    if (!WebStorageService.instance) {
      WebStorageService.instance = new WebStorageService();
    }
    return WebStorageService.instance;
  }

  /**
   * Initialize IndexedDB for large data storage
   */
  private async initIndexedDB(): Promise<void> {
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      return Promise.resolve(); // Bypass during SSR
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('folders')) {
          db.createObjectStore('folders', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('assets')) {
          db.createObjectStore('assets', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('beneficiaries')) {
          db.createObjectStore('beneficiaries', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('heartbeats')) {
          db.createObjectStore('heartbeats', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('keyDistributions')) {
          db.createObjectStore('keyDistributions', { keyPath: 'keyId' });
        }
        if (!db.objectStoreNames.contains('diagnosticLogs')) {
          db.createObjectStore('diagnosticLogs', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('timeCapsules')) {
          db.createObjectStore('timeCapsules', { keyPath: 'id' });
        }
      };
    });
  }

  /**
   * Get current app state
   */
  async getAppState(): Promise<AppState> {
    const [folders, assets, beneficiaries, heartbeats, keyDistributions] = await Promise.all([
      this.getAllFolders(),
      this.getAllAssets(),
      this.getAllBeneficiaries(),
      this.getAllHeartbeats(),
      this.getAllKeyDistributions()
    ]);

    const settings = this.getSettings();
    const lastHeartbeat = heartbeats.length > 0
      ? Math.max(...heartbeats.map(h => h.timestamp))
      : Date.now();

    return {
      folders,
      assets,
      beneficiaries,
      heartbeats,
      keyDistributions,
      settings,
      stats: {
        totalAssets: assets.length,
        totalBeneficiaries: beneficiaries.length,
        lastHeartbeat,
        systemStatus: this.calculateSystemStatus(assets, beneficiaries, lastHeartbeat)
      }
    };
  }

  /**
   * Asset Management
   */
  async saveAsset(asset: StoredAsset, silent = false): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['assets'], 'readwrite');
      const store = transaction.objectStore('assets');
      const request = store.put(asset);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        if (!silent && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('storage-asset-saved', { detail: asset }));
        }
        resolve();
      };
    });
  }

  async getAllAssets(): Promise<StoredAsset[]> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['assets'], 'readonly');
      const store = transaction.objectStore('assets');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteAsset(id: string, silent = false): Promise<void> {
    await this.ensureDB();
    
    try {
      await this.deleteTimeCapsulesByAsset(id);
    } catch (err) {
      console.warn('⚠️ Could not delete time capsules for asset:', id, err);
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['assets'], 'readwrite');
      const store = transaction.objectStore('assets');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        if (!silent && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('storage-asset-deleted', { detail: { id } }));
        }
        resolve();
      };
    });
  }

  /**
   * Beneficiary Management
   */
  async saveBeneficiary(beneficiary: StoredBeneficiary, silent = false): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['beneficiaries'], 'readwrite');
      const store = transaction.objectStore('beneficiaries');
      store.put(beneficiary);

      transaction.oncomplete = () => {
        if (!silent && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('storage-beneficiary-saved', { detail: beneficiary }));
        }
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getAllBeneficiaries(): Promise<StoredBeneficiary[]> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['beneficiaries'], 'readonly');
      const store = transaction.objectStore('beneficiaries');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteBeneficiary(id: string, silent = false): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['beneficiaries'], 'readwrite');
      const store = transaction.objectStore('beneficiaries');
      store.delete(id);

      transaction.oncomplete = () => {
        if (!silent && typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('storage-beneficiary-deleted', { detail: { id } }));
        }
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  }

  /**
   * Heartbeat Management
   */
  async saveHeartbeat(heartbeat: StoredHeartbeat): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['heartbeats'], 'readwrite');
      const store = transaction.objectStore('heartbeats');
      store.put(heartbeat);

      transaction.oncomplete = () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('storage-heartbeat-saved', { detail: heartbeat }));
        }
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getAllHeartbeats(): Promise<StoredHeartbeat[]> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['heartbeats'], 'readonly');
      const store = transaction.objectStore('heartbeats');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  /**
   * Key Distribution Management
   */
  async saveKeyDistribution(keyDistribution: KeyDistribution): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['keyDistributions'], 'readwrite');
      const store = transaction.objectStore('keyDistributions');
      const request = store.put(keyDistribution);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllKeyDistributions(): Promise<KeyDistribution[]> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['keyDistributions'], 'readonly');
      const store = transaction.objectStore('keyDistributions');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  /**
   * Settings Management (localStorage)
   */
  getSettings() {
    const defaultSettings: AppState['settings'] = {
      heartbeatInterval: 7,
      gracePeriod: 30,
      bufferMisses: 3,
      timeLock: 24,
      multiSig: 'off',
      sessionTimeout: 30,
      encryptionEnabled: true,
      notificationsEnabled: true,
      emailNotification: '',
      telegramNotification: '',
      storageProvider: 'ipfs',
      testnetMode: false,
      gasPrice: 'auto'
    };

    try {
      const stored = localStorage.getItem('digital-will-settings');
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  }

  saveSettings(settings: Partial<AppState['settings']>): void {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem('digital-will-settings', JSON.stringify(updated));
  }

  /**
   * Utility Methods
   */
  private async ensureDB(): Promise<void> {
    if (this.db) return;
    if (this.dbInitPromise) {
      await this.dbInitPromise;
    } else {
      this.dbInitPromise = this.initIndexedDB();
      await this.dbInitPromise;
    }
  }

  private calculateSystemStatus(
    assets: StoredAsset[],
    beneficiaries: StoredBeneficiary[],
    lastHeartbeat: number
  ): 'secure' | 'warning' | 'error' {
    const now = Date.now();
    const daysSinceHeartbeat = (now - lastHeartbeat) / (1000 * 60 * 60 * 24);

    if (daysSinceHeartbeat > 45) return 'error';
    if (daysSinceHeartbeat > 30) return 'warning';
    if (assets.length === 0 && beneficiaries.length === 0) return 'warning';

    return 'secure';
  }

  /**
   * Generate unique IDs
   */
  generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Clear all data (for testing/reset)
   */
  async clearAllData(): Promise<void> {
    await this.ensureDB();

    const stores = ['assets', 'beneficiaries', 'heartbeats', 'keyDistributions', 'folders', 'diagnosticLogs', 'timeCapsules'];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(stores, 'readwrite');
      let completed = 0;

      stores.forEach(storeName => {
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          completed++;
          if (completed === stores.length) {
            localStorage.removeItem('digital-will-settings');
            resolve();
          }
        };
      });
    });
  }

  /**
   * Export data for backup
   */
  async exportData(): Promise<string> {
    const state = await this.getAppState();
    return JSON.stringify(state, null, 2);
  }

  /**
   * Import data from backup
   */
  async importData(jsonData: string): Promise<void> {
    try {
      const state: AppState = JSON.parse(jsonData);

      // Clear existing data
      await this.clearAllData();

      // Import new data
      await Promise.all([
        ...state.assets.map(asset => this.saveAsset(asset)),
        ...state.beneficiaries.map(beneficiary => this.saveBeneficiary(beneficiary)),
        ...state.heartbeats.map(heartbeat => this.saveHeartbeat(heartbeat)),
        ...state.keyDistributions.map(keyDist => this.saveKeyDistribution(keyDist))
      ]);

      // Import settings
      this.saveSettings(state.settings);

    } catch (error) {
      throw new Error(`Import failed: ${error}`);
    }
  }

  /**
   * ============================================
   * FOLDER MANAGEMENT (OneDrive-like system)
   * ============================================
   */

  /**
   * Save a folder directly (for sync/creation)
   */
  async saveFolder(folder: StoredFolder): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['folders'], 'readwrite');
      const store = transaction.objectStore('folders');
      const request = store.put(folder);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  /**
   * Create a new folder
   */
  async createFolder(name: string, parentId: string | null = null, beneficiaries: string[] = [], type?: string): Promise<StoredFolder> {
    await this.ensureDB();

    const folder: StoredFolder = {
      id: this.generateId(),
      name,
      parentId,
      type: type || WebStorageService.getFolderType(name),
      beneficiaries,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      color: this.getRandomColor(),
      icon: this.getFolderIcon(name)
    };

    return new Promise(async (resolve, reject) => {
      const transaction = this.db!.transaction(['folders'], 'readwrite');
      const store = transaction.objectStore('folders');
      const request = store.add(folder);

      request.onsuccess = async () => {
        // Also sync to backend API if centralized mode
        try {
          const mode = localStorage.getItem('dwp_mode') || 'centralized'
          const walletAddress = localStorage.getItem('dwp_wallet_address')
          if (mode === 'centralized' && walletAddress) {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
            await fetch(`${apiEndpoint}/api/assets/folders`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
              },
              body: JSON.stringify({
                name: folder.name,
                walletAddress,
                parentId: folder.parentId,
                id: folder.id,
                beneficiaries: folder.beneficiaries
              })
            })
          }
        } catch (e) {
          console.warn('⚠️ Could not sync folder to backend', e)
        }
        resolve(folder);
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get all folders
   */
  async getAllFolders(): Promise<StoredFolder[]> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['folders'], 'readonly');
      const store = transaction.objectStore('folders');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get folder by ID
   */
  async getFolder(id: string): Promise<StoredFolder | null> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['folders'], 'readonly');
      const store = transaction.objectStore('folders');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get folders by parent ID
   */
  async getFoldersByParent(parentId: string | null): Promise<StoredFolder[]> {
    const allFolders = await this.getAllFolders();
    return allFolders.filter(f => f.parentId === parentId);
  }

  /**
   * Update folder
   */
  async updateFolder(id: string, updates: Partial<StoredFolder>): Promise<void> {
    await this.ensureDB();
    const folder = await this.getFolder(id);
    if (!folder) throw new Error('Folder not found');

    const updated = { ...folder, ...updates, updatedAt: Date.now() };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['folders'], 'readwrite');
      const store = transaction.objectStore('folders');
      const request = store.put(updated);

      request.onsuccess = async () => {
        // Also sync to backend API if centralized mode
        try {
          const mode = localStorage.getItem('dwp_mode') || 'centralized'
          const walletAddress = localStorage.getItem('dwp_wallet_address')
          if (mode === 'centralized' && walletAddress) {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
            await fetch(`${apiEndpoint}/api/assets/folders/${id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
              },
              body: JSON.stringify({
                name: updated.name,
                parentId: updated.parentId,
                beneficiaries: updated.beneficiaries
              })
            })
          }
        } catch (e) {
          console.warn('⚠️ Could not sync folder update to backend', e)
        }
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Delete folder (and move contents to parent or root)
   */
  async deleteFolder(id: string): Promise<void> {
    await this.ensureDB();
    const folder = await this.getFolder(id);
    if (!folder) return;

    // Move all assets in this folder to parent
    const assets = await this.getAssetsByFolder(id);
    for (const asset of assets) {
      await this.updateAsset(asset.id, { folderId: folder.parentId });
    }

    // Move all subfolders to parent
    const subfolders = await this.getFoldersByParent(id);
    for (const subfolder of subfolders) {
      await this.updateFolder(subfolder.id, { parentId: folder.parentId });
    }

    // Delete the folder
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['folders'], 'readwrite');
      const store = transaction.objectStore('folders');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get assets by folder
   */
  async getAssetsByFolder(folderId: string | null): Promise<StoredAsset[]> {
    const allAssets = await this.getAllAssets();
    return allAssets.filter(a => a.folderId === folderId);
  }

  /**
   * Move asset to folder
   */
  async moveAssetToFolder(assetId: string, folderId: string | null): Promise<void> {
    return this.updateAsset(assetId, { folderId });
  }

  /**
   * Share folder with beneficiaries
   */
  async shareFolderWithBeneficiaries(folderId: string, beneficiaryIds: string[]): Promise<void> {
    const folder = await this.getFolder(folderId);
    if (!folder) throw new Error('Folder not found');

    // Replace folder-level mapping with the explicit selection
    const updatedBeneficiaries = Array.from(new Set(beneficiaryIds));
    await this.updateFolder(folderId, { beneficiaries: updatedBeneficiaries });

    const assets = await this.getAssetsByFolder(folderId);
    for (const asset of assets) {
      // For assets inside this folder, align with the folder's beneficiary set
      await this.updateAsset(asset.id, { beneficiaries: updatedBeneficiaries });
    }
    
    try {
      const mode = localStorage.getItem('dwp_mode') || 'centralized'
      if (mode === 'centralized') {
        const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
        const allBens = await this.getAllBeneficiaries();
        const benMap = new Map(allBens.map(b => [b.id, b.walletAddress]));
        for (const benId of updatedBeneficiaries) {
          const wallet = benMap.get(benId);
          if (wallet) {
            // Sync with centralized node per beneficiary
            await fetch(`${apiEndpoint}/api/assets/folders/${folderId}/share`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
              },
              body: JSON.stringify({
                walletToShareWith: wallet,
                permission: 'READ'
              })
            });
          }
        }
      }
    } catch (e) {
      console.warn('⚠️ Could not sync folder share mapping to backend', e)
    }
  }

  /**
   * Share asset with beneficiaries
   */
  async updateAssetBeneficiaries(assetId: string, beneficiaryIds: string[]): Promise<void> {
    return this.updateAsset(assetId, { beneficiaries: beneficiaryIds });
  }

  /**
   * Get folder path (breadcrumb)
   */
  async getFolderPath(folderId: string | null): Promise<StoredFolder[]> {
    if (!folderId) return [];

    const path: StoredFolder[] = [];
    let currentId: string | null = folderId;

    while (currentId) {
      const folder = await this.getFolder(currentId);
      if (!folder) break;
      path.unshift(folder);
      currentId = folder.parentId;
    }

    return path;
  }

  /**
   * Helper: Get random color for folder
   */
  private getRandomColor(): string {
    const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Helper: Get folder icon based on name
   */
  private getFolderIcon(name: string): string {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('doc') || lowerName.includes('file')) return 'document';
    if (lowerName.includes('photo') || lowerName.includes('image')) return 'photo';
    if (lowerName.includes('video') || lowerName.includes('movie')) return 'video';
    if (lowerName.includes('music') || lowerName.includes('audio')) return 'music';
    if (lowerName.includes('key') || lowerName.includes('password')) return 'key';
    return 'folder';
  }

  /**
   * Helper: Get folder type based on name
   */
  /**
   * Helper: Get folder type based on name
   */
  public static getFolderType(name: string): string {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('doc') || lowerName.includes('file')) return 'document';
    if (lowerName.includes('photo') || lowerName.includes('image')) return 'photo';
    if (lowerName.includes('bank') || lowerName.includes('finan') || lowerName.includes('money')) return 'bank_account';
    if (lowerName.includes('wallet') || lowerName.includes('crypto')) return 'self_custody_crypto';
    if (lowerName.includes('exchange')) return 'exchange_account';
    if (lowerName.includes('secret')) return 'business_secret';
    return 'all';
  }

  /**
   * Update asset (add folderId support)
   */
  async updateAsset(id: string, updates: Partial<StoredAsset>): Promise<void> {
    await this.ensureDB();
    const asset = await this.getAsset(id);
    
    const updated = asset 
      ? { ...asset, ...updates }
      : {
          id,
          name: updates.name || 'Synced Asset',
          type: updates.type || 'document',
          folderId: updates.folderId || null,
          encryptedData: updates.encryptedData || '',
          keyId: updates.keyId || '',
          iv: updates.iv || '',
          ipfsHash: updates.ipfsHash || '',
          beneficiaries: updates.beneficiaries || [],
          assignedBeneficiaryId: updates.assignedBeneficiaryId || null,
          createdAt: Date.now(),
          size: updates.size || 0,
          mimeType: updates.mimeType || '',
          ...updates
        };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['assets'], 'readwrite');
      const store = transaction.objectStore('assets');
      const request = store.put(updated);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get asset by ID
   */
  async getAsset(id: string): Promise<StoredAsset | null> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['assets'], 'readonly');
      const store = transaction.objectStore('assets');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Diagnostic Logs Persistence
   */
  async saveDiagnosticLog(log: { time: string; status: string; message: string; color: string }): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['diagnosticLogs'], 'readwrite');
      const store = transaction.objectStore('diagnosticLogs');
      
      // Clean up older logs if limit is exceeded (keep last 50)
      store.openCursor(null, 'next').onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue | null>).result;
        if (cursor) {
          store.count().onsuccess = (countEvent) => {
            const count = (countEvent.target as IDBRequest<number>).result;
            if (count > 50) {
              store.delete(cursor.primaryKey);
            }
          };
        }
      };

      store.add(log);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getDiagnosticLogs(): Promise<any[]> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['diagnosticLogs'], 'readonly');
      const store = transaction.objectStore('diagnosticLogs');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  /**
   * Time Capsule Management
   */
  async saveTimeCapsule(capsule: StoredTimeCapsule): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['timeCapsules'], 'readwrite');
      const store = transaction.objectStore('timeCapsules');
      const request = store.put(capsule);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllTimeCapsules(): Promise<StoredTimeCapsule[]> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['timeCapsules'], 'readonly');
      const store = transaction.objectStore('timeCapsules');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteTimeCapsule(id: string): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['timeCapsules'], 'readwrite');
      const store = transaction.objectStore('timeCapsules');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async deleteTimeCapsulesByAsset(assetId: string): Promise<void> {
    await this.ensureDB();
    const all = await this.getAllTimeCapsules();
    const toDelete = all.filter(tc => tc.assetId === assetId);
    
    return new Promise((resolve, reject) => {
      if (toDelete.length === 0) {
        resolve();
        return;
      }
      
      const transaction = this.db!.transaction(['timeCapsules'], 'readwrite');
      const store = transaction.objectStore('timeCapsules');
      let completed = 0;
      
      toDelete.forEach(tc => {
        const req = store.delete(tc.id);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => {
          completed++;
          if (completed === toDelete.length) {
            resolve();
          }
        };
      });
    });
  }
}

export default WebStorageService;