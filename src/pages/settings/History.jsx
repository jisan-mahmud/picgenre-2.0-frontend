import React, { useState } from "react";
import { useApiQuery } from "../../hooks/useApi";

const PAGE_SIZE = 10;

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function History() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useApiQuery(
    ["history", page],
    `/v1/history/list/?page=${page}&page_size=${PAGE_SIZE}`
  );

  const results = Array.isArray(data) ? data : (data?.results ?? []);
  const count = data?.count ?? results.length;
  const hasNext = Array.isArray(data) ? false : !!data?.next;
  const hasPrev = page > 1;

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
                      <th className="px-6 py-4 text-slate-600 dark:text-white text-xs font-bold uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-slate-600 dark:text-white text-xs font-bold uppercase tracking-wider">File Count</th>
                      <th className="px-6 py-4 text-slate-600 dark:text-white text-xs font-bold uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#323767]">
                    {isLoading ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-slate-400 dark:text-[#9296c9] text-sm">
                          Loading...
                        </td>
                      </tr>
                    ) : results.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-slate-400 dark:text-[#9296c9] text-sm">
                          No history found.
                        </td>
                      </tr>
                    ) : results.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1c1e3a] transition-colors">
                        <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm font-medium">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400 text-base">file_present</span>
                            {item.file_count.toLocaleString()} files
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <a
                            href={item.file}
                            download
                            className="bg-primary text-white hover:brightness-110 px-4 py-1.5 rounded-lg text-sm font-bold tracking-tight transition-all inline-flex items-center gap-1 ml-auto"
                          >
                            <span className="material-symbols-outlined text-base">file_download</span>
                            Export
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-[#191b33] border-t border-slate-200 dark:border-[#323767]">
                <p className="text-xs text-slate-500 dark:text-[#9296c9]">
                  {count > 0 ? `Showing ${results.length} of ${count} batches` : "No batches"}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => p - 1)}
                    disabled={!hasPrev}
                    className="px-3 py-1 rounded border border-slate-300 dark:border-[#323767] text-xs font-medium dark:text-white hover:bg-slate-100 dark:hover:bg-[#232648] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={!hasNext}
                    className="px-3 py-1 rounded border border-slate-300 dark:border-[#323767] text-xs font-medium dark:text-white hover:bg-slate-100 dark:hover:bg-[#232648] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
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
