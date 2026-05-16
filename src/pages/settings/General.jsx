import React, { useEffect, useState } from 'react'
import UserProfile from '../../components/settings/general/UserProfile'
import NotificationPreference from '../../components/settings/general/NotificationPreference'
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
               <NotificationPreference
                    notifData={notifData}
                    onChange={handleNotifChange}
                />
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
