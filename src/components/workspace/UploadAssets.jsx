import React, { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

export default function UploadAssets({ onUpload }) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => setIsDragging(false)

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        handleFiles(files)
    }

    const handleFiles = (files) => {
        const validFiles = files.filter(file => {
            const isValidType = /\.(jpe?g|png|eps)$/i.test(file.name)
            const isValidSize = file.size <= 50 * 1024 * 1024
            return isValidType && isValidSize
        })
        if (validFiles.length > 0 && onUpload) onUpload(validFiles)
    }

    return (
        <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 bg-white/50 dark:bg-slate-900/40 transition-all cursor-pointer group ${
                isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-slate-800 hover:border-primary/50'
            }`}
        >
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.eps"
                onChange={(e) => handleFiles(Array.from(e.target.files))}
                className="hidden"
            />
            <div className="size-16 rounded-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10" />
            </div>
            <div className="text-center">
                <p className="text-slate-900 dark:text-white font-bold">Drag and drop files here</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">or <span className="text-primary hover:underline">browse files</span> from your computer</p>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest mt-2">Support: JPG, PNG, EPS (Max 50MB)</p>
        </div>
    )
}
