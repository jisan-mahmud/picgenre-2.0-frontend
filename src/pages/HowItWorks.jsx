import React from 'react'
import { ArrowRight, Upload, Sparkles, CheckCircle, Key, Terminal, Layers, Clock, Download, Tag, FileText, Image as ImageIcon } from 'lucide-react'
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

const steps = [
    {
        num: '01',
        icon: Upload,
        title: 'Upload Your Files',
        desc: 'Drag and drop your images, SVGs, EPS files, PDFs, or documents into the workspace. Batch upload hundreds of files at once — no size limits on supported plans.',
        details: ['PNG, JPG, SVG, EPS supported', 'PDF and DOCX documents', 'Batch upload up to 500 files', 'Drag & drop or click to browse'],
    },
    {
        num: '02',
        icon: Sparkles,
        title: 'AI Analyzes Content',
        desc: 'Gemini AI reads and deeply understands the visual and textual content of every file. It identifies subjects, styles, colors, themes, and context automatically.',
        details: ['Powered by Gemini AI', 'Visual & text understanding', 'Context-aware analysis', 'Processes in ~2.4 seconds per file'],
    },
    {
        num: '03',
        icon: Tag,
        title: 'Metadata is Generated',
        desc: 'SEO-optimized titles, keyword tags, and descriptions are created for each file. All metadata follows platform-specific guidelines for maximum discoverability.',
        details: ['SEO-optimized titles', 'Up to 50 keyword tags', 'Platform-specific formatting', 'Multi-language support'],
    },
    {
        num: '04',
        icon: Download,
        title: 'Export & Use',
        desc: 'Copy metadata instantly or export everything as CSV, JSON, or XML. Ready to paste directly into Adobe Stock, Shutterstock, Freepik, and more.',
        details: ['CSV, JSON, XML export', 'One-click copy per file', 'Bulk export all results', 'Platform-ready formatting'],
    },
]

const faqs = [
    {
        q: 'What file formats are supported?',
        a: 'Picgenre supports PNG, JPG, SVG, EPS, PDF, DOCX, and MP4. More formats are being added regularly.',
    },
    {
        q: 'Do I need an API key?',
        a: 'Free users need to provide their own Gemini API key. Plus and Pro plans include fast credits so no key is required.',
    },
    {
        q: 'How accurate is the AI metadata?',
        a: 'Our AI achieves ~98% accuracy on standard stock imagery. Results are production-ready and platform-optimized.',
    },
    {
        q: 'Can I process files in bulk?',
        a: 'Yes. You can upload and process hundreds of files simultaneously. Batch size limits depend on your plan.',
    },
    {
        q: 'Which platforms is the metadata optimized for?',
        a: 'Metadata is tailored for Adobe Stock, Shutterstock, Freepik, and Vecteezy — following each platform\'s specific requirements.',
    },
]

export default function HowItWorks() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">

            {/* Hero */}
            <section className="relative pt-20 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 blur-[120px] rounded-full -z-10" />
                <div className="max-w-3xl mx-auto text-center">
                    <AnimatedSection>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">HOW IT WORKS</p>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                            From Upload to Metadata in <span className="text-primary">Seconds</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Picgenre's AI pipeline handles everything — just upload your files and get production-ready metadata instantly.
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

            {/* Steps */}
            <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col gap-16">
                        {steps.map((step, i) => {
                            const Icon = step.icon
                            const isEven = i % 2 === 1
                            return (
                                <AnimatedSection key={i} delay={i * 100}>
                                    <div className={`flex flex-col md:flex-row items-center gap-10 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                        {/* Icon block */}
                                        <div className="flex-shrink-0 flex flex-col items-center gap-4">
                                            <div className="w-28 h-28 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                <Icon className="w-12 h-12 text-primary" />
                                            </div>
                                            <span className="text-xs font-black text-primary tracking-widest">STEP {step.num}</span>
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1">
                                            <h2 className="text-2xl md:text-3xl font-black mb-3">{step.title}</h2>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{step.desc}</p>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {step.details.map((d, j) => (
                                                    <li key={j} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Features highlight */}
            <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">BUILT FOR SPEED</p>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Everything You Need</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                                A complete metadata workflow in one tool.
                            </p>
                        </div>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {[
                            { icon: Layers, title: 'Batch Processing', desc: 'Process hundreds of files at once without any slowdown.' },
                            { icon: Key, title: 'Bring Your Own Key', desc: 'Use your own Gemini API key for full cost control.' },
                            { icon: Terminal, title: 'Flexible Export', desc: 'Export as CSV, JSON, or XML for any platform or CMS.' },
                            { icon: Clock, title: '2.4s Per File', desc: 'Lightning-fast processing with concurrent AI workers.' },
                            { icon: ImageIcon, title: '50+ Formats', desc: 'Images, vectors, documents, and video all supported.' },
                            { icon: FileText, title: 'Platform-Ready', desc: 'Metadata formatted for Adobe Stock, Shutterstock & more.' },
                        ].map((f, i) => {
                            const Icon = f.icon
                            return (
                                <AnimatedSection key={i} delay={i * 80}>
                                    <div className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
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

            {/* FAQ */}
            <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-3xl mx-auto">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">Frequently Asked Questions</h2>
                    </AnimatedSection>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <AnimatedSection key={i} delay={i * 80}>
                                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                                    <h4 className="font-bold mb-2">{faq.q}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                                </div>
                            </AnimatedSection>
                        ))}
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
