import React, { useState, useEffect } from 'react'
import { useApiQuery, useApiMutation } from '../../hooks/useApi'

export default function AIModels() {
    const [modelName, setModelName] = useState('')
    const [apiKey, setApiKey] = useState('')
    const [showKey, setShowKey] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [saveStatus, setSaveStatus] = useState(null) // 'success' | 'error'

    const { data: modelList = [] } = useApiQuery(
        ['groq-model-list'],
        '/v1/models/groq-model-list/'
    )

    const { data: currentModel } = useApiQuery(
        ['groq-user-model'],
        '/v1/models/user/groq-model/',
        { retry: false }
    )

    const updateModel = useApiMutation('/v1/models/user/groq-model/', 'post', {
        invalidateQueries: [['groq-user-model']],
        onSuccess: () => {
            setIsDirty(false)
            setSaveStatus('success')
            setTimeout(() => setSaveStatus(null), 3000)
        },
        onError: () => setSaveStatus('error'),
    })

    useEffect(() => {
        if (currentModel) {
            setModelName(currentModel.model_name)
            setApiKey(currentModel.api_key)
        } else if (modelList.length > 0) {
            setModelName(modelList[0][0])
        }
    }, [currentModel, modelList])

    const handleChange = (setter) => (e) => {
        setter(e.target.value)
        setIsDirty(true)
        setSaveStatus(null)
    }

    const handleSave = () => {
        updateModel.mutate({ model_name: modelName, api_key: apiKey })
    }

    return (
        <div>
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Groq AI Configuration</p>
                    <p className="text-slate-500 dark:text-[#9296c9] text-base font-normal leading-normal max-w-lg">Manage your Groq API credentials and default model preferences for high-performance inference.</p>
                </div>
                <div className="flex">
                    <button
                        onClick={handleSave}
                        disabled={updateModel.isPending}
                        className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20 disabled:opacity-60"
                    >
                        {updateModel.isPending ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </div>
            <div className="max-w-3xl">
                <div className="flex flex-col gap-6 p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-[#232648] pb-4 mb-2">
                        <span className="material-symbols-outlined text-primary">bolt</span>
                        <h2 className="text-slate-900 dark:text-white text-xl font-bold">Inference Settings</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-[#9296c9]">Default Model</label>
                            <div className="relative">
                                <select
                                    value={modelName}
                                    onChange={handleChange(setModelName)}
                                    className="w-full bg-slate-50 dark:bg-[#1c1f3d] border border-slate-200 dark:border-[#323767] text-slate-900 dark:text-white rounded-lg px-4 py-2.5 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    {modelList.map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-[#9296c9]">API Key</label>
                            <div className="flex">
                                <div className="relative flex-1">
                                    <input
                                        className="w-full bg-slate-50 dark:bg-[#1c1f3d] border border-slate-200 dark:border-[#323767] text-slate-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                                        placeholder="gsk_••••••••••••••••••••••••"
                                        type={showKey ? 'text' : 'password'}
                                        value={apiKey}
                                        onChange={handleChange(setApiKey)}
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
                        </div>
                    </div>
                </div>
            </div>
            {saveStatus === 'success' && (
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                    <p className="text-green-600 dark:text-green-400 text-sm font-bold">Configuration saved successfully.</p>
                </div>
            )}
            {saveStatus === 'error' && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
                    <p className="text-red-600 dark:text-red-400 text-sm font-bold">Failed to save configuration. Please try again.</p>
                </div>
            )}
            {isDirty && !saveStatus && (
                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-yellow-500 mt-0.5">warning</span>
                    <div>
                        <p className="text-yellow-600 dark:text-yellow-400 text-sm font-bold">Unsaved changes detected</p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Your modified model parameters have not been applied yet. Click 'Save Configuration' to update your workspace profile.</p>
                    </div>
                </div>
            )}
        </div>
    )
}
