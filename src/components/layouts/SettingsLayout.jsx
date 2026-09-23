import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Settings, KeyRound, History, CreditCard, ArrowLeft } from 'lucide-react'

const NAV_ITEMS = [
    { to: '/settings', label: 'General', icon: Settings },
    { to: '/settings/ai-models', label: 'API Key Settings', icon: KeyRound },
    { to: '/settings/history', label: 'History', icon: History },
    { to: '/settings/billing-plan', label: 'Billing & Plan', icon: CreditCard },
]

export default function SettingsLayout() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/settings') {
            return location.pathname === '/settings' || location.pathname === '/settings/';
        }
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
                <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-0 lg:h-screen border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#232648] bg-white dark:bg-transparent lg:bg-background-light dark:lg:bg-background-dark" style={{ zIndex: 10 }}>
                    <div className="flex flex-col gap-6 py-5 lg:py-8 px-5 lg:h-full">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2.5">
                                <span className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Settings className="w-5 h-5 text-primary" />
                                </span>
                                <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">Settings</h1>
                            </div>
                            <p className="text-slate-500 dark:text-[#9296c9] text-xs font-normal leading-normal lg:pl-[44px] mt-0.5">Manage your account and preferences</p>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible scrollbar-thin -mx-1 px-1">
                            {NAV_ITEMS.map((item) => {
                                const { to, label } = item
                                const Icon = item.icon
                                const active = isActive(to)
                                return (
                                    <Link
                                        key={to}
                                        to={to}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                                            active
                                                ? 'bg-primary/10 dark:bg-[#232648] text-primary dark:text-white'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                    >
                                        <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-primary' : ''}`} />
                                        <span className="text-sm font-medium">{label}</span>
                                        {active && (
                                            <motion.span
                                                layoutId="settings-nav-indicator"
                                                className="ml-auto hidden lg:block size-1.5 rounded-full bg-primary"
                                                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>

                        <div className="mt-auto hidden lg:flex flex-col gap-4 pt-6 border-t border-slate-200 dark:border-[#232648] bg-transparent">
                            <Link
                                to="/studio"
                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 dark:text-[#9296c9] hover:text-primary transition-colors w-fit"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Studio
                            </Link>
                        </div>
                    </div>
                </aside>
                <main className="flex-1 flex flex-col min-w-0 p-4 sm:p-6 lg:p-8 md:p-6 lg:max-w-[calc(100%-16rem)]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="w-full max-w-5xl mx-auto"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    )
}