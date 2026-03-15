/**
 * Professional API Service - Full Backend Integration
 * Connects to NestJS backend on port 7001
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Config ───────────────────────────────────────────────────────────────────
// For development, use your machine's LAN IP. For production, use your deployed API URL.
// IMPORTANT: Ensure your backend PORT (7001) is open on your firewall.
const DEV_API_URL = 'http://192.168.1.11:7001'; // <--- Update this to match your laptop's IP
const PROD_API_URL = 'https://api.deadmanprotocol.com'; // <--- Update this for production

// @ts-ignore
const API_BASE_URL = typeof __DEV__ !== 'undefined' && __DEV__ ? DEV_API_URL : PROD_API_URL;
const API_TIMEOUT_MS = 10000;

const TOKEN_KEY = 'dwp_auth_token';
const USER_KEY  = 'dwp_user_profile';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ApiUser {
  id: string;
  walletAddress: string;
  email?: string;
  name?: string;
}

export interface ApiResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Fetch helper with timeout + auth ─────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  requireAuth = true,
): Promise<ApiResult<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (requireAuth) {
      const token = await AsyncStorage.getItem(TOKEN_KEY).catch(() => null);
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      let errMsg = `HTTP ${response.status}`;
      try { errMsg = JSON.parse(errText)?.message || errMsg; } catch {}
      return { success: false, error: errMsg };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err: any) {
    clearTimeout(timer);
    if (err?.name === 'AbortError') return { success: false, error: 'Request timed out. Is backend running?' };
    return { success: false, error: err?.message || 'Network error' };
  }
}

// ─── ApiService Singleton ─────────────────────────────────────────────────────
class ApiService {
  private static instance: ApiService;
  private _token: string | null = null;
  private _user: ApiUser | null = null;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) ApiService.instance = new ApiService();
    return ApiService.instance;
  }

  // ─── Auth ──────────────────────────────────────────────────────────────────

  /** Try to restore saved session from storage */
  async restoreSession(): Promise<ApiUser | null> {
    try {
      const [token, userJson] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      if (token && userJson) {
        this._token = token;
        this._user = JSON.parse(userJson);
        return this._user;
      }
    } catch {}
    return null;
  }

  /** Register a new wallet-based account */
  async register(walletAddress: string, email?: string, name?: string): Promise<ApiResult<ApiUser>> {
    const res = await apiFetch<{ token: string; user: ApiUser }>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify({ walletAddress, email, name }) },
      false,
    );
    if (res.success && res.data) await this._saveSession(res.data.token, res.data.user);
    return { success: res.success, data: res.data?.user, error: res.error };
  }

  /** Login with wallet address */
  async loginWithWallet(walletAddress: string): Promise<ApiResult<ApiUser>> {
    const res = await apiFetch<{ token: string; user: ApiUser }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ walletAddress }) },
      false,
    );
    if (res.success && res.data) await this._saveSession(res.data.token, res.data.user);
    return { success: res.success, data: res.data?.user, error: res.error };
  }

  /** Login with email + password */
  async loginWithEmail(email: string, password: string): Promise<ApiResult<ApiUser>> {
    const res = await apiFetch<{ token: string; user: ApiUser }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
      false,
    );
    if (res.success && res.data) await this._saveSession(res.data.token, res.data.user);
    return { success: res.success, data: res.data?.user, error: res.error };
  }

  /** Logout – clear all tokens */
  async logout(): Promise<void> {
    this._token = null;
    this._user = null;
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]).catch(() => {});
  }

  get currentUser(): ApiUser | null { return this._user; }
  get isAuthenticated(): boolean { return !!this._token; }

  // ─── Heartbeat ─────────────────────────────────────────────────────────────

  /** Send a heartbeat ping. Falls back gracefully if backend is unreachable. */
  async recordHeartbeat(method = 'app_login'): Promise<boolean> {
    const walletAddress = this._user?.walletAddress
      ?? await AsyncStorage.getItem('dwp_wallet_address').catch(() => null);

    if (!walletAddress) return false;

    const res = await apiFetch('/heartbeat/record', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, method }),
    });
    return res.success;
  }

  async getHeartbeatStatus(): Promise<ApiResult> {
    const walletAddress = this._user?.walletAddress ?? '';
    if (!walletAddress) return { success: false, error: 'Not logged in' };
    return apiFetch(`/heartbeat/status/${walletAddress}`);
  }

  // ─── Assets ────────────────────────────────────────────────────────────────

  async getAssets(): Promise<ApiResult> {
    return apiFetch('/assets');
  }

  async syncAssetMetadata(assetId: string, metadata: any): Promise<boolean> {
    const walletAddress = this._user?.walletAddress ?? '';
    const res = await apiFetch('/assets', {
      method: 'POST',
      body: JSON.stringify({ ...metadata, ownerWallet: walletAddress, assetId }),
    });
    return res.success;
  }

  async deleteAsset(assetId: string): Promise<boolean> {
    const res = await apiFetch(`/assets/${assetId}`, { method: 'DELETE' });
    return res.success;
  }

  // ─── Beneficiaries ─────────────────────────────────────────────────────────

  async getBeneficiaries(): Promise<ApiResult> {
    return apiFetch('/beneficiaries');
  }

  async addBeneficiary(data: any): Promise<ApiResult> {
    return apiFetch('/beneficiaries', { method: 'POST', body: JSON.stringify(data) });
  }

  async removeBeneficiary(beneficiaryId: string): Promise<boolean> {
    const res = await apiFetch(`/beneficiaries/${beneficiaryId}`, { method: 'DELETE' });
    return res.success;
  }

  // ─── Subscription ──────────────────────────────────────────────────────────

  async getSubscriptionStatus(): Promise<ApiResult> {
    const walletAddress = this._user?.walletAddress ?? '';
    if (!walletAddress) return { success: false, error: 'Not logged in' };
    return apiFetch(`/subscription/${walletAddress}`);
  }

  // ─── Health ────────────────────────────────────────────────────────────────

  async ping(): Promise<boolean> {
    const res = await apiFetch<any>('/health', {}, false);
    return res.success;
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  private async _saveSession(token: string, user: ApiUser): Promise<void> {
    this._token = token;
    this._user  = user;
    await AsyncStorage.setItem(TOKEN_KEY, token).catch(() => {});
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user)).catch(() => {});
  }
}

export default ApiService;
