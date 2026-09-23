import { useNavigate } from 'react-router-dom'
import { KeyRound, X, ArrowRight, Coins } from 'lucide-react'

export default function CreditsExhaustedModal({ hasOwnKey, onContinueWithOwnKey, onClose }) {
    const navigate = useNavigate()

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up" onClick={onClose}>
            <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl ring-1 ring-slate-900/5 dark:ring-slate-700/50 animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors" aria-label="Close">
                    <X size={18} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                        <Coins className="w-3.5 h-3.5" />
                        Out of plan credits
                    </span>

                    <div className="relative mt-5 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${hasOwnKey ? 'from-primary to-emerald-600' : 'from-amber-500 to-orange-600'} flex items-center justify-center shadow-lg shadow-primary/25`}>
                            {hasOwnKey ? <KeyRound className="w-7 h-7 text-white" /> : <Coins className="w-7 h-7 text-white" />}
                        </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                        {hasOwnKey ? 'Plan credits finished' : "You're out of plan credits"}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                        {hasOwnKey
                            ? 'Your plan credits are finished. Continue processing the remaining files with your own Gemini API key — no more credits will be deducted.'
                            : 'Your plan credits have finished. Upgrade your plan or add your own Gemini API key to keep processing images.'}
                    </p>
                </div>

                <div className="mt-6">
                    {hasOwnKey ? (
                        <>
                            <button
                                onClick={onContinueWithOwnKey}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                Continue with own key
                                <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full mt-2 rounded-xl py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                Stop
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/pricing')}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                Upgrade Plan
                                <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={() => navigate('/settings/ai-models')}
                                className="w-full mt-2 rounded-xl py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                Add my Gemini API key
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}