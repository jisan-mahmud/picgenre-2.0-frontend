import React, { useState } from 'react'
import { Star, Send, CheckCircle } from 'lucide-react'
import { useInView } from '../hooks/useInView'

function AnimatedSection({ children, className = '', delay = 0 }) {
    const [ref, isInView] = useInView()
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
            }}
        >
            {children}
        </div>
    )
}

export default function Feedback() {
    const [rating, setRating] = useState(0)
    const [hovered, setHovered] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (rating === 0 || !message.trim()) return
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <div className="max-w-md text-center flex flex-col items-center gap-4">
                    <div
                        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                        style={{
                            opacity: 1,
                            transform: 'scale(1)',
                            animation: 'scale-in 0.5s ease-out both',
                        }}
                    >
                        <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <AnimatedSection delay={100}>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Thank You!</h2>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Your feedback helps us improve Picgenre for contributors everywhere.
                        </p>
                    </AnimatedSection>
                    <AnimatedSection delay={300}>
                        <a href="/" className="mt-4 inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Back to Home
                        </a>
                    </AnimatedSection>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <section className="pt-20 pb-12 px-6">
                <div className="max-w-2xl mx-auto">
                    <AnimatedSection>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                            FEEDBACK
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay={100}>
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                            Share Your Experience
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Your feedback helps us build better tools for stock contributors worldwide.
                        </p>
                    </AnimatedSection>
                </div>
            </section>
            <section className="pb-24 px-6">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-6">
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 flex flex-col gap-6">
                        <AnimatedSection>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-900 dark:text-white">Your Rating</label>
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onMouseEnter={() => setHovered(i + 1)}
                                            onMouseLeave={() => setHovered(0)}
                                            onClick={() => setRating(i + 1)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star className={`w-7 h-7 ${
                                                (hovered || rating) > i
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'
                                            }`} />
                                        </button>
                                    ))}
                                    {rating > 0 && (
                                        <span className="ml-2 text-sm text-slate-500 dark:text-slate-400 self-center">
                                            {rating === 1 && 'Poor'}
                                            {rating === 2 && 'Fair'}
                                            {rating === 3 && 'Good'}
                                            {rating === 4 && 'Very Good'}
                                            {rating === 5 && 'Excellent'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={100}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-bold text-slate-900 dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={200}>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-slate-900 dark:text-white">Your Feedback</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tell us what you think about Picgenre..."
                                    rows={5}
                                    required
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                    <AnimatedSection delay={300}>
                        <button
                            type="submit"
                            disabled={rating === 0 || !message.trim()}
                            className="w-full h-14 bg-primary text-white text-base font-black rounded-xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <Send className="w-5 h-5" />
                            Submit Feedback
                        </button>
                    </AnimatedSection>
                </form>
            </section>
        </div>
    )
}
