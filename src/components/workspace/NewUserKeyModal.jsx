import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KeyRound, X, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

export const NEW_USER_POPUP_DISMISS_KEY = 'picgenre_new_user_popup_dismissed'

const BENEFITS = [
    'Process images free for your first month',
    'No plan credits deducted',
    'Your key, your control',
]

export default function NewUserKeyModal({ onClose }) {
    const navigate = useNavigate()
    const [dontShowAgain, setDontShowAgain] = useState(false)

    const handleDismiss = () => {
        if (dontShowAgain) localStorage.setItem(NEW_USER_POPUP_DISMISS_KEY, '1')
        onClose()
    }

    const handleAddKey = () => {
        if (dontShowAgain) localStorage.setItem(NEW_USER_POPUP_DISMISS_KEY, '1')
        navigate('/settings/ai-models')
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up" onClick={handleDismiss}>
            <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl ring-1 ring-slate-900/5 dark:ring-slate-700/50 animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleDismiss} className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors" aria-label="Close">
                    <X size={18} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        First month free
                    </span>

                    <div className="relative mt-5 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/25">
                            <KeyRound className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                        Generate metadata for free
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                        As a new user you can process images free during your first month. Just add your own Gemini API key and start generating without using any credits.
                    </p>
                </div>

                <div className="mt-6 space-y-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">
                    {BENEFITS.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            {benefit}
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleAddKey}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        Add my Gemini API key
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="w-full mt-2 rounded-xl py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Maybe later
                    </button>
                </div>

                <label className="mt-4 flex items-center justify-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                    <span className={`relative w-8 h-5 rounded-full transition-colors ${dontShowAgain ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${dontShowAgain ? 'translate-x-3' : ''}`} />
                    </span>
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={dontShowAgain}
                        onChange={(e) => setDontShowAgain(e.target.checked)}
                    />
                    Don't show this again
                </label>
            </div>
        </div>
    )
}