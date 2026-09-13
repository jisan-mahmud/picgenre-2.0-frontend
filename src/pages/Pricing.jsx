import React, { useState } from 'react'
import { Coins, Loader2, CheckCircle2, X } from 'lucide-react'
import { useSubscriptionPlans, useSubscribe } from '../hooks/useApi'
import { useAuth } from '../contexts/AuthContext'

const faqs = [
    {
        q: 'Can I switch plans anytime?',
        a: 'Plan changes are not currently supported. Once you subscribe to a plan, it remains active until the end of your billing cycle. Please choose your plan carefully.',
    },
    {
        q: 'What happens when my tokens run out?',
        a: 'When your fast credits are exhausted, you can provide your own Groq API key to continue processing. Your key will be used as a fallback until your credits reset next month.',
    },
    {
        q: 'Do you offer API access?',
        a: 'API access is available on our Plus plan for standard usage and on Pro for high-volume needs. Free users must provide their own LLM API key.',
    },
    {
        q: 'Is there a limit on file size?',
        a: 'Free users can upload up to 50MB per file. Plus and Pro users can upload files up to 1GB in size.',
    },
    {
        q: 'When do my tokens reset?',
        a: 'Tokens reset at the start of each billing cycle — monthly for monthly plans, and annually for yearly plans.',
    },
]

// TODO: swap Nagad number with real account
const PAYMENT_METHODS = {
    bkash: { label: 'bKash', number: '01996629397', receiver: 'Picgenre' },
    nagad: { label: 'Nagad', number: '01996629397', receiver: 'Picgenre' },
}

const freePlan = {
    name: 'Free',
    description: 'Perfect for hobbyists and experimentation.',
    monthly: { price: '$0', tokens: null },
    yearly:  { price: '$0', tokens: null },
    button: 'Start for Free',
    featured: false,
    features: [
        { label: 'Limited metadata generation from images', included: true },
        { label: 'Up to 5 images per batch process', included: true },
        { label: 'Standard processing speed', included: true },
        { label: 'API key required (user provides own LLM key)', included: true },
        { label: 'No fast credits', included: false },
        { label: 'Basic usage limits (strict rate limits)', included: true },
    ],
}

const paidFeatures = {
    BASIC: [
        { label: 'Higher batch limits', included: true },
        { label: 'Advanced metadata generation (better AI quality)', included: true },
        { label: 'Fast credits included (no API key needed)', included: true },
        { label: 'Relaxed rate limits (fair usage caps)', included: true },
        { label: 'When fast credits finish, fallback to Groq API key', included: true },
        { label: 'Priority processing queue', included: true },
        { label: 'Commercial usage rights', included: true },
    ],
    PRO: [
        { label: 'Highest batch limits', included: true },
        { label: 'Advanced + optimized metadata generation', included: true },
        { label: 'More fast credits than Plus', included: true },
        { label: 'No rate limits', included: true },
        { label: 'Auto fallback to Groq API when credits end', included: true },
        { label: 'Ultra-priority processing queue', included: true },
        { label: 'Commercial usage rights', included: true },
    ],
}

function CheckoutModal({ plan, isYearly, onClose, onSuccess }) {
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [transactionId, setTransactionId] = useState('')
    const { mutateAsync, isPending, isError, error, reset } = useSubscribe()

    const price = isYearly ? plan.yearly.price : plan.monthly.price
    const method = paymentMethod ? PAYMENT_METHODS[paymentMethod] : null

    const handleSubmit = async () => {
        try {
            await mutateAsync({
                plan_id: plan.id,
                transaction_id: transactionId.trim(),
                payment_method: paymentMethod,
            })
            onSuccess()
        } catch {
            // error state handled by mutation
        }
    }

    if (isPending) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 shadow-2xl flex flex-col items-center gap-4 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Processing payment…</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                    <X size={20} />
                </button>

                <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">
                    Subscribe to {plan.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    {price} / mo {isYearly ? '(billed yearly)' : ''}
                </p>

                {!paymentMethod ? (
                    <>
                        <p className="text-sm font-bold mb-3 text-slate-700 dark:text-slate-300">Choose payment method</p>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(PAYMENT_METHODS).map(([key, m]) => (
                                <button
                                    key={key}
                                    onClick={() => setPaymentMethod(key)}
                                    className="py-4 rounded-xl border border-slate-200 dark:border-white/10 font-bold text-slate-900 dark:text-white hover:border-primary hover:bg-primary/5 transition-all"
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6">
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Send {price} to:
                            </p>
                            <p className="text-lg font-black text-slate-900 dark:text-white">{method.number}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Receiver: {method.receiver}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                                Use <span className="font-bold">{method.label} Send Money</span> and note the Transaction ID (TrxID) from the confirmation SMS.
                            </p>
                        </div>

                        {isError && (
                            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
                                {error?.response?.data?.detail || error?.message || 'Payment submission failed. Please try again.'}
                            </div>
                        )}

                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Transaction ID (TrxID)
                        </label>
                        <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => { setTransactionId(e.target.value); reset() }}
                            placeholder="e.g. 8A3K7B2C9D"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setPaymentMethod(null); setTransactionId(''); reset() }}
                                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                            >
                                Back
                            </button>
                            <button
                                disabled={!transactionId.trim()}
                                onClick={handleSubmit}
                                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-indigo-500 shadow-lg shadow-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Submit Payment
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

function PaymentSuccessModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 flex flex-col items-center gap-4 text-center" onClick={(e) => e.stopPropagation()}>
                <CheckCircle2 className="w-16 h-16 text-primary" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Payment Submitted</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your payment is being verified. Your plan will be activated once confirmed — this usually takes a few minutes.
                </p>
                <button onClick={onClose} className="mt-2 w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-indigo-500 shadow-lg shadow-primary/20 transition-all">
                    Done
                </button>
            </div>
        </div>
    )
}

export default function Pricing() {
    const [yearly, setYearly] = useState(false)
    const [checkout, setCheckout] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const { isAuthenticated, loading } = useAuth()
    const loggedIn = loading ? false : isAuthenticated()
    const { data, isLoading, isError, refetch } = useSubscriptionPlans()

    const monthlyPlans = data?.monthly ?? []
    const yearlyPlans = data?.yearly ?? []
    const discountPercent = yearlyPlans[0]?.discount_percent ?? 0

    const paidCards = monthlyPlans.map((mp) => {
        const yp = yearlyPlans.find((p) => p.tier === mp.tier)
        return {
            id: mp.id,
            name: mp.tier === 'PRO' ? 'Pro' : 'Basic',
            description: mp.description,
            monthly: { price: `$${mp.price}`, tokens: mp.monthly_credit },
            yearly: yp
                ? { price: `$${yp.price}`, yearlyTotal: `$${yp.price}`, tokens: yp.monthly_credit, totalCredits: yp.credits }
                : { price: `$${mp.price}`, yearlyTotal: null, tokens: mp.monthly_credit, totalCredits: null },
            featured: mp.tier === 'PRO',
            isActive: loggedIn && (mp.is_active || yp?.is_active),
            button: `Get Started with ${mp.tier === 'PRO' ? 'Pro' : 'Basic'}`,
            features: paidFeatures[mp.tier] ?? [],
        }
    })

    const plans = [{ ...freePlan, isActive: loggedIn && !paidCards.some((p) => p.isActive) }, ...paidCards]

    const handleCheckout = (plan) => {
        if (plan.name === 'Free' || plan.isActive) return
        setCheckout(plan)
    }

    const handleCloseCheckout = () => {
        setCheckout(null)
    }

    const handleSuccessClose = () => {
        setSubmitted(false)
        setCheckout(null)
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <section className="pt-20 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-slate-900 dark:text-white">
                        Simple, Transparent <span className="text-primary">Pricing</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Choose the perfect plan for your creative workflow. Scale as you grow with Picgenre's powerful AI infrastructure.
                    </p>
                    <div className="mt-8 inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
                        <button
                            onClick={() => setYearly(false)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                                !yearly ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                            }`}
                        >Monthly</button>
                        <button
                            onClick={() => setYearly(true)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                                yearly ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                            }`}
                        >
                            {discountPercent > 0 && (
                                <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full">Save {discountPercent}%</span>
                            )}
                        </button>
                    </div>
                </div>
            </section>
            <section className="py-12 px-6">
                {isLoading ? (
                    <div className="max-w-7xl mx-auto flex justify-center py-16">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : isError ? (
                    <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 py-16 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            Failed to load subscription plans.
                        </p>
                        <button
                            onClick={() => refetch()}
                            className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-indigo-500 shadow-lg shadow-primary/20 transition-all"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`flex flex-col p-8 rounded-2xl bg-white dark:bg-slate-900/40 relative transition-all ${
                            plan.featured
                                ? 'border-2 border-primary shadow-2xl shadow-primary/10'
                                : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                        }`}>
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            {plan.isActive && (
                                <div className="absolute -top-4 right-4 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                    Current Plan
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">{plan.description}</p>
                            </div>
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">{yearly ? plan.yearly.price : plan.monthly.price}</span>
                                    {yearly && plan.monthly.price !== '$0' && (
                                        <span className="text-slate-400 line-through text-lg">{plan.monthly.price}</span>
                                    )}
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">/mo</span>
                                </div>
                                {yearly && plan.yearly.yearlyTotal && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Billed {plan.yearly.yearlyTotal} / yr</p>
                                )}
                                {(yearly ? plan.yearly.tokens : plan.monthly.tokens) && (
                                    <div className="mt-2 inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                                        <Coins size={14} />
                                        {(yearly ? plan.yearly.tokens : plan.monthly.tokens).toLocaleString()} credits / mo
                                    </div>
                                )}
                                {yearly && plan.yearly.totalCredits && (
                                    <div className="mt-2 inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-3 py-1 rounded-full">
                                        <Coins size={14} />
                                        {plan.yearly.totalCredits.toLocaleString()} total credits / yr
                                    </div>
                                )}
                            </div>
                            <ul className="space-y-4 mb-12 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f.label} className={`flex items-center gap-3 text-sm ${
                                        f.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'
                                    }`}>
                                        <span className={`material-symbols-outlined text-lg ${f.included ? 'text-primary' : ''}`}>
                                            {f.included ? 'check_circle' : 'cancel'}
                                        </span>
                                        <span>{f.label}</span>
                                    </li>
                                ))}
                            </ul>
                            {plan.isActive ? (
                                <button
                                    disabled
                                    className="w-full py-4 rounded-xl font-bold border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={18} />
                                    Current Plan
                                </button>
                            ) : (
                            <button
                                onClick={() => handleCheckout(plan)}
                                className={`w-full py-4 rounded-xl font-bold transition-all ${
                                    plan.featured
                                        ? 'bg-primary text-white hover:bg-indigo-500 shadow-lg shadow-primary/20'
                                        : 'border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-900 dark:text-white'
                                }`}
                            >
                                {plan.button}
                            </button>
                            )}
                        </div>
                    ))}
                </div>
                )}
            </section>
            <section className="py-24 px-6 border-t border-slate-200 dark:border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.q} className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">{faq.q}</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {checkout && (
                <CheckoutModal
                    plan={checkout}
                    isYearly={yearly}
                    onClose={handleCloseCheckout}
                    onSuccess={() => { setSubmitted(true); setCheckout(null) }}
                />
            )}
            {submitted && (
                <PaymentSuccessModal onClose={handleSuccessClose} />
            )}
        </div>
    )
}
