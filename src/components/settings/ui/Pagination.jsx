import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ shown, total, hasNext, hasPrev, onPrev, onNext }) {
    return (
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60 dark:bg-[#191b33]/60 border-t border-slate-200 dark:border-[#232648]">
            <p className="text-xs text-slate-500 dark:text-[#9296c9]">
                {total > 0 ? `Showing ${shown} of ${total}` : 'No items'}
            </p>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-[#323767] text-xs font-medium text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#232648] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Previous
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!hasNext}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-[#323767] text-xs font-medium text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#232648] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}