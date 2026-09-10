import React, { useState, useEffect } from 'react'
import { useApiQuery, useApiMutation } from '../../hooks/useApi'

export default function AIModels() {
    const [apiKey, setApiKey] = useState('')
    const [showKey, setShowKey] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [saveStatus, setSaveStatus] = useState(null) // 'success' | 'error'

    const { data: currentKey } = useApiQuery(
        ['gemini-api-key'],
        '/v1/models/user/gemini-api-key/',
        { retry: false }
    )

    const updateKey = useApiMutation('/v1/models/user/gemini-api-key/', 'post', {
        invalidateQueries: [['gemini-api-key']],
        onSuccess: () => {
            setIsDirty(false)
            setSaveStatus('success')
            setTimeout(() => setSaveStatus(null), 3000)
        },
        onError: () => setSaveStatus('error'),
    })

    useEffect(() => {
        if (currentKey) {
            setApiKey(currentKey.api_key)
        }
    }, [currentKey])

    const handleChange = (e) => {
        setApiKey(e.target.value)
        setIsDirty(true)
        setSaveStatus(null)
    }

    const handleSave = () => {
        updateKey.mutate({ api_key: apiKey })
    }

    return (
        <div>
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Gemini AI Configuration</p>
                    <p className="text-slate-500 dark:text-[#9296c9] text-base font-normal leading-normal max-w-lg">Manage your Google Gemini API credentials for AI-powered image generation and analysis.</p>
                </div>
                <div className="flex">
                    <button
                        onClick={handleSave}
                        disabled={updateKey.isPending}
                        className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20 disabled:opacity-60"
                    >
                        {updateKey.isPending ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </div>
            <div className="max-w-3xl">
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-[#232648] pb-4 mb-2">
                        <span className="material-symbols-outlined text-primary">key</span>
                        <h2 className="text-slate-900 dark:text-white text-xl font-bold">API Credentials</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-[#9296c9]">Gemini API Key</label>
                            <div className="flex">
                                <div className="relative flex-1">
                                    <input
                                        className="w-full bg-slate-50 dark:bg-[#1c1f3d] border border-slate-200 dark:border-[#323767] text-slate-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                                        placeholder="AIza••••••••••••••••••••••••"
                                        type={showKey ? 'text' : 'password'}
                                        value={apiKey}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowKey(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showKey ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-[#6b70a0] mt-1">Get your API key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></p>
                        </div>
                    </div>
                </div>
            </div>
            {saveStatus === 'success' && (
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                    <p className="text-green-600 dark:text-green-400 text-sm font-bold">API key saved successfully.</p>
                </div>
            )}
            {saveStatus === 'error' && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
                    <p className="text-red-600 dark:text-red-400 text-sm font-bold">Failed to save API key. Please try again.</p>
                </div>
            )}
            {isDirty && !saveStatus && (
                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-yellow-500 mt-0.5">warning</span>
                    <div>
                        <p className="text-yellow-600 dark:text-yellow-400 text-sm font-bold">Unsaved changes detected</p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Your modified API key has not been saved yet. Click 'Save Configuration' to update.</p>
                    </div>
                </div>
            )}
        </div>
    )
}
