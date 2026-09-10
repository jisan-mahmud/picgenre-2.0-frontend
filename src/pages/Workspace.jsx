import React, { useRef, useState } from 'react'
import { CloudUpload } from 'lucide-react'
import UploadAssets from '../components/workspace/UploadAssets'
import FileQueue from '../components/workspace/FileQueue'
import ProcessedFile from '../components/workspace/ProcessedFile'
import SideBar from '../components/workspace/SideBar'
import Toast from '../components/ui/Toast'
import { analyzeImage, DEFAULT_PLATFORM, PLATFORMS } from '../utils/geminiService'
import { generateCSV, downloadCSV } from '../utils/csvExport'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

const makePreview = (file) => {
    const ext = file.name.split('.').pop().toLowerCase()
    if (['jpg', 'jpeg', 'png'].includes(ext)) {
        return URL.createObjectURL(file)
    }
    return null
}

let idCounter = 0
const nextId = () => `file-${Date.now()}-${idCounter++}`

export default function Workspace() {
    const [queueItems, setQueueItems] = useState([])
    const [processedFiles, setProcessedFiles] = useState([])
    const [platform, setPlatform] = useState(DEFAULT_PLATFORM)
    const [customPrompt, setCustomPrompt] = useState('')
    const [settings, setSettings] = useState({ ...PLATFORMS[DEFAULT_PLATFORM] })
    const [isProcessing, setIsProcessing] = useState(false)
    const [toast, setToast] = useState(null)
    const isStoppedRef = useRef(false)

    const handleUpload = (files) => {
        const items = files.map((file) => ({
            id: nextId(),
            file,
            status: 'pending',
            preview: makePreview(file),
            error: null,
        }))
        setQueueItems(prev => [...prev, ...items])
    }

    const handleRemove = (id) => {
        const removed = queueItems.find(item => item.id === id)
        if (removed?.preview) URL.revokeObjectURL(removed.preview)
        setQueueItems(prev => prev.filter(item => item.id !== id))
    }

    const setStatus = (id, status, error = null) => {
        setQueueItems(prev => prev.map(item => item.id === id ? { ...item, status, error } : item))
    }

    const handlePlatformChange = (name) => {
        setPlatform(name)
        setSettings({ ...PLATFORMS[name] })
    }

    const handleSettingsChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    const handleGenerate = async () => {
        const workItems = queueItems.filter(item => item.status !== 'processing')
        if (workItems.length === 0) return

        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            setToast({ message: 'Set VITE_GEMINI_API_KEY in .env to use Gemini', type: 'error' })
            return
        }

        setIsProcessing(true)
        isStoppedRef.current = false

        let failedCount = 0
        let firstError = null

        const processItem = async (item) => {
            if (isStoppedRef.current) return
            setStatus(item.id, 'processing')

            if (item.file.name.toLowerCase().endsWith('.eps')) {
                failedCount++
                if (!firstError) firstError = 'EPS files are not supported by Gemini'
                setStatus(item.id, 'failed', firstError)
                return
            }

            try {
                const result = await analyzeImage(item.file, platform, customPrompt, GEMINI_API_KEY, settings)
                setProcessedFiles(prev => [...prev, {
                    ...result,
                    name: item.file.name,
                    preview: item.preview,
                    platform,
                }])
                setQueueItems(prev => prev.filter(i => i.id !== item.id))
            } catch (error) {
                failedCount++
                if (!firstError) firstError = error?.message || 'Unknown error'
                console.error(`Failed to process ${item.file.name}:`, error)
                setStatus(item.id, 'failed', firstError)
            }
        }

        try {
            const CONCURRENCY = 3
            let nextIndex = 0

            const worker = async () => {
                while (!isStoppedRef.current) {
                    const idx = nextIndex++
                    if (idx >= workItems.length) return
                    await processItem(workItems[idx])
                }
            }

            await Promise.all(
                Array.from({ length: Math.min(CONCURRENCY, workItems.length) }, worker)
            )
        } finally {
            setIsProcessing(false)
        }

        setToast(failedCount > 0
            ? { message: `${failedCount} file${failedCount > 1 ? 's' : ''} failed and remain in the queue. Error: ${(firstError || 'Unknown').slice(0, 90)} Click Generate to retry.`, type: 'error' }
            : { message: 'All files processed successfully', type: 'success' })
    }

    const handleStop = () => {
        isStoppedRef.current = true
    }

    const handleExportAll = () => {
        if (processedFiles.length === 0) {
            setToast({ message: 'No processed metadata to export', type: 'error' })
            return
        }
        const csv = generateCSV(processedFiles)
        const date = new Date().toISOString().slice(0, 10)
        downloadCSV(csv, `picgenre-metadata-${date}.csv`)
        setToast({ message: `Exported ${processedFiles.length} files to CSV`, type: 'success' })
    }

    return (
        <div>
            <div className="layout-container flex h-full grow flex-col">
                <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-10 py-8">
                    <div className="flex flex-wrap justify-between gap-3 mb-8">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] font-display">Workspace</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Upload new assets and manage your generation queue.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <CloudUpload className="w-5 h-5 text-primary" />
                                    <h3 className="text-slate-900 dark:text-white text-lg font-bold font-display">Upload Assets</h3>
                                </div>
                                <UploadAssets onUpload={handleUpload}/>
                            </div>
                            <FileQueue
                                items={queueItems}
                                onRemove={handleRemove}
                                isProcessing={isProcessing}
                            />
                            <ProcessedFile
                                files={processedFiles}
                                onExportAll={handleExportAll}
                            />
                        </div>
                        <SideBar
                            queueCount={queueItems.length}
                            processedCount={processedFiles.length}
                            totalCount={queueItems.length + processedFiles.length}
                            onGenerate={handleGenerate}
                            onStop={handleStop}
                            isProcessing={isProcessing}
                            platform={platform}
                            customPrompt={customPrompt}
                            settings={settings}
                            onPlatformChange={handlePlatformChange}
                            onCustomPromptChange={setCustomPrompt}
                            onSettingsChange={handleSettingsChange}
                        />
                    </div>
                </main>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    )
}