import React from 'react'

export default function Shop() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <main className="flex flex-1 flex-col items-center">
                <div className="w-full max-w-300 px-6 lg:px-10 py-16 flex flex-col gap-16">
                    <div className="flex flex-col gap-4 text-center">
                        <p className="text-slate-900 dark:text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                            API Subscription Packs
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-normal max-w-2xl mx-auto">
                            Premium access to industry-leading AI tools. Redefining digital excellence with high-performance API subscriptions.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 flex flex-col rounded-3xl p-8 transition-all group">
                            <div className="mb-8 flex justify-center">
                                <div className="size-24 rounded-2xl flex items-center justify-center relative bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-5xl text-primary opacity-80 group-hover:text-white">palette</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="text-center">
                                    <h3 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight mb-1">Standard Plan</h3>
                                    <p className="text-primary font-bold text-lg">Midjourney API</p>
                                </div>
                                <div className="text-center py-2 border-y border-slate-200 dark:border-white/5">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">2,700</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm ml-1 uppercase">BDT</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">verified</span>
                                        <span>Personal Account</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                                        <span>30 Days Validity</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">devices</span>
                                        <span>1 Device Limit</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">bolt</span> 
                                        <span>10m - 1hr Delivery</span>
                                    </div>
                                </div>
                                <button className="w-full flex items-center justify-center gap-3 rounded-xl py-4 bg-primary text-white font-extrabold transition-all mt-2 hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined">send</span>
                                    Message for Access
                                </button>
                            </div>
                        </div>
                        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 flex flex-col rounded-3xl p-8 transition-all group">
                            <div className="mb-8 flex justify-center">
                                <div className="size-24 rounded-2xl flex items-center justify-center relative bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-5xl text-primary opacity-80 group-hover:text-white">psychology</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="text-center">
                                    <h3 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight mb-1">Premium Plus</h3>
                                    <p className="text-primary font-bold text-lg">ChatGPT API</p>
                                </div>
                                <div className="text-center py-2 border-y border-slate-200 dark:border-white/5">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">1,000</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm ml-1 uppercase">BDT</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">verified</span>
                                        <span>Personal Account</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                                        <span>30 Days Validity</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">devices</span>
                                        <span>3 Devices Limit</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                                        <span>Instant Delivery</span>
                                    </div>
                                </div>
                                <button className="w-full flex items-center justify-center gap-3 rounded-xl py-4 bg-primary text-white font-extrabold transition-all mt-2 hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined">send</span>
                                    Message for Access
                                </button>
                            </div>
                        </div>
                        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 flex flex-col rounded-3xl p-8 transition-all group">
                            <div className="mb-8 flex justify-center">
                                <div className="size-24 rounded-2xl flex items-center justify-center relative bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-5xl text-primary opacity-80 group-hover:text-white">movie_edit</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="text-center">
                                    <h3 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight mb-1">Pro Premium</h3>
                                    <p className="text-primary font-bold text-lg">CapCut API</p>
                                </div>
                                <div className="text-center py-2 border-y border-slate-200 dark:border-white/5">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">250</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm ml-1 uppercase">BDT</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">verified</span>
                                        <span>Personal Account</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                                        <span>30 Days Validity</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">devices</span>
                                        <span>1 Device Limit</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                                        <span>10m - 1hr Delivery</span>
                                    </div>
                                </div>
                                <button className="w-full flex items-center justify-center gap-3 rounded-xl py-4 bg-primary text-white font-extrabold transition-all mt-2 hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined">send</span>
                                    Message for Access
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-16 border-t border-slate-200 dark:border-white/5">
                        <div className="text-center mb-16">
                            <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight mb-4">Why Choose Picgenre</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Experience the gold standard in premium digital access with our industry-leading service infrastructure.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                            <div className="flex flex-col items-center text-center gap-5 group">
                                <div className="size-20 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-4xl">bolt</span>
                                </div>
                                <div>
                                    <h4 className="text-slate-900 dark:text-white text-xl font-bold mb-2">Instant Delivery</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Account details sent immediately to your dashboard and email upon purchase.</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center gap-5 group">
                                <div className="size-20 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-4xl">support_agent</span>
                                </div>
                                <div>
                                    <h4 className="text-slate-900 dark:text-white text-xl font-bold mb-2">24/7 Support</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Dedicated concierge help for all your API integration and account needs.</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center gap-5 group">
                                <div className="size-20 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors duration-300">
                                    <span className="material-symbols-outlined text-4xl">verified_user</span>
                                </div>
                                <div>
                                    <h4 className="text-slate-900 dark:text-white text-xl font-bold mb-2">Verified Accounts</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Safe, secure, and officially verified access to premium tools with privacy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}