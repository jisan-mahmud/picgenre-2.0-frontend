import React from 'react'
import { Infinity as InfinityIcon } from 'lucide-react'
import { useCurrentSubscription } from '../../../hooks/useApi'

const UNLIMITED_THRESHOLD = 1000000000

export default function CurrentSubscription() {
    const { data: subscription, isLoading } = useCurrentSubscription()

    const plan = subscription?.plan
    const tier = (plan?.tier || '').toLowerCase()
    const planName = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) + ' Plan' : 'Free Trial'
    const total = subscription?.total_credit ?? 0
    const remaining = subscription?.remaining_credit ?? 0
    const isUnlimited = (subscription?.total_credit ?? 0) >= UNLIMITED_THRESHOLD
    const pct = total > 0 ? Math.min(100, Math.max(0, (remaining / total) * 100)) : 0
    const isActive = !!subscription?.is_active

    if (isLoading) {
        return (
            <div className="animate-pulse flex flex-col gap-4 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center gap-3">
                    <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800"></div>
                    <div className="h-4 w-16 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                </div>
                <div className="h-10 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-14 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
            </div>
        )
    }

    if (!subscription) {
        return (
            <div className="flex flex-col gap-4 p-5 bg-slate-50 dark:bg-white/3 rounded-lg border border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-center">
                    <label className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest">Current Subscription</label>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">Inactive</span>
                </div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">No active subscription</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 p-5 bg-slate-50 dark:bg-white/3 rounded-lg border border-slate-200 dark:border-white/5">
            <div className="flex justify-between items-center">
                <label className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest">Current Subscription</label>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isActive
                        ? 'bg-primary text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                    {isActive ? planName : 'Inactive'}
                </span>
            </div>

            {plan?.description && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{plan.description}</p>
            )}

            <div className="flex items-center justify-between bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Remaining Credits</p>
                {isUnlimited ? (
                    <div className="flex items-center gap-1.5 text-primary">
                        <InfinityIcon className="w-5 h-5" />
                        <span className="text-sm font-black uppercase tracking-tight">Unlimited</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-20 bg-slate-200 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="text-sm font-black text-slate-900 dark:text-white">{remaining} <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">/ {total}</span></span>
                    </div>
                )}
            </div>
        </div>
    )
}