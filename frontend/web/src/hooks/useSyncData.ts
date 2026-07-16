import { useAccount } from 'wagmi';
import { useEffect, useCallback, useRef } from 'react';
import WebStorageService from '@/lib/storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com';

export function useSyncData() {
  const { address: wagmiAddress, isConnected: isWagmiConnected, status } = useAccount();
  const isSyncingRef = useRef(false);

  // Fallback to localStorage if wagmi is not connected (e.g. custom key/email login)
  const isConnected = isWagmiConnected || (typeof window !== 'undefined' && localStorage.getItem('dwp_wallet_connected') === 'true');
  const address = wagmiAddress || (typeof window !== 'undefined' ? localStorage.getItem('dwp_wallet_address') : null);

  const fetchData = useCallback(async () => {
    if (!isConnected || !address) {
      return;
    }

    if (isSyncingRef.current) {
      return;
    }
    isSyncingRef.current = true;

    try {
      const normalizedAddress = address.toLowerCase();
      const lastSyncedAddress = typeof window !== 'undefined' ? localStorage.getItem('dwp_last_synced_address') : null;
      
      const storage = WebStorageService.getInstance();
      if (lastSyncedAddress && lastSyncedAddress !== normalizedAddress) {
        console.log('🔄 Wallet changed from', lastSyncedAddress, 'to', normalizedAddress, '. Clearing IndexedDB for fresh sync...');
        await storage.clearAllData();
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('dwp_last_synced_address', normalizedAddress);
      }

      const token = typeof window !== 'undefined' ? localStorage.getItem('dwp_token') : null;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Fetch from backend API
      const mode = typeof window !== 'undefined' ? localStorage.getItem('dwp_mode') || 'centralized' : 'centralized';

      const fetchFolders = mode === 'centralized'
        ? fetch(`${API_URL}/api/assets/folders`, { headers }).then(r => r.ok ? r.json() : [])
        : Promise.resolve([]);

      const fetchAssets = mode === 'centralized'
        ? fetch(`${API_URL}/api/assets`, { headers }).then(r => r.ok ? r.json() : [])
        : Promise.resolve([]);

      const [nomineesRes, assetsRes, heartbeatRes, userRes, foldersRes] = await Promise.all([
        fetch(`${API_URL}/api/beneficiaries?ownerAddress=${normalizedAddress}`, { headers }).then(r => r.ok ? r.json() : []),
        fetchAssets,
        fetch(`${API_URL}/api/heartbeat/status`, { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${API_URL}/api/users/profile`, { headers }).then(r => r.ok ? r.json() : null),
        fetchFolders
      ]);

      // Sync to local storage / IndexedDB
      let hasChanges = false;
      
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
            const targetBen = {
              id: b.id,
              name: b.name,
              email: b.email || '',
              walletAddress: b.walletAddress || '',
              createdAt: b.createdAt ? new Date(b.createdAt).getTime() : (local?.createdAt || Date.now()),
              enabled: b.enabled ?? true,
              isVerified: b.isVerified ?? false,
              verificationMethod: b.verificationMethod || 'email'
            };

            if (!local || 
                local.name !== targetBen.name || 
                (local.email || '') !== targetBen.email || 
                (local.walletAddress || '') !== targetBen.walletAddress || 
                (local.enabled ?? true) !== targetBen.enabled || 
                (local.isVerified ?? false) !== targetBen.isVerified || 
                (local.verificationMethod || 'email') !== targetBen.verificationMethod) {
              beneficiariesChanged = true;
              break;
            }
          }
        }

        if (beneficiariesChanged) {
          hasChanges = true;
          const backendBenIds = new Set(nomineesRes.map((b: any) => b.id));
          for (const b of nomineesRes) {
            const local = localBens.find(lb => lb.id === b.id);
            await storage.saveBeneficiary({
              id: b.id,
              name: b.name,
              email: b.email || '',
              walletAddress: b.walletAddress || '',
              createdAt: b.createdAt ? new Date(b.createdAt).getTime() : (local?.createdAt || Date.now()),
              enabled: b.enabled ?? true,
              isVerified: b.isVerified ?? false,
              verificationMethod: b.verificationMethod || 'email'
            }, true); // Save silently
          }
          for (const lb of localBens) {
            if (!backendBenIds.has(lb.id)) {
              await storage.deleteBeneficiary(lb.id, true); // Delete silently
            }
          }

          if (nomineesRes.length > 0 && typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('storage-beneficiary-saved', { detail: nomineesRes[0] }));
          }
        }
      }

      // 1.5. Sync Folders (Only in Centralized Mode)
      if (mode === 'centralized' && Array.isArray(foldersRes)) {
        const localFolders = await storage.getAllFolders();
        let foldersChanged = false;

        if (foldersRes.length !== localFolders.length) {
          foldersChanged = true;
        } else {
          const localFolderMap = new Map(localFolders.map(f => [f.id, f]));
          for (const bf of foldersRes) {
            const local = localFolderMap.get(bf.id);
            const targetFolder = {
              id: bf.id,
              name: bf.name,
              parentId: bf.parentId || null,
              type: bf.type || WebStorageService.getFolderType(bf.name),
              beneficiaries: bf.beneficiaries || [],
              createdAt: bf.createdAt ? new Date(bf.createdAt).getTime() : (local?.createdAt || Date.now()),
              updatedAt: bf.updatedAt ? new Date(bf.updatedAt).getTime() : (local?.updatedAt || Date.now()),
              color: bf.color || 'blue',
              icon: bf.icon || 'folder'
            };

            if (!local ||
                local.name !== targetFolder.name ||
                (local.parentId || null) !== (targetFolder.parentId || null) ||
                local.type !== targetFolder.type) {
              foldersChanged = true;
              break;
            }
          }
        }

        if (foldersChanged) {
          hasChanges = true;
          const localFolderMap = new Map(localFolders.map(f => [f.id, f]));
          const backendFolderIds = new Set(foldersRes.map((f: any) => f.id));

          for (const bf of foldersRes) {
            const local = localFolderMap.get(bf.id);
            await storage.saveFolder({
              id: bf.id,
              name: bf.name,
              parentId: bf.parentId || null,
              type: bf.type || WebStorageService.getFolderType(bf.name),
              beneficiaries: bf.beneficiaries || [],
              createdAt: bf.createdAt ? new Date(bf.createdAt).getTime() : (local?.createdAt || Date.now()),
              updatedAt: bf.updatedAt ? new Date(bf.updatedAt).getTime() : (local?.updatedAt || Date.now()),
              color: bf.color || 'blue',
              icon: bf.icon || 'folder'
            });
          }

          for (const lf of localFolders) {
            if (!backendFolderIds.has(lf.id)) {
              await storage.deleteFolder(lf.id);
            }
          }

          if (foldersRes.length > 0 && typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('storage-folder-saved', { detail: foldersRes[0] }));
          }
        }
      }

      // 2. Sync Assets (Only in Centralized Mode)
      if (mode === 'centralized' && Array.isArray(assetsRes)) {
        const localAssets = await storage.getAllAssets();
        let assetsChanged = false;
        const backendFolderIds = new Set(Array.isArray(foldersRes) ? foldersRes.map((f: any) => f.id) : []);

        // Filter out decentralized assets from comparison and cleanup
        const localCentralizedAssets = localAssets.filter(la => {
          const isDecentralized = la.metadata?.mode === 'decentralized' || 
                                  (la.ipfsHash && (la.ipfsHash.startsWith('Qm') || la.ipfsHash.startsWith('bafy') || la.ipfsHash.includes('_local_')));
          return !isDecentralized;
        });

        if (assetsRes.length !== localCentralizedAssets.length) {
          assetsChanged = true;
        } else {
          const localAssetMap = new Map(localCentralizedAssets.map(a => [a.id, a]));
          for (const b of assetsRes) {
            const local = localAssetMap.get(b.id);
            const targetFolderId = b.folderId && backendFolderIds.has(b.folderId) ? b.folderId : null;
            const targetAsset = {
              id: b.id,
              name: b.name,
              type: local?.type || b.metadata?.type || b.type || (b.mimeType?.startsWith('image/') ? 'photo' : 'document'),
              folderId: targetFolderId,
              encryptedData: local?.encryptedData || b.encryptedData || '',
              keyId: local?.keyId || b.keyId || b.encryptionKeyId || '',
              iv: local?.iv || b.iv || b.fileIv || '',
              ipfsHash: b.ipfsHash || b.cid || local?.ipfsHash || '',
              beneficiaries: b.beneficiaries || local?.beneficiaries || [],
              assignedBeneficiaryId: b.assignedBeneficiaryId || local?.assignedBeneficiaryId || null,
              createdAt: b.createdAt ? new Date(b.createdAt).getTime() : (local?.createdAt || Date.now()),
              size: b.size || local?.size || 0,
              mimeType: b.mimeType || local?.mimeType || ''
            };

            if (!local || 
                local.name !== targetAsset.name || 
                local.type !== targetAsset.type || 
                (local.folderId || null) !== (targetAsset.folderId || null) || 
                (local.encryptedData || '') !== (targetAsset.encryptedData || '') || 
                local.keyId !== targetAsset.keyId || 
                local.iv !== targetAsset.iv || 
                local.ipfsHash !== targetAsset.ipfsHash || 
                JSON.stringify(local.beneficiaries || []) !== JSON.stringify(targetAsset.beneficiaries || []) || 
                (local.assignedBeneficiaryId || null) !== (targetAsset.assignedBeneficiaryId || null) || 
                (local.size || 0) !== (targetAsset.size || 0) || 
                (local.mimeType || '') !== (targetAsset.mimeType || '')) {
              assetsChanged = true;
              break;
            }
          }
        }

        if (assetsChanged) {
          hasChanges = true;
          const localAssetMap = new Map(localAssets.map(a => [a.id, a]));
          const backendAssetIds = new Set(assetsRes.map((a: any) => a.id));

          for (const b of assetsRes) {
            const local = localAssetMap.get(b.id);
            const targetFolderId = b.folderId && backendFolderIds.has(b.folderId) ? b.folderId : null;
            await storage.saveAsset({
              id: b.id,
              name: b.name,
              type: local?.type || b.metadata?.type || b.type || (b.mimeType?.startsWith('image/') ? 'photo' : 'document'),
              folderId: targetFolderId,
              encryptedData: local?.encryptedData || b.encryptedData || '',
              keyId: local?.keyId || b.keyId || b.encryptionKeyId || '',
              iv: local?.iv || b.iv || b.fileIv || '',
              ipfsHash: b.ipfsHash || b.cid || local?.ipfsHash || '',
              beneficiaries: b.beneficiaries || local?.beneficiaries || [],
              assignedBeneficiaryId: b.assignedBeneficiaryId || local?.assignedBeneficiaryId || null,
              createdAt: b.createdAt ? new Date(b.createdAt).getTime() : (local?.createdAt || Date.now()),
              size: b.size || local?.size || 0,
              mimeType: b.mimeType || local?.mimeType || '',
              metadata: {
                ...(local?.metadata || {}),
                ...(b.metadata || {}),
                mode: 'centralized'
              }
            }, true); // Save silently
          }
          
          for (const la of localAssets) {
            const isDecentralized = la.metadata?.mode === 'decentralized' || 
                                    (la.ipfsHash && (la.ipfsHash.startsWith('Qm') || la.ipfsHash.startsWith('bafy') || la.ipfsHash.includes('_local_')));
            if (!backendAssetIds.has(la.id) && !isDecentralized) {
              await storage.deleteAsset(la.id, true); // Delete silently
            }
          }

          if (assetsRes.length > 0 && typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('storage-asset-saved', { detail: assetsRes[0] }));
          }
        }
      }

      // 3. Sync Heartbeat Status
      if (heartbeatRes && heartbeatRes.lastHeartbeat) {
        const ts = new Date(heartbeatRes.lastHeartbeat).getTime();
        const localHeartbeats = await storage.getAllHeartbeats();
        const maxLocal = localHeartbeats.length > 0 ? Math.max(...localHeartbeats.map((h: any) => h.timestamp)) : 0;
        if (ts > maxLocal) {
          hasChanges = true;
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
          hasChanges = true;
          storage.saveSettings(nextSettings);
        }
      }

      // Dispatch custom event to refresh app state provider ONLY if something actually changed
      if (hasChanges && typeof window !== 'undefined') {
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
    } catch (error: any) {
      console.error('Sync error:', error);
    } finally {
      isSyncingRef.current = false;
    }
  }, [address, isConnected]);

  // Fetch on wallet connect or local storage authentication
  useEffect(() => {
    if (status === 'connected' || isConnected) {
      fetchData();
    }
  }, [status, isConnected, fetchData]);

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

  return { refetch: fetchData };
}
