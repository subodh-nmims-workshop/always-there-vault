(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeartbeatMonitor",
    ()=>HeartbeatMonitor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/alert-triangle.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/fingerprint.js [app-client] (ecmascript) <export default as Fingerprint>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/check-circle-2.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$app$2f$actions$2f$heartbeat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/actions/heartbeat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/blockchain.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function HeartbeatMonitor() {
    _s();
    const [walletAddress, setWalletAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [lastHeartbeat, setLastHeartbeat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isRecording, setIsRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [heartbeats, setHeartbeats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [statusInfo, setStatusInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { refreshState, state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        heartbeatInterval: 30,
        gracePeriod: 14
    });
    const [showSettings, setShowSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSavingSettings, setIsSavingSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccessPopup, setShowSuccessPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeartbeatMonitor.useEffect": ()=>{
            const address = localStorage.getItem('dwp_wallet_address');
            if (address) {
                setWalletAddress(address);
            } else {
                setIsLoading(false);
            }
        }
    }["HeartbeatMonitor.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeartbeatMonitor.useEffect": ()=>{
            if (walletAddress) {
                fetchLiveStatus();
                loadHeartbeatHistory();
            }
        }
    }["HeartbeatMonitor.useEffect"], [
        walletAddress
    ]);
    const loadHeartbeatHistory = ()=>{
        // Load from AppContext state
        if (state?.heartbeats) {
            const sortedHeartbeats = [
                ...state.heartbeats
            ].sort((a, b)=>b.timestamp - a.timestamp);
            setHeartbeats(sortedHeartbeats.slice(0, 10)); // Last 10 heartbeats
        }
    };
    const fetchLiveStatus = async ()=>{
        setIsLoading(true);
        try {
            const setRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$app$2f$actions$2f$heartbeat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeartbeatSettings"])(walletAddress);
            if (setRes.success) setSettings({
                heartbeatInterval: setRes.interval,
                gracePeriod: setRes.gracePeriod
            });
            const statRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$app$2f$actions$2f$heartbeat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeartbeatStatus"])(walletAddress);
            if (statRes.success && statRes.status !== 'Not Found' && statRes.status !== 'inactive') {
                setStatusInfo({
                    status: statRes.status || 'unknown',
                    daysUntilDue: statRes.daysUntilDue || 0,
                    isOverdue: statRes.isOverdue || false
                });
                if (statRes.lastHeartbeat) setLastHeartbeat(new Date(statRes.lastHeartbeat));
                if (statRes.interval && statRes.gracePeriod) setSettings({
                    heartbeatInterval: statRes.interval,
                    gracePeriod: statRes.gracePeriod
                });
            } else if (statRes.status === 'inactive' || statRes.status === 'Not Found') {
                setStatusInfo({
                    status: 'active',
                    daysUntilDue: settings.heartbeatInterval,
                    isOverdue: false
                });
            }
        } catch (error) {
            console.error('Failed to sync heartbeat data:', error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleHeartbeat = async ()=>{
        if (!walletAddress) return;
        setIsRecording(true);
        try {
            // DECENTRALIZED SMART CONTRACT EXECUTION
            const chainResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitHeartbeat"])();
            if (!chainResponse.success) {
                throw new Error(chainResponse.error || 'Smart Contract execution reverted');
            }
            const payload = {
                walletAddress,
                method: 'wallet_signature',
                signature: chainResponse.txHash || '0x' + Array.from({
                    length: 128
                }, ()=>Math.floor(Math.random() * 16).toString(16)).join(''),
                ipAddress: '127.0.0.1'
            };
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$app$2f$actions$2f$heartbeat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recordHeartbeat"])(payload);
            if (response.success) {
                await fetchLiveStatus();
                await refreshState();
                loadHeartbeatHistory(); // Reload history
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Heartbeat Recorded', {
                    description: 'Proof-of-life verified successfully.'
                });
            } else throw new Error('Local Context Rejected Pulse');
        } catch (error) {
            console.error('Failed to record heartbeat:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Transmission Failed', {
                description: `Failed to transmit cryptographic proof-of-life.\n\nError: ${error.message}`
            });
        } finally{
            setIsRecording(false);
        }
    };
    const handleSettingsUpdate = async ()=>{
        setIsSavingSettings(true);
        try {
            // Try to sync with blockchain, but don't block local save if it fails
            let chainError = null;
            try {
                const chainResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["configureHeartbeat"])(settings.heartbeatInterval, settings.gracePeriod);
                if (!chainResponse.success) {
                    chainError = chainResponse.error || 'Smart Contract setting update reverted';
                }
            } catch (err) {
                chainError = err?.message || 'Unable to reach blockchain provider';
            }
            // Always persist settings locally so the app behaves correctly
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$app$2f$actions$2f$heartbeat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateHeartbeatSettings"])(walletAddress || 'local', settings.heartbeatInterval, settings.gracePeriod);
            if (!res.success) {
                throw new Error('Failed to update local protocol settings.');
            }
            await fetchLiveStatus();
            await refreshState();
            setShowSettings(false);
            if (chainError) {
                // Inform user that on-chain sync failed but local config is saved
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning('On-chain Sync Issue', {
                    description: `Config saved locally, but on-chain sync failed: ${chainError}`
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Protocol configuration updated');
            }
        } catch (error) {
            console.error(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Configuration Failed', {
                description: `Configuration update failed: ${error.message}`
            });
        } finally{
            setIsSavingSettings(false);
        }
    };
    const getHeartbeatDisplayState = ()=>{
        if (!statusInfo) return {
            status: 'unknown',
            color: 'slate',
            message: 'No Data'
        };
        if (statusInfo.status === 'active') return {
            status: 'active',
            color: 'emerald',
            message: 'Active & Verified',
            glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]'
        };
        if (statusInfo.status === 'grace_period') return {
            status: 'grace',
            color: 'amber',
            message: 'Grace Period',
            glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]'
        };
        return {
            status: 'triggered',
            color: 'red',
            message: 'Triggered (Overdue)',
            glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
        };
    };
    const getNextHeartbeatDue = ()=>{
        if (!lastHeartbeat) return new Date(Date.now() + settings.heartbeatInterval * 24 * 60 * 60 * 1000);
        return new Date(lastHeartbeat.getTime() + settings.heartbeatInterval * 24 * 60 * 60 * 1000);
    };
    const getDaysUntilDueDisplay = ()=>{
        if (statusInfo && typeof statusInfo.daysUntilDue === 'number' && !isNaN(statusInfo.daysUntilDue)) {
            return statusInfo.daysUntilDue;
        }
        const nextDue = getNextHeartbeatDue();
        const days = Math.ceil((nextDue.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return isNaN(days) ? 0 : days;
    };
    const calculateProgress = ()=>{
        const totalDays = settings.heartbeatInterval;
        const daysLeft = getDaysUntilDueDisplay();
        if (daysLeft < 0) return 100;
        const progress = (totalDays - daysLeft) / totalDays * 100;
        return Math.min(Math.max(progress, 0), 100);
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-32 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                    className: "w-10 h-10 text-blue-500 animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400 font-medium tracking-wide",
                    children: "Syncing Protocol Matrix..."
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
            lineNumber: 187,
            columnNumber: 7
        }, this);
    }
    const heartbeatDisplay = getHeartbeatDisplayState();
    const daysUntilDue = getDaysUntilDueDisplay();
    const progress = calculateProgress();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 w-full max-w-4xl mx-auto font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.5
                },
                className: "bg-slate-900/40 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl border border-white/5 shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-8 relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative flex h-2 w-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative inline-flex rounded-full h-2 w-2 bg-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this),
                                    "Live Connection"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowHistory(true),
                                        className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-slate-200 shadow-inner",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 214,
                                                columnNumber: 15
                                            }, this),
                                            "History"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSettings(true),
                                        className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-slate-200 shadow-inner",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 218,
                                                columnNumber: 15
                                            }, this),
                                            "Protocol Config"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-white/5 shadow-inner",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-12 h-12 rounded-xl bg-${heartbeatDisplay.color}-500/20 flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_theme(colors.${heartbeatDisplay.color}.500/30)] border border-${heartbeatDisplay.color}-500/20`,
                                                children: heartbeatDisplay.status === 'active' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    className: `w-6 h-6 text-${heartbeatDisplay.color}-400`
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 57
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                    className: `w-6 h-6 text-${heartbeatDisplay.color}-400`
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 132
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 228,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white font-bold text-lg",
                                                        children: heartbeatDisplay.message
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 231,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-white/5 shadow-inner",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-xl bg-blue-500/20 flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_theme(colors.blue.500/20)] border border-blue-500/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    className: "w-6 h-6 text-blue-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1",
                                                        children: "Interval"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white font-bold text-lg",
                                                        children: [
                                                            settings.heartbeatInterval,
                                                            "D Recurrence"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-white/5 shadow-inner",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-xl bg-purple-500/20 flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_theme(colors.purple.500/20)] border border-purple-500/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                    className: "w-6 h-6 text-purple-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1",
                                                        children: "Last Pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white font-bold text-lg",
                                                        children: lastHeartbeat ? lastHeartbeat.toLocaleDateString(undefined, {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        }) : 'Never'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 17
                                                    }, this),
                                                    lastHeartbeat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-xs mt-1",
                                                        children: [
                                                            "Next due: ",
                                                            new Date(lastHeartbeat.getTime() + settings.heartbeatInterval * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 253,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center py-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-56 h-56 flex items-center justify-center group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "absolute inset-0 w-full h-full transform -rotate-90 filter drop-shadow-xl",
                                            viewBox: "0 0 100 100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    className: "text-slate-800 stroke-current",
                                                    strokeWidth: "6",
                                                    cx: "50",
                                                    cy: "50",
                                                    r: "44",
                                                    fill: "transparent"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    className: `stroke-current transition-all duration-1000 ease-out text-${heartbeatDisplay.color}-500`,
                                                    strokeWidth: "6",
                                                    strokeLinecap: "round",
                                                    cx: "50",
                                                    cy: "50",
                                                    r: "44",
                                                    fill: "transparent",
                                                    strokeDasharray: `${progress * 2.76} 276`
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center z-10 relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-6xl font-black text-white drop-shadow-[0_0_10px_theme(colors.${heartbeatDisplay.color}.500/50)] tracking-tighter`,
                                                    children: Math.max(0, daysUntilDue)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-400 text-xs font-bold uppercase tracking-widest mt-1",
                                                    children: "Days Until Next"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 text-[10px] font-medium mt-0.5",
                                                    children: "Heartbeat Due"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: [
                            daysUntilDue <= 7 && daysUntilDue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    height: 0
                                },
                                animate: {
                                    opacity: 1,
                                    height: 'auto'
                                },
                                exit: {
                                    opacity: 0,
                                    height: 0
                                },
                                className: "mb-6 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center gap-4 relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2 bg-amber-500/20 rounded-full shadow-[0_0_15px_theme(colors.amber.500/30)] animate-pulse",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "w-5 h-5 text-amber-500"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 302,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 301,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-amber-100",
                                            children: [
                                                "Protocol requires signature in ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-amber-400 font-bold underline",
                                                    children: [
                                                        daysUntilDue,
                                                        " days"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 98
                                                }, this),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 304,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                    lineNumber: 300,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this),
                            daysUntilDue <= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    height: 0
                                },
                                animate: {
                                    opacity: 1,
                                    height: 'auto'
                                },
                                exit: {
                                    opacity: 0,
                                    height: 0
                                },
                                className: "mb-6 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-4 relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2 bg-red-500/20 rounded-full shadow-[0_0_15px_theme(colors.red.500/30)] animate-pulse",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                className: "w-5 h-5 text-red-500"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 313,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 312,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-red-100",
                                            children: "Critical: Heartbeat Overdue. Sign immediately to prevent protocol trigger."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                    lineNumber: 311,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleHeartbeat,
                        disabled: isRecording,
                        className: "w-full py-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-500 to-red-600 hover:from-rose-500 hover:via-red-400 hover:to-rose-500 relative group overflow-hidden shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed border border-rose-400/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-full group-hover:animate-[shimmer_2s_infinite]"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-center justify-center gap-3 text-white font-bold text-lg tracking-wide",
                                children: [
                                    isRecording ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        animate: {
                                            scale: [
                                                1,
                                                1.2,
                                                1
                                            ]
                                        },
                                        transition: {
                                            repeat: Infinity,
                                            duration: 0.8
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__["Fingerprint"], {
                                            className: "w-6 h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 330,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__["Fingerprint"], {
                                        className: "w-6 h-6 group-hover:scale-110 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this),
                                    isRecording ? 'Generating Proof...' : 'Record Heartbeat Signature'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showHistory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -20
                    },
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl max-h-[80vh] overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-8 border-b border-slate-800 pb-6 sticky top-0 bg-slate-900 z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                    className: "w-6 h-6 text-purple-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-bold text-white tracking-tight",
                                                        children: "Heartbeat History"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400 mt-1",
                                                        children: "Last 10 proof-of-life signatures"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 350,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 346,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowHistory(false),
                                        className: "text-slate-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 356,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 355,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 345,
                                columnNumber: 15
                            }, this),
                            heartbeats.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                        className: "w-16 h-16 mx-auto mb-4 text-slate-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 362,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-300 font-medium",
                                        children: "No heartbeat history yet"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 363,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500 mt-2",
                                        children: "Record your first heartbeat to see it here"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 364,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 361,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: heartbeats.map((heartbeat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: -20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: index * 0.05
                                        },
                                        className: "bg-slate-950/50 border border-slate-800 rounded-xl p-4 hover:border-purple-500/30 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                    className: "w-5 h-5 text-emerald-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                                    lineNumber: 379,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                                lineNumber: 378,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-white font-semibold text-sm",
                                                                        children: new Date(heartbeat.timestamp).toLocaleDateString(undefined, {
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                            year: 'numeric',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                                        lineNumber: 382,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-500 mt-0.5",
                                                                        children: [
                                                                            "Method: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-slate-400 font-medium",
                                                                                children: heartbeat.method || 'wallet_signature'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                                                lineNumber: 392,
                                                                                columnNumber: 39
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                                        lineNumber: 391,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                                lineNumber: 381,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            heartbeat.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-semibold",
                                                                children: "Verified"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                                lineNumber: 398,
                                                                columnNumber: 29
                                                            }, this),
                                                            index === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs font-semibold",
                                                                children: "Latest"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                                lineNumber: 403,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 376,
                                                columnNumber: 23
                                            }, this),
                                            heartbeat.signature && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 pt-3 border-t border-slate-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1",
                                                        children: "Signature"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 411,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400 font-mono break-all",
                                                        children: [
                                                            heartbeat.signature.substring(0, 32),
                                                            "...",
                                                            heartbeat.signature.substring(heartbeat.signature.length - 8)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 410,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, heartbeat.id, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 369,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 367,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 pt-6 border-t border-slate-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowHistory(false),
                                    className: "w-full px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/40 text-slate-300 font-bold hover:bg-slate-800 transition-all text-sm",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                    lineNumber: 423,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 422,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                        lineNumber: 344,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                    lineNumber: 343,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -20
                    },
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-8 border-b border-slate-800 pb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                    className: "w-6 h-6 text-blue-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 442,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-bold text-white tracking-tight",
                                                        children: "Protocol Lifecycle Config"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 446,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400 mt-1",
                                                        children: "Fine-tune your personal dead man's switch timings"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 445,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 441,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSettings(false),
                                        className: "text-slate-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                            lineNumber: 451,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 450,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 440,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[10px] font-bold tracking-widest text-slate-400 uppercase",
                                                children: "Heartbeat Interval"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 457,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: "How frequently you must check in."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 458,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm",
                                                value: settings.heartbeatInterval,
                                                onChange: (e)=>setSettings((prev)=>({
                                                            ...prev,
                                                            heartbeatInterval: parseInt(e.target.value)
                                                        })),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 7,
                                                        children: "7 days (Weekly)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 14,
                                                        children: "14 days (Bi-weekly)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 465,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 30,
                                                        children: "30 days (Monthly)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 466,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 60,
                                                        children: "60 days (Bi-monthly)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 90,
                                                        children: "90 days (Quarterly)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 459,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 456,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[10px] font-bold tracking-widest text-slate-400 uppercase",
                                                children: "Grace Period"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 473,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: "Time before asset release triggers after overdue."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 474,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm",
                                                value: settings.gracePeriod,
                                                onChange: (e)=>setSettings((prev)=>({
                                                            ...prev,
                                                            gracePeriod: parseInt(e.target.value)
                                                        })),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 7,
                                                        children: "7 days Rescue Window"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 14,
                                                        children: "14 days Rescue Window"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 30,
                                                        children: "30 days Rescue Window"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 60,
                                                        children: "60 days Rescue Window"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 475,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 472,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 455,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSettingsUpdate,
                                        disabled: isSavingSettings,
                                        className: "flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center disabled:opacity-70 text-sm",
                                        children: [
                                            isSavingSettings ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                className: "w-4 h-4 animate-spin mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 494,
                                                columnNumber: 39
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                className: "w-4 h-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                                lineNumber: 494,
                                                columnNumber: 93
                                            }, this),
                                            isSavingSettings ? 'Deploying Config...' : 'Save Protocol Configuration'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 489,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowSettings(false);
                                            fetchLiveStatus();
                                        },
                                        className: "px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/40 text-slate-300 font-bold hover:bg-slate-800 transition-all text-sm",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                        lineNumber: 497,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 488,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                        lineNumber: 439,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                    lineNumber: 438,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showSuccessPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.9,
                        y: 50
                    },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        scale: 0.9,
                        y: 50
                    },
                    className: "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-emerald-500/20 p-2 rounded-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "w-6 h-6 text-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                lineNumber: 522,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                            lineNumber: 521,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white font-bold tracking-wide",
                                    children: "Heartbeat Recorded"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                    lineNumber: 525,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-emerald-200 text-xs font-medium",
                                    children: "Proof-of-life verified successfully."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                                    lineNumber: 526,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                            lineNumber: 524,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                    lineNumber: 515,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
_s(HeartbeatMonitor, "YDVDuCbk7QyIArO8wmnKPHYqdgM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = HeartbeatMonitor;
var _c;
__turbopack_context__.k.register(_c, "HeartbeatMonitor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=8139b_DeadMan%20Protocol_frontend_web_src_components_heartbeat-monitor_tsx_d476f6bd._.js.map