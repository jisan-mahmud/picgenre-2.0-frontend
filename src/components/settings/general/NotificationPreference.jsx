import React from 'react'
import Toggle from '../ui/Toggle'
import { Skeleton } from '../ui/Skeleton'

const OPTIONS = [
    {
        key: 'request_limit_alert',
        title: 'Request Limit Alert',
        description: 'Notify me when usage reaches 90% of monthly capacity',
    },
    {
        key: 'plan_expiry_reminder',
        title: 'Plan Expiry Reminder',
        description: 'Notify several days before your current plan is due to expire',
    },
]

export default function NotificationPreference({ notifData, onChange, loading = false, original = null }) {
    if (loading) {
        return (
            <div className="flex flex-col gap-3">
                {OPTIONS.map((option) => (
                    <div key={option.key} className="flex items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-[#1c1f3d] rounded-xl border border-slate-100 dark:border-[#232648]">
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-64 max-w-full" />
                        </div>
                        <Skeleton className="h-6 w-11 rounded-full" />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {OPTIONS.map((option) => {
                const checked = !!notifData[option.key]
                const changed = original ? notifData[option.key] !== original[option.key] : false
                return (
                    <div
                        key={option.key}
                        className={`flex items-center justify-between gap-4 p-4 rounded-xl border transition-colors ${
                            changed
                                ? 'bg-primary/5 border-primary/30'
                                : 'bg-slate-50 dark:bg-[#1c1f3d] border-slate-100 dark:border-[#232648]'
                        }`}
                    >
                        <div className="flex flex-col gap-1">
                            <p className="text-slate-900 dark:text-white font-bold text-sm">{option.title}</p>
                            <p className="text-slate-500 dark:text-[#9296c9] text-xs">{option.description}</p>
                        </div>
                        <Toggle
                            checked={checked}
                            onChange={() => onChange(option.key)}
                            label={option.title}
                        />
                    </div>
                )
            })}
        </div>
    )
}