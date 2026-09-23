import { Link } from 'react-router-dom'
import { Lock, ArrowRight } from 'lucide-react'

export default function LockedFeatureCard({ title = 'Premium feature', description }) {
    return (
        <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold font-display">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                {description}
            </p>
            <Link to="/pricing" className="mt-2 inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all">
                View Plans
                <ArrowRight className="w-4 h-5" />
            </Link>
        </div>
    )
}