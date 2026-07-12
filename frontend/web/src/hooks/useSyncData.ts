import { useAccount } from 'wagmi';
import { useEffect, useState, useCallback, useRef } from 'react';
import WebStorageService from '@/lib/storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com';

export function useSyncData() {
  const { address, isConnected, status } = useAccount();
  const isSyncingRef = useRef(false);
  const [data, setData] = useState<any>({
    nominees: [],
    assets: [],
    heartbeat: null,
    user: null,
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    if (!isConnected || !address) {
      setData((prev: any) => ({ ...prev, isLoading: false, nominees: [], assets: [] }));
      return;
    }

    if (isSyncingRef.current) {
      return;
    }
    isSyncingRef.current = true;

    try {
      const normalizedAddress = address.toLowerCase();
      const token = typeof window !== 'undefined' ? localStorage.getItem('dwp_token') : null;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Fetch from backend API
      const [nomineesRes, assetsRes, heartbeatRes, userRes] = await Promise.all([
        fetch(`${API_URL}/api/beneficiaries?ownerAddress=${normalizedAddress}`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${API_URL}/api/assets`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${API_URL}/api/heartbeat/status`, { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${API_URL}/api/users/profile`, { headers }).then(r => r.ok ? r.json() : null)
      ]);

      // Sync to local storage / IndexedDB
      const storage = WebStorageService.getInstance();
      
      // 1. Sync Beneficiaries
      if (Array.isArray(nomineesRes)) {
        const localBens = await storage.getAllBeneficiaries();
        let beneficiariesChanged = false;

        if (nomineesRes.length !== localBens.length) {
          beneficiariesChanged = true;
        } else {
          const localBenMap = new Map(localBens.map(b => [b.id, b]));
          for (const b of nomineesRes) {
            const local = localBenMap.get(b.id);
            if (!local || 
                local.name !== b.name || 
                (local.email || '') !== (b.email || '') || 
                (local.walletAddress || '') !== (b.walletAddress || '') || 
                (local.enabled ?? true) !== (b.enabled ?? true) || 
                (local.isVerified ?? false) !== (b.isVerified ?? false) || 
                (local.verificationMethod || 'email') !== (b.verificationMethod || 'email')) {
              beneficiariesChanged = true;
              break;
            }
          }
        }

        if (beneficiariesChanged) {
          const backendBenIds = new Set(nomineesRes.map((b: any) => b.id));
          for (const b of nomineesRes) {
            await storage.saveBeneficiary({
              id: b.id,
              name: b.name,
              email: b.email || '',
              walletAddress: b.walletAddress || '',
              createdAt: b.createdAt ? new Date(b.createdAt).getTime() : Date.now(),
              enabled: b.enabled ?? true,
              isVerified: b.isVerified ?? false,
              verificationMethod: b.verificationMethod || 'email'
            });
          }
          for (const lb of localBens) {
            if (!backendBenIds.has(lb.id)) {
              await storage.deleteBeneficiary(lb.id);
            }
          }
        }
      }

      // 2. Sync Assets
      if (Array.isArray(assetsRes)) {
        const localAssets = await storage.getAllAssets();
        let assetsChanged = false;

        if (assetsRes.length !== localAssets.length) {
          assetsChanged = true;
        } else {
          const localAssetMap = new Map(localAssets.map(a => [a.id, a]));
          for (const b of assetsRes) {
            const local = localAssetMap.get(b.id);
            const computedType = local?.type || b.metadata?.type || b.type || (b.mimeType?.startsWith('image/') ? 'photo' : 'document');
            const computedKeyId = local?.keyId || b.keyId || b.encryptionKeyId || '';
            const computedIv = local?.iv || b.iv || b.fileIv || '';
            const computedIpfsHash = b.ipfsHash || b.cid || local?.ipfsHash || '';

            if (!local || 
                local.name !== b.name || 
                local.type !== computedType || 
                (local.folderId || null) !== (b.folderId || null) || 
                (local.encryptedData || '') !== (b.encryptedData || '') || 
                local.keyId !== computedKeyId || 
                local.iv !== computedIv || 
                local.ipfsHash !== computedIpfsHash || 
                JSON.stringify(local.beneficiaries || []) !== JSON.stringify(b.beneficiaries || []) || 
                (local.assignedBeneficiaryId || null) !== (b.assignedBeneficiaryId || null) || 
                (local.size || 0) !== (b.size || 0) || 
                (local.mimeType || '') !== (b.mimeType || '')) {
              assetsChanged = true;
              break;
            }
          }
        }

        if (assetsChanged) {
          const localAssetMap = new Map(localAssets.map(a => [a.id, a]));
          const backendAssetIds = new Set(assetsRes.map((a: any) => a.id));

          for (const b of assetsRes) {
            const local = localAssetMap.get(b.id);
            await storage.saveAsset({
              id: b.id,
              name: b.name,
              type: local?.type || b.metadata?.type || b.type || (b.mimeType?.startsWith('image/') ? 'photo' : 'document'),
              folderId: b.folderId || null,
              encryptedData: local?.encryptedData || b.encryptedData || '',
              keyId: local?.keyId || b.keyId || b.encryptionKeyId || '',
              iv: local?.iv || b.iv || b.fileIv || '',
              ipfsHash: b.ipfsHash || b.cid || local?.ipfsHash || '',
              beneficiaries: b.beneficiaries || local?.beneficiaries || [],
              assignedBeneficiaryId: b.assignedBeneficiaryId || local?.assignedBeneficiaryId || null,
              createdAt: b.createdAt ? new Date(b.createdAt).getTime() : (local?.createdAt || Date.now()),
              size: b.size || local?.size || 0,
              mimeType: b.mimeType || local?.mimeType || ''
            });
          }
          
          for (const la of localAssets) {
            if (!backendAssetIds.has(la.id)) {
              await storage.deleteAsset(la.id);
            }
          }
        }
      }

      // 3. Sync Heartbeat Status
      if (heartbeatRes && heartbeatRes.lastHeartbeat) {
        const ts = new Date(heartbeatRes.lastHeartbeat).getTime();
        const localHeartbeats = await storage.getAllHeartbeats();
        const maxLocal = localHeartbeats.length > 0 ? Math.max(...localHeartbeats.map((h: any) => h.timestamp)) : 0;
        if (ts > maxLocal) {
          await storage.saveHeartbeat({
            id: `backend_sync_${ts}`,
            timestamp: ts,
            method: heartbeatRes.method || 'sync',
            verified: true
          });
        }
      }

      // 4. Sync User / Heartbeat Settings
      if (userRes || heartbeatRes) {
        const currentSettings = storage.getSettings();
        const nextSettings = {
          ...currentSettings,
          heartbeatInterval: heartbeatRes?.interval || userRes?.heartbeatInterval || currentSettings.heartbeatInterval,
          gracePeriod: heartbeatRes?.gracePeriod || userRes?.gracePeriod || currentSettings.gracePeriod,
          bufferMisses: heartbeatRes?.bufferMisses || userRes?.bufferMisses || currentSettings.bufferMisses,
          emailNotification: userRes?.email || userRes?.pendingEmail || currentSettings.emailNotification
        };
        if (JSON.stringify(currentSettings) !== JSON.stringify(nextSettings)) {
          storage.saveSettings(nextSettings);
        }
      }

      // Dispatch custom event to refresh app state provider
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('dwp-state-synced'));
      }

      // Push to GTM dataLayer for analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'user_data_synced',
          wallet_address: normalizedAddress,
          nominees_count: nomineesRes?.length || 0,
          assets_count: assetsRes?.length || 0
        });
      }

      setData({
        nominees: nomineesRes || [],
        assets: assetsRes || [],
        heartbeat: heartbeatRes || null,
        user: userRes || null,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      console.error('Sync error:', error);
      setData((prev: any) => ({ ...prev, isLoading: false, error: error.message }));
    } finally {
      isSyncingRef.current = false;
    }
  }, [address, isConnected]);

  // Fetch on wallet connect
  useEffect(() => {
    if (status === 'connected') {
      fetchData();
    }
  }, [status, address, fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, [isConnected, fetchData]);

  // Refetch on tab focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchData]);

  const refetch = fetchData;

  return { ...data, refetch };
}
