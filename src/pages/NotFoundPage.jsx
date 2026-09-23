import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

export default function NotFoundPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
            <main className="flex flex-col items-center px-6">
                <div className="max-w-200 w-full text-center">
                    <motion.h1
                        className="text-slate-900 dark:text-white tracking-tighter text-[120px] md:text-[180px] font-bold leading-none mb-2"
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        404
                    </motion.h1>
                    <motion.h2
                        className="text-slate-600 dark:text-slate-300 text-xl md:text-2xl font-medium leading-relaxed max-w-lg mx-auto pb-8"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                    >
                        Oops! The page you are looking for has been moved or doesn't exist.
                    </motion.h2>
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-105] justify-center px-4">
                            <Link to='/' className="flex min-w-40] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-base font-bold transition-all hover:scale-105 active:scale-95">
                                <span className="material-symbols-outlined mr-2">home</span>
                                <span className="truncate">Back to Home</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}