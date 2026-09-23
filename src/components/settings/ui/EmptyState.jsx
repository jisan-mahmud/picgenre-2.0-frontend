import { motion } from 'motion/react'

export default function EmptyState({ icon: Icon = null, title, description, action = null, className = '' }) {
    return (
        <motion.div
            className={`flex flex-col items-center justify-center text-center gap-3 px-6 py-14 ${className}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            {Icon && (
                <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                </div>
            )}
            <div className="flex flex-col gap-1">
                <h3 className="text-slate-900 dark:text-white text-base font-bold">{title}</h3>
                <p className="text-slate-500 dark:text-[#9296c9] text-sm max-w-sm leading-relaxed">{description}</p>
            </div>
            {action}
        </motion.div>
    )
}