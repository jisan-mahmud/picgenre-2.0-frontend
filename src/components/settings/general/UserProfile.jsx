import React, { useState } from 'react'
import { Camera, Loader2 } from 'lucide-react'
import { Skeleton } from '../ui/Skeleton'

function getInitials(name = '') {
    const parts = String(name).trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return 'U'
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function UserProfile({ profile = {}, loading, error, onChange, onImageChange }) {
    const [uploading, setUploading] = useState(false)

    if (loading) {
        return (
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                    <Skeleton className="size-20 lg:size-24 rounded-full" />
                    <Skeleton className="h-8 w-24" />
                </div>
                <div className="flex-1 w-full flex flex-col gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-11 w-full max-w-sm" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <span className="material-symbols-outlined text-red-500 text-lg">error</span>
                <div>
                    <p className="text-red-600 dark:text-red-400 text-sm font-bold">Unable to load profile</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Please refresh the page and try again.</p>
                </div>
            </div>
        )
    }

    const preview = profile.imagePreview || profile.image
    const nameValue = profile.fullName || ''

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        onImageChange?.(file)
        setUploading(false)
        e.target.value = ''
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start md:items-center">
            <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                <div className="relative size-20 lg:size-24 shrink-0">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile photo"
                            className="size-20 lg:size-24 rounded-full object-cover border-4 border-primary/20"
                        />
                    ) : (
                        <div className="size-20 lg:size-24 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center">
                            <span className="text-primary text-xl lg:text-2xl font-black">
                                {getInitials(nameValue)}
                            </span>
                        </div>
                    )}
                    {uploading && (
                        <span className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                        </span>
                    )}
                </div>
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                />
                <label
                    htmlFor="photo-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#232648] text-slate-700 dark:text-white text-xs font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                    <Camera className="w-4 h-4" />
                    Upload Photo
                </label>
            </div>

            <div className="flex-1 w-full flex flex-col gap-2">
                <label htmlFor="full-name" className="text-sm font-bold text-slate-700 dark:text-[#9296c9]">
                    Full Name
                </label>
                <input
                    id="full-name"
                    name="fullName"
                    value={nameValue}
                    onChange={onChange}
                    maxLength={80}
                    className={`w-full max-w-md px-4 py-3 rounded-lg border bg-slate-50 dark:bg-[#1c1f3d] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                        !nameValue.trim()
                            ? 'border-amber-400/70 dark:border-amber-500/50'
                            : 'border-slate-200 dark:border-[#232648]'
                    }`}
                    placeholder="Enter your full name"
                    type="text"
                />
                {!nameValue.trim() && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                        Your name can't be empty — Save will stay disabled until you add one.
                    </p>
                )}
                <p className="text-xs text-slate-500 dark:text-[#6b70a0]">
                    Used to identify your exports and account.
                </p>
            </div>
        </div>
    )
}