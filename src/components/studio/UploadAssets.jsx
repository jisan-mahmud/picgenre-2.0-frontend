import React, { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

const FORMAT_CHIPS = [
    { label: 'JPG', title: 'JPEG image — supported by gemini-3.5-flash-lite' },
    { label: 'PNG', title: 'PNG image — supported by gemini-3.5-flash-lite' },
    { label: 'WEBP', title: 'WebP image — supported by gemini-3.5-flash-lite' },
    { label: 'EPS', title: 'Vector graphic — converted to JPG by our server', converted: true },
    { label: 'SVG', title: 'Vector graphic — converted to JPG in your browser', converted: true },
    { label: 'Max 50MB', title: 'Files up to 50MB are supported', muted: true },
]

const SUPPORTED_FILE_RE = /\.(jpe?g|png|webp|eps|svg)$/i

export default function UploadAssets({ onUpload }) {
    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => setIsDragging(false)

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(Array.from(e.dataTransfer.files))
    }

    const handleFiles = (files) => {
        const validFiles = files.filter((file) => {
            const isValidType = SUPPORTED_FILE_RE.test(file.name)
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
            className={`group border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/40 bg-white/50 dark:bg-slate-900/40 ${
                isDragging
                    ? 'border-primary bg-primary/5 scale-[1.01]'
                    : 'border-slate-300 dark:border-slate-800 hover:border-primary/60 hover:bg-primary/[0.03]'
            }`}
        >
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,.eps,.svg"
                onChange={(e) => {
                    handleFiles(Array.from(e.target.files))
                    e.target.value = ''
                }}
                className="hidden"
            />
            <div className="size-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-translate-y-0.5">
                <UploadCloud className="w-11 h-11" />
            </div>
            <div className="text-center">
                <p className="text-slate-900 dark:text-white text-lg font-bold font-display">Drag and drop files here</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    or <span className="text-primary font-bold hover:underline">browse files</span> from your computer
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1">
                {FORMAT_CHIPS.map((chip) => (
                    <span
                        key={chip.label}
                        title={chip.title}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            chip.muted
                                ? 'bg-slate-100 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400'
                                : chip.converted
                                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                    : 'bg-primary/10 text-primary'
                        }`}
                    >
                        {chip.label}
                    </span>
                ))}
            </div>
        </div>
    )
}
