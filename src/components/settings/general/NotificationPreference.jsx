import React from "react";

export default function NotificationPreference({notifData, onChange}) {
  return (
    <div className="p-4 lg:p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
      <h2 className="text-slate-900 dark:text-white text-lg lg:text-xl font-bold mb-4 lg:mb-6">
        Notifications
      </h2>
      <div className="flex flex-col gap-4">
        <label className="text-sm font-bold text-slate-700 dark:text-[#9296c9] uppercase tracking-wider mb-2">
          Email Alerts
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 dark:bg-[#1c1f3d] rounded-lg border border-slate-100 dark:border-[#232648]">
          <div className="flex flex-col gap-1">
            <p className="text-slate-900 dark:text-white font-bold">
              Request Limit Alert
            </p>
            <p className="text-slate-500 dark:text-[#9296c9] text-xs">
              Notify me when usage reaches 90% of monthly capacity
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              className="sr-only peer"
              type="checkbox"
              checked={notifData.request_limit_alert}
              onChange={() => onChange("request_limit_alert")}
            />
            <div className="w-11 h-6 bg-slate-300 dark:bg-[#232648] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 dark:bg-[#1c1f3d] rounded-lg border border-slate-100 dark:border-[#232648]">
          <div className="flex flex-col gap-1">
            <p className="text-slate-900 dark:text-white font-bold">
              Plan Expiry Reminder
            </p>
            <p className="text-slate-500 dark:text-[#9296c9] text-xs">
              Notify several days before your current plan is due to expire
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              className="sr-only peer"
              type="checkbox"
              checked={notifData.plan_expiry_reminder}
              onChange={() => onChange("plan_expiry_reminder")}
            />
            <div className="w-11 h-6 bg-slate-300 dark:bg-[#232648] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
