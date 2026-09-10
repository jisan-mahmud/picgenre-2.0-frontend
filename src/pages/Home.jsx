import React from 'react';
import { ArrowRight, Upload, Sparkles, CheckCircle, Layers, Key, Terminal, Clock, Star, MessageSquare, Image as ImageIcon, Code, FileText, File, Video, Diamond, Users, Camera, Globe } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const stats = [
    { value: '2.4s', label: 'Avg Processing Time', desc: 'Lightning-fast AI analysis' },
    { value: '98%', label: 'Accuracy Rate', desc: 'Production-grade quality' },
    { value: '50+', label: 'File Formats', desc: 'Images, docs, and more' },
]

const steps = [
    { num: '01', icon: Upload, title: 'Upload', desc: 'Drag and drop your images, EPS files, or documents into the workspace.' },
    { num: '02', icon: Sparkles, title: 'AI Analyzes', desc: 'Gemini AI reads and understands the content of every file automatically.' },
    { num: '03', icon: CheckCircle, title: 'Get Metadata', desc: 'SEO-optimized title, tags, and description ready to copy or export.' },
]

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

export default function Home() {
    return (
        <div>
            <main>
                {/* Hero */}
                <section className="relative pt-20 pb-16 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />
                    <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                        <AnimatedSection>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                AI ENGINE UPDATED TO V4.2
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={100}>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                                Generate Perfect Metadata from Any File — <span className="text-primary">Instantly</span>
                            </h1>
                        </AnimatedSection>
                        <AnimatedSection delay={200}>
                            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
                                Picgenre uses advanced AI to analyze images, SVGs, and documents, creating SEO-ready metadata in seconds.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection delay={300}>
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                                <a href="/workspace" className="w-full sm:w-auto flex items-center justify-center gap-2 min-w-[200px] h-14 rounded-xl bg-primary text-white text-base font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                                    Get Started
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <a href="#how-it-works" className="w-full sm:w-auto flex items-center justify-center gap-2 min-w-[200px] h-14 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    See How It Works
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="px-6 mb-25">
                    <div className="max-w-4xl mx-auto">
                        <AnimatedSection>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-slate-200 dark:sm:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-8 px-6 hover:shadow-md transition-shadow duration-300">
                                {stats.map((s, i) => (
                                    <div key={i} className="flex-1 text-center px-8">
                                        <div className="text-3xl md:text-4xl font-black text-primary mb-1">{s.value}</div>
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{s.label}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Supported Formats */}
                <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-5xl mx-auto">
                        <AnimatedSection>
                            <div className="text-center mb-12">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">FILE FORMATS</p>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Works with What You Have</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                    Upload any common file format — our AI handles the rest.
                                </p>
                            </div>
                        </AnimatedSection>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {[
                                { icon: ImageIcon, label: 'PNG / JPG', desc: 'Raster images' },
                                { icon: Code, label: 'SVG', desc: 'Vector graphics' },
                                { icon: FileText, label: 'PDF', desc: 'Documents' },
                                { icon: File, label: 'DOCX', desc: 'Word files' },
                                { icon: Video, label: 'MP4', desc: 'Video clips' },
                            ].map((fmt, i) => (
                                <AnimatedSection key={i} delay={i * 80}>
                                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group text-center">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <fmt.icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{fmt.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{fmt.desc}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Supported Platforms */}
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
                            {[
                                { icon: Diamond, label: 'Adobe Stock', desc: 'Industry standard' },
                                { icon: Users, label: 'Freepik', desc: 'Design community' },
                                { icon: Camera, label: 'Shutterstock', desc: 'Global marketplace' },
                                { icon: Globe, label: 'Vecteezy', desc: 'Creative vectors' },
                            ].map((p, i) => (
                                <AnimatedSection key={i} delay={i * 100}>
                                    <div className="flex flex-col items-center gap-4 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <p.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-slate-900 dark:text-white">{p.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.desc}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-5xl mx-auto">
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">HOW IT WORKS</p>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Three Steps to Perfect Metadata</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                    No setup, no configuration. Just upload and get results.
                                </p>
                            </div>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px border-t-2 border-dashed border-slate-200 dark:border-slate-800" />
                            {steps.map((step, i) => {
                                const Icon = step.icon
                                return (
                                    <AnimatedSection key={i} delay={i * 150}>
                                        <div className="flex flex-col items-center text-center gap-5 relative">
                                            <div className="w-24 h-24 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center relative z-10 bg-background-light dark:bg-background-dark hover:scale-105 transition-transform duration-300">
                                                <Icon className="w-10 h-10 text-primary" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-xs font-black text-primary tracking-widest">STEP {step.num}</div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Features Bento Grid */}
                <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-5xl mx-auto">
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">FEATURES</p>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Powerful Metadata Tools</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                    Designed for contributors who need speed, flexibility, and production-grade accuracy.
                                </p>
                            </div>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]">
                            <AnimatedSection delay={0} className="md:col-span-2">
                                <div className="h-full flex flex-col gap-5 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Layers className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Batch Processing</h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Process hundreds of files simultaneously without breaking a sweat. Perfect for large-scale content migrations and portfolio uploads.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection delay={100}>
                                <div className="h-full flex flex-col gap-5 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Key className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Bring Your Own Key</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Connect your own API key for full control over costs and model selection.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection delay={200}>
                                <div className="h-full flex flex-col gap-5 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Terminal className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Export Ready</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Get metadata in JSON, CSV, or XML — ready for any platform or CMS.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection delay={300} className="md:col-span-2">
                                <div className="h-full flex flex-col gap-5 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Average 2.4 seconds per file with concurrent processing across multiple workers. Your metadata is ready before you finish your coffee.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Trusted By Section */}
                <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
                        <AnimatedSection>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                TRUSTED BY CONTRIBUTORS
                            </p>
                        </AnimatedSection>
                        <AnimatedSection delay={100}>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-center">
                                Why Contributors Choose Picgenre
                            </h2>
                        </AnimatedSection>
                        <AnimatedSection delay={200}>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl text-center leading-relaxed">
                                Join thousands of stock contributors who save hours every week with AI-powered metadata generation.
                            </p>
                        </AnimatedSection>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
                            {[
                                { initials: 'SK', name: 'Sarah K.', role: 'Adobe Stock Contributor', rating: 5, quote: 'I used to spend 20 minutes per image writing metadata. Now it takes 3 seconds. My upload rate has tripled.' },
                                { initials: 'MR', name: 'Marcus R.', role: 'Shutterstock Artist', rating: 5, quote: 'The AI understands context perfectly — it generates relevant tags I wouldn\'t have thought of. Game changer for my portfolio.' },
                                { initials: 'AL', name: 'Anna L.', role: 'Freepik Designer', rating: 4, quote: 'Batch processing is incredible. I uploaded 200 files and got perfect metadata for all of them in under a minute.' },
                            ].map((t, i) => (
                                <AnimatedSection key={i} delay={i * 100}>
                                    <div className="h-full p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-left flex flex-col gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: 5 }).map((_, s) => (
                                                <Star key={s} className={`w-4 h-4 ${s < t.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'}`} />
                                            ))}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">"{t.quote}"</p>
                                        <div className="flex items-center gap-3 mt-auto pt-2">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">{t.initials}</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                                                <p className="text-xs text-slate-500">{t.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                        <AnimatedSection delay={300}>
                            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                                <a href="/workspace" className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                                    Start Generating Free
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="/feedback" className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    <MessageSquare className="w-4 h-4" />
                                    Give Feedback
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

            </main>
        </div>
    );
}
