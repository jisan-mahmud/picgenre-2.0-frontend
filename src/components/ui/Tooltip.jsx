export default function Tooltip({ title, description, children }) {
    return (
        <div className="relative inline-flex group">
            {children}
            <div
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-[70] mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
            >
                <div className="relative rounded-lg bg-slate-900 text-white shadow-xl px-3 py-2 max-w-xs dark:bg-white dark:text-slate-900">
                    <p className="text-xs font-bold whitespace-nowrap">{title}</p>
                    {description && (
                        <p className="mt-1 text-[11px] leading-snug text-slate-300 dark:text-slate-600">
                            {description}
                        </p>
                    )}
                    <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-white border-r border-b border-slate-700 dark:border-slate-200" />
                </div>
            </div>
        </div>
    )
}