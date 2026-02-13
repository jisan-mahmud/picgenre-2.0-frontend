import React, { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../services/authService';

export default function Login() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await loginWithGoogle();
            navigate('/workspace');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen bg-background-light dark:bg-background-dark flex flex-col'>
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 flex items-center justify-center">
                            <img src="/icon.png" alt="Picgenre Logo" className="w-8 h-8 object-contain" />
                        </div>
                        <Link to="/" className="text-xl font-bold tracking-tight">Picgenre</Link>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-slate-200/20 dark:hover:bg-slate-800/50 transition-colors"
                        aria-label="Toggle theme"
                    >
                        <span className="material-symbols-outlined text-xl text-slate-900 dark:text-slate-100">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="auth-card w-full max-w-110 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800/60 overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-black/20">
                    <div className="w-full h-1 bg-primary"></div>
                    <div className="px-8 pt-12 pb-14 flex flex-col items-center">
                        <div className="mb-6">
                            <div className="size-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/20 dark:border-primary/30">
                                <img src="/icon.png" alt="Picgenre Logo" className="w-8 h-8 object-contain" />
                            </div>
                        </div>
                        <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-bold leading-tight text-center pb-2">
                            Welcome to Picgenre
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-10 text-center max-w-75">
                            Sign in to generate perfect metadata with AI
                        </p>
                        <div className="w-full flex justify-center py-2">
                            <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-200 gap-3 text-base font-bold leading-normal tracking-tight shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                <div className="flex items-center justify-center" data-icon="GoogleLogo">
                                    <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.6 10.2273C19.6 9.51818 19.5364 8.84091 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4409 14.3591 13.3818 15.0682V17.5773H16.6227C18.5182 15.8318 19.6 13.2682 19.6 10.2273Z" fill="#4285F4"></path>
                                        <path d="M10 20C12.7 20 14.9636 19.1045 16.6227 17.5773L13.3818 15.0682C12.4818 15.6727 11.3409 16.0318 10 16.0318C7.39091 16.0318 5.18182 14.2727 4.39091 11.9091H1.05V14.5C2.7 17.7773 6.08182 20 10 20Z" fill="#34A853"></path>
                                        <path d="M4.39091 11.9091C4.19091 11.3091 4.07727 10.6682 4.07727 10C4.07727 9.33182 4.19091 8.69091 4.39091 8.09091V5.5H1.05C0.381818 6.85455 0 8.38182 0 10C0 11.6182 0.381818 13.1455 1.05 14.5L4.39091 11.9091Z" fill="#FBBC05"></path>
                                        <path d="M10 3.96818C11.4682 3.96818 12.7818 4.47273 13.8136 5.46364L16.6909 2.58636C14.9591 0.981818 12.6955 0 10 0C6.08182 0 2.7 2.22273 1.05 5.5L4.39091 8.09091C5.18182 5.72727 7.39091 3.96818 10 3.96818Z" fill="#EA4335"></path>
                                    </svg>
                                </div>
                                <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
                            </button>
                        </div>
                        <div className="mt-10 text-center">
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                                By continuing, you agree to our <br />
                                <a className="underline hover:text-primary transition-colors" href="#">Terms of Service</a> and
                                <a className="underline hover:text-primary transition-colors" href="#">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="py-8 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                    © 2024 MetaForge AI Inc. All rights reserved.
                </p>
            </footer>
        </div>
    )
}
