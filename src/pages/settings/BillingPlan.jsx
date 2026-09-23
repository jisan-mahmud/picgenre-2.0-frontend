import React, { useState } from "react";
import { CreditCard, ArrowUpRight, Receipt, ReceiptText, Wallet } from "lucide-react";
import { motion } from "motion/react";
import SettingsHeader from "../../components/settings/ui/SettingsHeader";
import EmptyState from "../../components/settings/ui/EmptyState";
import Pagination from "../../components/settings/ui/Pagination";
import { Skeleton, SkeletonRows } from "../../components/settings/ui/Skeleton";
import { Link } from "react-router-dom";
import { useCurrentSubscription, useInvoices } from "../../hooks/useApi";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });
}

function statusBadge(status) {
  if (status === "SUCCESS") {
    return (
      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
        Paid
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wide">
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
  const hasActivePlan = subscription?.is_active === true && plan;

  return (
    <div className="pb-4">
      <SettingsHeader
        icon={CreditCard}
        title="Billing & Plan"
        subtitle="Manage your subscription, billing information, and payment history."
      >
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20"
        >
          {hasActivePlan ? "Manage Plan" : "Choose a Plan"}
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </SettingsHeader>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-[#111222]/60 shadow-sm overflow-hidden">
          {subscriptionLoading ? (
            <div className="p-6 flex flex-col gap-4">
              <Skeleton className="h-5 w-32" />
              <div className="flex items-center gap-4">
                <Skeleton className="size-14 rounded-2xl" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-52" />
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          ) : !hasActivePlan ? (
            <EmptyState
              icon={Wallet}
              title="No active subscription"
              description="You're not on a plan right now. Pick a plan to keep converting files and generating metadata without limits."
              action={
                <Link
                  to="/pricing"
                  className="mt-2 inline-flex items-center gap-2 rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shadow-primary/20"
                >
                  Choose a Plan
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              }
            />
          ) : (
            <div className="p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                  </span>
                  <div>
                    <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                      {planTier} Plan
                    </p>
                    <p className="text-xs text-slate-500 dark:text-[#9296c9]">
                      Renews {formatDate(subscription.expires_at)}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 p-5 bg-slate-50 dark:bg-[#1c1f3d] rounded-xl border border-slate-100 dark:border-[#232648]">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 dark:text-[#9296c9] uppercase font-bold tracking-wider">
                    Monthly Credit
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-900 dark:text-white text-3xl font-black leading-none">
                      {remainingCredit}
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-[#9296c9]">
                      remaining
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-[#9296c9]">
                    {usedCredit} used of {totalCredit}
                  </span>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="text-xs text-slate-500 dark:text-[#9296c9] uppercase font-bold tracking-wider">
                    Price
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {"\u09F3"}{plan?.price}
                    <span className="text-sm font-bold text-slate-500 dark:text-[#9296c9]"> {cycleLabel}</span>
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 dark:text-[#9296c9] uppercase font-bold tracking-wider">
                    Credit Usage
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {usedPct.toFixed(0)}%
                  </p>
                </div>
                <div className="mt-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-[#232648] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${usedPct}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  ></motion.div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-[#9296c9]">
                    <span className="font-bold text-slate-900 dark:text-white">{remainingCredit}</span> remaining
                  </span>
                  <span className="text-slate-500 dark:text-[#9296c9]">{usedCredit} used</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <ReceiptText className="w-5 h-5 text-primary" />
            </span>
            <h2 className="text-slate-900 dark:text-white text-base font-bold">Recent Invoices</h2>
          </div>

          <motion.div
            key={page}
            className="overflow-hidden rounded-2xl border border-slate-200 dark:border-[#232648] bg-white dark:bg-[#111222]/60 shadow-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {invoicesLoading ? (
              <div className="py-2">
                <SkeletonRows rows={5} columns={3} />
              </div>
            ) : results.length === 0 ? (
              <EmptyState
                icon={Receipt}
                title="No invoices yet"
                description="Your payment receipts will appear here after your first subscription payment."
              />
            ) : (
              <div className="overflow-x-auto">
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
                    {results.map((invoice, index) => (
                      <tr key={invoice.date + index} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                          {formatDate(invoice.date)}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-bold">
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
            )}

            {!invoicesLoading && results.length > 0 && (
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
      </div>
    </div>
  );
}