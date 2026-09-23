import React, { useState } from 'react'
import { UserRound, SlidersHorizontal } from 'lucide-react'
import SettingsHeader from '../../components/settings/ui/SettingsHeader'
import SettingsCard from '../../components/settings/ui/SettingsCard'
import UserProfile from '../../components/settings/general/UserProfile'
import NotificationPreference from '../../components/settings/general/NotificationPreference'
import Toast from '../../components/ui/Toast'
import { useUserProfile, useUpdateProfile, useNotificationSettings, useUpdateNotificationSettings } from '../../hooks/useApi'

function SaveButton({ label, dirty, saving, disabled, onClick }) {
    return (
        <div className="flex justify-end pt-4">
            <button
                type="button"
                onClick={onClick}
                disabled={disabled || saving}
                className="relative flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
                {dirty && (
                    <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-amber-400 border-2 border-white dark:border-[#101222]" />
                )}
                {saving ? 'Saving...' : label}
            </button>
        </div>
    )
}

export default function General() {
    const { data: profile, isLoading, isError, error } = useUserProfile()
    const updateProfile = useUpdateProfile()

    const { data: notifications, isLoading: notifLoading } = useNotificationSettings()
    const updateNotifications = useUpdateNotificationSettings()

    const [profileEdit, setProfileEdit] = useState(null)
    const [notifEdit, setNotifEdit] = useState(null)
    const [toast, setToast] = useState(null)

    const profileBaseline = {
        fullName: profile?.full_name || profile?.fullName || profile?.name || '',
        imageFile: null,
        imagePreview: profile?.image || profile?.photoUrl || profile?.avatar || '',
    }
    const notifBaseline = {
        request_limit_alert: notifications?.request_limit_alert ?? true,
        plan_expiry_reminder: notifications?.plan_expiry_reminder ?? true,
    }

    const formData = profileEdit ?? profileBaseline
    const notifData = notifEdit ?? notifBaseline

    const isProfileDirty =
        profileEdit !== null &&
        (profileEdit.fullName !== profileBaseline.fullName || profileEdit.imageFile !== null)
    const isNotifDirty =
        notifEdit !== null &&
        Object.keys(notifBaseline).some((key) => notifEdit[key] !== notifBaseline[key])
    const nameValid = formData.fullName.trim().length > 0

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProfileEdit({ ...formData, [name]: value })
    }

    const handleImageChange = (file) => {
        setProfileEdit({
            ...formData,
            imageFile: file,
            imagePreview: URL.createObjectURL(file),
        })
    }

    const handleNotifChange = (key) => {
        setNotifEdit({ ...notifData, [key]: !notifData[key] })
    }

    const handleSaveProfile = async () => {
        if (!profile || !isProfileDirty || !nameValid) return

        try {
            const profilePayload = new FormData()
            profilePayload.append('full_name', formData.fullName.trim())
            if (formData.imageFile) {
                const ext = formData.imageFile.name.split('.').pop()
                const renamedFile = new File([formData.imageFile], `profile_${Date.now()}.${ext}`, { type: formData.imageFile.type })
                profilePayload.append('image', renamedFile)
            }
            await updateProfile.mutateAsync(profilePayload)
            setProfileEdit(null)
            setToast({ message: 'Profile saved successfully.', type: 'success' })
        } catch (saveError) {
            console.error('Profile save failed:', saveError?.response?.data || saveError)
            setToast({ message: 'Failed to save profile. Please try again.', type: 'error' })
        }
    }

    const handleSaveNotifications = async () => {
        if (!isNotifDirty) return

        try {
            await updateNotifications.mutateAsync(notifEdit)
            setNotifEdit(null)
            setToast({ message: 'Notification settings saved successfully.', type: 'success' })
        } catch (saveError) {
            console.error('Notification save failed:', saveError?.response?.data || saveError)
            setToast({ message: 'Failed to save notification settings. Please try again.', type: 'error' })
        }
    }

    return (
        <div>
            <SettingsHeader
                icon={UserRound}
                title="Profile & Notifications"
                subtitle="Manage your personal profile and notification preferences."
            />

            <div className="flex flex-col gap-6">
                <SettingsCard
                    icon={UserRound}
                    title="User Profile"
                    description="Your photo and name are used across your account."
                >
                    <UserProfile
                        profile={formData}
                        loading={isLoading}
                        error={isError ? error : null}
                        onChange={handleInputChange}
                        onImageChange={handleImageChange}
                    />
                    <SaveButton
                        label="Save Profile"
                        dirty={isProfileDirty}
                        saving={updateProfile.isPending}
                        disabled={isLoading || !profile || !isProfileDirty || !nameValid}
                        onClick={handleSaveProfile}
                    />
                </SettingsCard>

                <SettingsCard
                    icon={SlidersHorizontal}
                    title="Notifications"
                    description="Choose which email alerts you receive."
                    delay={0.25}
                >
                    <NotificationPreference
                        notifData={notifData}
                        original={notifBaseline}
                        onChange={handleNotifChange}
                        loading={notifLoading}
                    />
                    <SaveButton
                        label="Save Changes"
                        dirty={isNotifDirty}
                        saving={updateNotifications.isPending}
                        disabled={notifLoading || !isNotifDirty}
                        onClick={handleSaveNotifications}
                    />
                </SettingsCard>
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    )
}