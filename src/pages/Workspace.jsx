import React, { useState } from 'react'
import { CloudUpload } from 'lucide-react'
import UploadAssets from '../components/workspace/UploadAssets'
import FileQueue from '../components/workspace/FileQueue'
import ProcessedFile from '../components/workspace/ProcessedFile'
import SideBar from '../components/workspace/SideBar'
import { useProcessedFiles, useRemoveFromQueue, useProcessFiles, useStopProcessing } from '../hooks/useWorkspace'

export default function Workspace() {
    const [localQueueFiles, setLocalQueueFiles] = useState([]) // For immediate UI feedback
    const [isProcessing, setIsProcessing] = useState(false)

    // TanStack Query hooks
    const { data: processedFiles = [], isLoading: processedLoading } = useProcessedFiles()
    const removeFromQueueMutation = useRemoveFromQueue()
    const processFilesMutation = useProcessFiles()
    const stopProcessingMutation = useStopProcessing()

    const handleUpload = async (files) => {
        // Add to local state for immediate UI feedback
        setLocalQueueFiles(prev => [...prev, ...files])
    }

    const handleRemove = async (index) => {
        const fileToRemove = localQueueFiles[index]

        // Remove from local state immediately
        setLocalQueueFiles(prev => prev.filter((_, i) => i !== index))

        // Remove from server queue
        if (fileToRemove.id) {
            try {
                await removeFromQueueMutation.mutateAsync(fileToRemove.id)
            } catch (error) {
                console.error('Failed to remove file from queue:', error)
                // Add back to local state on error
                setLocalQueueFiles(prev => [...prev.slice(0, index), fileToRemove, ...prev.slice(index)])
            }
        }
    }

    const handleGenerate = async () => {
        if (localQueueFiles.length === 0) return

        setIsProcessing(true)
        try {
            await processFilesMutation.mutateAsync(localQueueFiles)
            setLocalQueueFiles([]) // Clear local queue on success
        } catch (error) {
            console.error('Failed to process files:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleStop = async () => {
        try {
            await stopProcessingMutation.mutateAsync()
            setIsProcessing(false)
        } catch (error) {
            console.error('Failed to stop processing:', error)
        }
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
                                files={localQueueFiles}
                                onRemove={handleRemove}
                            />
                            <ProcessedFile
                                files={processedFiles}
                            />
                        </div>
                        <SideBar
                            queueCount={localQueueFiles.length}
                            processedCount={processedFiles.length}
                            totalCount={localQueueFiles.length + processedFiles.length}
                            onGenerate={handleGenerate}
                            onStop={handleStop}
                            isProcessing={isProcessing || processFilesMutation.isPending}
                            isLoading={processFilesMutation.isPending}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}