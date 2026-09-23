import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, BookmarkPlus, CheckCircle2, Download, Image, Clock, Lock, Tag, AlignLeft, Sparkles, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Toast from '../ui/Toast'
import Tooltip from '../ui/Tooltip'

export default function ProcessedFile({
    files = [],
    onExportAll,
    onSaveHistory,
    canSaveHistory = false,
    onAddFiles,
}) {
    const navigate = useNavigate()
    const [toast, setToast] = useState(null)

    const copyToClipboard = (text, type) => {
        if (!text) return
        navigator.clipboard?.writeText(text)
        setToast({ message: `${type} copied to clipboard!`, type: 'success' })
    }

    const handleExportAll = () => {
        if (files.length === 0) {
            setToast({ message: 'No processed metadata to export', type: 'error' })
            return
        }
        onExportAll?.()
    }

    const handleSaveHistory = () => {
        if (files.length === 0) {
            setToast({ message: 'No processed metadata to save', type: 'error' })
            return
        }
        if (!canSaveHistory) {
            setToast({ message: 'Save to history is a premium feature. Upgrade your plan to continue.', type: 'error' })
            navigate('/pricing')
            return
        }
        onSaveHistory?.()
    }

    return (
        <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-900/40 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="size-6 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[11px] font-black font-display">3</span>
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold font-display truncate">Your Results <span className="text-primary">({files.length})</span></h3>
                </div>
                <div className="flex items-center gap-2">
                    <Tooltip title="Export all" description="Download the metadata CSV for every processed file to your device.">
                        <button
                            onClick={handleExportAll}
                            disabled={files.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900/40 hover:bg-slate-200 dark:hover:bg-slate-900 rounded-lg text-sm font-bold text-slate-700 dark:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="w-4 h-4" /> Export All
                        </button>
                    </Tooltip>
                    <Tooltip
                        title={canSaveHistory ? 'Save to history' : 'Premium feature'}
                        description={canSaveHistory
                            ? files.length === 0
                                ? 'Nothing to save yet — generate metadata first.'
                                : "Store this batch's metadata CSV in your account and download it anytime from Batch History."
                            : 'Upgrade to save your metadata CSV and download it later from Batch History.'}
                    >
                        <button
                            onClick={handleSaveHistory}
                            disabled={files.length === 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                canSaveHistory
                                    ? 'bg-primary text-white hover:brightness-110'
                                    : 'bg-slate-100 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                            }`}
                        >
                            {canSaveHistory ? <BookmarkPlus className="w-4 h-4" /> : <Lock className="w-4 h-4" />} Save to History
                        </button>
                    </Tooltip>
                </div>
            </div>

            {files.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                    <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Sparkles className="w-7 h-7" />
                    </div>
                    <h4 className="text-slate-900 dark:text-white text-base font-bold font-display">No results yet</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
                        Upload images and hit <span className="text-primary font-bold">Generate</span> — your AI metadata, tags, and descriptions will appear right here.
                    </p>
                    {onAddFiles && (
                        <button
                            onClick={onAddFiles}
                            className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Add files
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 p-6">
                    <AnimatePresence initial={false}>
                    {files.map((file, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.3 }}
                            layout
                            className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5"
                        >
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
                                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{file.description || ''}</p>
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
                                    <button
                                        onClick={() => copyToClipboard(file.title, 'Title')}
                                        disabled={!file.title}
                                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-primary dark:hover:text-white transition-all disabled:opacity-40"
                                        title="Copy Title"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(file.tags?.join(', '), 'Tags')}
                                        disabled={!file.tags?.length}
                                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-primary dark:hover:text-white transition-all disabled:opacity-40"
                                        title="Copy Tags"
                                    >
                                        <Tag className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(file.description, 'Description')}
                                        disabled={!file.description}
                                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-primary dark:hover:text-white transition-all disabled:opacity-40"
                                        title="Copy Description"
                                    >
                                        <AlignLeft className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            )}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    )
}
