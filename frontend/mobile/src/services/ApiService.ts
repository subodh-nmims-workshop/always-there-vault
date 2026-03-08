/**
 * Professional API Service for Mobile App
 * Handles communication with the NestJS Backend
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:7001'; // Use local IP or development URL in real device

class ApiService {
    private static instance: ApiService;

    private constructor() { }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    /**
     * Get the current wallet address for identification
     */
    private async getWalletAddress(): Promise<string | null> {
        return await AsyncStorage.getItem('dwp_wallet_address');
    }

    /**
     * Record a heartbeat ping to the backend
     */
    async recordHeartbeat(method: string = 'Mobile App Ping'): Promise<boolean> {
        const walletAddress = await this.getWalletAddress();
        if (!walletAddress) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/heartbeat/record`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress,
                    method
                })
            });
            return response.status === 201;
        } catch (error) {
            console.error('Failed to record heartbeat on backend:', error);
            return false;
        }
    }

    /**
     * Sync asset metadata to the backend
     */
    async syncAssetMetadata(assetId: string, metadata: any): Promise<boolean> {
        const walletAddress = await this.getWalletAddress();
        if (!walletAddress) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/assets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...metadata,
                    ownerWallet: walletAddress,
                    assetId
                })
            });
            return response.status === 201;
        } catch (error) {
            console.error('Failed to sync asset metadata:', error);
            return false;
        }
    }

    /**
     * Fetch subscription status from the backend
     */
    async getSubscriptionStatus(): Promise<any> {
        const walletAddress = await this.getWalletAddress();
        if (!walletAddress) return null;

        try {
            const response = await fetch(`${API_BASE_URL}/subscription/${walletAddress}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch subscription status:', error);
            return null;
        }
    }

    /**
     * Fetch heartbeat status
     */
    async getHeartbeatStatus(): Promise<any> {
        const walletAddress = await this.getWalletAddress();
        if (!walletAddress) return null;

        try {
            const response = await fetch(`${API_BASE_URL}/heartbeat/status/${walletAddress}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch heartbeat status:', error);
            return null;
        }
    }
}

export default ApiService;
