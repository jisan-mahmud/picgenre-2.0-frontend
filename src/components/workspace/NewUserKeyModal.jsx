import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KeyRound, X, ArrowRight } from 'lucide-react'

export const NEW_USER_POPUP_DISMISS_KEY = 'picgenre_new_user_popup_dismissed'

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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={handleDismiss}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleDismiss} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors" aria-label="Close">
                    <X size={20} />
                </button>

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <KeyRound className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white font-display">
                    Generate metadata for free
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    As a new user you can process images free during your first month.
                    Just add your own Gemini API key and start generating without any credits.
                </p>

                <button
                    onClick={handleAddKey}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
                >
                    Add my Gemini API key
                    <ArrowRight size={18} />
                </button>
                <button
                    onClick={handleDismiss}
                    className="w-full mt-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white py-2 transition-colors"
                >
                    Maybe later
                </button>

                <label className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={dontShowAgain}
                        onChange={(e) => setDontShowAgain(e.target.checked)}
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    Don't show this again
                </label>
            </div>
        </div>
    )
}