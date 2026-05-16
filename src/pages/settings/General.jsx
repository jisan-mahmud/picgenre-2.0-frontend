import React, { useEffect, useState } from 'react'
import UserProfile from '../../components/settings/general/UserProfile'
import { useUserProfile, useUpdateProfile, useNotificationSettings, useUpdateNotificationSettings } from '../../hooks/useApi'

export default function General() {
    const { data: profile, isLoading, isError, error } = useUserProfile()
    const updateProfile = useUpdateProfile()
    
    const { data: notifications } = useNotificationSettings()
    const updateNotifications = useUpdateNotificationSettings()

    const [formData, setFormData] = useState({
        fullName: '',
        imageFile: null,
        imagePreview: '',
    })

    const [notifData, setNotifData] = useState({
        request_limit_alert: true,
        plan_expiry_reminder: true,
    })
    const [notifChanged, setNotifChanged] = useState(false)

    useEffect(() => {
        if (profile) {
            setFormData({
                fullName: profile.full_name || profile.fullName || profile.name || '',
                imageFile: null,
                imagePreview: profile.image || profile.photoUrl || profile.avatar || '',
            })
        }
    }, [profile])

    useEffect(() => {
        if (notifications) {
            setNotifData({
                request_limit_alert: notifications.request_limit_alert ?? true,
                plan_expiry_reminder: notifications.plan_expiry_reminder ?? true,
            })
            setNotifChanged(false)
        }
    }, [notifications])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (file) => {
        setFormData((prev) => ({
            ...prev,
            imageFile: file,
            imagePreview: URL.createObjectURL(file),
        }))
    }

    const handleNotifChange = (key) => {
        setNotifData((prev) => ({ ...prev, [key]: !prev[key] }))
        setNotifChanged(true)
    }

    const handleSave = async () => {
        if (!profile) return

        const promises = []

        const profilePayload = new FormData()
        profilePayload.append('full_name', formData.fullName)
        if (formData.imageFile) {
            const ext = formData.imageFile.name.split('.').pop()
            const renamedFile = new File([formData.imageFile], `profile_${Date.now()}.${ext}`, { type: formData.imageFile.type })
            profilePayload.append('image', renamedFile)
        }
        promises.push(updateProfile.mutateAsync(profilePayload))

        if (notifChanged) {
            promises.push(updateNotifications.mutateAsync(notifData))
        }

        try {
            await Promise.all(promises)
        } catch (saveError) {
            console.error('Save failed:', saveError?.response?.data || saveError)
        }
    }

    const isSaving = updateProfile.isPending || updateNotifications.isPending

    return (
        <div>
            <div className="flex flex-col gap-2 mb-6 lg:mb-8">
                <p className="text-slate-900 dark:text-white text-2xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">Profile & Notification Settings</p>
                <p className="text-slate-500 dark:text-[#9296c9] text-sm lg:text-base font-normal leading-normal max-w-lg">Manage your personal profile and notification preferences.</p>
            </div>
            <div className="max-w-4xl flex flex-col gap-6 lg:gap-8">
                <UserProfile
                    profile={formData}
                    loading={isLoading}
                    error={isError ? error : null}
                    onChange={handleInputChange}
                    onImageChange={handleImageChange}
                />
                <div className="p-4 lg:p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
                    <h2 className="text-slate-900 dark:text-white text-lg lg:text-xl font-bold mb-4 lg:mb-6">Notifications</h2>
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold text-slate-700 dark:text-[#9296c9] uppercase tracking-wider mb-2">Email Alerts</label>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 dark:bg-[#1c1f3d] rounded-lg border border-slate-100 dark:border-[#232648]">
                            <div className="flex flex-col gap-1">
                                <p className="text-slate-900 dark:text-white font-bold">Request Limit Alert</p>
                                <p className="text-slate-500 dark:text-[#9296c9] text-xs">Notify me when usage reaches 90% of monthly capacity</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input
                                    className="sr-only peer"
                                    type="checkbox"
                                    checked={notifData.request_limit_alert}
                                    onChange={() => handleNotifChange('request_limit_alert')}
                                />
                                <div className="w-11 h-6 bg-slate-300 dark:bg-[#232648] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 dark:bg-[#1c1f3d] rounded-lg border border-slate-100 dark:border-[#232648]">
                            <div className="flex flex-col gap-1">
                                <p className="text-slate-900 dark:text-white font-bold">Plan Expiry Reminder</p>
                                <p className="text-slate-500 dark:text-[#9296c9] text-xs">Notify several days before your current plan is due to expire</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input
                                    className="sr-only peer"
                                    type="checkbox"
                                    checked={notifData.plan_expiry_reminder}
                                    onChange={() => handleNotifChange('plan_expiry_reminder')}
                                />
                                <div className="w-11 h-6 bg-slate-300 dark:bg-[#232648] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center sm:justify-end pt-4 mb-8 lg:mb-12">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isLoading || isSaving || !profile}
                        className="w-full sm:w-auto flex items-center justify-center rounded-lg h-11 px-8 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    )
}
