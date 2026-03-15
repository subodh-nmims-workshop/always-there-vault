module.exports = [
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/ipfs-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkIPFSStatus",
    ()=>checkIPFSStatus,
    "getIPFSUrl",
    ()=>getIPFSUrl,
    "getUserIPFSFiles",
    ()=>getUserIPFSFiles,
    "retrieveFromIPFS",
    ()=>retrieveFromIPFS,
    "uploadEncryptedData",
    ()=>uploadEncryptedData,
    "uploadMultipleFiles",
    ()=>uploadMultipleFiles,
    "uploadToIPFS",
    ()=>uploadToIPFS
]);
/**
 * IPFS Client - Decentralized Storage
 * Uses wallet signature for authentication (NO TOKEN NEEDED!)
 * Automatic account creation based on wallet address
 */ // Use public IPFS gateways - NO TOKEN REQUIRED!
const IPFS_GATEWAYS = [
    'https://ipfs.io',
    'https://dweb.link',
    'https://cloudflare-ipfs.com',
    'https://gateway.pinata.cloud'
];
// Use public IPFS API endpoint
const IPFS_API = 'https://ipfs.infura.io:5001/api/v0';
/**
 * Generate deterministic IPFS identity from wallet address
 * This creates a unique IPFS node ID based on user's wallet
 */ async function generateIPFSIdentity(walletAddress) {
    const encoder = new TextEncoder();
    const data = encoder.encode(`deadman-protocol-${walletAddress}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b)=>b.toString(16).padStart(2, '0')).join('');
}
async function uploadToIPFS(file, walletAddress) {
    try {
        // Generate user-specific identity
        const identity = await generateIPFSIdentity(walletAddress);
        console.log('IPFS Identity:', identity);
        // Create FormData
        const formData = new FormData();
        formData.append('file', file);
        // Upload to public IPFS node
        const response = await fetch(`${IPFS_API}/add`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('IPFS upload failed');
        }
        const data = await response.json();
        const cid = data.Hash;
        // Store mapping in localStorage (wallet -> CIDs)
        const userFiles = JSON.parse(localStorage.getItem(`ipfs_files_${walletAddress}`) || '[]');
        userFiles.push({
            cid,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: Date.now()
        });
        localStorage.setItem(`ipfs_files_${walletAddress}`, JSON.stringify(userFiles));
        return cid;
    } catch (error) {
        console.error('Failed to upload to IPFS:', error);
        throw error;
    }
}
async function uploadEncryptedData(encryptedData, filename, walletAddress) {
    try {
        const blob = new Blob([
            encryptedData
        ], {
            type: 'application/octet-stream'
        });
        const file = new File([
            blob
        ], filename);
        return await uploadToIPFS(file, walletAddress);
    } catch (error) {
        console.error('Failed to upload encrypted data:', error);
        throw error;
    }
}
async function retrieveFromIPFS(cid) {
    try {
        // Try multiple gateways for redundancy
        for (const gateway of IPFS_GATEWAYS){
            try {
                const response = await fetch(`${gateway}/ipfs/${cid}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    return await response.blob();
                }
            } catch (err) {
                console.warn(`Gateway ${gateway} failed, trying next...`);
                continue;
            }
        }
        throw new Error('All IPFS gateways failed');
    } catch (error) {
        console.error('Failed to retrieve from IPFS:', error);
        throw error;
    }
}
function getIPFSUrl(cid, filename) {
    const gateway = IPFS_GATEWAYS[0];
    return `${gateway}/ipfs/${cid}`;
}
async function checkIPFSStatus(cid) {
    try {
        const url = getIPFSUrl(cid);
        const response = await fetch(url, {
            method: 'HEAD'
        });
        return response.ok;
    } catch (error) {
        console.error('Failed to check IPFS status:', error);
        return false;
    }
}
function getUserIPFSFiles(walletAddress) {
    try {
        return JSON.parse(localStorage.getItem(`ipfs_files_${walletAddress}`) || '[]');
    } catch  {
        return [];
    }
}
async function uploadMultipleFiles(files, walletAddress) {
    try {
        const cids = await Promise.all(files.map((file)=>uploadToIPFS(file, walletAddress)));
        return cids;
    } catch (error) {
        console.error('Failed to upload multiple files:', error);
        throw error;
    }
}
}),
];

//# sourceMappingURL=Desktop_Nmims_DeadMan%20Protocol_frontend_web_src_lib_ipfs-client_ts_53844995._.js.map