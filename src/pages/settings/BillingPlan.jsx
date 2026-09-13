import React, { useState } from "react";
import { useCurrentSubscription, useInvoices } from "../../hooks/useApi";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });
}

function statusBadge(status) {
  if (status === "SUCCESS") {
    return (
      <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wide">
        Paid
      </span>
    );
  }
  return (
    <span className="px-2 py-1 rounded-full bg-slate-500/10 text-slate-500 text-[10px] font-bold uppercase tracking-wide">
      {status}
    </span>
  );
}

export default function BillingPlan() {
  const [page, setPage] = useState(1);

  const { data: subscription, isLoading: subscriptionLoading } = useCurrentSubscription();
  const { data: invoices, isLoading: invoicesLoading } = useInvoices(page);

  const results = invoices?.results ?? [];
  const count = invoices?.count ?? results.length;
  const hasNext = !!invoices?.next;
  const hasPrev = page > 1;

  const plan = subscription?.plan;
  const cycleLabel = plan?.billing_cycle === "YEARLY" ? "/ yr" : "/ mo";
  const planTier = plan?.tier ? plan.tier.charAt(0).toUpperCase() + plan.tier.slice(1).toLowerCase() : "";
  const totalCredit = subscription?.total_credit ?? 0;
  const usedCredit = subscription?.used_credit ?? 0;
  const remainingCredit = subscription?.remaining_credit ?? totalCredit - usedCredit;
  const usedPct = totalCredit > 0 ? Math.min(100, Math.max(0, (usedCredit / totalCredit) * 100)) : 0;

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
          Billing & Plan
        </p>
        <p className="text-slate-500 dark:text-[#9296c9] text-base font-normal leading-normal max-w-lg">
          Manage your subscription, billing information, and view your payment
          history.
        </p>
      </div>
      <div className="max-w-4xl flex flex-col gap-8">
        <div className="p-8 rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50 shadow-sm">
          {subscriptionLoading ? (
            <div className="flex items-center justify-center h-32 text-slate-400 dark:text-[#9296c9] text-sm">
              Loading...
            </div>
          ) : !subscription || !subscription.is_active ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">
                Current Plan
              </h2>
              <p className="text-slate-500 dark:text-[#9296c9] text-sm">
                No active subscription.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-slate-900 dark:text-white text-xl font-bold">
                  Current Plan
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {planTier} Plan
                    </p>
                    <p className="text-sm text-slate-500 dark:text-[#9296c9]">
                      Renews {formatDate(subscription.expires_at)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end">
                  <span className="text-xs text-slate-500 dark:text-[#9296c9] uppercase font-bold tracking-wider">
                    Price
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {"\u09F3"}{plan?.price}{" "}
                    <span className="text-sm font-bold text-slate-500 dark:text-[#9296c9]">{cycleLabel}</span>
                  </span>
                </div>
              </div>

              <div className="mt-6 p-5 bg-slate-50 dark:bg-[#1c1f3d] rounded-xl border border-slate-100 dark:border-[#232648]">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 dark:text-[#9296c9] uppercase font-bold tracking-wider">
                    Credit Usage
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {usedCredit} of {totalCredit} used
                  </p>
                </div>
                <div className="mt-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-[#232648] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${usedPct}%` }}
                  ></div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-[#9296c9]">
                    <span className="font-bold text-slate-900 dark:text-white">{remainingCredit}</span> remaining
                  </span>
                  <span className="text-slate-500 dark:text-[#9296c9]">{usedCredit} used</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold">
            Recent Invoices
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-background-dark/50">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#232648] bg-slate-50/50 dark:bg-white/5">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#9296c9] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#9296c9] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#9296c9] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-[#232648]">
                {invoicesLoading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-slate-400 dark:text-[#9296c9] text-sm">
                      Loading...
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-slate-400 dark:text-[#9296c9] text-sm">
                      No invoices found.
                    </td>
                  </tr>
                ) : results.map((invoice, index) => (
                  <tr key={invoice.date + index} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                      {formatDate(invoice.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                      {"\u09F3"}{invoice.amount}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {statusBadge(invoice.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-[#191b33] border-t border-slate-200 dark:border-[#232648]">
            <p className="text-xs text-slate-500 dark:text-[#9296c9]">
              {count > 0 ? `Showing ${results.length} of ${count} invoices` : "No invoices"}
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
  );
}
