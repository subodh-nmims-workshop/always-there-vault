(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/actions/heartbeat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHeartbeatHistory",
    ()=>getHeartbeatHistory,
    "getHeartbeatSettings",
    ()=>getHeartbeatSettings,
    "getHeartbeatStatus",
    ()=>getHeartbeatStatus,
    "recordHeartbeat",
    ()=>recordHeartbeat,
    "updateHeartbeatSettings",
    ()=>updateHeartbeatSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/storage.ts [app-client] (ecmascript)");
'use client';
;
const BACKEND_URL = ("TURBOPACK compile-time value", "http://localhost:7001") || 'http://localhost:7001';
async function recordHeartbeat(payload) {
    try {
        const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
        const heartbeat = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            method: payload.method,
            signature: payload.signature || '',
            verified: true
        };
        await storage.saveHeartbeat(heartbeat);
        return {
            success: true,
            data: heartbeat
        };
    } catch (error) {
        console.error('Heartbeat action error:', error);
        return {
            success: false,
            error: 'Failed to communicate with protocol network.'
        };
    }
}
async function getHeartbeatStatus(walletAddress) {
    try {
        const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
        const heartbeats = await storage.getAllHeartbeats();
        const settings = storage.getSettings();
        const intervalDays = settings.heartbeatInterval || 30;
        const gracePeriodDays = settings.gracePeriod || 14;
        if (heartbeats.length === 0) {
            const nextDue = Date.now() + intervalDays * 24 * 60 * 60 * 1000;
            const daysUntilDue = Math.ceil((nextDue - Date.now()) / (1000 * 60 * 60 * 24));
            return {
                success: true,
                status: 'active',
                lastHeartbeat: Date.now(),
                nextDue,
                daysUntilDue,
                isOverdue: false
            };
        }
        const lastHeartbeat = Math.max(...heartbeats.map((h)=>h.timestamp));
        const daysSince = (Date.now() - lastHeartbeat) / (1000 * 60 * 60 * 24);
        const nextDue = lastHeartbeat + intervalDays * 24 * 60 * 60 * 1000;
        let status = 'active';
        let isOverdue = false;
        if (daysSince > intervalDays + gracePeriodDays) {
            status = 'triggered';
            isOverdue = true;
        } else if (daysSince > intervalDays) {
            status = 'grace_period';
            isOverdue = true;
        }
        const daysUntilDue = Math.ceil((nextDue - Date.now()) / (1000 * 60 * 60 * 24));
        return {
            success: true,
            status,
            lastHeartbeat,
            nextDue,
            daysUntilDue,
            isOverdue,
            interval: intervalDays,
            gracePeriod: gracePeriodDays
        };
    } catch (error) {
        console.error('Status check error:', error);
        return {
            success: false,
            error: 'Network disconnected.'
        };
    }
}
async function getHeartbeatHistory(walletAddress) {
    try {
        const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
        const heartbeats = await storage.getAllHeartbeats();
        return {
            success: true,
            heartbeats
        };
    } catch (error) {
        console.error('History fetch error:', error);
        return {
            success: false,
            heartbeats: []
        };
    }
}
async function getHeartbeatSettings(walletAddress) {
    try {
        const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
        const settings = storage.getSettings();
        return {
            success: true,
            interval: settings.heartbeatInterval,
            gracePeriod: settings.gracePeriod
        };
    } catch (error) {
        console.error('Settings fetch error:', error);
        return {
            success: false,
            interval: 30,
            gracePeriod: 14
        };
    }
}
async function updateHeartbeatSettings(walletAddress, interval, gracePeriod) {
    try {
        const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
        storage.saveSettings({
            heartbeatInterval: interval,
            gracePeriod
        });
        return {
            success: true
        };
    } catch (error) {
        console.error('Settings update error:', error);
        return {
            success: false
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/key.js [app-client] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/server.js [app-client] (ecmascript) <export default as Server>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/key-round.js [app-client] (ecmascript) <export default as KeyRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$line$2d$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/line-chart.js [app-client] (ecmascript) <export default as LineChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$asset$2d$creation$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/asset-creation-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$heartbeat$2d$monitor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/heartbeat-monitor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$overview$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$beneficiaries$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$beneficiary$2d$manager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$status$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$subscription$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$wallet$2d$connect$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$mode$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$trial$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$shared$2d$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
;
function HomePage() {
    _s();
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    const [hasMounted, setHasMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            setHasMounted(true);
            const savedTab = localStorage.getItem('dwp_active_tab');
            if (savedTab) setActiveTab(savedTab);
        }
    }["HomePage.useEffect"], []);
    const handleTabChange = (val)=>{
        setActiveTab(val);
        localStorage.setItem('dwp_active_tab', val);
    };
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0x742d35Cc6634C0532925a3b8D4C2C4e0C8b83c8e');
    const [appState, setAppState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isConnecting, setIsConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWalletModal, setShowWalletModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
    // --- Persistence Logic ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            const checkConnection = {
                "HomePage.useEffect.checkConnection": ()=>{
                    const storedConnection = localStorage.getItem('dwp_wallet_connected');
                    if (storedConnection === 'true') {
                        const storedAddress = localStorage.getItem('dwp_wallet_address');
                        if (storedAddress) setAddress(storedAddress);
                        setIsConnected(true);
                    } else {
                        setIsLoading(false);
                    }
                }
            }["HomePage.useEffect.checkConnection"];
            checkConnection();
        }
    }["HomePage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            if (isConnected) {
                loadAppState();
                const interval = setInterval(loadAppState, 10000);
                return ({
                    "HomePage.useEffect": ()=>clearInterval(interval)
                })["HomePage.useEffect"];
            }
        }
    }["HomePage.useEffect"], [
        isConnected
    ]);
    const loadAppState = async ()=>{
        try {
            const state = await storage.getAppState();
            setAppState(state);
        } catch (error) {
            console.error('Failed to load app state:', error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleConnect = ()=>{
        setShowWalletModal(true);
    };
    const handleWalletConnect = (walletAddress)=>{
        setIsConnecting(true);
        setTimeout(()=>{
            setIsConnected(true);
            localStorage.setItem('dwp_wallet_connected', 'true');
            localStorage.setItem('dwp_wallet_address', walletAddress);
            setAddress(walletAddress);
            setIsConnecting(false);
            setShowWalletModal(false);
        }, 2000);
    };
    const handleDisconnect = ()=>{
        setIsConnected(false);
        localStorage.removeItem('dwp_wallet_connected');
        localStorage.removeItem('dwp_wallet_address');
    };
    const getHeartbeatStatusInfo = ()=>{
        if (!appState) return {
            status: 'Unknown',
            color: 'gray',
            lastTime: 'Never'
        };
        const now = Date.now();
        const daysSinceLastHeartbeat = (now - appState.stats.lastHeartbeat) / (1000 * 60 * 60 * 24);
        if (daysSinceLastHeartbeat <= appState.settings.heartbeatInterval) {
            return {
                status: 'Active',
                color: 'green',
                lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString()
            };
        } else if (daysSinceLastHeartbeat <= appState.settings.heartbeatInterval + appState.settings.gracePeriod) {
            return {
                status: 'Grace Period',
                color: 'yellow',
                lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString()
            };
        } else {
            return {
                status: 'Overdue',
                color: 'red',
                lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString()
            };
        }
    };
    const getSystemStatusInfo = ()=>{
        if (!appState) return {
            status: 'Unknown',
            color: 'gray'
        };
        switch(appState.stats.systemStatus){
            case 'secure':
                return {
                    status: 'Secure',
                    color: 'green'
                };
            case 'warning':
                return {
                    status: 'Warning',
                    color: 'yellow'
                };
            case 'error':
                return {
                    status: 'Error',
                    color: 'red'
                };
            default:
                return {
                    status: 'Unknown',
                    color: 'gray'
                };
        }
    };
    const defaultTransition = {
        duration: 0.8,
        ease: "easeOut"
    };
    // Mock Activity Log for the Overview to make it look active and dense
    const mockActivities = [
        {
            type: 'heartbeat',
            title: 'Heartbeat Signature Verified',
            time: '2 hours ago',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                className: "w-4 h-4 text-green-400"
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                lineNumber: 155,
                columnNumber: 92
            }, this)
        },
        {
            type: 'asset',
            title: 'Encrypted Payload "Cold Wallet Seeds" synced to IPFS',
            time: '1 day ago',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"], {
                className: "w-4 h-4 text-[#2b52ff]"
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                lineNumber: 156,
                columnNumber: 110
            }, this)
        },
        {
            type: 'security',
            title: 'Protocol Quorum Status: 5/5 Shards Healthy',
            time: '2 days ago',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                className: "w-4 h-4 text-purple-400"
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                lineNumber: 157,
                columnNumber: 104
            }, this)
        },
        {
            type: 'beneficiary',
            title: 'Added "Legal Counsel" to Beneficiary Matrix',
            time: '5 days ago',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                className: "w-4 h-4 text-orange-400"
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                lineNumber: 158,
                columnNumber: 108
            }, this)
        }
    ];
    if (!hasMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#080a0f]"
        }, void 0, false, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
            lineNumber: 162,
            columnNumber: 12
        }, this);
    // Empty shell while mounting
    }
    if (!isConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "min-h-screen bg-[#080a0f] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "sticky top-0 z-50 bg-[#080a0f]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-3 group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                        className: "w-8 h-8"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-xl tracking-tight hidden sm:block",
                                    children: "DeadMan Protocol"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/features",
                                    className: "text-slate-400 hover:text-white transition-colors text-sm font-medium",
                                    children: "Features"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/docs",
                                    className: "text-slate-400 hover:text-white transition-colors text-sm font-medium",
                                    children: "Documentation"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/security",
                                    className: "text-slate-400 hover:text-white transition-colors text-sm font-medium",
                                    children: "Security"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleConnect,
                            disabled: isConnecting,
                            className: "bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)] disabled:opacity-50 flex items-center",
                            children: [
                                isConnecting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: "w-4 h-4 mr-2 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 29
                                }, this) : null,
                                isConnecting ? 'Connecting...' : 'Launch App'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "flex-1 flex flex-col relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "relative pt-24 pb-20 px-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[85vh]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[#1152d4]/10 blur-[120px] rounded-full pointer-events-none -z-10"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 30
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: defaultTransition,
                                    className: "max-w-4xl mx-auto space-y-8 relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-flex items-center px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold tracking-wide text-blue-100/80 uppercase",
                                                    children: "Secure • Decentralized • Trustless"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-slate-100",
                                            children: [
                                                "Your Digital Legacy,",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-gradient-to-r from-[#1152d4] to-[#8b5cf6] bg-clip-text text-transparent",
                                                    children: "Protected Forever."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed",
                                            children: "Decentralized asset inheritance secured by smart contracts and zero-knowledge encryption. Built for the future of finance."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col sm:flex-row items-center justify-center gap-4 pt-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleConnect,
                                                    className: "w-full sm:w-auto px-8 py-4 bg-[#1152d4] text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(17,82,212,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(17,82,212,0.6)] transition-all",
                                                    children: "Access Protocol"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/features",
                                                    className: "w-full sm:w-auto px-8 py-4 bg-white/[0.03] border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-md flex justify-center",
                                                    children: "Read Specifications"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center items-center gap-8 text-xs font-semibold tracking-wider text-slate-500 mt-12 uppercase",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                            className: "w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                            lineNumber: 229,
                                                            columnNumber: 53
                                                        }, this),
                                                        " AES-256-GCM"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"], {
                                                            className: "w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                            lineNumber: 230,
                                                            columnNumber: 53
                                                        }, this),
                                                        " IPFS Storage"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$line$2d$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__["LineChart"], {
                                                            className: "w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 53
                                                        }, this),
                                                        " Polygon Network"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 228,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "px-6 py-20 relative z-10 border-t border-white/5 bg-[#05070a]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-12 max-w-6xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-3 text-center md:text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#1152d4] font-bold tracking-widest text-xs uppercase",
                                                children: "Security Protocol"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl md:text-5xl font-bold text-slate-100 tracking-tight",
                                                children: "Battle-Tested Architecture"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 20
                                                },
                                                whileInView: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    delay: 0.1,
                                                    duration: 0.5
                                                },
                                                className: "bg-white/[0.02] backdrop-blur-xl p-10 rounded-3xl flex flex-col gap-6 border border-white/5 hover:border-[#1152d4]/50 hover:bg-white/[0.04] transition-all group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-14 h-14 rounded-2xl bg-[#1152d4]/10 flex items-center justify-center text-[#1152d4] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(17,82,212,0.3)] transition-all",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            className: "w-7 h-7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                            lineNumber: 253,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-2xl font-bold text-slate-100",
                                                                children: "Zero Trust Architecture"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                                lineNumber: 256,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-400 leading-relaxed",
                                                                children: "End-to-end encryption with zero-knowledge proofs ensuring privacy remains absolute. Servers never see plaintext."
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                                lineNumber: 257,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 20
                                                },
                                                whileInView: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    delay: 0.2,
                                                    duration: 0.5
                                                },
                                                className: "bg-white/[0.02] backdrop-blur-xl p-10 rounded-3xl flex flex-col gap-6 border border-white/5 hover:border-[#8b5cf6]/50 hover:bg-white/[0.04] transition-all group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-14 h-14 rounded-2xl bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                                            className: "w-7 h-7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                            lineNumber: 269,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-2xl font-bold text-slate-100",
                                                                children: "Shamir Secret Sharing"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                                lineNumber: 272,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-400 leading-relaxed",
                                                                children: "Distributed key security via advanced secret sharing protocols across decentralized nodes. No single point of failure."
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 20
                                                },
                                                whileInView: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    delay: 0.3,
                                                    duration: 0.5
                                                },
                                                className: "bg-white/[0.02] backdrop-blur-xl p-10 rounded-3xl flex flex-col gap-6 border border-white/5 hover:border-[#10b981]/50 hover:bg-white/[0.04] transition-all group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-14 h-14 rounded-2xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "w-7 h-7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-2xl font-bold text-slate-100",
                                                                children: "Automated Execution"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                                lineNumber: 288,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-400 leading-relaxed",
                                                                children: "Precision-engineered heartbeat smart contracts trigger asset transfer automatically upon verification of life decay."
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "px-6 py-24 relative overflow-hidden bg-[#080a0f]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-white/[0.02] border border-[#1152d4]/20 relative p-10 md:p-16 backdrop-blur-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 right-0 w-96 h-96 bg-[#1152d4]/20 blur-[100px] pointer-events-none -z-10"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 299,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-0 w-96 h-96 bg-[#8b5cf6]/10 blur-[100px] pointer-events-none -z-10"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-w-2xl space-y-6 relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-4xl md:text-5xl font-black text-white tracking-tight",
                                                children: "Secure Your Future Today"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl text-slate-400 leading-relaxed",
                                                children: "Join users who trust DeadMan Protocol to secure their digital legacy on-chain."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleConnect,
                                                    className: "w-full sm:w-auto px-8 py-4 bg-white text-[#080a0f] rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center",
                                                    children: [
                                                        "Connect Wallet ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            className: "w-5 h-5 ml-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 36
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                            lineNumber: 297,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$shared$2d$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SharedFooter"], {}, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$wallet$2d$connect$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnectModal"], {
                    isOpen: showWalletModal,
                    onClose: ()=>setShowWalletModal(false),
                    onConnect: handleWalletConnect,
                    isConnecting: isConnecting
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                    lineNumber: 318,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
            lineNumber: 167,
            columnNumber: 7
        }, this);
    }
    // Dashboard Interface (Connected State)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#050a1a] text-slate-50 selection:bg-[#2b52ff]/30 font-sans flex flex-col relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "sticky top-0 z-50 bg-[#050a1a]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-3 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[#2b52ff] flex items-center justify-center group-hover:scale-110 transition-transform",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                    className: "w-8 h-8"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-xl tracking-tight hidden sm:block",
                                children: "DeadMan Protocol"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/features",
                                className: "text-slate-400 hover:text-white transition-colors text-sm font-medium",
                                children: "Features"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/docs",
                                className: "text-slate-400 hover:text-white transition-colors text-sm font-medium",
                                children: "Documentation"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/security",
                                className: "text-slate-400 hover:text-white transition-colors text-sm font-medium",
                                children: "Security"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                        lineNumber: 339,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDisconnect,
                        className: "border border-red-500/30 text-red-400 hover:bg-red-500/10 px-5 py-2 rounded-full font-bold text-sm transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]",
                        children: "Disconnect"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 space-y-8 mt-8 mb-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$trial$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrialBanner"], {}, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-center justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-6 shadow-2xl backdrop-blur-sm relative z-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#2b52ff]/10 blur-3xl rounded-full pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4 mb-4 sm:mb-0 relative z-10 w-full sm:w-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#2b52ff]/20 to-[#00d2ff]/20 rounded-xl border border-[#2b52ff]/30 shadow-[0_0_15px_rgba(43,82,255,0.2)]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__["KeyRound"], {
                                            className: "h-6 w-6 text-[#2b52ff]"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 360,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70",
                                                children: "Encrypted Vault Instance"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center text-xs font-medium text-blue-100/60 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Connected Account: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-white ml-2 bg-white/5 px-2 py-0.5 rounded border border-white/10",
                                                        children: address
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 36
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                                lineNumber: 367,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 359,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$mode$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModeIndicator"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                        value: activeTab,
                        onValueChange: handleTabChange,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                className: "bg-white/[0.03] border border-white/10 p-1 rounded-xl w-full grid grid-cols-2 md:grid-cols-6 gap-1 shadow-lg backdrop-blur-md",
                                children: [
                                    'overview',
                                    'assets',
                                    'beneficiaries',
                                    'heartbeat',
                                    'subscription',
                                    'status'
                                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                        value: tab,
                                        className: "capitalize data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white text-slate-400 rounded-lg transition-all font-semibold",
                                        children: tab
                                    }, tab, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "overview",
                                className: "mt-6",
                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center py-24 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: "h-8 w-8 text-[#2b52ff] animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 397,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-blue-100/60 font-medium",
                                            children: "Decrypting Vault Telemetry..."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 396,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$overview$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OverviewDashboard"], {
                                        onNavigate: setActiveTab
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 402,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 401,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "assets",
                                className: "mt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$asset$2d$creation$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetCreationForm"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 408,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "beneficiaries",
                                className: "mt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$beneficiaries$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BeneficiariesDashboard"], {
                                    onNavigate: setActiveTab
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 412,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "beneficiaries_manage",
                                className: "mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6 flex items-center bg-white/[0.02] border border-white/5 rounded-2xl p-4 shadow-xl",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTab('beneficiaries'),
                                            className: "text-slate-400 hover:text-white transition-colors flex items-center font-medium gap-2 px-4 py-2 hover:bg-white/5 rounded-xl",
                                            children: "← Return to Beneficiaries Overview"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                            lineNumber: 418,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 417,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$beneficiary$2d$manager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BeneficiaryManager"], {}, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 416,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "heartbeat",
                                className: "mt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$heartbeat$2d$monitor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartbeatMonitor"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "subscription",
                                className: "mt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$subscription$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubscriptionDashboard"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 433,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 432,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                value: "status",
                                className: "mt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$status$2d$dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusDashboard"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                    lineNumber: 437,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                                lineNumber: 436,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                lineNumber: 352,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$shared$2d$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SharedFooter"], {}, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$wallet$2d$connect$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnectModal"], {
                isOpen: showWalletModal,
                onClose: ()=>setShowWalletModal(false),
                onConnect: handleWalletConnect,
                isConnecting: isConnecting
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
                lineNumber: 444,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/app/page.tsx",
        lineNumber: 330,
        columnNumber: 5
    }, this);
}
_s(HomePage, "9Mc8/C6iiT3ohYOBlo1wUfpTMHI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Nmims_DeadMan%20Protocol_frontend_web_src_app_a2e7eaed._.js.map