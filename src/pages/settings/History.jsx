import React, { useState } from "react";
import { History as HistoryIcon, Download, FileText, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import SettingsHeader from "../../components/settings/ui/SettingsHeader";
import EmptyState from "../../components/settings/ui/EmptyState";
import Pagination from "../../components/settings/ui/Pagination";
import { SkeletonRows } from "../../components/settings/ui/Skeleton";
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
    <div className="pb-4">
      <SettingsHeader
        icon={HistoryIcon}
        title="Batch History"
        subtitle="Review your past metadata batches and export them anytime."
      >
        {!isLoading && count > 0 && (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            {count} batch{count === 1 ? "" : "es"}
          </span>
        )}
      </SettingsHeader>

      <motion.div
        key={page}
        className="overflow-hidden rounded-2xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-[#111222]/60 shadow-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
      >
        {isLoading ? (
          <div className="py-2">
            <SkeletonRows rows={PAGE_SIZE} columns={3} />
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No history yet"
            description="Once you run your first metadata batch in the Studio, it will show up here for export."
            action={
              <Link
                to="/studio"
                className="mt-2 inline-flex items-center gap-2 rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20"
              >
                <PlusCircle className="w-4 h-4" />
                Start a Batch
              </Link>
            }
          />
        ) : (
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
                {results.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1c1e3a] transition-colors">
                    <td className="px-6 py-5 text-slate-700 dark:text-[#9296c9] text-sm font-medium">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#232648] text-slate-700 dark:text-white text-xs font-bold">
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        {item.file_count.toLocaleString()} file{item.file_count === 1 ? "" : "s"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <a
                        href={item.file}
                        download
                        className="bg-primary text-white hover:brightness-110 px-4 py-1.5 rounded-lg text-sm font-bold tracking-tight transition-all inline-flex items-center gap-1.5 ml-auto"
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <Pagination
            shown={results.length}
            total={count}
            hasNext={hasNext}
            hasPrev={hasPrev}
            onPrev={() => setPage(p => p - 1)}
            onNext={() => setPage(p => p + 1)}
          />
        )}
      </motion.div>
    </div>
  );
}