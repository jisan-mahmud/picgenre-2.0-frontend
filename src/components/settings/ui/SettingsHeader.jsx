import { motion } from 'motion/react'

export default function SettingsHeader({ icon: Icon = null, title, subtitle, children }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 lg:mb-8">
            <div className="flex items-start gap-4">
                {Icon && (
                    <motion.div
                        className="hidden sm:flex size-12 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                )}
                <div className="flex flex-col gap-1.5">
                    <motion.h1
                        className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.02em] text-slate-900 dark:text-white"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="text-sm lg:text-base text-slate-500 dark:text-[#9296c9] leading-normal max-w-xl"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </div>
            {children && (
                <motion.div
                    className="flex shrink-0"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
                >
                    {children}
                </motion.div>
            )}
        </div>
    )
}