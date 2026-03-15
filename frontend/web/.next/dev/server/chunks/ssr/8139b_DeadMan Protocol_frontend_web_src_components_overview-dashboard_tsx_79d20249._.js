module.exports = [
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OverviewDashboard",
    ()=>OverviewDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/BoltIcon.js [app-ssr] (ecmascript) <export default as BoltIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$FingerPrintIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FingerPrintIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/FingerPrintIcon.js [app-ssr] (ecmascript) <export default as FingerPrintIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/ShieldCheckIcon.js [app-ssr] (ecmascript) <export default as ShieldCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/AppContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function OverviewDashboard({ onNavigate }) {
    const { state, refreshState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refreshState();
    }, [
        refreshState
    ]);
    const beneficiaries = state?.beneficiaries || [];
    const heartbeats = state?.heartbeats || [];
    const settings = state?.settings;
    // Derive heartbeat status logically from AppState
    const lastHeartbeatMs = heartbeats.length > 0 ? Math.max(...heartbeats.map((h)=>h.timestamp)) : 0;
    const intervalMs = (settings?.heartbeatInterval || 30) * 24 * 60 * 60 * 1000;
    // Deactivated if never pushed or past interval
    const isActive = lastHeartbeatMs > 0 && Date.now() - lastHeartbeatMs <= intervalMs;
    const nextDeadlineStr = lastHeartbeatMs > 0 ? new Date(lastHeartbeatMs + intervalMs).toISOString() : '';
    const heartbeat = lastHeartbeatMs > 0 ? {
        lastHeartbeat: new Date(lastHeartbeatMs).toISOString(),
        isActive: isActive,
        nextDeadline: nextDeadlineStr
    } : null;
    const assets = state?.assets || [];
    const loading = false;
    const calculateVaultHealth = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        let health = 100;
        // Reduce health if no heartbeat
        if (!heartbeat?.isActive) health -= 30;
        // Reduce health if no assets
        if (assets.length === 0) health -= 20;
        // Reduce health if no beneficiaries
        if (beneficiaries.length === 0) health -= 20;
        return Math.max(health, 0);
    };
    const vaultHealth = calculateVaultHealth();
    const totalAssets = assets?.length || 0;
    const totalBeneficiaries = beneficiaries?.length || 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-auto min-h-[calc(100vh-120px)] w-full flex-col overflow-x-hidden text-slate-100 font-sans p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1440px] mx-auto w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex items-center justify-between overflow-hidden relative group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -right-4 -bottom-4 size-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-400 text-sm font-medium mb-1",
                                                children: "Vault Health"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 67,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-4xl font-bold tracking-tighter text-white",
                                                children: [
                                                    vaultHealth,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 68,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xs mt-2 flex items-center gap-1 font-semibold uppercase ${vaultHealth >= 80 ? 'text-green-400' : vaultHealth >= 50 ? 'text-yellow-400' : 'text-red-400'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 33
                                                    }, this),
                                                    " ",
                                                    vaultHealth >= 80 ? 'Optimal' : vaultHealth >= 50 ? 'Warning' : 'Critical'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 69,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 66,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative size-20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "size-full -rotate-90",
                                                viewBox: "0 0 36 36",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        className: "stroke-slate-800",
                                                        cx: "18",
                                                        cy: "18",
                                                        fill: "none",
                                                        r: "16",
                                                        strokeWidth: "3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        className: "stroke-blue-500",
                                                        cx: "18",
                                                        cy: "18",
                                                        fill: "none",
                                                        r: "16",
                                                        strokeDasharray: "100",
                                                        strokeDashoffset: 100 - vaultHealth,
                                                        strokeLinecap: "round",
                                                        strokeWidth: "3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 74,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex items-center justify-center glow-primary",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                                                    className: "text-blue-500 w-8 h-8"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 78,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 73,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm font-medium",
                                        children: "Encrypted Assets"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-end justify-between mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-3xl font-bold text-white",
                                                children: totalAssets
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 87,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1 h-8 items-end",
                                                children: [
                                                    ...Array(Math.min(totalAssets, 5))
                                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-1.5 bg-blue-500 rounded-full ${i === Math.min(totalAssets, 5) - 1 ? 'h-8 shadow-[0_0_10px_theme(colors.blue.500)]' : `h-${4 + i}`}`
                                                    }, i, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 88,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 86,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm font-medium",
                                        children: "Beneficiaries"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 97,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-end justify-between mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-3xl font-bold text-white tracking-tighter",
                                                children: totalBeneficiaries
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 99,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-400 text-sm font-medium",
                                                children: "Active"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 100,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 98,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                lineNumber: 96,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:w-2/3 flex flex-col gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-xl font-bold text-white",
                                                                children: "Protocol Pulse Timeline"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 112,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-400 text-sm mt-1",
                                                                children: "Proof of life cryptographic verifications over time"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 113,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-right",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl font-bold text-white tracking-tight",
                                                                children: heartbeats.length
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 116,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-400 text-sm font-medium mt-1",
                                                                children: "Total Pings Issued"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 117,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 110,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-[280px] w-full relative",
                                                children: [
                                                    ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : heartbeats.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-center justify-center h-full text-center px-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__["BoltIcon"], {
                                                                className: "w-16 h-16 text-slate-700 mb-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 128,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-500 font-medium",
                                                                children: "No structural pings recorded yet."
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 129,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-600 text-sm mt-1",
                                                                children: "Sign your first heartbeat on the network to initialize your protocol timeline."
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 130,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 37
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-full h-full overflow-visible",
                                                        viewBox: "0 0 800 280",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                        id: "gradient",
                                                                        x1: "0%",
                                                                        x2: "0%",
                                                                        y1: "0%",
                                                                        y2: "100%",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                offset: "0%",
                                                                                stopColor: "#8b5cf6",
                                                                                stopOpacity: "0.3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 136,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                offset: "100%",
                                                                                stopColor: "#8b5cf6",
                                                                                stopOpacity: "0"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 137,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                        lineNumber: 135,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                        id: "lineGradient",
                                                                        x1: "0%",
                                                                        x2: "100%",
                                                                        y1: "0%",
                                                                        y2: "0%",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                offset: "0%",
                                                                                stopColor: "#3b82f6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 140,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                offset: "100%",
                                                                                stopColor: "#8b5cf6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 141,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                        lineNumber: 139,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 134,
                                                                columnNumber: 41
                                                            }, this),
                                                            (()=>{
                                                                // Generate path based on actual heartbeat accumulation dates
                                                                const sortedHeartbeats = [
                                                                    ...heartbeats
                                                                ].sort((a, b)=>a.timestamp - b.timestamp);
                                                                const points = sortedHeartbeats.map((ping, index)=>({
                                                                        x: index / Math.max(sortedHeartbeats.length - 1, 1) * 800,
                                                                        y: 240 - index * (180 / Math.max(sortedHeartbeats.length - 1, 1))
                                                                    }));
                                                                if (points.length === 1) {
                                                                    points.unshift({
                                                                        x: 0,
                                                                        y: 260
                                                                    });
                                                                }
                                                                const pathD = points.map((p, i)=>i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`).join(' ');
                                                                const areaD = `${pathD} L800,280 L0,280 Z`;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: pathD,
                                                                            fill: "none",
                                                                            stroke: "url(#lineGradient)",
                                                                            strokeLinecap: "round",
                                                                            strokeWidth: "4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 165,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: areaD,
                                                                            fill: "url(#gradient)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 166,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        points.map((point, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                className: "shadow-[0_0_15px_theme(colors.purple.500)]",
                                                                                cx: point.x,
                                                                                cy: point.y,
                                                                                fill: i === points.length - 1 ? "#ec4899" : "#8b5cf6",
                                                                                r: "6",
                                                                                stroke: "#fff",
                                                                                strokeWidth: "2"
                                                                            }, i, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 168,
                                                                                columnNumber: 57
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true);
                                                            })()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Genesis"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Pulse Evolution"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Active Target"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 85
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 121,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 109,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between px-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-bold text-white",
                                                    children: "Recent Activity"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 192,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-3",
                                                children: ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : assets.length === 0 && !heartbeat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-900/40 p-8 rounded-2xl border border-slate-800 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500",
                                                        children: "No activity yet. Start by creating assets or signing a heartbeat."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 37
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        heartbeat?.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "size-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__["BoltIcon"], {
                                                                                className: "h-6 w-6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 210,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 209,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-sm font-bold text-white",
                                                                                    children: "Heartbeat Active"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                    lineNumber: 213,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-slate-400 mt-0.5",
                                                                                    children: [
                                                                                        "Last verified: ",
                                                                                        new Date(heartbeat.lastHeartbeat).toLocaleDateString()
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                    lineNumber: 214,
                                                                                    columnNumber: 57
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 212,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 208,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-right",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-medium text-green-500 uppercase",
                                                                        children: "Active"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                        lineNumber: 218,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 217,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 45
                                                        }, this),
                                                        assets.slice(0, 2).map((asset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                                                                                    className: "h-6 w-6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                    lineNumber: 227,
                                                                                    columnNumber: 57
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 226,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm font-bold text-white",
                                                                                        children: "Asset Encrypted"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                        lineNumber: 230,
                                                                                        columnNumber: 57
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs text-slate-400 mt-0.5",
                                                                                        children: asset.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                        lineNumber: 231,
                                                                                        columnNumber: 57
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 229,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                        lineNumber: 225,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-medium text-slate-500 uppercase",
                                                                            children: new Date(asset.createdAt).toLocaleDateString()
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 235,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                        lineNumber: 234,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, asset._id, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 45
                                                            }, this))
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 195,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 191,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                lineNumber: 107,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:w-1/3 flex flex-col gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group rounded-3xl p-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-blue-500/5 blur-xl rounded-3xl opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 251,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative bg-slate-900/80 rounded-[22px] p-8 border border-slate-800/50 h-full backdrop-blur-xl",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-8",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-lg font-bold text-white",
                                                                children: "Dead Man's Switch"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 254,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `${heartbeat?.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-red-500/10 text-red-400 border-red-500/20'} border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `w-1.5 h-1.5 rounded-full ${heartbeat?.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'} mr-2`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                        lineNumber: 256,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    heartbeat?.isActive ? 'Active' : 'Inactive'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-center py-6",
                                                        children: heartbeat?.nextDeadline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tighter mb-2",
                                                                    children: (()=>{
                                                                        const now = new Date().getTime();
                                                                        const deadline = new Date(heartbeat.nextDeadline).getTime();
                                                                        const diff = deadline - now;
                                                                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                                                                        const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                                                                        const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
                                                                        return `${days}d ${hours}h ${minutes}m`;
                                                                    })()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 264,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-slate-400 text-sm font-medium",
                                                                    children: "Until next required heartbeat"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-3xl font-bold text-slate-500 tracking-tighter mb-2",
                                                                    children: "No Heartbeat"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 279,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-slate-400 text-sm font-medium",
                                                                    children: "Sign your first heartbeat"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 280,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-8 space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>onNavigate?.('heartbeat'),
                                                                className: "w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$FingerPrintIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FingerPrintIcon$3e$__["FingerPrintIcon"], {
                                                                        className: "w-5 h-5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                        lineNumber: 290,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    "Sign Heartbeat Now"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>onNavigate?.('heartbeat'),
                                                                className: "w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-700 transition-colors text-sm",
                                                                children: "Edit Trigger Settings"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 293,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 252,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 250,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900/40 rounded-3xl p-8 border border-slate-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-lg font-bold text-white",
                                                        children: "Beneficiaries"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20",
                                                        children: [
                                                            totalBeneficiaries,
                                                            " Total"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 305,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 mb-8",
                                                children: ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : beneficiaries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center text-slate-500 py-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mb-2",
                                                            children: "No beneficiaries added yet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs",
                                                            children: "Add beneficiaries to distribute your assets"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 37
                                                }, this) : beneficiaries.slice(0, 2).map((beneficiary, index)=>{
                                                    const colors = [
                                                        'from-blue-500 to-purple-500',
                                                        'from-emerald-500 to-teal-500',
                                                        'from-orange-500 to-red-500',
                                                        'from-pink-500 to-rose-500'
                                                    ];
                                                    const textColors = [
                                                        'text-blue-400',
                                                        'text-emerald-400',
                                                        'text-orange-400',
                                                        'text-pink-400'
                                                    ];
                                                    const initials = beneficiary.name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-3 rounded-xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `size-10 rounded-full bg-gradient-to-tr ${colors[index % colors.length]} flex items-center justify-center text-white font-bold text-sm shadow-inner`,
                                                                    children: initials
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 339,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-bold text-white text-sm",
                                                                            children: beneficiary.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 343,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: `text-xs ${textColors[index % textColors.length]} font-medium`,
                                                                            children: "100% Share"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 344,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 342,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                            lineNumber: 338,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, beneficiary.id, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 312,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onNavigate?.('beneficiaries'),
                                                className: "w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-sm border border-slate-700",
                                                children: "Manage Beneficiaries"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 355,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 304,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                lineNumber: 248,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                        lineNumber: 105,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-[-10%] left-[-10%] size-[500px] bg-blue-600/10 rounded-full blur-[120px]"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                        lineNumber: 368,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-[-10%] right-[-10%] size-[600px] bg-purple-600/10 rounded-full blur-[150px]"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                        lineNumber: 369,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                lineNumber: 367,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=8139b_DeadMan%20Protocol_frontend_web_src_components_overview-dashboard_tsx_79d20249._.js.map