import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Crown, Rocket, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

export const AUDIENCE_CARD_OPEN_KEY = 'picgenre_audience_card_open'

export default function AudienceCard({ isPremium, isNewUser, showUpgrade = false }) {
    const [open, setOpen] = useState(() => localStorage.getItem(AUDIENCE_CARD_OPEN_KEY) !== '0')

    const toggle = () => {
        setOpen(prev => {
            localStorage.setItem(AUDIENCE_CARD_OPEN_KEY, String(prev ? 0 : 1))
            return !prev
        })
    }

    if (!isPremium && !isNewUser && !showUpgrade) return null

    let Icon = Crown
    let title = 'Premium member?'
    let body = (
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Conversions are free on every plan and never deduct your monthly credits — keep your plan credits for metadata generation.
        </p>
    )

    if (isPremium) {
        Icon = Crown
        title = 'Premium member?'
    } else if (isNewUser) {
        Icon = Rocket
        title = 'New to Picgenre?'
        body = (
            <>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Everything here is free during your first month and never uses credits. Add your Gemini API key later for metadata generation — and upgrade to a plan to keep converting after your trial ends.
                </p>
                <Link to="/pricing" className="self-start inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-primary/20 hover:bg-indigo-500 transition-all">
                    View Plans
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </>
        )
    } else {
        Icon = Crown
        title = 'Keep converting with a plan'
        body = (
            <>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Your free first month is over. Upgrade to keep converting images and generating metadata without limits.
                </p>
                <Link to="/pricing" className="self-start inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-primary/20 hover:bg-indigo-500 transition-all">
                    View Plans
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </>
        )
    }

    return (
        <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold font-display">{title}</h3>
                </div>
                <button
                    onClick={toggle}
                    aria-expanded={open}
                    aria-label={open ? 'Minimize card' : 'Expand card'}
                    className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pt-1">{body}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}