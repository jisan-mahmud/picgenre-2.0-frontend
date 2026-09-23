export function Skeleton({ className = '' }) {
    return <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-[#232648] ${className}`} />
}

export function SkeletonRows({ rows = 3, columns = 3, className = '' }) {
    return (
        <div className={`flex flex-col divide-y divide-slate-100 dark:divide-[#232648] ${className}`}>
            {Array.from({ length: rows }).map((_, r) => (
                <div key={r} className="flex items-center gap-6 px-6 py-5">
                    {Array.from({ length: columns }).map((_, c) => (
                        <Skeleton key={c} className="h-4 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    )
}