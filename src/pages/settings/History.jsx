import React from "react";

export default function History() {
  return (
    <div>
      <div className="max-w-5xl mx-auto py-10 px-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                Batch History
              </h1>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#323767] bg-white dark:bg-[#111222] shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#191b33] border-b border-slate-200 dark:border-[#323767]">
                      <th className="px-6 py-4 text-slate-600 dark:text-white text-xs font-bold uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-4 text-slate-600 dark:text-white text-xs font-bold uppercase tracking-wider">
                        File Count
                      </th>
                      <th className="px-6 py-4 text-slate-600 dark:text-white text-xs font-bold uppercase tracking-wider text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#323767]">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1c1e3a] transition-colors group">
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm font-medium">
                        Oct 24, 2023, 14:20
                      </td>
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-400 text-base">
                            file_present
                          </span>
                          156 files
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="bg-primary text-white hover:brightness-110 px-4 py-1.5 rounded-lg text-sm font-bold tracking-tight transition-all flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-base">
                            file_download
                          </span>
                          Export
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1c1e3a] transition-colors group">
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm font-medium">
                        Oct 24, 2023, 11:05
                      </td>
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-400 text-base">
                            file_present
                          </span>
                          42 files
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="bg-primary text-white hover:brightness-110 px-4 py-1.5 rounded-lg text-sm font-bold tracking-tight transition-all flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-base">
                            file_download
                          </span>
                          Export
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1c1e3a] transition-colors group">
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm font-medium">
                        Oct 23, 2023, 18:45
                      </td>
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-400 text-base">
                            file_present
                          </span>
                          210 files
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="bg-primary text-white hover:brightness-110 px-4 py-1.5 rounded-lg text-sm font-bold tracking-tight transition-all flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-base">
                            file_download
                          </span>
                          Export
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1c1e3a] transition-colors group">
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm font-medium">
                        Oct 23, 2023, 09:12
                      </td>
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-400 text-base">
                            file_present
                          </span>
                          89 files
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="bg-primary text-white hover:brightness-110 px-4 py-1.5 rounded-lg text-sm font-bold tracking-tight transition-all flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-base">
                            file_download
                          </span>
                          Export
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1c1e3a] transition-colors group">
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm font-medium">
                        Oct 22, 2023, 16:30
                      </td>
                      <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-400 text-base">
                            file_present
                          </span>
                          12 files
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="bg-primary text-white hover:brightness-110 px-4 py-1.5 rounded-lg text-sm font-bold tracking-tight transition-all flex items-center gap-1 ml-auto">
                          <span className="material-symbols-outlined text-base">
                            file_download
                          </span>
                          Export
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-[#191b33] border-t border-slate-200 dark:border-[#323767]">
                <p className="text-xs text-slate-500 dark:text-[#9296c9]">
                  Showing 5 of 142 batches
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded border border-slate-300 dark:border-[#323767] text-xs font-medium dark:text-white opacity-50 cursor-not-allowed">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded border border-slate-300 dark:border-[#323767] text-xs font-medium dark:text-white hover:bg-slate-100 dark:hover:bg-[#232648]">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
