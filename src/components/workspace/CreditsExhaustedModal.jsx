import { useNavigate } from 'react-router-dom'
import { KeyRound, X, ArrowRight, Sparkles } from 'lucide-react'

export default function CreditsExhaustedModal({ hasOwnKey, onContinueWithOwnKey, onClose }) {
    const navigate = useNavigate()

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors" aria-label="Close">
                    <X size={20} />
                </button>

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {hasOwnKey ? <KeyRound className="w-6 h-6 text-primary" /> : <Sparkles className="w-6 h-6 text-primary" />}
                </div>

                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white font-display">
                    {hasOwnKey ? 'Plan credits finished' : "You're out of plan credits"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {hasOwnKey
                        ? 'Your plan credits are finished. Continue processing the remaining files with your own Gemini API key — no more credits will be deducted.'
                        : 'Your plan credits have finished. Upgrade your plan or add your own Gemini API key to keep processing images.'}
                </p>

                {hasOwnKey ? (
                    <>
                        <button
                            onClick={onContinueWithOwnKey}
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
                        >
                            Continue with own key
                            <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => navigate('/pricing')}
                            className="w-full mt-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white py-2 transition-colors"
                        >
                            Upgrade Plan
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/pricing')}
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
                        >
                            Upgrade Plan
                            <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => navigate('/settings/ai-models')}
                            className="w-full mt-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white py-2 transition-colors"
                        >
                            Add my Gemini API key
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}