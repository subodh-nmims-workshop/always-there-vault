'use client';

import Link from 'next/link';
import { ChevronRight, Globe, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useState, useRef, useEffect } from 'react';
import { Language } from '@/utils/i18n';

export function SharedHeader() {
    const { t, changeLanguage, currentLanguage } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages: { code: Language; label: string }[] = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिंदी (Hindi)' },
        { code: 'es', label: 'Español' },
        { code: 'fr', label: 'Français' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
                        <div className="flex flex-col text-left">
                            <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
                            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/features" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav_features')}</Link>
                        <Link href="/security" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Security</Link>
                        <Link href="/pricing" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav_pricing')}</Link>
                        <Link href="/docs" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav_docs')}</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Language Selector */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-1"
                            >
                                <Globe className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase">{currentLanguage}</span>
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                changeLanguage(lang.code);
                                                setIsOpen(false);
                                            }}
                                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                                        >
                                            <span>{lang.label}</span>
                                            {currentLanguage === lang.code && <Check className="w-4 h-4 text-blue-500" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        >
                            {t('nav_launch')}
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
