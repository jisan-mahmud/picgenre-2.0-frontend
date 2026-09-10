import React, { useState } from 'react'
import { Clock, FileText, Trash2, Loader2, AlertCircle } from 'lucide-react'

const STATUS_BADGES = {
    failed: { label: 'Failed', icon: <AlertCircle className="w-3.5 h-3.5" />, className: 'text-red-500 bg-red-500/10' },
    processing: { label: 'Processing...', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, className: 'text-primary bg-primary/10' },
}

export default function FileQueue({ items = [], onRemove, isProcessing = false }) {
    const [tooltip, setTooltip] = useState(null)

    const showTooltip = (e, text) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltip({ text, x: rect.right + 10, y: rect.top + rect.height / 2 })
    }

    const getFileType = (filename) => {
        const ext = filename.split('.').pop().toLowerCase()
        if (['jpg', 'jpeg', 'png'].includes(ext)) return 'Image'
        if (ext === 'eps') return 'Vector'
        return 'File'
    }

    const activeCount = items.filter(item => item.status === 'processing').length

    return (
        <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold font-display">Remaining Queue ({items.length})</h3>
                </div>
                <span className={`text-xs font-bold ${isProcessing ? 'text-primary' : 'text-slate-400'}`}>
                    {isProcessing
                        ? (activeCount > 0 ? `Processing ${activeCount} of ${items.length}` : 'Starting...')
                        : items.length > 0 ? 'Ready' : 'Empty'}
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900">
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Preview</th>
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Filename</th>
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-slate-400 text-sm">No files in queue</td>
                            </tr>
                        ) : (
                            items.map((item) => {
                                const file = item.file
                                const badge = STATUS_BADGES[item.status]
                                const isRowCurrent = item.status === 'processing'
                                return (
                                    <tr key={item.id} className={`transition-colors ${isRowCurrent ? 'bg-primary/5' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800">
                                                {item.preview ? (
                                                    <img src={item.preview} alt={file.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <FileText className="w-6 h-6 text-slate-400" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 dark:text-white text-sm font-medium max-w-50 truncate">{file.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{getFileType(file.name)}</span>
                                        </td>
                                        <td className="px-6 py-4">
{badge ? (
    <div className="flex flex-col gap-1">
        <span
            className={`inline-flex w-fit items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter ${badge.className}`}
            onMouseEnter={(e) => (item.status === 'failed' && item.error) && showTooltip(e, item.error)}
            onMouseMove={(e) => (item.status === 'failed' && item.error) && showTooltip(e, item.error)}
            onMouseLeave={() => setTooltip(null)}
        >
            {badge.icon}
            {badge.label}
        </span>
    </div>
) : isProcessing ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-900/40 uppercase tracking-tighter">Queued</span>
                                            ) : null}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => onRemove?.(item.id)}
                                                disabled={isProcessing || item.status === 'processing'}
                                                className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                                title="Remove from queue"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
            {tooltip && (
                <div
                    className="fixed z-[100] pointer-events-none"
                    style={{ left: tooltip.x, top: tooltip.y, transform: 'translateY(-50%)' }}
                >
                    <div className="bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-xl border border-slate-700 dark:border-slate-600 px-3 py-2 max-w-80 leading-snug">
                        <p className="font-bold uppercase tracking-wide text-red-300 mb-0.5">Error</p>
                        {tooltip.text}
                    </div>
                </div>
            )}
        </div>
    )
}