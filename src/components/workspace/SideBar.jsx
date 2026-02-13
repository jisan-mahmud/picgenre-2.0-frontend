import React from 'react'
import { Diamond, Users, Camera, HelpCircle, Info, StopCircle, Sparkles } from 'lucide-react'
import CurrentSubscription from './sidebar/CurrentSubscription'

export default function SideBar({ queueCount, processedCount = 0, totalCount = 0, onGenerate, onStop, isProcessing }) {
    const progress = totalCount > 0 ? Math.round((processedCount / totalCount) * 100) : 0

    return (
        <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 sticky top-24">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                        <h4 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest">Queue Progress</h4>
                        <span className="text-primary text-xs font-black">{progress}% Processed</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(19,37,236,0.4)] transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400">{processedCount} of {totalCount} tasks finished</p>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
                            <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span> {isProcessing ? 'Processing' : 'Ready'}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wider">Target Platform</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all bg-white dark:bg-slate-900/40 border-primary text-primary dark:text-white ring-2 ring-primary/20 shadow-md">
                                <Diamond className="w-6 h-6" />
                                <span className="text-[11px] font-bold uppercase tracking-tight text-center">Adobe Stock</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-slate-500 hover:border-primary/50 hover:text-primary dark:hover:text-white transition-all">
                                <Users className="w-6 h-6" />
                                <span className="text-[11px] font-bold uppercase tracking-tight text-center">Freepik</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-slate-500 hover:border-primary/50 hover:text-primary dark:hover:text-white transition-all">
                                <Camera className="w-6 h-6" />
                                <span className="text-[11px] font-bold uppercase tracking-tight text-center">Shutterstock</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wider">Custom Instructions</label>
                            <HelpCircle className="w-4 h-4 text-slate-400" />
                        </div>
                        <textarea className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] resize-none" placeholder="Add custom context, keywords, or specific style guides for the AI..."></textarea>
                    </div>
                </div>
                <CurrentSubscription/>
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-900/40">
                    {isProcessing ? (
                        <button onClick={onStop} className="w-full h-14 bg-red-500 text-white text-base font-black rounded-lg shadow-xl shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                            <StopCircle className="w-5 h-5" />
                            Stop Processing
                        </button>
                    ) : (
                        <button onClick={onGenerate} disabled={queueCount === 0} className="w-full h-14 bg-primary text-white text-base font-black rounded-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                            <Sparkles className="w-5 h-5" />
                            Generate Metadata
                        </button>
                    )}
                    <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">{queueCount} file{queueCount !== 1 ? 's' : ''} pending</p>
                </div>
            </div>
        </div>
    )
}
