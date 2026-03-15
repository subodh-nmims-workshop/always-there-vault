(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/cn.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/blockchain.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addBeneficiary",
    ()=>addBeneficiary,
    "configureHeartbeat",
    ()=>configureHeartbeat,
    "connectWallet",
    ()=>connectWallet,
    "getHeartbeatStatus",
    ()=>getHeartbeatStatus,
    "getProvider",
    ()=>getProvider,
    "getReadOnlyProvider",
    ()=>getReadOnlyProvider,
    "isWillTriggered",
    ()=>isWillTriggered,
    "listenToHeartbeatEvents",
    ()=>listenToHeartbeatEvents,
    "registerTokenAsset",
    ()=>registerTokenAsset,
    "registerWill",
    ()=>registerWill,
    "storeEncryptedPayload",
    ()=>storeEncryptedPayload,
    "submitHeartbeat",
    ()=>submitHeartbeat
]);
/**
 * Blockchain Integration - Direct Smart Contract Interaction
 * NO BACKEND NEEDED!
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/config/contracts.ts [app-client] (ecmascript)");
;
;
// Contract ABIs (simplified - add full ABI from compiled contracts)
const HEARTBEAT_ABI = [
    'function submitHeartbeat() external',
    'function configureHeartbeat(uint256 _interval, uint256 _gracePeriod) external',
    'function getUserHeartbeat(address user) external view returns (uint256 lastHeartbeat, uint256 heartbeatInterval, uint256 gracePeriod, bool isActive)',
    'function isInGracePeriod(address user) external view returns (bool)',
    'function isInactive(address user) external view returns (bool)',
    'event HeartbeatSubmitted(address indexed user, uint256 timestamp)'
];
const DIGITAL_WILL_ABI = [
    'function registerWill(uint256 _interval) external',
    'function ping() external',
    'function setNominee(address _nominee, bool _status) external',
    'function setOnChainPayload(string calldata _payload) external',
    'function checkAndTrigger(address _owner) external',
    'function isTriggered(address _owner) external view returns (bool)',
    'function claimPayload(address _owner) external returns (string memory)',
    'function registerTokenAsset(address _token,uint8 _tokenType,uint256 _amountOrId,address _beneficiary) external',
    'function executeTokenAssets(address _owner) external',
    'event HeartbeatLogged(address indexed owner, uint256 timestamp)',
    'event DeadmanTriggered(address indexed owner, uint256 timestamp)',
    'event TokenAssetRegistered(address indexed owner,address indexed token,address indexed beneficiary,uint8 tokenType,uint256 amountOrId,uint256 timestamp)',
    'event TokenAssetExecuted(address indexed owner,address indexed token,address indexed beneficiary,uint8 tokenType,uint256 amountOrId,uint256 timestamp)'
];
async function getProvider() {
    if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.ethereum) {
        throw new Error('No Web3 wallet found. Please install MetaMask.');
    }
    const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
    return provider;
}
function getReadOnlyProvider() {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(config.RPC_URL);
}
async function submitHeartbeat() {
    try {
        const provider = await getProvider();
        const signer = await provider.getSigner();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.HEARTBEAT_TRACKER, HEARTBEAT_ABI, signer);
        const tx = await contract.submitHeartbeat();
        const receipt = await tx.wait();
        return {
            success: true,
            txHash: receipt.hash,
            blockNumber: receipt.blockNumber
        };
    } catch (error) {
        console.error('Failed to submit heartbeat:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function configureHeartbeat(intervalDays, gracePeriodDays) {
    try {
        const provider = await getProvider();
        const signer = await provider.getSigner();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.HEARTBEAT_TRACKER, HEARTBEAT_ABI, signer);
        // Convert days to seconds
        const intervalSeconds = intervalDays * 24 * 60 * 60;
        const gracePeriodSeconds = gracePeriodDays * 24 * 60 * 60;
        const tx = await contract.configureHeartbeat(intervalSeconds, gracePeriodSeconds);
        const receipt = await tx.wait();
        return {
            success: true,
            txHash: receipt.hash
        };
    } catch (error) {
        console.error('Failed to configure heartbeat:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function getHeartbeatStatus(address) {
    try {
        const provider = getReadOnlyProvider();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.HEARTBEAT_TRACKER, HEARTBEAT_ABI, provider);
        const heartbeat = await contract.getUserHeartbeat(address);
        const isInGrace = await contract.isInGracePeriod(address);
        const isInactive = await contract.isInactive(address);
        return {
            success: true,
            lastHeartbeat: Number(heartbeat.lastHeartbeat) * 1000,
            interval: Number(heartbeat.heartbeatInterval),
            gracePeriod: Number(heartbeat.gracePeriod),
            isActive: heartbeat.isActive,
            isInGracePeriod: isInGrace,
            isInactive: isInactive
        };
    } catch (error) {
        console.error('Failed to get heartbeat status:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function registerWill(intervalDays) {
    try {
        const provider = await getProvider();
        const signer = await provider.getSigner();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.DIGITAL_WILL, DIGITAL_WILL_ABI, signer);
        const intervalSeconds = intervalDays * 24 * 60 * 60;
        const tx = await contract.registerWill(intervalSeconds);
        const receipt = await tx.wait();
        return {
            success: true,
            txHash: receipt.hash
        };
    } catch (error) {
        console.error('Failed to register will:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function addBeneficiary(beneficiaryAddress) {
    try {
        const provider = await getProvider();
        const signer = await provider.getSigner();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.DIGITAL_WILL, DIGITAL_WILL_ABI, signer);
        const tx = await contract.setNominee(beneficiaryAddress, true);
        const receipt = await tx.wait();
        return {
            success: true,
            txHash: receipt.hash
        };
    } catch (error) {
        console.error('Failed to add beneficiary:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function registerTokenAsset(tokenAddress, tokenType, amountOrId, beneficiaryAddress) {
    try {
        const provider = await getProvider();
        const signer = await provider.getSigner();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.DIGITAL_WILL, DIGITAL_WILL_ABI, signer);
        const tokenTypeCode = tokenType === 'erc20' ? 0 : 1;
        const parsedAmountOrId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].toBigInt(amountOrId);
        const tx = await contract.registerTokenAsset(tokenAddress, tokenTypeCode, parsedAmountOrId, beneficiaryAddress);
        const receipt = await tx.wait();
        return {
            success: true,
            txHash: receipt.hash
        };
    } catch (error) {
        console.error('Failed to register token asset:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function storeEncryptedPayload(ipfsCID) {
    try {
        const provider = await getProvider();
        const signer = await provider.getSigner();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.DIGITAL_WILL, DIGITAL_WILL_ABI, signer);
        const tx = await contract.setOnChainPayload(ipfsCID);
        const receipt = await tx.wait();
        return {
            success: true,
            txHash: receipt.hash
        };
    } catch (error) {
        console.error('Failed to store payload:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function isWillTriggered(address) {
    try {
        const provider = getReadOnlyProvider();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.DIGITAL_WILL, DIGITAL_WILL_ABI, provider);
        const triggered = await contract.isTriggered(address);
        return {
            success: true,
            isTriggered: triggered
        };
    } catch (error) {
        console.error('Failed to check trigger status:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function connectWallet() {
    try {
        if (!window.ethereum) {
            throw new Error('Please install MetaMask');
        }
        const provider = await getProvider();
        const accounts = await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        // Check if on correct network
        const network = await provider.getNetwork();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
        if (Number(network.chainId) !== config.CHAIN_ID) {
            // Switch network
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        chainId: `0x${config.CHAIN_ID.toString(16)}`
                    }
                ]
            });
        }
        return {
            success: true,
            address,
            chainId: Number(network.chainId)
        };
    } catch (error) {
        console.error('Failed to connect wallet:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
function listenToHeartbeatEvents(callback) {
    const provider = getReadOnlyProvider();
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$config$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContractConfig"])();
    const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(config.HEARTBEAT_TRACKER, HEARTBEAT_ABI, provider);
    contract.on('HeartbeatSubmitted', (user, timestamp, event)=>{
        callback({
            user,
            timestamp: Number(timestamp) * 1000,
            txHash: event.log.transactionHash
        });
    });
    // Return cleanup function
    return ()=>{
        contract.removeAllListeners('HeartbeatSubmitted');
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/category-handlers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BANK_FINANCE_TEMPLATE",
    ()=>BANK_FINANCE_TEMPLATE,
    "BUSINESS_SECRETS_TEMPLATE",
    ()=>BUSINESS_SECRETS_TEMPLATE,
    "CRYPTO_WALLET_TEMPLATE",
    ()=>CRYPTO_WALLET_TEMPLATE,
    "DOCUMENTS_TEMPLATE",
    ()=>DOCUMENTS_TEMPLATE,
    "EXCHANGE_ACCOUNT_TEMPLATE",
    ()=>EXCHANGE_ACCOUNT_TEMPLATE,
    "PHOTOS_TEMPLATE",
    ()=>PHOTOS_TEMPLATE,
    "RAW_KEYS_TEMPLATE",
    ()=>RAW_KEYS_TEMPLATE,
    "generateStructuredData",
    ()=>generateStructuredData,
    "getCategoryTemplate",
    ()=>getCategoryTemplate,
    "validateCategoryData",
    ()=>validateCategoryData
]);
/**
 * Category-Specific Handlers for Digital Will Assets
 * 800 Billion Project - Professional Implementation
 * 
 * Har category ke liye dedicated functions with smart templates
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/coins.js [app-client] (ecmascript) <export default as Coins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/key.js [app-client] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
;
const BANK_FINANCE_TEMPLATE = {
    id: 'bank_account',
    label: 'Bank / Finance',
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    placeholder: 'e.g., HDFC Savings Account, SBI Fixed Deposit',
    instructions: 'Store your bank account details, credit cards, and financial information securely.',
    examples: [
        'Bank Account (Savings/Current)',
        'Credit/Debit Card Details',
        'Fixed Deposits & Investments',
        'Insurance Policies',
        'Loan Account Details'
    ],
    fields: [
        {
            name: 'accountName',
            label: 'Account Name',
            type: 'text',
            placeholder: 'e.g., HDFC Savings Account',
            required: true,
            encrypted: false
        },
        {
            name: 'bankName',
            label: 'Bank/Institution Name',
            type: 'text',
            placeholder: 'e.g., HDFC Bank, SBI, ICICI',
            required: true,
            encrypted: false
        },
        {
            name: 'accountNumber',
            label: 'Account Number',
            type: 'password',
            placeholder: 'Enter account number',
            required: true,
            encrypted: true,
            helpText: 'This will be encrypted and only accessible to beneficiaries'
        },
        {
            name: 'ifscCode',
            label: 'IFSC/SWIFT Code',
            type: 'text',
            placeholder: 'e.g., HDFC0001234',
            required: false,
            encrypted: false
        },
        {
            name: 'accountType',
            label: 'Account Type',
            type: 'select',
            placeholder: 'Select type',
            required: true,
            encrypted: false,
            options: [
                'Savings',
                'Current',
                'Fixed Deposit',
                'Credit Card',
                'Debit Card',
                'Investment',
                'Insurance',
                'Loan'
            ]
        },
        {
            name: 'loginCredentials',
            label: 'Online Banking Credentials',
            type: 'textarea',
            placeholder: 'Username, Password, Security Questions (optional)',
            required: false,
            encrypted: true,
            helpText: 'Store login details for online/mobile banking'
        },
        {
            name: 'additionalInfo',
            label: 'Additional Information',
            type: 'textarea',
            placeholder: 'Branch address, customer ID, nominee details, etc.',
            required: false,
            encrypted: false
        }
    ]
};
const CRYPTO_WALLET_TEMPLATE = {
    id: 'self_custody_crypto',
    label: 'Crypto Wallets',
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"],
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    placeholder: 'e.g., MetaMask Wallet, Ledger Hardware Wallet',
    instructions: 'Store your self-custody crypto wallet details, seed phrases, and private keys.',
    examples: [
        'MetaMask/Trust Wallet',
        'Hardware Wallet (Ledger/Trezor)',
        'Paper Wallet',
        'Multi-sig Wallet',
        'Cold Storage Wallet'
    ],
    fields: [
        {
            name: 'walletName',
            label: 'Wallet Name',
            type: 'text',
            placeholder: 'e.g., My MetaMask Wallet',
            required: true,
            encrypted: false
        },
        {
            name: 'walletType',
            label: 'Wallet Type',
            type: 'select',
            placeholder: 'Select wallet type',
            required: true,
            encrypted: false,
            options: [
                'MetaMask',
                'Trust Wallet',
                'Ledger',
                'Trezor',
                'Paper Wallet',
                'Multi-sig',
                'Other'
            ]
        },
        {
            name: 'walletAddress',
            label: 'Public Wallet Address',
            type: 'text',
            placeholder: '0x...',
            required: false,
            encrypted: false,
            helpText: 'Public address (not encrypted)'
        },
        {
            name: 'seedPhrase',
            label: 'Seed Phrase / Recovery Phrase',
            type: 'textarea',
            placeholder: '12 or 24 word seed phrase',
            required: true,
            encrypted: true,
            helpText: '⚠️ CRITICAL: This will be encrypted with military-grade encryption'
        },
        {
            name: 'privateKey',
            label: 'Private Key (Optional)',
            type: 'password',
            placeholder: 'Private key if applicable',
            required: false,
            encrypted: true
        },
        {
            name: 'pinPassword',
            label: 'PIN/Password',
            type: 'password',
            placeholder: 'Wallet PIN or password',
            required: false,
            encrypted: true
        },
        {
            name: 'networks',
            label: 'Networks/Chains',
            type: 'text',
            placeholder: 'e.g., Ethereum, BSC, Polygon',
            required: false,
            encrypted: false
        },
        {
            name: 'estimatedValue',
            label: 'Estimated Value (USD)',
            type: 'number',
            placeholder: '0',
            required: false,
            encrypted: false
        },
        {
            name: 'additionalInfo',
            label: 'Additional Notes',
            type: 'textarea',
            placeholder: 'Token holdings, NFTs, special instructions',
            required: false,
            encrypted: false
        }
    ]
};
const EXCHANGE_ACCOUNT_TEMPLATE = {
    id: 'exchange_account',
    label: 'Exchange Accounts',
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    placeholder: 'e.g., Binance Account, Coinbase Pro',
    instructions: 'Store your cryptocurrency exchange account credentials and API keys.',
    examples: [
        'Binance/Coinbase Account',
        'WazirX/CoinDCX',
        'Kraken/Gemini',
        'Local Exchange Accounts'
    ],
    fields: [
        {
            name: 'exchangeName',
            label: 'Exchange Name',
            type: 'select',
            placeholder: 'Select exchange',
            required: true,
            encrypted: false,
            options: [
                'Binance',
                'Coinbase',
                'WazirX',
                'CoinDCX',
                'Kraken',
                'Gemini',
                'KuCoin',
                'Other'
            ]
        },
        {
            name: 'accountEmail',
            label: 'Account Email',
            type: 'text',
            placeholder: 'your@email.com',
            required: true,
            encrypted: false
        },
        {
            name: 'password',
            label: 'Account Password',
            type: 'password',
            placeholder: 'Login password',
            required: true,
            encrypted: true
        },
        {
            name: 'twoFactorAuth',
            label: '2FA Backup Codes',
            type: 'textarea',
            placeholder: 'Backup codes for 2FA recovery',
            required: false,
            encrypted: true,
            helpText: 'Store your 2FA backup codes or recovery key'
        },
        {
            name: 'apiKey',
            label: 'API Key (Optional)',
            type: 'password',
            placeholder: 'API Key',
            required: false,
            encrypted: true
        },
        {
            name: 'apiSecret',
            label: 'API Secret (Optional)',
            type: 'password',
            placeholder: 'API Secret',
            required: false,
            encrypted: true
        },
        {
            name: 'kycDetails',
            label: 'KYC/Verification Details',
            type: 'textarea',
            placeholder: 'Document numbers, verification level',
            required: false,
            encrypted: false
        },
        {
            name: 'estimatedBalance',
            label: 'Estimated Balance (USD)',
            type: 'number',
            placeholder: '0',
            required: false,
            encrypted: false
        },
        {
            name: 'additionalInfo',
            label: 'Additional Notes',
            type: 'textarea',
            placeholder: 'Withdrawal limits, special instructions',
            required: false,
            encrypted: false
        }
    ]
};
const RAW_KEYS_TEMPLATE = {
    id: 'crypto_keys',
    label: 'Raw Keys',
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    placeholder: 'e.g., Bitcoin Private Key, Ethereum Key',
    instructions: 'Store raw private keys, seed phrases, or recovery codes.',
    examples: [
        'Bitcoin Private Key',
        'Ethereum Private Key',
        'Recovery Seed Phrases',
        'Master Keys',
        'Encryption Keys'
    ],
    fields: [
        {
            name: 'keyName',
            label: 'Key Name/Label',
            type: 'text',
            placeholder: 'e.g., Bitcoin Main Wallet Key',
            required: true,
            encrypted: false
        },
        {
            name: 'keyType',
            label: 'Key Type',
            type: 'select',
            placeholder: 'Select type',
            required: true,
            encrypted: false,
            options: [
                'Private Key',
                'Seed Phrase',
                'Recovery Code',
                'Master Key',
                'Encryption Key',
                'Other'
            ]
        },
        {
            name: 'keyValue',
            label: 'Key Value',
            type: 'textarea',
            placeholder: 'Enter the private key, seed phrase, or recovery code',
            required: true,
            encrypted: true,
            helpText: '⚠️ ULTRA SENSITIVE: Triple-encrypted with Shamir Secret Sharing'
        },
        {
            name: 'associatedAddress',
            label: 'Associated Address/Account',
            type: 'text',
            placeholder: 'Public address or account identifier',
            required: false,
            encrypted: false
        },
        {
            name: 'blockchain',
            label: 'Blockchain/Network',
            type: 'text',
            placeholder: 'e.g., Bitcoin, Ethereum, Solana',
            required: false,
            encrypted: false
        },
        {
            name: 'derivationPath',
            label: 'Derivation Path (if applicable)',
            type: 'text',
            placeholder: "e.g., m/44'/60'/0'/0",
            required: false,
            encrypted: false
        },
        {
            name: 'additionalInfo',
            label: 'Additional Security Notes',
            type: 'textarea',
            placeholder: 'Usage instructions, warnings, related accounts',
            required: false,
            encrypted: false
        }
    ]
};
const BUSINESS_SECRETS_TEMPLATE = {
    id: 'business_secret',
    label: 'Secrets',
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    placeholder: 'e.g., AWS API Keys, Database Passwords',
    instructions: 'Store business secrets, API keys, passwords, and confidential information.',
    examples: [
        'API Keys & Tokens',
        'Database Credentials',
        'Server Access Keys',
        'OAuth Secrets',
        'Encryption Keys'
    ],
    fields: [
        {
            name: 'secretName',
            label: 'Secret Name',
            type: 'text',
            placeholder: 'e.g., AWS Production API Key',
            required: true,
            encrypted: false
        },
        {
            name: 'secretType',
            label: 'Secret Type',
            type: 'select',
            placeholder: 'Select type',
            required: true,
            encrypted: false,
            options: [
                'API Key',
                'Password',
                'Token',
                'Certificate',
                'SSH Key',
                'Database Credentials',
                'OAuth Secret',
                'Other'
            ]
        },
        {
            name: 'secretValue',
            label: 'Secret Value',
            type: 'textarea',
            placeholder: 'Enter the secret value',
            required: true,
            encrypted: true,
            helpText: 'Encrypted with AES-256-GCM'
        },
        {
            name: 'service',
            label: 'Service/Platform',
            type: 'text',
            placeholder: 'e.g., AWS, Google Cloud, GitHub',
            required: false,
            encrypted: false
        },
        {
            name: 'username',
            label: 'Username/Account ID',
            type: 'text',
            placeholder: 'Associated username or account',
            required: false,
            encrypted: false
        },
        {
            name: 'expiryDate',
            label: 'Expiry Date (if applicable)',
            type: 'text',
            placeholder: 'YYYY-MM-DD',
            required: false,
            encrypted: false
        },
        {
            name: 'permissions',
            label: 'Permissions/Scope',
            type: 'textarea',
            placeholder: 'What this secret can access',
            required: false,
            encrypted: false
        },
        {
            name: 'rotationInstructions',
            label: 'Rotation Instructions',
            type: 'textarea',
            placeholder: 'How to rotate/regenerate this secret',
            required: false,
            encrypted: false
        }
    ]
};
const DOCUMENTS_TEMPLATE = {
    id: 'document',
    label: 'Documents',
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    placeholder: 'e.g., Passport, Property Papers, Will',
    instructions: 'Store important documents, certificates, and legal papers.',
    examples: [
        'Identity Documents (Passport, Aadhaar)',
        'Property Papers',
        'Legal Documents',
        'Certificates',
        'Contracts'
    ],
    fields: [
        {
            name: 'documentName',
            label: 'Document Name',
            type: 'text',
            placeholder: 'e.g., Passport Copy',
            required: true,
            encrypted: false
        },
        {
            name: 'documentType',
            label: 'Document Type',
            type: 'select',
            placeholder: 'Select type',
            required: true,
            encrypted: false,
            options: [
                'Identity Document',
                'Property Papers',
                'Legal Document',
                'Certificate',
                'Contract',
                'Will/Testament',
                'Insurance',
                'Other'
            ]
        },
        {
            name: 'documentNumber',
            label: 'Document Number/ID',
            type: 'text',
            placeholder: 'e.g., Passport number, Registration number',
            required: false,
            encrypted: false
        },
        {
            name: 'issueDate',
            label: 'Issue Date',
            type: 'text',
            placeholder: 'YYYY-MM-DD',
            required: false,
            encrypted: false
        },
        {
            name: 'expiryDate',
            label: 'Expiry Date',
            type: 'text',
            placeholder: 'YYYY-MM-DD',
            required: false,
            encrypted: false
        },
        {
            name: 'issuingAuthority',
            label: 'Issuing Authority',
            type: 'text',
            placeholder: 'e.g., Government of India, Court',
            required: false,
            encrypted: false
        },
        {
            name: 'additionalInfo',
            label: 'Additional Information',
            type: 'textarea',
            placeholder: 'Location, related documents, special notes',
            required: false,
            encrypted: false
        }
    ]
};
const PHOTOS_TEMPLATE = {
    id: 'photo',
    label: 'Photos & Media',
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"],
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    placeholder: 'e.g., Family Photos, Important Screenshots',
    instructions: 'Store photos, videos, and media files securely.',
    examples: [
        'Family Photos',
        'Important Screenshots',
        'Video Messages',
        'Scanned Documents',
        'Evidence Photos'
    ],
    fields: [
        {
            name: 'mediaName',
            label: 'Media Name',
            type: 'text',
            placeholder: 'e.g., Family Vacation 2024',
            required: true,
            encrypted: false
        },
        {
            name: 'mediaType',
            label: 'Media Type',
            type: 'select',
            placeholder: 'Select type',
            required: true,
            encrypted: false,
            options: [
                'Photo',
                'Video',
                'Screenshot',
                'Scanned Document',
                'Audio',
                'Other'
            ]
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Describe the content and context',
            required: false,
            encrypted: false
        },
        {
            name: 'date',
            label: 'Date Taken/Created',
            type: 'text',
            placeholder: 'YYYY-MM-DD',
            required: false,
            encrypted: false
        },
        {
            name: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'Where was this taken/created',
            required: false,
            encrypted: false
        },
        {
            name: 'peopleInvolved',
            label: 'People Involved',
            type: 'text',
            placeholder: 'Names of people in photo/video',
            required: false,
            encrypted: false
        }
    ]
};
function getCategoryTemplate(categoryId) {
    const templates = {
        bank_account: BANK_FINANCE_TEMPLATE,
        self_custody_crypto: CRYPTO_WALLET_TEMPLATE,
        exchange_account: EXCHANGE_ACCOUNT_TEMPLATE,
        crypto_keys: RAW_KEYS_TEMPLATE,
        business_secret: BUSINESS_SECRETS_TEMPLATE,
        document: DOCUMENTS_TEMPLATE,
        photo: PHOTOS_TEMPLATE,
        video: PHOTOS_TEMPLATE // Reuse photos template for videos
    };
    const template = templates[categoryId];
    if (!template) {
        console.error('❌ Template not found for category:', categoryId);
        throw new Error(`Template not found for category: ${categoryId}`);
    }
    return template;
}
function generateStructuredData(template, formData) {
    let output = `=== ${template.label.toUpperCase()} ===\n\n`;
    template.fields.forEach((field)=>{
        const value = formData[field.name];
        if (value) {
            const encryptedLabel = field.encrypted ? '🔒 ' : '';
            output += `${encryptedLabel}${field.label}:\n${value}\n\n`;
        }
    });
    output += `\n--- Generated by DeadMan Protocol ---\n`;
    output += `Timestamp: ${new Date().toISOString()}\n`;
    return output;
}
function validateCategoryData(template, formData) {
    const errors = [];
    template.fields.forEach((field)=>{
        if (field.required && !formData[field.name]) {
            errors.push(`${field.label} is required`);
        }
    });
    return {
        valid: errors.length === 0,
        errors
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/mode-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mode Service - Handles Centralized vs Decentralized Operations
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/storage.ts [app-client] (ecmascript)");
;
class ModeService {
    static instance;
    currentMode = 'centralized';
    config;
    constructor(){
        // Load mode from localStorage
        const savedMode = localStorage.getItem('dwp_mode');
        this.currentMode = savedMode || 'centralized';
        this.config = {
            mode: this.currentMode,
            apiEndpoint: ("TURBOPACK compile-time value", "http://localhost:7001") || 'http://localhost:3001',
            contractAddress: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            ipfsGateway: 'https://ipfs.io/ipfs/'
        };
    }
    static getInstance() {
        if (!ModeService.instance) {
            ModeService.instance = new ModeService();
        }
        return ModeService.instance;
    }
    /**
   * Get current mode
   */ getMode() {
        return this.currentMode;
    }
    /**
   * Switch mode and migrate assets
   */ async switchMode(newMode, onProgress) {
        if (this.currentMode === newMode) return;
        console.log(`🔄 Switching mode from ${this.currentMode} to ${newMode}`);
        try {
            if (onProgress) onProgress(`Preparing migration to ${newMode}...`);
            await new Promise((resolve)=>setTimeout(resolve, 800)); // simulate prep Time
            // 1. Load existing assets
            if (onProgress) onProgress('Loading existing vault ledger...');
            const existingAssets = await this.loadAssets();
            // 2. Set new mode context
            const oldMode = this.currentMode;
            this.currentMode = newMode;
            this.config.mode = newMode;
            localStorage.setItem('dwp_mode', newMode);
            if (existingAssets.length > 0) {
                if (onProgress) onProgress(`Found ${existingAssets.length} assets. Restructuring payload...`);
                await new Promise((resolve)=>setTimeout(resolve, 1000));
                // 3. Migrate assets to new mode
                let migrated = 0;
                for (const asset of existingAssets){
                    try {
                        if (onProgress) onProgress(`Syncing asset ${migrated + 1}/${existingAssets.length}: ${asset.name}`);
                        // Small artificial delay for visual feedback on fast locals
                        await new Promise((resolve)=>setTimeout(resolve, 500));
                        // saveAsset will use the *new* this.currentMode
                        await this.saveAsset(asset);
                        migrated++;
                    } catch (err) {
                        console.error(`Failed to migrate asset ${asset.name}`, err);
                    }
                }
                if (onProgress) onProgress(`Vault Restructured. Successfully mapped ${migrated} assets.`);
                await new Promise((resolve)=>setTimeout(resolve, 1000));
            } else {
                if (onProgress) onProgress('Vault is empty. No mapping required.');
                await new Promise((resolve)=>setTimeout(resolve, 800));
            }
            console.log(`✅ Mode switched to ${newMode}`);
        } catch (error) {
            console.error('Migration failed during mode switch', error);
            throw error // Let the UI handle the failure
            ;
        }
    }
    /**
   * Save asset based on current mode
   */ async saveAsset(asset) {
        if (this.currentMode === 'centralized') {
            return this.saveAssetCentralized(asset);
        } else {
            return this.saveAssetDecentralized(asset);
        }
    }
    /**
   * CENTRALIZED: Save to backend API + MongoDB
   */ async saveAssetCentralized(asset) {
        try {
            console.log('💾 Saving asset (Centralized mode)...');
            let syncPending = false;
            // Save to IndexedDB (local cache)
            const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
            await storage.saveAsset(asset);
            // Also save to backend API
            try {
                const response = await fetch(`${this.config.apiEndpoint}/api/assets`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
                    },
                    body: JSON.stringify({
                        name: asset.name,
                        type: asset.type,
                        encryptedData: asset.encryptedData,
                        keyId: asset.keyId,
                        iv: asset.iv,
                        ipfsHash: asset.ipfsHash,
                        beneficiaries: asset.beneficiaries,
                        size: asset.size,
                        mimeType: asset.mimeType
                    })
                });
                if (!response.ok) {
                    console.warn('⚠️ Backend save failed, using local storage only');
                    syncPending = true;
                } else {
                    console.log('✅ Asset saved to backend');
                }
            } catch (apiError) {
                console.warn('⚠️ Backend unavailable, using local storage only:', apiError);
                syncPending = true;
            }
            return {
                success: true,
                id: asset.id,
                syncPending
            };
        } catch (error) {
            console.error('❌ Centralized save failed:', error);
            throw error;
        }
    }
    /**
   * DECENTRALIZED: Save to smart contract + IPFS only
   */ async saveAssetDecentralized(asset) {
        try {
            console.log('⛓️ Saving asset (Decentralized mode)...');
            let syncPending = false;
            // Save to IndexedDB (local)
            const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
            await storage.saveAsset(asset);
            // Save metadata to smart contract
            try {
                const { ethers } = await __turbopack_context__.A("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/ethers/lib.esm/index.js [app-client] (ecmascript, async loader)");
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                // Contract ABI (simplified)
                const contractABI = [
                    'function createAsset(string memory ipfsCID, string memory encryptedKeyShares) public returns (uint256)',
                    'function getAsset(uint256 assetId) public view returns (string memory, string memory, address, uint256)'
                ];
                if (!this.config.contractAddress) {
                    console.warn('⚠️ No contract address, using local storage only');
                    return {
                        success: true,
                        id: asset.id,
                        syncPending: true
                    };
                }
                const contract = new ethers.Contract(this.config.contractAddress, contractABI, signer);
                // Create asset on-chain
                const tx = await contract.createAsset(asset.ipfsHash || 'local', JSON.stringify({
                    keyId: asset.keyId,
                    iv: asset.iv
                }));
                await tx.wait();
                console.log('✅ Asset saved to blockchain');
            } catch (blockchainError) {
                console.warn('⚠️ Blockchain save failed, using local storage only:', blockchainError);
                syncPending = true;
            }
            return {
                success: true,
                id: asset.id,
                syncPending
            };
        } catch (error) {
            console.error('❌ Decentralized save failed:', error);
            throw error;
        }
    }
    /**
   * Load assets based on current mode
   */ async loadAssets() {
        if (this.currentMode === 'centralized') {
            return this.loadAssetsCentralized();
        } else {
            return this.loadAssetsDecentralized();
        }
    }
    /**
   * CENTRALIZED: Load from backend API
   */ async loadAssetsCentralized() {
        try {
            console.log('📥 Loading assets (Centralized mode)...');
            // Try to load from backend first
            try {
                const response = await fetch(`${this.config.apiEndpoint}/api/assets`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
                    }
                });
                if (response.ok) {
                    const assets = await response.json();
                    console.log('✅ Loaded from backend:', assets.length, 'assets');
                    return assets;
                }
            } catch (apiError) {
                console.warn('⚠️ Backend unavailable, using local storage');
            }
            // Fallback to IndexedDB
            const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
            const localAssets = await storage.getAllAssets();
            console.log('✅ Loaded from local storage:', localAssets.length, 'assets');
            return localAssets;
        } catch (error) {
            console.error('❌ Failed to load assets:', error);
            return [];
        }
    }
    /**
   * DECENTRALIZED: Load from smart contract + IPFS
   */ async loadAssetsDecentralized() {
        try {
            console.log('📥 Loading assets (Decentralized mode)...');
            // Load from IndexedDB (local cache)
            const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
            const localAssets = await storage.getAllAssets();
            // TODO: Sync with blockchain if needed
            // For now, use local storage as source of truth
            console.log('✅ Loaded from local storage:', localAssets.length, 'assets');
            return localAssets;
        } catch (error) {
            console.error('❌ Failed to load assets:', error);
            return [];
        }
    }
    /**
   * Delete asset based on current mode
   */ async deleteAsset(assetId) {
        if (this.currentMode === 'centralized') {
            await this.deleteAssetCentralized(assetId);
        } else {
            await this.deleteAssetDecentralized(assetId);
        }
    }
    /**
   * CENTRALIZED: Delete from backend + local
   */ async deleteAssetCentralized(assetId) {
        try {
            // Delete from backend
            try {
                await fetch(`${this.config.apiEndpoint}/api/assets/${assetId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
                    }
                });
            } catch (apiError) {
                console.warn('⚠️ Backend delete failed');
            }
            // Delete from local
            const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
            await storage.deleteAsset(assetId);
            console.log('✅ Asset deleted (Centralized)');
        } catch (error) {
            console.error('❌ Delete failed:', error);
            throw error;
        }
    }
    /**
   * DECENTRALIZED: Mark as deleted (can't delete from blockchain)
   */ async deleteAssetDecentralized(assetId) {
        try {
            // In decentralized mode, we can only delete from local storage
            // Blockchain records are immutable
            const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
            await storage.deleteAsset(assetId);
            console.log('✅ Asset deleted from local storage (Decentralized)');
            console.log('ℹ️ Note: Blockchain record remains (immutable)');
        } catch (error) {
            console.error('❌ Delete failed:', error);
            throw error;
        }
    }
    /**
   * Get mode info for UI
   */ getModeInfo() {
        return {
            mode: this.currentMode,
            isCentralized: this.currentMode === 'centralized',
            isDecentralized: this.currentMode === 'decentralized',
            features: this.currentMode === 'centralized' ? [
                'Fast & Easy',
                'Auto Backup',
                '24/7 Support',
                'Account Recovery'
            ] : [
                'Full Control',
                'Zero-Knowledge',
                'Censorship Resistant',
                'True Ownership'
            ]
        };
    }
}
const __TURBOPACK__default__export__ = ModeService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/config/contracts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Smart Contract Configuration
__turbopack_context__.s([
    "CONTRACTS",
    ()=>CONTRACTS,
    "MAINNET_CONTRACTS",
    ()=>MAINNET_CONTRACTS,
    "getContractConfig",
    ()=>getContractConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const CONTRACTS = {
    // Mumbai Testnet or Local Hardhat
    HEARTBEAT_TRACKER: ("TURBOPACK compile-time value", "0x5FbDB2315678afecb367f032d93F642f64180aa3") || '',
    DIGITAL_WILL: ("TURBOPACK compile-time value", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512") || '',
    ASSET_MANAGER: ("TURBOPACK compile-time value", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0") || '',
    // Network Config (Dynamic from .env.local)
    NETWORK: ("TURBOPACK compile-time value", "localhost") || 'mumbai',
    CHAIN_ID: Number(("TURBOPACK compile-time value", "31337") || 80001),
    RPC_URL: ("TURBOPACK compile-time value", "http://127.0.0.1:8545") || 'https://rpc-mumbai.maticvigil.com',
    // Block Explorer
    EXPLORER: 'https://mumbai.polygonscan.com'
};
const MAINNET_CONTRACTS = {
    HEARTBEAT_TRACKER: '',
    DIGITAL_WILL: '',
    NETWORK: 'polygon',
    CHAIN_ID: 137,
    RPC_URL: 'https://polygon-rpc.com',
    EXPLORER: 'https://polygonscan.com'
};
function getContractConfig() {
    const isProduction = ("TURBOPACK compile-time value", "localhost") === 'mainnet';
    return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : CONTRACTS;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/types/subscription.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Subscription & Mode Types for Dual-Mode System
 */ __turbopack_context__.s([
    "ALL_PLANS",
    ()=>ALL_PLANS,
    "CENTRALIZED_PLANS",
    ()=>CENTRALIZED_PLANS,
    "DECENTRALIZED_PLANS",
    ()=>DECENTRALIZED_PLANS,
    "MIGRATION_FEE",
    ()=>MIGRATION_FEE,
    "TRIAL_DURATION_DAYS",
    ()=>TRIAL_DURATION_DAYS
]);
const CENTRALIZED_PLANS = {
    starter: {
        id: 'starter',
        name: 'Starter',
        mode: 'centralized',
        price: 4.99,
        yearlyPrice: 49.90,
        features: [
            '50 assets',
            '5 beneficiaries',
            '10 GB storage',
            'Email support',
            'Auto-backup daily',
            'Mobile app access',
            '2FA security'
        ],
        limits: {
            assets: 50,
            beneficiaries: 5,
            storage: '10GB',
            support: 'email',
            backup: 'daily'
        }
    },
    professional: {
        id: 'professional',
        name: 'Professional',
        mode: 'centralized',
        price: 14.99,
        yearlyPrice: 149.90,
        popular: true,
        features: [
            'Unlimited assets',
            'Unlimited beneficiaries',
            '100 GB storage',
            'Priority support',
            'Hourly backups',
            'API access',
            'Advanced analytics',
            'Multi-device sync',
            'Custom domains'
        ],
        limits: {
            assets: Infinity,
            beneficiaries: Infinity,
            storage: '100GB',
            support: 'priority',
            backup: 'hourly'
        }
    },
    enterprise: {
        id: 'enterprise',
        name: 'Enterprise',
        mode: 'centralized',
        price: 49.99,
        yearlyPrice: 499.90,
        features: [
            'Everything in Professional',
            'Dedicated support',
            '1 TB storage',
            'White-label option',
            'SLA guarantee',
            'Custom integrations',
            'Team management',
            'Audit logs',
            'Compliance reports'
        ],
        limits: {
            assets: Infinity,
            beneficiaries: Infinity,
            storage: '1TB',
            support: 'dedicated',
            backup: 'realtime'
        }
    }
};
const DECENTRALIZED_PLANS = {
    freedom: {
        id: 'freedom',
        name: 'Freedom',
        mode: 'decentralized',
        price: 4.99,
        yearlyPrice: 49.90,
        features: [
            'Unlimited assets (on-chain)',
            'Unlimited beneficiaries',
            'IPFS storage (unlimited)',
            'Community support',
            'No data custody',
            'True ownership',
            'Censorship resistant',
            '+ Gas fees (user pays)'
        ],
        limits: {
            assets: Infinity,
            beneficiaries: Infinity,
            storage: 'unlimited',
            support: 'community',
            chains: [
                'ethereum',
                'polygon'
            ]
        }
    },
    sovereign: {
        id: 'sovereign',
        name: 'Sovereign',
        mode: 'decentralized',
        price: 19.99,
        yearlyPrice: 199.90,
        popular: true,
        features: [
            'Everything in Freedom',
            'Arweave permanent storage',
            'Multi-chain support',
            'Advanced smart contracts',
            'Priority gas optimization',
            'Hardware wallet support',
            'Multi-sig support',
            '+ Gas fees (user pays)'
        ],
        limits: {
            assets: Infinity,
            beneficiaries: Infinity,
            storage: 'unlimited',
            support: 'priority',
            chains: [
                'ethereum',
                'polygon',
                'bsc',
                'arbitrum'
            ]
        }
    },
    immortal: {
        id: 'immortal',
        name: 'Immortal',
        mode: 'decentralized',
        price: 99.00,
        yearlyPrice: 99.00,
        features: [
            'Everything in Sovereign',
            'Lifetime Arweave storage',
            'All chains supported',
            'Zero-knowledge proofs',
            'Quantum-resistant encryption',
            'Dedicated IPFS node',
            'Custom smart contracts',
            'Legal document templates',
            '+ Gas fees (user pays)'
        ],
        limits: {
            assets: Infinity,
            beneficiaries: Infinity,
            storage: 'permanent',
            support: 'dedicated',
            chains: [
                'all'
            ]
        }
    }
};
const ALL_PLANS = {
    ...CENTRALIZED_PLANS,
    ...DECENTRALIZED_PLANS
};
const TRIAL_DURATION_DAYS = 30;
const MIGRATION_FEE = 9.99;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Nmims_DeadMan%20Protocol_frontend_web_src_0225dd53._.js.map