import React, { useState } from 'react'
import { Coins } from 'lucide-react'

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

const plans = [
    {
        name: 'Free',
        description: 'Perfect for hobbyists and experimentation.',
        monthly: { price: '$0', tokens: null },
        yearly:  { price: '$0', tokens: null },
        button: 'Start for Free',
        features: [
            { label: 'Limited metadata generation from images', included: true },
            { label: 'Up to 5 images per batch process', included: true },
            { label: 'Standard processing speed', included: true },
            { label: 'API key required (user provides own LLM key)', included: true },
            { label: 'No fast credits', included: false },
            { label: 'Basic usage limits (strict rate limits)', included: true },
        ],
    },
    {
        name: 'Plus',
        description: 'Balanced plan for regular creators.',
        monthly: { price: '$29', tokens: 1200 },
        yearly:  { price: '$23', yearlyTotal: '$276', tokens: 1200 },
        popular: true,
        button: 'Get Started with Plus',
        features: [
            { label: 'Higher batch limits', included: true },
            { label: 'Advanced metadata generation (better AI quality)', included: true },
            { label: 'Fast credits included (no API key needed)', included: true },
            { label: 'Relaxed rate limits (fair usage caps)', included: true },
            { label: 'When fast credits finish, fallback to Groq API key', included: true },
            { label: 'Priority processing queue', included: true },
            { label: 'Commercial usage rights', included: true },
        ],
    },
    {
        name: 'Pro',
        description: 'For heavy users and production workloads.',
        monthly: { price: '$59', tokens: 3000 },
        yearly:  { price: '$47', yearlyTotal: '$564', tokens: 3000 },
        button: 'Upgrade to Pro',
        features: [
            { label: 'Highest batch limits', included: true },
            { label: 'Advanced + optimized metadata generation', included: true },
            { label: 'More fast credits than Plus', included: true },
            { label: 'No rate limits', included: true },
            { label: 'Auto fallback to Groq API when credits end', included: true },
            { label: 'Ultra-priority processing queue', included: true },
            { label: 'Commercial usage rights', included: true },
        ],
    },
]

export default function Pricing() {
    const [yearly, setYearly] = useState(false)
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
                            Yearly
                            <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full">Save 20%</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`flex flex-col p-8 rounded-2xl bg-white dark:bg-slate-900/40 relative transition-all ${
                            plan.popular
                                ? 'border-2 border-primary shadow-2xl shadow-primary/10'
                                : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                        }`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                    Most Popular
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
                                        {(yearly ? plan.yearly.tokens : plan.monthly.tokens).toLocaleString()} tokens / mo
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
                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                                plan.popular
                                    ? 'bg-primary text-white hover:bg-indigo-500 shadow-lg shadow-primary/20'
                                    : 'border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-900 dark:text-white'
                            }`}>
                                {plan.button}
                            </button>
                        </div>
                    ))}
                </div>
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
        </div>
    )
}
