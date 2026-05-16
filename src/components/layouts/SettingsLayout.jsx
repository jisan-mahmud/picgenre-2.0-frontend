import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

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
                <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#232648] py-4 lg:py-8 flex flex-col max-gap-8 lg:gap-12">
                    <div className="flex flex-col gap-6 px-4">
                        <div className="flex flex-col gap-1 px-3">
                            <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">Workspace Settings</h1>
                            <p className="text-slate-500 dark:text-[#9296c9] text-xs font-normal leading-normal">Manage your configuration</p>
                        </div>
                        <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
                            <Link to="/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                isActive('/settings') 
                                    ? 'bg-primary/10 dark:bg-[#232648] text-primary dark:text-white' 
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                            }`}>
                                <span className="material-symbols-outlined text-[20px]">settings</span>
                                <p className="text-sm font-medium">General</p>
                            </Link>
                            <Link to="/settings/ai-models" className={`flex items-center gap-3 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                isActive('/settings/ai-models') 
                                    ? 'bg-primary/10 dark:bg-[#232648] text-primary dark:text-white' 
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                            }`}>
                                <span className="material-symbols-outlined text-[20px]">memory</span>
                                <p className="text-sm font-medium">Groq AI Settings</p>
                            </Link>
                            <Link to="/settings/history" className={`flex items-center gap-3 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                isActive('/settings/history') 
                                    ? 'bg-primary/10 dark:bg-[#232648] text-primary dark:text-white' 
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                            }`}>
                                <span className="material-symbols-outlined text-[20px]">history</span>
                                <p className="text-sm font-medium">History</p>
                            </Link>
                            <Link to="/settings/billing-plan" className={`flex items-center gap-3 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                isActive('/settings/billing-plan') 
                                    ? 'bg-primary/10 dark:bg-[#232648] text-primary dark:text-white' 
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                            }`}>
                                <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                <p className="text-sm font-medium">Billing & Plan</p>
                            </Link>
                        </div>
                    </div>
                    <div className="px-4 hidden lg:block">
                        <div className="rounded-xl bg-primary/10 p-4 border border-primary/20">
                            <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Usage Status</p>
                            <p className="text-slate-900 dark:text-white text-sm font-medium">78% of monthly limit</p>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-primary h-full w-[78%]"></div>
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="flex-1 flex flex-col p-4 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>


    )
}
