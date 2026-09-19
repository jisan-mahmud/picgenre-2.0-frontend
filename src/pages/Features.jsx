import React from 'react'
import { ArrowRight, Upload, Sparkles, CheckCircle, Layers, Key, Terminal, Clock, Tag, Image as ImageIcon, Code, FileText, File, Video, Diamond, Users, Camera, Globe, BookmarkPlus, Zap, MessageSquare } from 'lucide-react'
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

const coreFeatures = [
    { icon: Layers, title: 'Batch Processing', desc: 'Process up to hundreds of files at once with concurrent AI workers and zero slowdown.' },
    { icon: Key, title: 'Bring Your Own Key', desc: 'Use your own Gemini API key for full cost control — free users included.' },
    { icon: Terminal, title: 'Flexible Export', desc: 'Export metadata as CSV, JSON, or XML, ready for any platform or CMS.' },
    { icon: Clock, title: 'Lightning Speed', desc: 'Average 2.4 seconds per file, so results are ready before your coffee cools.' },
    { icon: ImageIcon, title: 'Wide Format Support', desc: 'Images, vectors, documents, and video — 50+ formats accepted.' },
    { icon: Tag, title: 'Platform-Ready Output', desc: 'Titles, tags, and descriptions formatted for Adobe Stock, Shutterstock, and Freepik.' },
]

const formats = [
    { icon: ImageIcon, label: 'PNG / JPG' },
    { icon: Code, label: 'SVG' },
    { icon: Layers, label: 'EPS' },
    { icon: FileText, label: 'PDF' },
    { icon: File, label: 'DOCX' },
    { icon: Video, label: 'MP4' },
]

const platforms = [
    { icon: Diamond, label: 'Adobe Stock' },
    { icon: Users, label: 'Freepik' },
    { icon: Camera, label: 'Shutterstock' },
    { icon: Globe, label: 'Vecteezy' },
]

const premiumFeatures = [
    { icon: BookmarkPlus, title: 'Save to History', desc: 'Keep a permanent record of generated metadata CSVs and download them anytime.' },
    { icon: Zap, title: 'Premium Credits', desc: 'Plus and Pro plans include fast shared credits — no API key required.' },
    { icon: MessageSquare, title: 'Custom AI Prompts', desc: 'Tailor metadata generation with your own prompt instructions per run.' },
]

export default function Features() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            {/* Hero */}
            <section className="relative pt-20 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 blur-[120px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto text-center">
                    <AnimatedSection>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">FEATURES</p>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                            Metadata Tools Built for <span className="text-primary">Stock Contributors</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Everything you need to turn any file into SEO-ready metadata in seconds — no setup, no manual tagging.
                        </p>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                            <a href="/workspace" className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-primary text-white text-base font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                                Try It Free
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a href="/pricing" className="inline-flex items-center gap-2 h-14 px-8 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                View Pricing
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Core features */}
            <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">CORE FEATURES</p>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Everything You Need</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                A complete metadata workflow in one tool.
                            </p>
                        </div>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {coreFeatures.map((f, i) => {
                            const Icon = f.icon
                            return (
                                <AnimatedSection key={i} delay={i * 80}>
                                    <div className="h-full flex flex-col gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold mb-1">{f.title}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Formats */}
            <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">SUPPORTED FORMATS</p>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Works with What You Have</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                Upload any common file format — our AI handles the rest.
                            </p>
                        </div>
                    </AnimatedSection>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {formats.map((fmt, i) => {
                            const Icon = fmt.icon
                            return (
                                <AnimatedSection key={i} delay={i * 80}>
                                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group text-center">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{fmt.label}</p>
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Platforms */}
            <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">PLATFORMS</p>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Optimized for Every Stock Platform</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                Metadata tailored to each platform's requirements and best practices.
                            </p>
                        </div>
                    </AnimatedSection>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {platforms.map((p, i) => {
                            const Icon = p.icon
                            return (
                                <AnimatedSection key={i} delay={i * 100}>
                                    <div className="flex flex-col items-center gap-4 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group text-center">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{p.label}</p>
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Premium features */}
            <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">PREMIUM</p>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Built to Scale With You</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                Features premium users rely on every day.
                            </p>
                        </div>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {premiumFeatures.map((f, i) => {
                            const Icon = f.icon
                            return (
                                <AnimatedSection key={i} delay={i * 100}>
                                    <div className="h-full flex flex-col gap-4 p-6 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold mb-1">{f.title}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                <AnimatedSection>
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Ready to Get Started?</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                            Upload your first file and get metadata in under 3 seconds — no credit card required.
                        </p>
                        <a href="/workspace" className="inline-flex items-center gap-2 h-14 px-10 rounded-xl bg-primary text-white text-base font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                            Start for Free
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    )
}