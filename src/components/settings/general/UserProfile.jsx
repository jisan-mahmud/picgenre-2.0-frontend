import React from 'react'

export default function UserProfile({ profile = {}, loading, error, onChange, onImageChange }) {
  if (loading) {
    return (
      <div className="p-4 lg:p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
        <h2 className="text-slate-900 dark:text-white text-lg lg:text-xl font-bold mb-4 lg:mb-6">User Profile</h2>
        <p className="text-slate-500 dark:text-[#9296c9]">Loading profile details…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 lg:p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
        <h2 className="text-slate-900 dark:text-white text-lg lg:text-xl font-bold mb-4 lg:mb-6">User Profile</h2>
        <p className="text-red-600 dark:text-red-400">Unable to load profile. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
      <h2 className="text-slate-900 dark:text-white text-lg lg:text-xl font-bold mb-4 lg:mb-6">User Profile</h2>
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start md:items-center">
        <div className="flex flex-col items-center gap-4 w-full md:w-auto">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20 lg:size-24 border-4 border-primary/20"
            style={{
              backgroundImage: `url("${profile.imagePreview || profile.image || 'https://via.placeholder.com/240'}")`,
            }}
          ></div>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && onImageChange?.(e.target.files[0])}
          />
          <label
            htmlFor="photo-upload"
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-[#232648] text-slate-700 dark:text-white text-xs font-bold transition-all hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer"
          >
            Upload Photo
          </label>
        </div>
        <div className="flex-1 w-full flex flex-col gap-4">

            <label className="text-sm font-bold text-slate-700 dark:text-[#9296c9] uppercase tracking-wider">
              Full Name
            </label>
            <input
              name="fullName"
              value={profile.fullName || ''}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-[#232648] bg-slate-50 dark:bg-[#1c1f3d] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="Enter your full name"
              type="text"
            />

        </div>
      </div>
    </div>
  )
}
