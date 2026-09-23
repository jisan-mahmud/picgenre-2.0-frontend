import React, { useState } from 'react'
import { ListChecks, Trash2, Loader2, AlertCircle, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const STATUS_BADGES = {
    failed: { label: 'Failed', icon: <AlertCircle className="w-3.5 h-3.5" />, className: 'text-red-500 bg-red-500/10', row: 'border-l-4 border-l-red-500' },
    processing: { label: 'Processing...', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, className: 'text-primary bg-primary/10', row: 'border-l-4 border-l-primary' },
}

const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase()
    if (['jpg', 'jpeg', 'png'].includes(ext)) return 'Image'
    if (ext === 'eps') return 'Vector'
    return 'File'
}

export default function FileQueue({ items = [], onRemove, isProcessing = false }) {
    const [tooltip, setTooltip] = useState(null)

    const showTooltip = (e, text) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltip({ text, x: rect.right + 10, y: rect.top + rect.height / 2 })
    }

    const activeCount = items.filter(item => item.status === 'processing').length
    const completedCount = items.filter(item => item.status !== 'processing').length
    const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0

    return (
        <div className="bg-white dark:bg-slate-900/40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[11px] font-black font-display shrink-0">2</span>
                        <ListChecks className="w-5 h-5 text-slate-400" />
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold font-display">Review queue</h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {items.length === 0 ? 'Empty' : `${items.length} file${items.length !== 1 ? 's' : ''}`}
                    </span>
                </div>
                {items.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                            <span className="text-slate-500 dark:text-slate-400">{isProcessing ? `Processing ${activeCount} of ${items.length}` : 'Queued'}</span>
                            <span className="text-primary">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2 overflow-hidden">
                            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
            {items.length === 0 ? (
                <div className="px-6 py-10 text-center text-slate-400 dark:text-slate-500 text-sm">No files in queue yet.</div>
            ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                    <AnimatePresence initial={false}>
                    {items.map((item) => {
                        const file = item.file
                        const badge = STATUS_BADGES[item.status]
                        return (
                            <motion.li
                                key={item.id}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 16 }}
                                transition={{ duration: 0.25 }}
                                layout
                                className={`flex items-center gap-4 px-6 py-3.5 transition-colors ${badge ? badge.row : 'border-l-4 border-l-transparent'} ${item.status === 'processing' ? 'bg-primary/5' : ''}`}
                            >
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800">
                                    {item.preview ? (
                                        <img src={item.preview} alt={file.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <FileText className="w-6 h-6 text-slate-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                                    <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{getFileType(file.name)}</span>
                                </div>
                                <div className="shrink-0">
                                    {badge ? (
                                        <span
                                            key={item.id}
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-tighter ${badge.className}`}
                                            onMouseEnter={(e) => (item.status === 'failed' && item.error) && showTooltip(e, item.error)}
                                            onMouseMove={(e) => (item.status === 'failed' && item.error) && showTooltip(e, item.error)}
                                            onMouseLeave={() => setTooltip(null)}
                                        >
                                            {badge.icon}
                                            {badge.label}
                                        </span>
                                    ) : isProcessing ? (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-900/40 uppercase tracking-tighter">Queued</span>
                                    ) : null}
                                </div>
                                <button
                                    onClick={() => onRemove?.(item.id)}
                                    disabled={isProcessing || item.status === 'processing'}
                                    className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                    title="Remove from queue"
                                    aria-label={`Remove ${file.name} from queue`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.li>
                        )
                    })}
                    </AnimatePresence>
                </ul>
            )}
            {tooltip && (
                <div className="fixed z-[100] pointer-events-none" style={{ left: tooltip.x, top: tooltip.y, transform: 'translateY(-50%)' }}>
                    <div className="bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-xl border border-slate-700 dark:border-slate-600 px-3 py-2 max-w-80 leading-snug">
                        <p className="font-bold uppercase tracking-wide text-red-300 mb-0.5">Error</p>
                        {tooltip.text}
                    </div>
                </div>
            )}
        </div>
    )
}
