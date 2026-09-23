import React, { useState, useRef } from 'react'
import { KeyRound, Eye, EyeOff, ExternalLink, Check, Copy, CircleCheck, CircleAlert, TriangleAlert } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import SettingsHeader from '../../components/settings/ui/SettingsHeader'
import SettingsCard from '../../components/settings/ui/SettingsCard'
import { Skeleton } from '../../components/settings/ui/Skeleton'
import { useApiQuery, useApiMutation } from '../../hooks/useApi'

export default function AIModels() {
    const [apiKey, setApiKey] = useState('')
    const [showKey, setShowKey] = useState(false)
    const [copied, setCopied] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [saveStatus, setSaveStatus] = useState(null) // 'success' | 'error'

    const { data: currentModel, isLoading } = useApiQuery(
        ['gemini-api-key'],
        '/v1/models/user/gemini-api-key/',
        { retry: false }
    )

    const updateModel = useApiMutation('/v1/models/user/gemini-api-key/', 'post', {
        invalidateQueries: [['gemini-api-key']],
        onSuccess: () => {
            setIsDirty(false)
            setSaveStatus('success')
            setTimeout(() => setSaveStatus(null), 3000)
        },
        onError: () => setSaveStatus('error'),
    })

    const previousKey = useRef()
    if (previousKey.current !== currentModel?.api_key) {
        previousKey.current = currentModel?.api_key
        if (currentModel?.api_key && !isDirty) setApiKey(currentModel.api_key)
    }

    const handleChange = (e) => {
        setApiKey(e.target.value)
        setIsDirty(true)
        setSaveStatus(null)
    }

    const handleSave = () => {
        updateModel.mutate({ api_key: apiKey })
    }

    const handleCopy = async () => {
        if (!apiKey) return
        try {
            await navigator.clipboard.writeText(apiKey)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // clipboard unavailable — ignore silently
        }
    }

    return (
        <div>
            <SettingsHeader
                icon={KeyRound}
                title="Gemini AI Configuration"
                subtitle="Manage your Google Gemini API credentials for AI-powered image analysis."
            >
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={updateModel.isPending}
                    className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                    {updateModel.isPending ? 'Saving...' : 'Save Configuration'}
                </button>
            </SettingsHeader>

            <div className="flex flex-col gap-5 max-w-3xl">
                <SettingsCard
                    icon={KeyRound}
                    title="API Credentials"
                    description="Your key is stored securely and only used for studio requests."
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="gemini-api-key" className="text-sm font-bold text-slate-700 dark:text-[#9296c9]">
                            API Key
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                {isLoading ? (
                                    <Skeleton className="h-11 w-full" />
                                ) : (
                                    <input
                                        id="gemini-api-key"
                                        className="w-full h-11 bg-slate-50 dark:bg-[#1c1f3d] border border-slate-200 dark:border-[#323767] text-slate-900 dark:text-white rounded-lg pl-4 pr-24 focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm outline-none transition-all"
                                        placeholder="AIza••••••••••••••••••••••••••••"
                                        type={showKey ? 'text' : 'password'}
                                        value={apiKey}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        spellCheck={false}
                                    />
                                )}
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        disabled={!apiKey}
                                        aria-label="Copy API key"
                                        className="p-1.5 rounded-md text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-[#232648] transition-colors disabled:opacity-40"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowKey(v => !v)}
                                        aria-label={showKey ? 'Hide API key' : 'Show API key'}
                                        className="p-1.5 rounded-md text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-[#232648] transition-colors"
                                    >
                                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-[#6b70a0]">
                            Get your API key from{' '}
                            <a
                                href="https://aistudio.google.com/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                            >
                                Google AI Studio
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </p>
                    </div>
                </SettingsCard>

                <AnimatePresence>
                    {saveStatus === 'success' && (
                        <motion.div
                            className="max-w-3xl p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CircleCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-green-600 dark:text-green-400 text-sm font-bold">Configuration saved successfully.</p>
                        </motion.div>
                    )}
                    {saveStatus === 'error' && (
                        <motion.div
                            className="max-w-3xl p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CircleAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-red-600 dark:text-red-400 text-sm font-bold">Failed to save configuration. Please try again.</p>
                        </motion.div>
                    )}
                    {isDirty && !saveStatus && (
                        <motion.div
                            className="max-w-3xl p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TriangleAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-yellow-600 dark:text-yellow-400 text-sm font-bold">Unsaved changes detected</p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Your modified API key has not been applied yet. Click 'Save Configuration' to update your studio profile.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}