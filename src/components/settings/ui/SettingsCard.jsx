import { motion } from 'motion/react'

export default function SettingsCard({
    icon: Icon = null,
    title,
    description,
    children,
    className = '',
    delay = 0.15,
}) {
    return (
        <motion.section
            className={`rounded-2xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-[#111222]/60 shadow-sm overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay, ease: 'easeOut' }}
        >
            {(Icon || title) && (
                <header className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-slate-100 dark:border-[#232648]">
                    {Icon && (
                        <span className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                        </span>
                    )}
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight">{title}</h2>
                        {description && (
                            <p className="text-slate-500 dark:text-[#9296c9] text-xs mt-0.5 leading-relaxed">{description}</p>
                        )}
                    </div>
                </header>
            )}
            <div className="p-6">{children}</div>
        </motion.section>
    )
}