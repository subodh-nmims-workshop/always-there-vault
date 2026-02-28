/**
 * Client-side Storage Service for Web App
 * Handles localStorage, IndexedDB, and encrypted data persistence
 */

import WebCryptoService, { EncryptionResult, KeyDistribution } from './crypto';

export interface StoredAsset {
  id: string;
  name: string;
  type: string;
  encryptedData: string;
  keyId: string;
  iv: string;
  ipfsHash?: string;
  beneficiaries: string[];
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
}

export interface StoredHeartbeat {
  id: string;
  timestamp: number;
  method: string;
  signature?: string;
  verified: boolean;
}

export interface AppState {
  assets: StoredAsset[];
  beneficiaries: StoredBeneficiary[];
  heartbeats: StoredHeartbeat[];
  keyDistributions: KeyDistribution[];
  settings: {
    heartbeatInterval: number;
    gracePeriod: number;
    encryptionEnabled: boolean;
    notificationsEnabled: boolean;
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
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  private constructor() {
    this.crypto = WebCryptoService.getInstance();
    this.initIndexedDB();
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
      };
    });
  }

  /**
   * Get current app state
   */
  async getAppState(): Promise<AppState> {
    const [assets, beneficiaries, heartbeats, keyDistributions] = await Promise.all([
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
  async saveAsset(asset: StoredAsset): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['assets'], 'readwrite');
      const store = transaction.objectStore('assets');
      const request = store.put(asset);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
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

  async deleteAsset(id: string): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['assets'], 'readwrite');
      const store = transaction.objectStore('assets');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  /**
   * Beneficiary Management
   */
  async saveBeneficiary(beneficiary: StoredBeneficiary): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['beneficiaries'], 'readwrite');
      const store = transaction.objectStore('beneficiaries');
      const request = store.put(beneficiary);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
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

  async deleteBeneficiary(id: string): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['beneficiaries'], 'readwrite');
      const store = transaction.objectStore('beneficiaries');
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
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
      const request = store.put(heartbeat);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
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
    const defaultSettings = {
      heartbeatInterval: 30,
      gracePeriod: 14,
      encryptionEnabled: true,
      notificationsEnabled: true
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
    if (!this.db) {
      await this.initIndexedDB();
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
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clear all data (for testing/reset)
   */
  async clearAllData(): Promise<void> {
    await this.ensureDB();

    const stores = ['assets', 'beneficiaries', 'heartbeats', 'keyDistributions'];

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
}

export default WebStorageService;