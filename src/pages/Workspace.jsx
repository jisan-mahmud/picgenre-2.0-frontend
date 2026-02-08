import React, { useState } from 'react'
import { CloudUpload } from 'lucide-react'
import UploadAssets from '../components/workspace/UploadAssets'
import FileQueue from '../components/workspace/FileQueue'
import ProcessedFile from '../components/workspace/ProcessedFile'
import SideBar from '../components/workspace/SideBar'

export default function Workspace() {
    const [queueFiles, setQueueFiles] = useState([])
    const [processedFiles, setProcessedFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [stopProcessing, setStopProcessing] = useState(false)
    const [totalFiles, setTotalFiles] = useState(0)

    const handleUpload = (files) => {
        setQueueFiles(prev => [...prev, ...files])
    }

    const handleRemove = (index) => {
        setQueueFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleGenerate = async () => {
        if (queueFiles.length === 0) return
        
        setIsProcessing(true)
        setStopProcessing(false)
        setTotalFiles(queueFiles.length)
        
        // Simulate processing each file
        for (const file of queueFiles) {
            if (stopProcessing) break
            
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            if (stopProcessing) break
            
            const processed = {
                name: file.name,
                preview: ['jpg', 'jpeg', 'png'].some(ext => file.name.toLowerCase().endsWith(ext)) 
                    ? URL.createObjectURL(file) 
                    : null,
                title: `Generated title for ${file.name.split('.')[0]}`,
                tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
                platform: 'Adobe Stock'
            }
            
            setProcessedFiles(prev => [...prev, processed])
            setQueueFiles(prev => prev.slice(1))
        }
        
        setIsProcessing(false)
        setStopProcessing(false)
    }

    const handleStop = () => {
        setStopProcessing(true)
        setIsProcessing(false)
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
                            <FileQueue files={queueFiles} onRemove={handleRemove}/>
                            <ProcessedFile files={processedFiles}/>
                        </div>
                        <SideBar 
                            queueCount={queueFiles.length} 
                            processedCount={processedFiles.length}
                            totalCount={totalFiles}
                            onGenerate={handleGenerate} 
                            onStop={handleStop} 
                            isProcessing={isProcessing}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}