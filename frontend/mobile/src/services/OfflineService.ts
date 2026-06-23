import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface QueuedAction {
  id: string;
  type: 'create' | 'update' | 'delete';
  resource: 'asset' | 'beneficiary' | 'heartbeat';
  data: any;
  timestamp: number;
}

class OfflineService {
  private static instance: OfflineService;
  private isOnline: boolean = true;
  private queue: QueuedAction[] = [];
  private readonly QUEUE_KEY = 'offline_queue';

  private constructor() {
    this.initializeNetworkListener();
    this.loadQueue();
  }

  public static getInstance(): OfflineService {
    if (!OfflineService.instance) {
      OfflineService.instance = new OfflineService();
    }
    return OfflineService.instance;
  }

  private initializeNetworkListener() {
    NetInfo.addEventListener((state) => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected || false;

      if (wasOffline && this.isOnline) {
        console.log('📡 Back online! Processing queued actions...');
        this.processQueue();
      }
    });
  }

  private async loadQueue() {
    try {
      const stored = await AsyncStorage.getItem(this.QUEUE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
        console.log(`📦 Loaded ${this.queue.length} queued actions`);
      }
    } catch (error) {
      console.error('Failed to load queue:', error);
    }
  }

  private async saveQueue() {
    try {
      await AsyncStorage.setItem(this.QUEUE_KEY, JSON.stringify(this.queue));
    } catch (error) {
      console.error('Failed to save queue:', error);
    }
  }

  async queueAction(action: Omit<QueuedAction, 'id' | 'timestamp'>) {
    const queuedAction: QueuedAction = {
      ...action,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    this.queue.push(queuedAction);
    await this.saveQueue();

    console.log(`📥 Queued ${action.type} action for ${action.resource}`);

    if (this.isOnline) {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      return;
    }

    console.log(`🔄 Processing ${this.queue.length} queued actions...`);

    const processed: string[] = [];

    for (const action of this.queue) {
      try {
        await this.executeAction(action);
        processed.push(action.id);
        console.log(`✅ Processed action: ${action.type} ${action.resource}`);
      } catch (error) {
        console.error(`❌ Failed to process action ${action.id}:`, error);
        // Keep in queue for retry
      }
    }

    // Remove processed actions
    this.queue = this.queue.filter((action) => !processed.includes(action.id));
    await this.saveQueue();

    console.log(`✨ Queue processed. ${this.queue.length} actions remaining.`);
  }

  private async executeAction(action: QueuedAction): Promise<void> {
    const API_URL = 'https://always-there-protocol-api.onrender.com'; // Replace with 'http://localhost:7001' for local testing

    const endpoint = this.getEndpoint(action);
    const method = this.getMethod(action.type);

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  private getEndpoint(action: QueuedAction): string {
    switch (action.resource) {
      case 'asset':
        return action.type === 'delete'
          ? `/assets/${action.data.id}`
          : '/assets';
      case 'beneficiary':
        return action.type === 'delete'
          ? `/beneficiaries/${action.data.id}`
          : '/beneficiaries';
      case 'heartbeat':
        return '/heartbeat';
      default:
        throw new Error(`Unknown resource: ${action.resource}`);
    }
  }

  private getMethod(type: QueuedAction['type']): string {
    switch (type) {
      case 'create':
        return 'POST';
      case 'update':
        return 'PUT';
      case 'delete':
        return 'DELETE';
      default:
        return 'POST';
    }
  }

  getQueueStatus(): { count: number; isOnline: boolean } {
    return {
      count: this.queue.length,
      isOnline: this.isOnline,
    };
  }

  async clearQueue() {
    this.queue = [];
    await this.saveQueue();
  }
}

export default OfflineService;
