(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/cn.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
const TabsContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({});
const Tabs = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, value, onValueChange, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsContext.Provider, {
        value: {
            value,
            onValueChange
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/ui/tabs.tsx",
            lineNumber: 14,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/ui/tabs.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Tabs;
Tabs.displayName = "Tabs";
const TabsList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-10 items-center justify-center rounded-md bg-white/[0.03] p-1 text-slate-400 border border-white/10", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/ui/tabs.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = TabsList;
TabsList.displayName = "TabsList";
const TabsTrigger = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = _s(({ className, value, onClick, ...props }, ref)=>{
    _s();
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](TabsContext);
    const isActive = context.value === value;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        onClick: (e)=>{
            context.onValueChange?.(value);
            onClick?.(e);
        },
        "data-state": isActive ? "active" : "inactive",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:hover:bg-white/5", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=")), "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
_c5 = TabsTrigger;
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = /*#__PURE__*/ _s1(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = _s1(({ className, value, ...props }, ref)=>{
    _s1();
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](TabsContext);
    const isActive = context.value === value;
    if (!isActive) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        "data-state": isActive ? "active" : "inactive",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/ui/tabs.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=")), "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
_c7 = TabsContent;
TabsContent.displayName = "TabsContent";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Tabs$React.forwardRef");
__turbopack_context__.k.register(_c1, "Tabs");
__turbopack_context__.k.register(_c2, "TabsList$React.forwardRef");
__turbopack_context__.k.register(_c3, "TabsList");
__turbopack_context__.k.register(_c4, "TabsTrigger$React.forwardRef");
__turbopack_context__.k.register(_c5, "TabsTrigger");
__turbopack_context__.k.register(_c6, "TabsContent$React.forwardRef");
__turbopack_context__.k.register(_c7, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryModal",
    ()=>CategoryModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/check-circle-2.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$category$2d$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/category-handlers.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CategoryModal({ isOpen, onClose, category, onSubmit }) {
    _s();
    const [template, setTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryModal.useEffect": ()=>{
            if (isOpen && category) {
                try {
                    console.log('🔄 Initializing category modal for:', category);
                    const tmpl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$category$2d$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTemplate"])(category);
                    console.log('✅ Template loaded:', tmpl.label, 'with', tmpl.fields.length, 'fields');
                    setTemplate(tmpl);
                    setFormData({});
                    setSelectedFile(null);
                    setErrors([]);
                    setShowSuccess(false);
                } catch (error) {
                    console.error('❌ Failed to initialize category modal:', error);
                    setErrors([
                        'Initialization failed. Please try again.'
                    ]);
                }
            }
        }
    }["CategoryModal.useEffect"], [
        isOpen,
        category
    ]);
    const handleFieldChange = (fieldName, value)=>{
        setFormData((prev)=>({
                ...prev,
                [fieldName]: value
            }));
        setErrors([]); // Clear errors on change
    };
    const handleFileSelect = (event)=>{
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const handleSubmit = async ()=>{
        if (!template) return;
        // Validate
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$category$2d$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateCategoryData"])(template, formData);
        if (!validation.valid) {
            setErrors(validation.errors);
            return;
        }
        setIsSubmitting(true);
        setErrors([]);
        try {
            console.log('📝 Form data:', formData);
            // Generate structured data
            const structuredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$category$2d$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateStructuredData"])(template, formData);
            console.log('📄 Generated structured data length:', structuredData.length);
            // Get asset name from first field or use template label
            const assetName = formData[template.fields[0]?.name] || `${template.label} - ${new Date().toLocaleDateString()}`;
            console.log('🏷️ Asset name:', assetName);
            await onSubmit({
                name: assetName,
                type: category,
                structuredData,
                file: selectedFile || undefined
            });
            setShowSuccess(true);
            setTimeout(()=>{
                onClose();
                setFormData({});
                setSelectedFile(null);
            }, 1500);
        } catch (error) {
            console.error('❌ Submit error:', error);
            const errorMessage = error?.message || 'Failed to save asset. Please try again.';
            setErrors([
                errorMessage
            ]);
        } finally{
            setIsSubmitting(false);
        }
    };
    const renderField = (field)=>{
        const value = formData[field.name] || '';
        const fieldClasses = "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all shadow-inner";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block text-xs uppercase tracking-widest text-slate-400 font-bold",
                    children: [
                        field.label,
                        field.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-red-400 ml-1",
                            children: "*"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 115,
                            columnNumber: 30
                        }, this),
                        field.encrypted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                            className: "inline-block w-3 h-3 ml-2 text-yellow-400"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 116,
                            columnNumber: 31
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this),
                field.type === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    value: value,
                    onChange: (e)=>handleFieldChange(field.name, e.target.value),
                    placeholder: field.placeholder,
                    className: fieldClasses
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this),
                field.type === 'password' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    value: value,
                    onChange: (e)=>handleFieldChange(field.name, e.target.value),
                    placeholder: field.placeholder,
                    className: `${fieldClasses} font-mono`
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, this),
                field.type === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    value: value,
                    onChange: (e)=>handleFieldChange(field.name, e.target.value),
                    placeholder: field.placeholder,
                    className: fieldClasses
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                    lineNumber: 140,
                    columnNumber: 11
                }, this),
                field.type === 'textarea' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    value: value,
                    onChange: (e)=>handleFieldChange(field.name, e.target.value),
                    placeholder: field.placeholder,
                    rows: field.encrypted ? 4 : 3,
                    className: `${fieldClasses} resize-none ${field.encrypted ? 'font-mono' : ''}`
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                    lineNumber: 150,
                    columnNumber: 11
                }, this),
                field.type === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: value,
                    onChange: (e)=>handleFieldChange(field.name, e.target.value),
                    className: fieldClasses,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: field.placeholder
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this),
                        field.options?.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, this),
                field.helpText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-slate-500 flex items-start gap-1 mt-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                            className: "w-3 h-3 mt-0.5 flex-shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: field.helpText
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                    lineNumber: 173,
                    columnNumber: 11
                }, this)
            ]
        }, field.name, true, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this);
    };
    if (!template) return null;
    const Icon = template.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            onClick: onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.9,
                    opacity: 0
                },
                animate: {
                    scale: 1,
                    opacity: 1
                },
                exit: {
                    scale: 0.9,
                    opacity: 0
                },
                onClick: (e)=>e.stopPropagation(),
                className: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${template.bgColor} border-b border-white/10 p-6`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-12 h-12 rounded-xl ${template.bgColor} flex items-center justify-center ${template.color}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "w-6 h-6"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                                lineNumber: 208,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold text-white",
                                                    children: template.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400 mt-1",
                                                    children: template.instructions
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                    lineNumber: 206,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                        lineNumber: 219,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                    lineNumber: 215,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 205,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                        lineNumber: 204,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "bg-green-500/10 border-b border-green-500/20 p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 text-green-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                        lineNumber: 234,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium",
                                        children: "Asset saved successfully!"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                        lineNumber: 235,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                lineNumber: 233,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 227,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                        lineNumber: 225,
                        columnNumber: 13
                    }, this),
                    errors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-500/10 border-b border-red-500/20 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3 text-red-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-5 h-5 mt-0.5 flex-shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                    lineNumber: 245,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: errors.map((error, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: error
                                        }, idx, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                            lineNumber: 248,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                    lineNumber: 246,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 244,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                        lineNumber: 243,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-500/5 border border-blue-500/10 rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-widest text-blue-400 font-bold mb-2",
                                        children: "Examples"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: template.examples.map((example, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full",
                                                children: example
                                            }, idx, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                                lineNumber: 262,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                        lineNumber: 260,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this),
                            template.fields.map((field)=>renderField(field)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs uppercase tracking-widest text-slate-400 font-bold",
                                        children: "Attach File (Optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                onChange: handleFileSelect,
                                                className: "hidden",
                                                id: "category-file-upload"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                                lineNumber: 281,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "category-file-upload",
                                                className: "flex items-center justify-center gap-3 w-full bg-black/40 border border-white/10 border-dashed rounded-xl px-4 py-6 text-sm text-slate-400 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: selectedFile ? selectedFile.name : 'Click to upload supporting document'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                                lineNumber: 287,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                lineNumber: 276,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                        lineNumber: 256,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-white/10 p-6 bg-black/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            className: "inline-block w-3 h-3 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                            lineNumber: 302,
                                            columnNumber: 19
                                        }, this),
                                        "All sensitive data is encrypted with AES-256-GCM"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                    lineNumber: 301,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onClose,
                                            disabled: isSubmitting,
                                            className: "px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all disabled:opacity-50",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                            lineNumber: 306,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSubmit,
                                            disabled: isSubmitting,
                                            className: "px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20",
                                            children: isSubmitting ? 'Encrypting...' : 'Save Securely'
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                            lineNumber: 313,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                                    lineNumber: 305,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                            lineNumber: 300,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                        lineNumber: 299,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
                lineNumber: 196,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
            lineNumber: 189,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/category-modal.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
_s(CategoryModal, "wdEMTrx3qut3IfXRpccfENw8AoM=");
_c = CategoryModal;
var _c;
__turbopack_context__.k.register(_c, "CategoryModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmationDialog",
    ()=>ConfirmationDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/alert-triangle.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ConfirmationDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) {
    _s();
    // Prevent body scroll when dialog is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmationDialog.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return ({
                "ConfirmationDialog.useEffect": ()=>{
                    document.body.style.overflow = 'unset';
                }
            })["ConfirmationDialog.useEffect"];
        }
    }["ConfirmationDialog.useEffect"], [
        isOpen
    ]);
    // Handle ESC key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmationDialog.useEffect": ()=>{
            const handleEsc = {
                "ConfirmationDialog.useEffect.handleEsc": (e)=>{
                    if (e.key === 'Escape' && isOpen) {
                        onClose();
                    }
                }
            }["ConfirmationDialog.useEffect.handleEsc"];
            window.addEventListener('keydown', handleEsc);
            return ({
                "ConfirmationDialog.useEffect": ()=>window.removeEventListener('keydown', handleEsc)
            })["ConfirmationDialog.useEffect"];
        }
    }["ConfirmationDialog.useEffect"], [
        isOpen,
        onClose
    ]);
    const typeStyles = {
        danger: {
            gradient: 'from-red-600 to-rose-600',
            glow: 'shadow-[0_0_50px_rgba(239,68,68,0.3)]',
            iconBg: 'bg-red-500/20',
            iconColor: 'text-red-400',
            buttonBg: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500',
            buttonGlow: 'shadow-[0_0_30px_rgba(239,68,68,0.4)]'
        },
        warning: {
            gradient: 'from-amber-600 to-orange-600',
            glow: 'shadow-[0_0_50px_rgba(245,158,11,0.3)]',
            iconBg: 'bg-amber-500/20',
            iconColor: 'text-amber-400',
            buttonBg: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
            buttonGlow: 'shadow-[0_0_30px_rgba(245,158,11,0.4)]'
        },
        info: {
            gradient: 'from-blue-600 to-cyan-600',
            glow: 'shadow-[0_0_50px_rgba(59,130,246,0.3)]',
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            buttonBg: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500',
            buttonGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.4)]'
        }
    };
    const styles = typeStyles[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: onClose,
                    className: "fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 flex items-center justify-center z-[101] p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.9,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            scale: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            scale: 0.9,
                            y: 20
                        },
                        transition: {
                            type: 'spring',
                            duration: 0.5
                        },
                        className: `relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border-2 border-slate-700/50 ${styles.glow} overflow-hidden`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 opacity-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `absolute inset-0 bg-gradient-to-br ${styles.gradient} animate-pulse`
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                    lineNumber: 105,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 transition-all duration-300 hover:scale-110 z-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-5 w-5 text-slate-300"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                    lineNumber: 113,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            scale: 0
                                        },
                                        animate: {
                                            scale: 1
                                        },
                                        transition: {
                                            delay: 0.1,
                                            type: 'spring',
                                            stiffness: 200
                                        },
                                        className: "flex justify-center mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${styles.iconBg} p-4 rounded-2xl border border-${type}-500/30`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: `h-12 w-12 ${styles.iconColor}`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                                lineNumber: 126,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                            lineNumber: 125,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                                        initial: {
                                            opacity: 0,
                                            y: 10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.2
                                        },
                                        className: "text-2xl font-bold text-center mb-3 text-white",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                        initial: {
                                            opacity: 0,
                                            y: 10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.3
                                        },
                                        className: "text-slate-300 text-center mb-8 leading-relaxed",
                                        children: message
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.4
                                        },
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onClose,
                                                className: "flex-1 px-6 py-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border-2 border-slate-600/50 hover:border-slate-500/50 text-slate-200 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                                                children: cancelText
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onConfirm();
                                                    onClose();
                                                },
                                                className: `flex-1 px-6 py-4 rounded-xl ${styles.buttonBg} ${styles.buttonGlow} text-white font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-2 border-transparent`,
                                                children: confirmText
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(ConfirmationDialog, "3ubReDTFssvu4DHeldAg55cW/CI=");
_c = ConfirmationDialog;
var _c;
__turbopack_context__.k.register(_c, "ConfirmationDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OverviewDashboard",
    ()=>OverviewDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/BoltIcon.js [app-client] (ecmascript) <export default as BoltIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$FingerPrintIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FingerPrintIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/FingerPrintIcon.js [app-client] (ecmascript) <export default as FingerPrintIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/ShieldCheckIcon.js [app-client] (ecmascript) <export default as ShieldCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/AppContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function OverviewDashboard({ onNavigate }) {
    _s();
    const { state, refreshState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OverviewDashboard.useEffect": ()=>{
            refreshState();
        }
    }["OverviewDashboard.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-auto min-h-[calc(100vh-120px)] w-full flex-col overflow-x-hidden text-slate-100 font-sans p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1440px] mx-auto w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex items-center justify-between overflow-hidden relative group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -right-4 -bottom-4 size-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-400 text-sm font-medium mb-1",
                                                children: "Vault Health"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 67,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xs mt-2 flex items-center gap-1 font-semibold uppercase ${vaultHealth >= 80 ? 'text-green-400' : vaultHealth >= 50 ? 'text-yellow-400' : 'text-red-400'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative size-20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "size-full -rotate-90",
                                                viewBox: "0 0 36 36",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex items-center justify-center glow-primary",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm font-medium",
                                        children: "Encrypted Assets"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-end justify-between mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-3xl font-bold text-white",
                                                children: totalAssets
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 87,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1 h-8 items-end",
                                                children: [
                                                    ...Array(Math.min(totalAssets, 5))
                                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm font-medium",
                                        children: "Beneficiaries"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                        lineNumber: 97,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-end justify-between mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-3xl font-bold text-white tracking-tighter",
                                                children: totalBeneficiaries
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 99,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:w-2/3 flex flex-col gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-xl font-bold text-white",
                                                                children: "Protocol Pulse Timeline"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 112,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-right",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl font-bold text-white tracking-tight",
                                                                children: heartbeats.length
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 116,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-[280px] w-full relative",
                                                children: [
                                                    ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : heartbeats.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-center justify-center h-full text-center px-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__["BoltIcon"], {
                                                                className: "w-16 h-16 text-slate-700 mb-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 128,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-500 font-medium",
                                                                children: "No structural pings recorded yet."
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 129,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-full h-full overflow-visible",
                                                        viewBox: "0 0 800 280",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                        id: "gradient",
                                                                        x1: "0%",
                                                                        x2: "0%",
                                                                        y1: "0%",
                                                                        y2: "100%",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                offset: "0%",
                                                                                stopColor: "#8b5cf6",
                                                                                stopOpacity: "0.3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 136,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                        id: "lineGradient",
                                                                        x1: "0%",
                                                                        x2: "100%",
                                                                        y1: "0%",
                                                                        y2: "0%",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                offset: "0%",
                                                                                stopColor: "#3b82f6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                lineNumber: 140,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
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
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: areaD,
                                                                            fill: "url(#gradient)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 166,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        points.map((point, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Genesis"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Pulse Evolution"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between px-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-3",
                                                children: ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : assets.length === 0 && !heartbeat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-900/40 p-8 rounded-2xl border border-slate-800 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        heartbeat?.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "size-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BoltIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BoltIcon$3e$__["BoltIcon"], {
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
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-sm font-bold text-white",
                                                                                    children: "Heartbeat Active"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                    lineNumber: 213,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-right",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                        assets.slice(0, 2).map((asset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
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
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm font-bold text-white",
                                                                                        children: "Asset Encrypted"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                                        lineNumber: 230,
                                                                                        columnNumber: 57
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:w-1/3 flex flex-col gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group rounded-3xl p-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-blue-500/5 blur-xl rounded-3xl opacity-50"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                lineNumber: 251,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative bg-slate-900/80 rounded-[22px] p-8 border border-slate-800/50 h-full backdrop-blur-xl",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-8",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-lg font-bold text-white",
                                                                children: "Dead Man's Switch"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                lineNumber: 254,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `${heartbeat?.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-red-500/10 text-red-400 border-red-500/20'} border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-center py-6",
                                                        children: heartbeat?.nextDeadline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-slate-400 text-sm font-medium",
                                                                    children: "Until next required heartbeat"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-3xl font-bold text-slate-500 tracking-tighter mb-2",
                                                                    children: "No Heartbeat"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 279,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-8 space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>onNavigate?.('heartbeat'),
                                                                className: "w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$FingerPrintIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FingerPrintIcon$3e$__["FingerPrintIcon"], {
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
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900/40 rounded-3xl p-8 border border-slate-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-lg font-bold text-white",
                                                        children: "Beneficiaries"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 mb-8",
                                                children: ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : beneficiaries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center text-slate-500 py-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mb-2",
                                                            children: "No beneficiaries added yet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-3 rounded-xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `size-10 rounded-full bg-gradient-to-tr ${colors[index % colors.length]} flex items-center justify-center text-white font-bold text-sm shadow-inner`,
                                                                    children: initials
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                    lineNumber: 339,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-bold text-white text-sm",
                                                                            children: beneficiary.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                                                                            lineNumber: 343,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-[-10%] left-[-10%] size-[500px] bg-blue-600/10 rounded-full blur-[120px]"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/overview-dashboard.tsx",
                        lineNumber: 368,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(OverviewDashboard, "PujJypx3OErGUlurEpNQrgtsdKk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = OverviewDashboard;
var _c;
__turbopack_context__.k.register(_c, "OverviewDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BeneficiariesDashboard",
    ()=>BeneficiariesDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserPlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlusIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/UserPlusIcon.js [app-client] (ecmascript) <export default as UserPlusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartPieIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartPieIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/ChartPieIcon.js [app-client] (ecmascript) <export default as ChartPieIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/UserGroupIcon.js [app-client] (ecmascript) <export default as UserGroupIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClockIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/ClockIcon.js [app-client] (ecmascript) <export default as ClockIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/ShieldCheckIcon.js [app-client] (ecmascript) <export default as ShieldCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$DocumentDuplicateIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDuplicateIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/DocumentDuplicateIcon.js [app-client] (ecmascript) <export default as DocumentDuplicateIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PencilSquareIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilSquareIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/PencilSquareIcon.js [app-client] (ecmascript) <export default as PencilSquareIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/TrashIcon.js [app-client] (ecmascript) <export default as TrashIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$InformationCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InformationCircleIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/InformationCircleIcon.js [app-client] (ecmascript) <export default as InformationCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/DocumentTextIcon.js [app-client] (ecmascript) <export default as DocumentTextIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-client] (ecmascript) <export default as CheckCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircleIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/XCircleIcon.js [app-client] (ecmascript) <export default as XCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/AppContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function BeneficiariesDashboard({ onNavigate }) {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const beneficiaries = state?.beneficiaries || [];
    const loading = false // Simplified since useApp handles hydration
    ;
    // Calculate mock total allocation since standard storage schema lacks sharePercentage
    // If we want exact percentages, we'll assign equal splits
    const mockSharePerPerson = beneficiaries.length > 0 ? Math.floor(100 / beneficiaries.length) : 0;
    const totalAllocation = beneficiaries.length > 0 ? beneficiaries.length * mockSharePerPerson : 0;
    const isFullyAllocated = beneficiaries.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-[calc(100vh-120px)] w-full flex flex-col overflow-x-hidden font-sans text-slate-100 p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 max-w-[1440px] mx-auto w-full space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-4xl font-black tracking-tight text-white mb-2",
                                        children: "Inheritance Beneficiaries"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 44,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 max-w-xl",
                                        children: "Configure the cryptographic distribution of your digital legacy. Assets are autonomously transferred via smart contract upon protocol triggers."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 45,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 43,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onNavigate?.('beneficiaries_manage'),
                                className: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserPlusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlusIcon$3e$__["UserPlusIcon"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 48,
                                        columnNumber: 25
                                    }, this),
                                    "Add New Beneficiary"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-4 -right-4 text-blue-500/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartPieIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartPieIcon$3e$__["ChartPieIcon"], {
                                            className: "w-24 h-24"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                            lineNumber: 56,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 55,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative size-24 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "size-full transform -rotate-90",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        className: "text-slate-800",
                                                        cx: "48",
                                                        cy: "48",
                                                        fill: "transparent",
                                                        r: "40",
                                                        stroke: "currentColor",
                                                        strokeWidth: "8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 60,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        className: isFullyAllocated ? "text-blue-500" : "text-yellow-500",
                                                        cx: "48",
                                                        cy: "48",
                                                        fill: "transparent",
                                                        r: "40",
                                                        stroke: "currentColor",
                                                        strokeDasharray: "251.2",
                                                        strokeDashoffset: 251.2 - 251.2 * totalAllocation / 100,
                                                        strokeWidth: "8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 61,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 59,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl font-bold text-white",
                                                    children: [
                                                        totalAllocation,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 73,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 58,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm font-medium uppercase tracking-wider",
                                        children: "Total Allocated"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 77,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 54,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-4 -right-4 text-purple-500/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"], {
                                            className: "w-28 h-28"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                            lineNumber: 82,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 81,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm font-medium uppercase tracking-wider mb-1",
                                        children: "Active Beneficiaries"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 84,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline gap-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-5xl font-black text-white",
                                            children: beneficiaries.length.toString().padStart(2, '0')
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                            lineNumber: 86,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 80,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-4 -right-4 text-cyan-500/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClockIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__["ClockIcon"], {
                                            className: "w-28 h-28"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                            lineNumber: 92,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 91,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm font-medium uppercase tracking-wider mb-1",
                                        children: "Protocol Status"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 94,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline gap-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-3xl font-black text-white",
                                            children: isFullyAllocated ? 'Ready' : 'Pending'
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                            lineNumber: 96,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 90,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-4 -right-4 text-emerald-500/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                                            className: "w-28 h-28"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                            lineNumber: 102,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 101,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-sm font-medium uppercase tracking-wider mb-1",
                                        children: "Security Status"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 104,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `size-3 flex-shrink-0 ${beneficiaries.length > 0 ? 'bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]' : 'bg-slate-600'} rounded-full`
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 106,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-white tracking-tight",
                                                children: beneficiaries.length > 0 ? 'Active' : 'Inactive'
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 107,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 105,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800",
                        children: ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : beneficiaries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"], {
                                    className: "w-16 h-16 text-slate-700 mx-auto mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-400 mb-2",
                                    children: "No beneficiaries added yet"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                    lineNumber: 119,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 text-sm",
                                    children: "Add your first beneficiary to start distributing your digital legacy"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                    lineNumber: 120,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                            lineNumber: 117,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-left border-collapse",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "bg-slate-800/40 border-b border-slate-700/50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500",
                                                    children: "Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500",
                                                    children: "Wallet Address"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500",
                                                    children: "Allocation"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500",
                                                    children: "Added"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 text-right",
                                                    children: "Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                            lineNumber: 126,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 125,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-slate-800",
                                        children: beneficiaries.map((b, index)=>{
                                            const colors = [
                                                'blue',
                                                'purple',
                                                'emerald',
                                                'orange',
                                                'pink'
                                            ];
                                            const color = colors[index % colors.length];
                                            const initials = b.name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2);
                                            const shortAddress = `${b.walletAddress.slice(0, 6)}...${b.walletAddress.slice(-4)}`;
                                            const sharePercentage = mockSharePerPerson;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-slate-800/30 transition-colors group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `size-10 rounded-full border-2 border-${color}-500/30 bg-${color}-500/10 flex items-center justify-center font-bold text-${color}-400 shadow-inner`,
                                                                    children: initials
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                    lineNumber: 146,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-bold text-white tracking-wide",
                                                                    children: b.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                    lineNumber: 149,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                            lineNumber: 145,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-6 font-mono text-sm text-slate-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: shortAddress
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                    lineNumber: 154,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "text-slate-600 hover:text-cyan-400 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$DocumentDuplicateIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentDuplicateIcon$3e$__["DocumentDuplicateIcon"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                        lineNumber: 156,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                    lineNumber: 155,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col gap-2 w-32",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-xs font-bold text-${color}-400`,
                                                                        children: [
                                                                            sharePercentage,
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                        lineNumber: 163,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                    lineNumber: 162,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-1.5 w-full bg-slate-800 rounded-full overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `h-full bg-${color}-500`,
                                                                        style: {
                                                                            width: `${sharePercentage}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                        lineNumber: 166,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                    lineNumber: 165,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                            lineNumber: 161,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 text-sm",
                                                            children: new Date(b.createdAt).toLocaleDateString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-6 text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>onNavigate?.('beneficiaries_manage'),
                                                                    className: "p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl text-blue-400 transition-all border border-blue-500/10",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PencilSquareIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilSquareIcon$3e$__["PencilSquareIcon"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                        lineNumber: 178,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>onNavigate?.('beneficiaries_manage'),
                                                                    className: "p-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl text-rose-400 transition-all border border-rose-500/10",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__["TrashIcon"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                        lineNumber: 181,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, b.id, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 143,
                                                columnNumber: 45
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 134,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 124,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                            lineNumber: 123,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                        lineNumber: 113,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 bg-slate-900/40 p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-slate-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_100%_50%,rgba(59,130,246,0.1),transparent_50%)]"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 197,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 size-32 flex-shrink-0 bg-slate-800/80 rounded-2xl border border-blue-500/20 flex items-center justify-center group overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                                            className: "w-16 h-16 text-blue-500 opacity-80"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                            lineNumber: 199,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 198,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$InformationCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InformationCircleIcon$3e$__["InformationCircleIcon"], {
                                                        className: "w-4 h-4 text-blue-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold uppercase tracking-widest text-blue-500",
                                                        children: "Protocol Logic"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 202,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-white tracking-tight",
                                                children: "Beneficiary Configuration Protocol"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 206,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-400 leading-relaxed text-sm",
                                                children: "DeadMan Protocol uses multi-sig validation combined with time-locked encryption. Upon a verified trigger event (e.g. wallet inactivity), the protocol's smart contracts autonomously distribute encrypted assets to beneficiaries."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 207,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 pt-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__["DocumentTextIcon"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 37
                                                        }, this),
                                                        " View Documentation"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 210,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 201,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 196,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 p-8 rounded-3xl flex flex-col justify-between border border-slate-800 border-l-4 border-l-cyan-500 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -right-4 top-10 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 219,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4 relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-lg font-bold text-white",
                                                children: "Security Checklist"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 221,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-start gap-3",
                                                        children: [
                                                            beneficiaries.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                                className: "w-5 h-5 text-emerald-500 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 41
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircleIcon$3e$__["XCircleIcon"], {
                                                                className: "w-5 h-5 text-slate-500 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                lineNumber: 227,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-sm font-medium ${beneficiaries.length > 0 ? 'text-slate-300' : 'text-slate-500'}`,
                                                                children: "Beneficiaries configured"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                lineNumber: 229,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-start gap-3",
                                                        children: [
                                                            isFullyAllocated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                                className: "w-5 h-5 text-emerald-500 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 41
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircleIcon$3e$__["XCircleIcon"], {
                                                                className: "w-5 h-5 text-slate-500 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                lineNumber: 237,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-sm font-medium ${isFullyAllocated ? 'text-slate-300' : 'text-slate-500'}`,
                                                                children: "Allocations total 100%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                lineNumber: 239,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-start gap-3 text-slate-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircleIcon$3e$__["XCircleIcon"], {
                                                                className: "w-5 h-5 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium",
                                                                children: "Emergency witness assigned"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                                lineNumber: 245,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                                lineNumber: 222,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 220,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full mt-8 py-3.5 bg-slate-800 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700 hover:text-cyan-400 text-slate-300 font-bold text-sm rounded-xl transition-all shadow-inner relative z-10",
                                        children: "Update Protocol Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                        lineNumber: 249,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                                lineNumber: 218,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                        lineNumber: 195,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none bg-[#0a0f1c]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-[-20%] left-[-10%] size-[800px] bg-blue-600/5 rounded-full blur-[150px]"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                    lineNumber: 258,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
                lineNumber: 257,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiaries-dashboard.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, this);
}
_s(BeneficiariesDashboard, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = BeneficiariesDashboard;
var _c;
__turbopack_context__.k.register(_c, "BeneficiariesDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BeneficiaryManager",
    ()=>BeneficiaryManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/pen-square.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/blockchain.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$confirmation$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/confirmation-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/SubscriptionContext.tsx [app-client] (ecmascript)");
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
;
;
function BeneficiaryManager() {
    _s();
    const { state, refreshState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const beneficiaries = state?.beneficiaries || [];
    const [showAddForm, setShowAddForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        walletAddress: ''
    });
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccessPopup, setShowSuccessPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteConfirmation, setDeleteConfirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        beneficiaryId: null,
        beneficiaryName: ''
    });
    const { subscription } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"])();
    const storage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!formData.name || !formData.email) return;
        // 1. Check subscription
        if (!subscription || subscription.status === 'expired') {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Subscription Expired', {
                description: 'Please upgrade to continue adding beneficiaries.'
            });
            return;
        }
        // 2. Enforce limits
        if (subscription.limits && subscription.beneficiariesCount !== undefined) {
            if (subscription.beneficiariesCount >= subscription.limits.beneficiaries) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Limit reached', {
                    description: `Your ${subscription.plan} plan allows up to ${subscription.limits.beneficiaries} beneficiaries.`
                });
                return;
            }
        }
        setIsSubmitting(true);
        try {
            // Step 1: Engage Decentralized Backend Wallet Config (if web3 presence exists)
            if (formData.walletAddress) {
                const txResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBeneficiary"])(formData.walletAddress);
                if (!txResult.success) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Decentralized Registry Failed: ${txResult.error}`);
                    return;
                }
            }
            const beneficiary = {
                id: editingId || storage.generateId(),
                name: formData.name,
                email: formData.email,
                walletAddress: formData.walletAddress,
                createdAt: editingId ? beneficiaries.find((b)=>b.id === editingId)?.createdAt || Date.now() : Date.now(),
                enabled: true
            };
            await storage.saveBeneficiary(beneficiary);
            await refreshState();
            // Step 2: Bridge to traditional Web2 Email Service via Next.js Server Route
            // This allows the 100% decentralized Web3 backend to still fire emails
            try {
                const emailReq = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        walletAddress: formData.walletAddress
                    })
                });
                if (!emailReq.ok) {
                    console.error('Failed to trigger background email bridge');
                }
            } catch (emailOutage) {
                console.error('Email Bridge Unavailable:', emailOutage);
            }
            // Reset form
            setFormData({
                name: '',
                email: '',
                walletAddress: ''
            });
            setShowAddForm(false);
            setEditingId(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Beneficiary Saved', {
                description: 'Global database synced successfully.'
            });
        } catch (error) {
            console.error('Failed to save beneficiary:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to save beneficiary');
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleEdit = (beneficiary)=>{
        setFormData({
            name: beneficiary.name,
            email: beneficiary.email,
            walletAddress: beneficiary.walletAddress
        });
        setEditingId(beneficiary.id);
        setShowAddForm(true);
    };
    const handleDelete = (id, name)=>{
        setDeleteConfirmation({
            isOpen: true,
            beneficiaryId: id,
            beneficiaryName: name
        });
    };
    const confirmDelete = async ()=>{
        if (!deleteConfirmation.beneficiaryId) return;
        try {
            await storage.deleteBeneficiary(deleteConfirmation.beneficiaryId);
            await refreshState();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Beneficiary deleted successfully');
            setDeleteConfirmation({
                isOpen: false,
                beneficiaryId: null,
                beneficiaryName: ''
            });
        } catch (error) {
            console.error('Failed to delete beneficiary:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to delete beneficiary');
        }
    };
    const handleCancel = ()=>{
        setFormData({
            name: '',
            email: '',
            walletAddress: ''
        });
        setShowAddForm(false);
        setEditingId(null);
    };
    const validateWalletAddress = (address)=>{
        // Basic Ethereum address validation
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    };
    const validateEmail = (email)=>{
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const isFormValid = ()=>{
        return formData.name.trim() !== '' && validateEmail(formData.email) && (!formData.walletAddress || validateWalletAddress(formData.walletAddress));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "premium-card p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "icon-container bg-gradient-to-br from-green-600 to-emerald-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            className: "h-5 w-5 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold gradient-text-premium",
                                                children: "Beneficiary Management"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-400",
                                                children: "Manage who will receive your digital assets"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                lineNumber: 182,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowAddForm(true),
                                disabled: showAddForm,
                                className: "btn-premium px-6 py-3 disabled:opacity-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-5 w-5 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    "Add Beneficiary"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    beneficiaries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12 bg-slate-900/30 rounded-xl border border-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                className: "h-16 w-16 mx-auto mb-4 text-slate-600"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-300 font-medium",
                                children: "No beneficiaries added yet"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-2",
                                children: "Add your first beneficiary to get started"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-4",
                        children: beneficiaries.map((beneficiary)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "premium-card p-6 hover:scale-[1.02] transition-transform",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-2 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-bold text-lg",
                                                                children: beneficiary.name.charAt(0).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                                lineNumber: 209,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-bold text-lg text-slate-200",
                                                                    children: beneficiary.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                                    lineNumber: 214,
                                                                    columnNumber: 25
                                                                }, this),
                                                                beneficiary.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "badge-premium badge-success-premium text-xs",
                                                                    children: "Active"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                                    lineNumber: 216,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2 mt-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-2 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                    className: "h-4 w-4 text-slate-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                                    lineNumber: 223,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400",
                                                                    children: beneficiary.email
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                                    lineNumber: 224,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start space-x-2 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                                    className: "h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                                    lineNumber: 227,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400 font-mono text-xs break-all",
                                                                    children: beneficiary.walletAddress
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-slate-500 mt-2",
                                                            children: [
                                                                "Added: ",
                                                                new Date(beneficiary.createdAt).toLocaleDateString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                            lineNumber: 206,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col space-y-2 ml-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleEdit(beneficiary),
                                                    className: "px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700 hover:border-blue-500/50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDelete(beneficiary.id, beneficiary.name),
                                                    className: "px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors border border-red-500/20 hover:border-red-500/50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                            lineNumber: 238,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                    lineNumber: 205,
                                    columnNumber: 17
                                }, this)
                            }, beneficiary.id, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 204,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            showAddForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "premium-card p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "icon-container bg-gradient-to-br from-blue-600 to-cyan-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    className: "h-5 w-5 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold gradient-text-premium",
                                        children: editingId ? 'Edit Beneficiary' : 'Add New Beneficiary'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-400",
                                        children: "Enter beneficiary details and wallet address"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-2 text-slate-200",
                                        children: "Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        className: "input-premium w-full",
                                        placeholder: "Beneficiary name",
                                        value: formData.name,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    name: e.target.value
                                                })),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-2 text-slate-200",
                                        children: "Email *"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        className: `input-premium w-full ${formData.email && !validateEmail(formData.email) ? 'border-red-500' : ''}`,
                                        placeholder: "email@example.com",
                                        value: formData.email,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    email: e.target.value
                                                })),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this),
                                    formData.email && !validateEmail(formData.email) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-400 mt-1 flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-3 w-3 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                lineNumber: 300,
                                                columnNumber: 19
                                            }, this),
                                            "Please enter a valid email address"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 299,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-2 text-slate-200",
                                        children: [
                                            "Wallet Address ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500 font-normal text-xs ml-1",
                                                children: "(Optional - Can be added later)"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                lineNumber: 308,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        className: `input-premium w-full font-mono text-sm ${formData.walletAddress && !validateWalletAddress(formData.walletAddress) ? 'border-red-500' : ''}`,
                                        placeholder: "0x...",
                                        value: formData.walletAddress,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    walletAddress: e.target.value
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this),
                                    formData.walletAddress && !validateWalletAddress(formData.walletAddress) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-400 mt-1 flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-3 w-3 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                lineNumber: 320,
                                                columnNumber: 19
                                            }, this),
                                            "Please enter a valid Ethereum address (0x...)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 319,
                                        columnNumber: 17
                                    }, this),
                                    formData.walletAddress && validateWalletAddress(formData.walletAddress) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-green-400 mt-1 flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                className: "h-3 w-3 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                lineNumber: 326,
                                                columnNumber: 19
                                            }, this),
                                            "Valid Ethereum address"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 325,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                            className: "h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                            lineNumber: 334,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-slate-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-blue-300 mb-1",
                                                    children: "Beneficiary Verification"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "The beneficiary will receive email notifications. If they don't have a Web3 wallet yet, they can create one and provide the address later to access assets."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                    lineNumber: 333,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "btn-premium flex-1 disabled:opacity-50 disabled:cursor-not-allowed",
                                        disabled: !isFormValid() || isSubmitting,
                                        children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "h-5 w-5 mr-2 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 21
                                                }, this),
                                                editingId ? 'Updating...' : 'Adding...'
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "h-5 w-5 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 21
                                                }, this),
                                                editingId ? 'Update Beneficiary' : 'Add Beneficiary'
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCancel,
                                        disabled: isSubmitting,
                                        className: "px-8 py-4 rounded-xl border-2 border-slate-700 text-slate-200 font-semibold hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-5 w-5 mr-2 inline"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                                lineNumber: 366,
                                                columnNumber: 17
                                            }, this),
                                            "Cancel"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                        lineNumber: 360,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 342,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                lineNumber: 261,
                columnNumber: 9
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
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "w-6 h-6 text-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                lineNumber: 384,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                            lineNumber: 383,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white font-bold tracking-wide",
                                    children: "Beneficiary Saved"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                    lineNumber: 387,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-emerald-200 text-xs font-medium",
                                    children: "Global database synced successfully."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                            lineNumber: 386,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                    lineNumber: 377,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$components$2f$confirmation$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmationDialog"], {
                isOpen: deleteConfirmation.isOpen,
                onClose: ()=>setDeleteConfirmation({
                        isOpen: false,
                        beneficiaryId: null,
                        beneficiaryName: ''
                    }),
                onConfirm: confirmDelete,
                title: "Delete Beneficiary?",
                message: `Are you sure you want to remove ${deleteConfirmation.beneficiaryName} from your beneficiaries? This action cannot be undone.`,
                confirmText: "Delete",
                cancelText: "Cancel",
                type: "danger"
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/beneficiary-manager.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_s(BeneficiaryManager, "cnkt6iBUDB3lGTpUneIvGDRmHyE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"]
    ];
});
_c = BeneficiaryManager;
var _c;
__turbopack_context__.k.register(_c, "BeneficiaryManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusDashboard",
    ()=>StatusDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/DocumentTextIcon.js [app-client] (ecmascript) <export default as DocumentTextIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ServerStackIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ServerStackIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/ServerStackIcon.js [app-client] (ecmascript) <export default as ServerStackIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$KeyIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/KeyIcon.js [app-client] (ecmascript) <export default as KeyIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CloudArrowUpIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudArrowUpIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/CloudArrowUpIcon.js [app-client] (ecmascript) <export default as CloudArrowUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$HeartIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/HeartIcon.js [app-client] (ecmascript) <export default as HeartIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShareIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShareIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/ShareIcon.js [app-client] (ecmascript) <export default as ShareIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/@heroicons/react/24/outline/esm/ShieldCheckIcon.js [app-client] (ecmascript) <export default as ShieldCheckIcon>");
;
;
const logs = [
    {
        time: '14:20:01',
        status: 'OK',
        message: 'Encrypted shard 3 broadcasted to node 0xf2...',
        color: 'text-green-500'
    },
    {
        time: '14:20:04',
        status: 'INFO',
        message: 'Syncing with Layer 2 Oracle via Chainlink...',
        color: 'text-blue-500'
    },
    {
        time: '14:20:12',
        status: 'SECURE',
        message: 'Heartbeat signature verified at 0x921...8a1',
        color: 'text-emerald-400'
    },
    {
        time: '14:20:15',
        status: 'OK',
        message: 'Entropy pool updated (Source: Local HSM)',
        color: 'text-green-500'
    },
    {
        time: '14:20:18',
        status: 'INFO',
        message: 'Propagating state root to IPFS Cluster...',
        color: 'text-blue-500'
    },
    {
        time: '14:20:25',
        status: 'SECURE',
        message: 'Zero-knowledge proof generated for vault #9482',
        color: 'text-emerald-400'
    },
    {
        time: '14:20:31',
        status: 'OK',
        message: 'Cross-chain message acknowledged on Polygon Edge',
        color: 'text-green-500'
    }
];
function StatusDashboard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-[calc(100vh-120px)] w-full flex flex-col overflow-x-hidden font-sans text-slate-100 p-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 max-w-[1440px] mx-auto w-full space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-white text-4xl font-black tracking-tight",
                                        children: "System Status & Node Connectivity"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 29,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20 w-fit",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative flex h-2.5 w-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 32,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 33,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 31,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-green-400 font-mono text-xs uppercase tracking-widest font-bold",
                                                children: "All Systems Operational"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 35,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 30,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 28,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-inner relative overflow-hidden group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ServerStackIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ServerStackIcon$3e$__["ServerStackIcon"], {
                                        className: "w-5 h-5 text-blue-400 group-hover:rotate-180 transition-transform duration-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 40,
                                        columnNumber: 25
                                    }, this),
                                    "Refresh Node Connection"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 39,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.05)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$DocumentTextIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DocumentTextIcon$3e$__["DocumentTextIcon"], {
                                                    className: "w-6 h-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                    lineNumber: 51,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 50,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-widest",
                                                children: "Verified"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 53,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 49,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-white text-lg font-bold mb-1",
                                                children: "Smart Contract Health"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 56,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 58,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-400 text-sm font-medium",
                                                        children: [
                                                            "Ethereum Mainnet: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white",
                                                                children: "Active"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 59,
                                                                columnNumber: 101
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 59,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 57,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3 font-mono text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-500",
                                                                children: "Gas Price"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 63,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-400 font-bold",
                                                                children: "18 Gwei"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 64,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 62,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-500",
                                                                children: "Latest Block"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 67,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white",
                                                                children: "19,452,001"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 68,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-500",
                                                                children: "Syncing"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 71,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-green-400",
                                                                children: "100% Synced"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 72,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 61,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 55,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 48,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.05)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CloudArrowUpIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudArrowUpIcon$3e$__["CloudArrowUpIcon"], {
                                                    className: "w-6 h-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 81,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-3 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-widest",
                                                children: "Distributed"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 84,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 80,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-white text-lg font-bold mb-1",
                                                children: "IPFS Storage Nodes"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 87,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-400 text-sm font-medium",
                                                        children: [
                                                            "Pinning Status: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white",
                                                                children: "Active"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 90,
                                                                columnNumber: 99
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 88,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-xs uppercase font-bold text-slate-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Distributed Shards"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 95,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-purple-400",
                                                                        children: "5/5 Healthy"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 96,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 94,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-1.5 w-full",
                                                                children: [
                                                                    1,
                                                                    2,
                                                                    3,
                                                                    4,
                                                                    5
                                                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-1.5 flex-1 rounded-full bg-purple-500 shadow-[0_0_8px_theme(colors.purple.500)]"
                                                                    }, i, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 100,
                                                                        columnNumber: 45
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-4 border-t border-slate-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-500 text-[10px] uppercase font-bold mb-3",
                                                                children: "Network Latency (Avg)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-end gap-1 h-10 w-full opacity-80",
                                                                children: [
                                                                    40,
                                                                    60,
                                                                    45,
                                                                    70,
                                                                    55,
                                                                    85,
                                                                    20,
                                                                    65,
                                                                    40,
                                                                    90
                                                                ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `w-full rounded-t-sm ${i === 9 ? 'bg-purple-400' : 'bg-purple-500/30'}`,
                                                                        style: {
                                                                            height: `${h}%`
                                                                        }
                                                                    }, i, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 108,
                                                                        columnNumber: 45
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 106,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white font-mono text-lg mt-2 font-bold flex items-center gap-2",
                                                                children: [
                                                                    "42ms ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-green-400 font-sans font-normal bg-green-500/10 px-2 py-0.5 rounded-md",
                                                                        children: "Optimal"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 112,
                                                                        columnNumber: 46
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 111,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 92,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 86,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 79,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.05)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$KeyIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyIcon$3e$__["KeyIcon"], {
                                                    className: "w-6 h-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 122,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest",
                                                children: "Standardized"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 125,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 121,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-white text-lg font-bold mb-1",
                                                children: "Cryptographic Engine"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 128,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-400 text-sm font-medium",
                                                        children: [
                                                            "HSM Connectivity: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white",
                                                                children: "Secure"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 131,
                                                                columnNumber: 101
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 129,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                                                                className: "w-6 h-6 text-emerald-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 135,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-white text-sm font-bold font-mono",
                                                                        children: "AES-256-GCM"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 137,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-slate-500 text-xs mt-0.5",
                                                                        children: "Encryption Standard Active"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 138,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 136,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 134,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShareIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShareIcon$3e$__["ShareIcon"], {
                                                                className: "w-6 h-6 text-emerald-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-white text-sm font-bold font-mono",
                                                                        children: "Shamir Secret Sharing"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 145,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-slate-500 text-xs mt-0.5",
                                                                        children: "3/5 Threshold Verified"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                        lineNumber: 146,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 144,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 133,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 127,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 120,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 px-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TerminalIcon, {
                                        className: "w-5 h-5 text-slate-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 157,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-slate-400 text-sm font-bold uppercase tracking-widest",
                                        children: "Protocol Log Console"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 158,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 156,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/60 rounded-3xl overflow-hidden shadow-2xl border border-slate-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-950/80 border-b border-slate-800 px-6 py-3 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-3 rounded-full bg-rose-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-3 rounded-full bg-amber-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-3 rounded-full bg-emerald-500/50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 163,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-600 font-mono font-medium tracking-wide",
                                                children: "bash — vault-node — 80x24"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 168,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 162,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-8 h-[280px] overflow-y-auto font-mono text-sm leading-loose space-y-2 custom-scrollbar",
                                        children: [
                                            logs.map((log, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-600",
                                                            children: [
                                                                "[",
                                                                log.time,
                                                                "]"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                            lineNumber: 174,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `${log.color} font-bold w-20`,
                                                            children: [
                                                                "[",
                                                                log.status,
                                                                "]"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                            lineNumber: 175,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: log.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 33
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 animate-pulse mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-600",
                                                        children: "[14:20:55]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-500 font-bold w-20",
                                                        children: ">"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-100 flex items-center",
                                                        children: [
                                                            "Listening for new protocol events",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2.5 h-5 bg-blue-500 inline-block ml-1 opacity-70"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 179,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 171,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 161,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                        lineNumber: 155,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4 pt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-[200px] bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-500 text-[10px] uppercase font-bold mb-1",
                                                children: "Total Nodes"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 195,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white text-2xl font-bold font-mono",
                                                children: [
                                                    "1,240 ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-400 text-sm font-normal ml-2 bg-green-500/10 px-2 py-0.5 rounded-lg",
                                                        children: "+12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 90
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 196,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 194,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ServerStackIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ServerStackIcon$3e$__["ServerStackIcon"], {
                                        className: "w-8 h-8 text-slate-700"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 198,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 193,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-[200px] bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-500 text-[10px] uppercase font-bold mb-1",
                                                children: "Protocol Health"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 203,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white text-2xl font-bold font-mono",
                                                children: [
                                                    "99.9% ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-400 text-sm font-normal ml-2 bg-blue-500/10 px-2 py-0.5 rounded-lg",
                                                        children: "Stable"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 90
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 204,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 202,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$HeartIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__["HeartIcon"], {
                                        className: "w-8 h-8 text-slate-700"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 206,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 201,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-[200px] bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-500 text-[10px] uppercase font-bold mb-1",
                                                children: "Encrypted Storage"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 211,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white text-2xl font-bold font-mono",
                                                children: [
                                                    "14.2 PB ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-purple-400 text-sm font-normal ml-2 bg-purple-500/10 px-2 py-0.5 rounded-lg",
                                                        children: "↑ 0.4%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 92
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                                lineNumber: 212,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 210,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CloudArrowUpIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudArrowUpIcon$3e$__["CloudArrowUpIcon"], {
                                        className: "w-8 h-8 text-slate-700"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                        lineNumber: 214,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                                lineNumber: 209,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                        lineNumber: 192,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none bg-[#080c14]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-[-20%] right-[-10%] size-[800px] bg-blue-600/5 rounded-full blur-[150px]"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                    lineNumber: 221,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
                lineNumber: 220,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_c = StatusDashboard;
function TerminalIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
        }, void 0, false, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
            lineNumber: 230,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/status-dashboard.tsx",
        lineNumber: 229,
        columnNumber: 9
    }, this);
}
_c1 = TerminalIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatusDashboard");
__turbopack_context__.k.register(_c1, "TerminalIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubscriptionDashboard",
    ()=>SubscriptionDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/x-circle.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/hard-drive.js [app-client] (ecmascript) <export default as HardDrive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/SubscriptionContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$types$2f$subscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/types/subscription.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
function SubscriptionDashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { subscription, switchMode, cancelSubscription } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"])();
    const [switching, setSwitching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const defaultTransition = {
        duration: 0.5,
        ease: "easeOut"
    };
    if (!subscription) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-3xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl text-white mb-4 font-bold",
                        children: "No Subscription Found"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 21,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400 mb-6",
                        children: "Initialize your vault to see subscription status."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 22,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]",
                        children: "Retry Loading"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 23,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                lineNumber: 20,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
            lineNumber: 19,
            columnNumber: 13
        }, this);
    }
    const planDetails = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$types$2f$subscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_PLANS"][subscription.plan];
    const price = planDetails?.price || 0;
    const features = planDetails?.features || [];
    const limits = planDetails?.limits;
    const handleSwitchMode = async ()=>{
        if (!subscription.canSwitchMode) return;
        const newMode = subscription.mode === 'centralized' ? 'decentralized' : 'centralized';
        const confirmed = confirm(`Switch to ${newMode} mode? This will migrate your data node. \n\nNote: Mode switching maintains all your encrypted data while changing the underlying hosting architecture.`);
        if (!confirmed) return;
        setSwitching(true);
        try {
            await switchMode(newMode);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Service mode updated!');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to switch mode');
        } finally{
            setSwitching(false);
        }
    };
    const handleCancelSubscription = async ()=>{
        const confirmed = confirm('Are you sure you want to cancel? Your data will remain encrypted but new uploads will be disabled after the period ends.');
        if (!confirmed) return;
        try {
            await cancelSubscription();
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Status updated to Cancelled.');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to update subscription');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: subscription.mode === 'centralized' ? '🏢' : '⛓️'
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                lineNumber: 86,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl font-bold text-white capitalize",
                                                children: [
                                                    subscription.plan,
                                                    " Plan"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                lineNumber: 87,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${subscription.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : subscription.status === 'trial' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`,
                                                children: subscription.status
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                lineNumber: 90,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400",
                                        children: [
                                            "Service Architecture: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-medium capitalize",
                                                children: subscription.mode
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                lineNumber: 98,
                                                columnNumber: 51
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                        lineNumber: 97,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left md:text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-4xl font-black text-white",
                                        children: [
                                            "$",
                                            price,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg text-slate-500 font-normal",
                                                children: "/mo"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                lineNumber: 102,
                                                columnNumber: 79
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                        lineNumber: 102,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500",
                                        children: "Billed monthly"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                        lineNumber: 103,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                lineNumber: 101,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-slate-500 uppercase tracking-widest",
                                        children: "Included Features"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                        lineNumber: 109,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "grid grid-cols-1 gap-2",
                                        children: features.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center gap-2 text-slate-300 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                        className: "w-4 h-4 text-[#1152d4]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 37
                                                    }, this),
                                                    feature
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                lineNumber: 112,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                        lineNumber: 110,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                lineNumber: 108,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-slate-500 uppercase tracking-widest",
                                        children: "Service Controls"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                        lineNumber: 120,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSwitchMode,
                                                disabled: switching || !subscription.canSwitchMode,
                                                className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-xl transition-all text-sm font-bold disabled:opacity-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                        className: `w-4 h-4 ${switching ? 'animate-spin' : ''}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 33
                                                    }, this),
                                                    switching ? 'Migrating Node...' : `Switch to ${subscription.mode === 'centralized' ? 'Decentralized' : 'Centralized'}`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                lineNumber: 122,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push('/pricing'),
                                                className: "flex items-center gap-2 bg-[#1152d4] hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl transition-all text-sm font-bold shadow-lg shadow-blue-900/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                        lineNumber: 134,
                                                        columnNumber: 33
                                                    }, this),
                                                    "Upgrade Plan"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                                lineNumber: 130,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                        lineNumber: 121,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                                lineNumber: 119,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            limits && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsageCard, {
                        title: "Stored Assets",
                        current: subscription.assetsCount || 0,
                        limit: limits.assets,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                            className: "w-5 h-5 text-blue-400"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                            lineNumber: 149,
                            columnNumber: 31
                        }, void 0),
                        color: "from-blue-500 to-indigo-600"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 145,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsageCard, {
                        title: "Beneficiaries",
                        current: subscription.beneficiariesCount || 0,
                        limit: limits.beneficiaries,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            className: "w-5 h-5 text-emerald-400"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                            lineNumber: 156,
                            columnNumber: 31
                        }, void 0),
                        color: "from-emerald-500 to-teal-600"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 152,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsageCard, {
                        title: "IPFS Storage",
                        current: subscription.storageUsedGB || 0,
                        limit: limits.storageGB,
                        unit: "GB",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"], {
                            className: "w-5 h-5 text-purple-400"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                            lineNumber: 164,
                            columnNumber: 31
                        }, void 0),
                        color: "from-purple-500 to-pink-600"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 159,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                lineNumber: 144,
                columnNumber: 17
            }, this),
            subscription.status !== 'cancelled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center pt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleCancelSubscription,
                    className: "text-slate-500 hover:text-red-400 text-sm font-medium flex items-center gap-2 transition-colors px-4 py-2 hover:bg-red-400/5 rounded-lg border border-transparent hover:border-red-400/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                            lineNumber: 177,
                            columnNumber: 25
                        }, this),
                        "Cancel Future Renewals"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                    lineNumber: 173,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                lineNumber: 172,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
        lineNumber: 76,
        columnNumber: 9
    }, this);
}
_s(SubscriptionDashboard, "K3JbYl7fkwB/169CYMfkhlOh7Ig=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"]
    ];
});
_c = SubscriptionDashboard;
function UsageCard({ title, current, limit, unit = '', icon, color }) {
    const percentage = limit === Infinity ? 0 : Math.min(100, current / limit * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/[0.03] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.05] transition-all",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 rounded-xl bg-white/[0.05]",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 192,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold text-slate-500 uppercase tracking-tighter",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 195,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                lineNumber: 191,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline gap-1 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-3xl font-black text-white",
                        children: current
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 199,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-500 font-medium",
                        children: [
                            "/ ",
                            limit === Infinity ? '∞' : `${limit}${unit}`
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                        lineNumber: 200,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                lineNumber: 198,
                columnNumber: 13
            }, this),
            limit !== Infinity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1.5 w-full bg-white/5 rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        width: 0
                    },
                    animate: {
                        width: `${percentage}%`
                    },
                    className: `h-full bg-gradient-to-r ${color}`
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                    lineNumber: 205,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
                lineNumber: 204,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/subscription-dashboard.tsx",
        lineNumber: 190,
        columnNumber: 9
    }, this);
}
_c1 = UsageCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "SubscriptionDashboard");
__turbopack_context__.k.register(_c1, "UsageCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletConnectModal",
    ()=>WalletConnectModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript) <export default as CheckCircle>");
'use client';
;
;
function WalletConnectModal({ isOpen, onClose, onConnect, isConnecting }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative premium-card p-8 max-w-md w-full animate-in fade-in zoom-in duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-5 w-5 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "icon-container w-16 h-16 mx-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                    className: "h-8 w-8 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold gradient-text-premium mb-2",
                                        children: "Connect Your Wallet"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-400",
                                        children: "Choose how you want to connect to Digital Will Protocol"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onConnect('0x742d13f0cc6634c051a85e4db8d3d92828b4b3'),
                                        disabled: isConnecting,
                                        className: "w-full premium-card p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "🦊"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                        lineNumber: 54,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-slate-200",
                                                            children: "MetaMask"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                            lineNumber: 57,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-400",
                                                            children: "Connect with MetaMask"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                            lineNumber: 58,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 56,
                                                    columnNumber: 17
                                                }, this),
                                                isConnecting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                            lineNumber: 52,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onConnect('0x387affcb2e6462c051a85e4db8d3d92828b4b8'),
                                        disabled: isConnecting,
                                        className: "w-full premium-card p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "🌈"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-slate-200",
                                                            children: "Rainbow"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                            lineNumber: 75,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-400",
                                                            children: "Connect with Rainbow"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                            lineNumber: 76,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onConnect('0xcba42d13f0cc6634c051a85e4db8d3d92828b4c0'),
                                        disabled: isConnecting,
                                        className: "w-full premium-card p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                        className: "h-6 w-6 text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-slate-200",
                                                            children: "WalletConnect"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                            lineNumber: 91,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-400",
                                                            children: "Scan with mobile wallet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                            lineNumber: 92,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onConnect('0x9d2828b4b3742d13f0cc6634c051a85e4db8d3d'),
                                        disabled: isConnecting,
                                        className: "w-full premium-card p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "👛"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 text-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-slate-200",
                                                            children: "Coinbase Wallet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-400",
                                                            children: "Connect with Coinbase"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                            lineNumber: 108,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                            className: "h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-left text-sm text-slate-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-blue-300 mb-1",
                                                    children: "Secure Connection"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs",
                                                    children: "Your wallet credentials are never stored on our servers. All encryption happens client-side."
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-xs text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                className: "h-4 w-4 text-green-400"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                lineNumber: 126,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Zero-trust architecture"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                className: "h-4 w-4 text-green-400"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                lineNumber: 130,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Client-side encryption"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                className: "h-4 w-4 text-green-400"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                lineNumber: 134,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "No data collection"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                                lineNumber: 135,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/wallet-connect-modal.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = WalletConnectModal;
var _c;
__turbopack_context__.k.register(_c, "WalletConnectModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModeIndicator",
    ()=>ModeIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/server.js [app-client] (ecmascript) <export default as Server>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/network.js [app-client] (ecmascript) <export default as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$mode$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/lib/mode-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/SubscriptionContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ModeIndicator() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSwitching, setIsSwitching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [switchMessage, setSwitchMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const modeService = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$lib$2f$mode$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getInstance();
    const { subscription, switchMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"])();
    const currentMode = subscription?.mode || 'centralized';
    const handleModeSwitch = async (newMode)=>{
        if (newMode === currentMode || isSwitching) return;
        console.log(`🔄 Switching from ${currentMode} to ${newMode}`);
        setIsSwitching(true);
        setSwitchMessage(`Initiating ${newMode} synchronization...`);
        try {
            await modeService.switchMode(newMode, setSwitchMessage);
            await switchMode(newMode);
            console.log(`✅ Mode switched successfully to ${newMode}`);
            setSwitchMessage('Switch Complete! Reloading Interface...');
            setTimeout(()=>{
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('❌ Failed to switch mode:', error);
            alert('Failed to switch mode. Please try again.');
            setIsSwitching(false);
            setSwitchMessage('');
        }
    };
    const handlePricingClick = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        router.push('/pricing');
    };
    const isCentralized = currentMode === 'centralized';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative z-[100]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                whileHover: {
                    scale: 1.02
                },
                whileTap: {
                    scale: 0.98
                },
                onClick: ()=>setIsOpen(!isOpen),
                className: `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 group border box-border ${isCentralized ? 'bg-[#0f172a]/80 border-blue-500/30 hover:bg-[#1e293b]/90 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]' : 'bg-[#0f172a]/80 border-purple-500/30 hover:bg-[#1e293b]/90 hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]'} backdrop-blur-xl relative overflow-hidden`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40 bg-gradient-to-r ${isCentralized ? 'from-blue-600/30 to-cyan-500/30' : 'from-purple-600/30 to-fuchsia-500/30'}`
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center gap-3 z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                layoutId: "mode-icon-container",
                                className: `w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${isCentralized ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/30 shadow-blue-500/20 text-blue-400' : 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-400/30 shadow-purple-500/20 text-purple-400'}`,
                                children: isCentralized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"], {
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                    lineNumber: 75,
                                    columnNumber: 30
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"], {
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                    lineNumber: 75,
                                    columnNumber: 63
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] uppercase tracking-widest text-slate-400 font-bold",
                                                children: "Storage Tier"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                lineNumber: 80,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border backdrop-blur-md flex items-center gap-1 ${isCentralized ? 'bg-blue-500/10 text-blue-300 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-purple-500/10 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-1.5 h-1.5 rounded-full bg-current animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                        lineNumber: 85,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Active"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                lineNumber: 81,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-bold text-white tracking-wide capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70",
                                        children: [
                                            currentMode,
                                            " Node"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            rotate: isOpen ? 180 : 0
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: `w-5 h-5 relative z-10 transition-colors ${isCentralized ? 'text-blue-400 group-hover:text-blue-300' : 'text-purple-400 group-hover:text-purple-300'}`
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "fixed inset-0 z-[110]",
                            onClick: ()=>setIsOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.95,
                                y: -15,
                                transformOrigin: 'top right'
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95,
                                y: -10
                            },
                            transition: {
                                type: 'spring',
                                damping: 25,
                                stiffness: 350
                            },
                            className: "absolute right-0 top-[calc(100%+12px)] w-[420px] bg-[#050914]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden z-[120] ring-1 ring-white/5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 border-b border-white/10 relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-white mb-1.5 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 19
                                                }, this),
                                                "Storage Architecture"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-400 font-medium",
                                            children: "Configure how your data and keys are secured"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 space-y-2 relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            whileHover: {
                                                scale: isCentralized ? 1 : 1.01
                                            },
                                            whileTap: {
                                                scale: isCentralized ? 1 : 0.98
                                            },
                                            onClick: ()=>handleModeSwitch('centralized'),
                                            disabled: isSwitching,
                                            className: `w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col gap-3 group ${isCentralized ? 'bg-blue-900/10 border-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20' : 'bg-white/[0.02] border-2 border-transparent hover:bg-white/[0.04] hover:border-white/10'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isCentralized ? 'bg-blue-500/20 border border-blue-400/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border border-white/10 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/30'}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"], {
                                                                        className: "w-6 h-6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                        lineNumber: 145,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                    lineNumber: 141,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2 mb-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: `font-bold text-lg leading-none ${isCentralized ? 'text-white' : 'text-slate-300 group-hover:text-white transition-colors'}`,
                                                                                    children: "Cloud Vault"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                                    lineNumber: 149,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                isCentralized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30",
                                                                                    children: "Current"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                                    lineNumber: 153,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                            lineNumber: 148,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: `text-xs font-medium ${isCentralized ? 'text-blue-200/70' : 'text-slate-500 group-hover:text-slate-400 transition-colors'}`,
                                                                            children: "Managed Security • Fast Recovery"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                            lineNumber: 158,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                    lineNumber: 147,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                            lineNumber: 140,
                                                            columnNumber: 21
                                                        }, this),
                                                        isCentralized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                className: "w-3.5 h-3.5 text-blue-400",
                                                                strokeWidth: 3
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-6 h-6 rounded-full border-2 border-slate-700 group-hover:border-blue-500/50 transition-colors"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                            lineNumber: 168,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2 mt-1",
                                                    children: [
                                                        {
                                                            l: 'Auto Backup',
                                                            i: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 46
                                                            }, this)
                                                        },
                                                        {
                                                            l: 'Instant Restore',
                                                            i: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 50
                                                            }, this)
                                                        }
                                                    ].map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg font-semibold ${isCentralized ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' : 'bg-white/[0.03] text-slate-400 border border-white/5 group-hover:border-white/10'}`,
                                                            children: [
                                                                feature.i,
                                                                feature.l
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            whileHover: {
                                                scale: !isCentralized ? 1 : 1.01
                                            },
                                            whileTap: {
                                                scale: !isCentralized ? 1 : 0.98
                                            },
                                            onClick: ()=>handleModeSwitch('decentralized'),
                                            disabled: isSwitching,
                                            className: `w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col gap-3 group ${!isCentralized ? 'bg-purple-900/10 border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/20' : 'bg-white/[0.02] border-2 border-transparent hover:bg-white/[0.04] hover:border-white/10'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${!isCentralized ? 'bg-purple-500/20 border border-purple-400/50 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-white/5 border border-white/10 text-slate-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30'}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"], {
                                                                        className: "w-6 h-6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                        lineNumber: 205,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                    lineNumber: 201,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2 mb-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: `font-bold text-lg leading-none ${!isCentralized ? 'text-white' : 'text-slate-300 group-hover:text-white transition-colors'}`,
                                                                                    children: "Web3 Vault"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                                    lineNumber: 209,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                !isCentralized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30",
                                                                                    children: "Current"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                                    lineNumber: 213,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                            lineNumber: 208,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: `text-xs font-medium ${!isCentralized ? 'text-purple-200/70' : 'text-slate-500 group-hover:text-slate-400 transition-colors'}`,
                                                                            children: "Self-Custodial • Smart Contract"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                            lineNumber: 218,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                    lineNumber: 207,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 21
                                                        }, this),
                                                        !isCentralized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                className: "w-3.5 h-3.5 text-purple-400",
                                                                strokeWidth: 3
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-6 h-6 rounded-full border-2 border-slate-700 group-hover:border-purple-500/50 transition-colors"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2 mt-1",
                                                    children: [
                                                        {
                                                            l: 'Zero-Knowledge',
                                                            i: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                lineNumber: 234,
                                                                columnNumber: 49
                                                            }, this)
                                                        },
                                                        {
                                                            l: 'True Ownership',
                                                            i: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 49
                                                            }, this)
                                                        }
                                                    ].map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg font-semibold ${!isCentralized ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' : 'bg-white/[0.03] text-slate-400 border border-white/5 group-hover:border-white/10'}`,
                                                            children: [
                                                                feature.i,
                                                                feature.l
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: isSwitching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                        className: "px-4 py-3 bg-[#111827] border-t border-white/5 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 5
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    className: "text-xs font-semibold text-blue-200/90 leading-tight",
                                                    children: switchMessage
                                                }, switchMessage, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                            lineNumber: 258,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                        lineNumber: 252,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-[#0a0f1d] border-t border-white/10 group/link cursor-pointer hover:bg-[#0c1325] transition-colors",
                                    onClick: handlePricingClick,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:to-pink-400 transition-all",
                                                children: "Upgrade to Enterprise Tier"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                lineNumber: 275,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                className: "w-4 h-4 text-slate-400 group-hover/link:text-white transition-colors group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                                lineNumber: 278,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                        lineNumber: 274,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/mode-indicator.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(ModeIndicator, "JAAdf/uMkqclwsarmwqDMvU53q0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"]
    ];
});
_c = ModeIndicator;
var _c;
__turbopack_context__.k.register(_c, "ModeIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrialBanner",
    ()=>TrialBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/contexts/SubscriptionContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function TrialBanner() {
    _s();
    const [isDismissed, setIsDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { subscription, isTrialActive, daysRemaining } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"])();
    if (!subscription || !isTrialActive || isDismissed) return null;
    const isUrgent = daysRemaining <= 5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: -20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -20
            },
            className: `relative overflow-hidden ${isUrgent ? 'bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/30' : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30'} border-b backdrop-blur-sm`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    isUrgent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "w-5 h-5 text-orange-400 animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        className: "w-5 h-5 text-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                        lineNumber: 35,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white font-semibold text-sm",
                                                children: isUrgent ? '⚠️ Trial Ending Soon!' : '🎉 Free Trial Active'
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                                lineNumber: 38,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-300 text-xs",
                                                children: [
                                                    daysRemaining,
                                                    " ",
                                                    daysRemaining === 1 ? 'day' : 'days',
                                                    " remaining •",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1",
                                                        children: [
                                                            "Current mode: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold",
                                                                children: subscription.mode === 'centralized' ? 'Centralized' : 'Decentralized'
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                                                lineNumber: 44,
                                                                columnNumber: 35
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                                        lineNumber: 43,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                                lineNumber: 41,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/pricing",
                                        className: `px-4 py-2 rounded-lg font-medium text-sm transition-all ${isUrgent ? 'bg-orange-600 hover:bg-orange-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`,
                                        children: isUrgent ? 'Choose Plan Now' : 'View Plans'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsDismissed(true),
                                        className: "p-1 hover:bg-white/10 rounded-lg transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-4 h-4 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                            lineNumber: 65,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-0 left-0 right-0 h-1 bg-white/10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            width: '100%'
                        },
                        animate: {
                            width: `${daysRemaining / 30 * 100}%`
                        },
                        className: `h-full ${isUrgent ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/trial-banner.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(TrialBanner, "rBRg38xj6mdsKd3+9zQs4n9fdxk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$contexts$2f$SubscriptionContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscription"]
    ];
});
_c = TrialBanner;
var _c;
__turbopack_context__.k.register(_c, "TrialBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SharedFooter",
    ()=>SharedFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$hooks$2f$use$2d$translation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/hooks/use-translation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SharedFooter() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$hooks$2f$use$2d$translation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "py-12 bg-[#0a0c10] text-slate-400 border-t border-white/5 relative z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-4 gap-8 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "flex items-center space-x-3 group hover:opacity-80 transition-opacity",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                    className: "w-8 h-8",
                                                    suppressHydrationWarning: true
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                    lineNumber: 18,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 17,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-bold text-lg tracking-tight",
                                                children: "DeadMan Protocol"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 20,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                        lineNumber: 16,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 15,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: t('hero_subtitle')
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 23,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                            lineNumber: 14,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-white font-bold mb-4",
                                    children: "Product"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 29,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/features",
                                                className: "hover:text-white transition-colors",
                                                children: t('nav_features')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 31,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 31,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/security",
                                                className: "hover:text-white transition-colors",
                                                children: "Security"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 32,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 32,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/pricing",
                                                className: "hover:text-white transition-colors",
                                                children: t('nav_pricing')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 33,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 33,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/roadmap",
                                                className: "hover:text-white transition-colors",
                                                children: "Roadmap"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 34,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 34,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 30,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-white font-bold mb-4",
                                    children: "Resources"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 39,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/docs",
                                                className: "hover:text-white transition-colors",
                                                children: t('nav_docs')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 41,
                                                columnNumber: 34
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 41,
                                            columnNumber: 30
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/api",
                                                className: "hover:text-white transition-colors",
                                                children: "API Reference"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 42,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 42,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/guides",
                                                className: "hover:text-white transition-colors",
                                                children: "Guides"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 43,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 43,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/contact",
                                                className: "hover:text-white transition-colors",
                                                children: t('nav_contact')
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 44,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 44,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 40,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                            lineNumber: 38,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-white font-bold mb-4",
                                    children: "Company"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 49,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/about",
                                                className: "hover:text-white transition-colors",
                                                children: "About"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 51,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 51,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/blog",
                                                className: "hover:text-white transition-colors",
                                                children: "Blog"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 52,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 52,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/careers",
                                                className: "hover:text-white transition-colors",
                                                children: "Careers"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 53,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 53,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/contact",
                                                className: "hover:text-white transition-colors",
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                                lineNumber: 54,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                            lineNumber: 54,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 50,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                            lineNumber: 48,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                    lineNumber: 13,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "© 2026 DeadMan Protocol. All rights reserved."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/privacy",
                                    className: "hover:text-white transition-colors",
                                    children: "Privacy Policy"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 62,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/terms",
                                    className: "hover:text-white transition-colors",
                                    children: "Terms of Service"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 63,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/security",
                                    className: "hover:text-white transition-colors",
                                    children: "Security"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                                    lineNumber: 64,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                            lineNumber: 61,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
            lineNumber: 12,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Nmims/DeadMan Protocol/frontend/web/src/components/shared-footer.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_s(SharedFooter, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Nmims$2f$DeadMan__Protocol$2f$frontend$2f$web$2f$src$2f$hooks$2f$use$2d$translation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = SharedFooter;
var _c;
__turbopack_context__.k.register(_c, "SharedFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Nmims_DeadMan%20Protocol_frontend_web_src_components_977b8914._.js.map