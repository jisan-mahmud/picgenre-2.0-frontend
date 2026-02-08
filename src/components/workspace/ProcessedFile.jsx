import React, { useState } from 'react'
import { CheckCircle, Download, Image, Clock, Copy, Tag } from 'lucide-react'
import Toast from '../ui/Toast'

export default function ProcessedFile({ files = [] }) {
    const [toast, setToast] = useState(null)

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text)
        setToast(`${type} copied to clipboard!`)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold font-display">Processed Results ({files.length})</h3>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900/40 hover:bg-slate-200 dark:hover:bg-slate-900 rounded-lg text-sm font-bold text-slate-700 dark:text-white transition-all">
                    <Download className="w-4 h-4" /> Export All
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {files.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400">
                        <Clock className="w-10 h-10 mb-2 text-slate-400" />
                        <p className="text-sm">No processed files yet</p>
                    </div>
                ) : (
                    files.map((file, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <div className="w-20 h-20 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-200 dark:border-slate-800">
                                        {file.preview ? (
                                            <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Image className="w-10 h-10 text-slate-400" />
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider truncate">{file.name}</p>
                                            <span className="px-1.5 py-0.5 rounded text-[8px] bg-primary/10 text-primary font-bold uppercase whitespace-nowrap">{file.platform || 'Adobe Stock'}</span>
                                        </div>
                                        <h4 className="text-slate-900 dark:text-white text-base font-bold leading-tight wrap-break-word">{file.title || 'Generated title'}</h4>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {file.tags?.slice(0, 4).map((tag, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">{tag}</span>
                                            ))}
                                            {file.tags?.length > 4 && (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">+{file.tags.length - 4} more</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row md:flex-row gap-2 shrink-0 self-start">
                                    <button onClick={() => copyToClipboard(file.title, 'Title')} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-primary dark:hover:text-white transition-all" title="Copy Title">
                                        <Copy className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => copyToClipboard(file.tags?.join(', '), 'Tags')} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-primary dark:hover:text-white transition-all" title="Copy Tags">
                                        <Tag className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </div>
    )
}
