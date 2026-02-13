import React from 'react'

export default function AIModels() {
    return (
        <div>
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Groq AI Configuration</p>
                    <p className="text-slate-500 dark:text-[#9296c9] text-base font-normal leading-normal max-w-lg">Manage your Groq API credentials and default model preferences for high-performance inference.</p>
                </div>
                <div className="flex">
                    <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20">
                        Save Configuration
                    </button>
                </div>
            </div>
            <div className="max-w-3xl">
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-[#232648] pb-4 mb-2">
                        <span className="material-symbols-outlined text-primary">bolt</span>
                        <h2 className="text-slate-900 dark:text-white text-xl font-bold">Inference Settings</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-[#9296c9]">Default Model</label>
                            <div className="relative">
                                <select className="w-full bg-slate-50 dark:bg-[#1c1f3d] border border-slate-200 dark:border-[#323767] text-slate-900 dark:text-white rounded-lg px-4 py-2.5 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option value="llama3-70b-8192">Llama 3 70B (8192 tokens)</option>
                                    <option value="llama3-8b-8192">Llama 3 8B (8192 tokens)</option>
                                    <option value="mixtral-8x7b-32768">Mixtral 8x7b Instruct v0.1</option>
                                    <option value="gemma-7b-it">Gemma 7b Instruct</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-[#9296c9]">API Key</label>
                            <div className="flex">
                                <div className="relative flex-1">
                                    <input className="w-full bg-slate-50 dark:bg-[#1c1f3d] border border-slate-200 dark:border-[#323767] text-slate-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent font-mono" placeholder="gsk_••••••••••••••••••••••••" type="password" defaultValue="gsk_y293kd02lS92kd92kd02lS92kd" />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-yellow-500 mt-0.5">warning</span>
                <div>
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm font-bold">Unsaved changes detected</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Your modified model parameters have not been applied yet. Click 'Save Configuration' to update your workspace profile.</p>
                </div>
            </div>
        </div>
    )
}
