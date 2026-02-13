import React, { useEffect, useState } from 'react'
import { Infinity } from 'lucide-react'

export default function CurrentSubscription() {
    const [subscription, setSubscription] = useState(null)
    useEffect(() => {
        const proPlan = {
            name: 'Pro Plan',
            totalTokens: 'Unlimited',
            remainingTokens: 'Unlimited'
        };

        const freePlan = {
            name: 'Free Plan',
            totalTokens: 20,
            remainingTokens: 8
        };

        setSubscription(proPlan);
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-4">
                {subscription?.name === 'Pro Plan' ? (
                    <div className="flex flex-col gap-4 p-5 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10">
                        <div className="flex justify-between items-center">
                            <label className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest">Current Subscription</label>
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary text-white font-bold uppercase tracking-wider">Pro Plan</span>
                        </div>
                        <div className="flex items-center justify-between bg-primary/5 dark:bg-slate-900/50 p-3 rounded-lg border border-primary/20">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Remaining Tokens</p>
                            <div className="flex items-center gap-1.5 text-primary">
                                <Infinity className="w-5 h-5" />
                                <span className="text-sm font-black uppercase tracking-tight">Unlimited Tokens</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 p-5 bg-slate-50 dark:bg-white/3 rounded-lg border border-slate-200 dark:border-white/5">
                        <div className="flex justify-between items-center">
                            <label className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest">Current Subscription</label>
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">Free Trial</span>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center">
                                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Remaining Tokens</p>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">8 / 20</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-primary h-full rounded-full w-[40%] transition-all duration-1000"></div>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">8 / 20 tokens remaining for exploration</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
