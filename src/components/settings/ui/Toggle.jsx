import { motion } from 'motion/react'

export default function Toggle({ checked, onChange, label, disabled = false }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#101222] ${
                checked ? 'bg-primary' : 'bg-slate-300 dark:bg-[#232648]'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <motion.span
                className="absolute size-[18px] rounded-full bg-white shadow"
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                initial={false}
                style={{ left: 3 }}
                animate={{ x: checked ? 20 : 0 }}
            />
        </button>
    )
}