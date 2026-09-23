import React, { useEffect, useRef, useState } from 'react'
import { CloudUpload, Download, Package, FileType2, Settings2, ArrowRight, X, Loader2, AlertCircle, CheckCircle2, Sparkles, RefreshCw, Palette } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Toast from '../components/ui/Toast'
import AudienceCard from '../components/AudienceCard'
import LockedFeatureCard from '../components/LockedFeatureCard'
import { useCurrentSubscription } from '../hooks/useApi'
import {
    SOURCE_FORMATS,
    TARGET_FORMATS,
    FORMAT_EXTENSIONS,
    convertFile,
} from '../utils/imageConvert'

const makePreview = (file) => {
    const ext = (file.name.split('.').pop() || '').toLowerCase()
    if (['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'svg', 'avif', 'ico'].includes(ext)) {
        return URL.createObjectURL(file)
    }
    return null
}

let idCounter = 0
const nextId = () => `tool-${Date.now()}-${idCounter++}`

export default function Tools() {
    const { data: subscription } = useCurrentSubscription()
    const isPremium = subscription?.plan?.tier === 'BASIC' || subscription?.plan?.tier === 'PRO'
    const isNewUser = subscription?.is_new_user === true
    const hasToolsAccess = subscription && (isPremium || isNewUser)
    const subscriptionLoading = subscription === undefined
    const [sourceFormat, setSourceFormat] = useState('JPEG')
    const [targetFormat, setTargetFormat] = useState('PNG')
    const [queueItems, setQueueItems] = useState([])
    const [results, setResults] = useState([])
    const [isConverting, setIsConverting] = useState(false)
    const [quality, setQuality] = useState(0.85)
    const [background, setBackground] = useState('#ffffff')
    const [toast, setToast] = useState(null)
    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const availableTargets = sourceFormat === 'EPS'
        ? ['PNG', 'JPEG']
        : TARGET_FORMATS

    const applySelection = (source, target) => {
        if (sourceFormat !== source || targetFormat !== target) {
            queueItems.forEach(item => item.preview && URL.revokeObjectURL(item.preview))
        }
        setSourceFormat(source)
        setTargetFormat(target)
        setQueueItems([])
        setResults([])
    }

    useEffect(() => {
        return () => queueItems.forEach(item => item.preview && URL.revokeObjectURL(item.preview))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFiles = (files) => {
        const invalid = []
        const accepted = files.filter(file => {
            const ext = (file.name.split('.').pop() || '').toLowerCase()
            const okExt = (FORMAT_EXTENSIONS[sourceFormat] || []).includes(ext)
            const okSize = file.size <= 50 * 1024 * 1024
            if (!okExt || !okSize) invalid.push(file.name)
            return okExt && okSize
        })
        if (invalid.length > 0) {
            setToast({
                message: `Skipped ${invalid.length} file(s) — only ${sourceFormat} files up to 50MB are accepted for this conversion.`,
                type: 'error',
            })
        }
        if (accepted.length > 0) {
            setQueueItems(prev => [...prev, ...accepted.map(file => ({
                id: nextId(),
                file,
                status: 'pending',
                preview: makePreview(file),
                error: null,
            }))])
        }
    }

    const setStatus = (id, status, error = null) => {
        setQueueItems(prev => prev.map(item => item.id === id ? { ...item, status, error } : item))
    }

    const handleRemove = (id) => {
        const removed = queueItems.find(item => item.id === id)
        if (removed?.preview) URL.revokeObjectURL(removed.preview)
        setQueueItems(prev => prev.filter(item => item.id !== id))
    }

    const downloadFile = (file) => {
        const url = URL.createObjectURL(file)
        const a = document.createElement('a')
        a.href = url
        a.download = file.name
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
    }

    const handleConvert = async () => {
        const workItems = queueItems.filter(item => item.status !== 'processing')
        if (workItems.length === 0) return

        setIsConverting(true)
        const CONCURRENCY = 3
        let nextIndex = 0

        const worker = async () => {
            while (true) {
                const idx = nextIndex++
                if (idx >= workItems.length) return
                const item = workItems[idx]
                setStatus(item.id, 'processing')
                try {
                    const converted = await convertFile(item.file, targetFormat, { quality, background })
                    setResults(prev => [...prev, {
                        id: item.id,
                        name: converted.name,
                        file: converted,
                        preview: URL.createObjectURL(converted),
                    }])
                    setQueueItems(prev => prev.filter(i => i.id !== item.id))
                } catch (error) {
                    setStatus(item.id, 'failed', error?.message || 'Conversion failed')
                }
            }
        }

        await Promise.all(
            Array.from({ length: Math.min(CONCURRENCY, workItems.length) }, worker)
        )
        setIsConverting(false)

        const failed = queueItems.filter(item => item.status === 'failed')
        if (failed.length > 0) {
            setToast({
                message: `${failed.length} file(s) failed to convert. Check the error details below.`,
                type: 'error',
            })
        }
    }

    const handleDownloadAll = async () => {
        if (results.length === 0) return
        try {
            const JSZip = (await import('jszip')).default
            const zip = new JSZip()
            results.forEach(r => zip.file(r.name, r.file))
            const blob = await zip.generateAsync({ type: 'blob' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `picgenre-converted-${new Date().toISOString().slice(0, 10)}.zip`
            a.click()
            setTimeout(() => URL.revokeObjectURL(url), 1000)
        } catch {
            setToast({ message: 'Failed to create ZIP download.', type: 'error' })
        }
    }

    const handleClear = () => {
        setResults(prev => {
            prev.forEach(r => URL.revokeObjectURL(r.preview))
            return []
        })
    }

    return (
        <div>
            <div className="layout-container flex h-full grow flex-col">
                <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-10 py-8">
                    <div className="flex flex-wrap justify-between gap-3 mb-8">
                        <motion.div
                            className="flex flex-col gap-1"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <div className="flex items-center gap-2">
                                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] font-display">Image Tools</h1>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3 h-3" />
                                    Free · no credits
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Convert images between formats. Runs in your browser; EPS uses our secure converter.</p>
                        </motion.div>
                    </div>

                    {subscriptionLoading ? (
                        <div className="mb-8 flex items-center justify-center py-8">
                            <Loader2 className="w-5 h-5 animate-spin text-primary/60" />
                        </div>
                    ) : !hasToolsAccess ? (
                        <div className="mb-8">
                            <LockedFeatureCard title="Premium feature" description="These tools are available to Premium members and to members within their first month. Upgrade your plan to start converting images." />
                        </div>
                    ) : (
                    <div className="mb-8">
                        <AudienceCard isPremium={isPremium} isNewUser={isNewUser} />
                    </div>
                    )}

                    {hasToolsAccess && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            {/* Source + Target pickers */}
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileType2 className="w-5 h-5 text-primary" />
                                        <h3 className="text-slate-900 dark:text-white text-lg font-bold font-display">Choose conversion</h3>
                                    </div>
                                    <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">From format</label>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {SOURCE_FORMATS.map((fmt) => {
                                            const isActive = sourceFormat === fmt
                                            const isEps = fmt === 'EPS'
                                            return (
                                                <button
                                                    key={fmt}
                                                    onClick={() => applySelection(fmt, isEps ? 'JPEG' : 'PNG')}
                                                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition-all ${
                                                        isActive
                                                            ? 'bg-white dark:bg-slate-900/40 border-primary text-primary dark:text-white ring-2 ring-primary/20 shadow-md'
                                                            : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-slate-500 hover:border-primary/50 hover:text-primary dark:hover:text-white'
                                                    }`}
                                                >
                                                    <FileType2 className="w-5 h-5" />
                                                    <span className="text-[11px] font-bold uppercase tracking-tight">{fmt}</span>
                                                    <span className="text-[9px] text-slate-400 uppercase font-medium">{FORMAT_EXTENSIONS[fmt].join(' / ')}</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-5 h-5 text-primary" />
                                        <span className="text-slate-900 dark:text-white font-bold text-lg font-display">{sourceFormat}</span>
                                        <span className="text-slate-400 dark:text-slate-500">→</span>
                                        <span className="text-primary font-black text-lg font-display">{targetFormat}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {availableTargets.map((fmt) => {
                                            const isActive = targetFormat === fmt
                                            return (
                                                <button
                                                    key={fmt}
                                                    onClick={() => setTargetFormat(fmt)}
                                                    className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
                                                        isActive
                                                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-900 hover:border-primary/50'
                                                    }`}
                                                >
                                                    {fmt}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    {sourceFormat === 'GIF' && (
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Only the first frame of GIF is converted.</p>
                                    )}
                                </div>
                            </div>

                            {/* Upload zone */}
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    setIsDragging(false)
                                    handleFiles(Array.from(e.dataTransfer.files))
                                }}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 bg-white/50 dark:bg-slate-900/40 transition-all cursor-pointer group ${
                                    isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-slate-800 hover:border-primary/50'
                                }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    disabled={isConverting}
                                    accept={FORMAT_EXTENSIONS[sourceFormat].map(ext => `.${ext}`).join(',')}
                                    onChange={(e) => {
                                        handleFiles(Array.from(e.target.files))
                                        e.target.value = ''
                                    }}
                                    className="hidden"
                                />
                                <div className="size-16 rounded-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <CloudUpload className="w-10 h-10" />
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-900 dark:text-white font-bold">Drag and drop {sourceFormat} files here</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">or <span className="text-primary hover:underline">browse files</span> from your computer</p>
                                </div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest mt-2">Support: {FORMAT_EXTENSIONS[sourceFormat].map(ext => ext.toUpperCase()).join(', ')} (Max 50MB)</p>
                            </div>

                            {/* Queue */}
                            {queueItems.length > 0 && (
                                <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest">Queue</h3>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{queueItems.length} file{queueItems.length !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <AnimatePresence initial={false}>
                                        {queueItems.map(item => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -16 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 16 }}
                                                transition={{ duration: 0.25 }}
                                                layout
                                                className="flex items-center gap-3 px-5 py-3"
                                            >
                                                {item.preview
                                                    ? <img src={item.preview} alt={item.file.name} className="w-9 h-9 rounded-lg object-cover bg-slate-100 dark:bg-slate-800" />
                                                    : <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400"><FileType2 className="w-4 h-4" /></div>}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-slate-900 dark:text-white font-medium truncate">{item.file.name}</p>
                                                    <p className="text-xs text-slate-400">{item.status === 'processing' ? 'Converting…' : item.status === 'failed' ? item.error : `${(item.file.size / 1024 / 1024).toFixed(2)} MB`}</p>
                                                </div>
                                                {item.status === 'processing' && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                                                {item.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-500" />}
                                                {!isConverting && (
                                                    <button onClick={() => handleRemove(item.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" aria-label="Remove">
                                                        <X size={16} />
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-5 self-start sticky top-24 max-h-[calc(100vh-7rem)] flex flex-col gap-6">
                            <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Settings2 className="w-4 h-4 text-primary" />
                                    <h4 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest">Conversion Settings</h4>
                                </div>

                                {sourceFormat !== 'EPS' && (
                                    <div className="flex flex-col gap-1.5 mb-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Quality</label>
                                            <span className="text-xs font-black text-primary dark:text-white px-1.5 py-0.5 rounded bg-primary/10 dark:bg-primary/20 min-w-9 text-center">{Math.round(quality * 100)}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={0.1}
                                            max={1}
                                            step={0.05}
                                            value={quality}
                                            onChange={(e) => setQuality(Number(e.target.value))}
                                            disabled={isConverting}
                                            className="w-full accent-primary disabled:opacity-50"
                                        />
                                        <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">
                                            <span>10%</span>
                                            <span>100%</span>
                                        </div>
                                    </div>
                                )}

                                {(sourceFormat !== 'EPS' && targetFormat === 'JPEG') && (
                                    <div className="flex flex-col gap-1.5 mb-4">
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                                                <Palette className="w-3 h-3" />
                                                Background (transparency)
                                            </label>
                                            <input
                                                type="color"
                                                value={background}
                                                onChange={(e) => setBackground(e.target.value)}
                                                disabled={isConverting}
                                                className="w-8 h-7 rounded border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-900/40">
                                    <button
                                        onClick={handleConvert}
                                        disabled={queueItems.length === 0 || isConverting}
                                        className="w-full h-14 bg-primary text-white text-base font-black rounded-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isConverting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CloudUpload className="w-5 h-5" />}
                                        {isConverting ? 'Converting…' : `Convert to ${targetFormat}`}
                                    </button>
                                    <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">{queueItems.length} file{queueItems.length !== 1 ? 's' : ''} pending</p>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest">Converted Results</h4>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{results.length} file{results.length !== 1 ? 's' : ''}</span>
                                </div>

                                {results.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <CheckCircle2 className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
                                        <p className="text-sm text-slate-400 dark:text-slate-500">Converted files will appear here.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 max-h-72 overflow-y-auto scrollbar-thin pr-1">
                                        <AnimatePresence initial={false}>
                                        {results.map(r => (
                                            <motion.div
                                                key={r.id}
                                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.96 }}
                                                transition={{ duration: 0.25 }}
                                                layout
                                                className="flex items-center gap-3"
                                            >
                                                <img src={r.preview} alt={r.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-slate-900 dark:text-white font-medium truncate">{r.name}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Converted</p>
                                                </div>
                                                <button
                                                    onClick={() => downloadFile(r.file)}
                                                    className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                                                    aria-label={`Download ${r.name}`}
                                                >
                                                    <Download size={18} />
                                                </button>
                                            </motion.div>
                                        ))}
                                        </AnimatePresence>
                                    </div>
                                )}

                                {results.length > 0 && (
                                    <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-900/40">
                                        <button
                                            onClick={handleDownloadAll}
                                            disabled={isConverting}
                                            className="flex-1 h-11 rounded-lg border border-primary text-primary text-xs font-black hover:bg-primary/5 transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50"
                                        >
                                            <Package className="w-4 h-4" />
                                            Download all ZIP
                                        </button>
                                        <button
                                            onClick={handleClear}
                                            disabled={isConverting}
                                            className="h-11 px-4 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-1.5 uppercase tracking-wider disabled:opacity-50"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                            Clear
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    )}
                </main>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    )
}