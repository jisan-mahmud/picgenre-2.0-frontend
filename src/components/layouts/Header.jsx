import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Link } from 'react-router-dom'
import { Sun, Moon, Rocket, Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const { user, isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
    };
    
    return (
       <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="p-1.5 rounded-lg flex items-center justify-center">
                            <img src="/icon.png" alt="Picgenre Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                        </div>
                        <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight">Picgenre</Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Features</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Documentation</a>
                        <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
                        <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
                    </nav>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        {isAuthenticated() ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                    aria-label="User menu"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="hidden sm:inline text-sm font-medium">
                                        {user?.displayName || user?.email || 'User'}
                                    </span>
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                                        <Link
                                            to="/workspace"
                                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Workspace
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="hidden sm:flex text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                    Sign In
                                </Link>
                                <Link to="/workspace" className="hidden sm:flex bg-primary text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 rounded-lg hover:bg-blue-700 transition-all items-center gap-1 sm:gap-2">
                                    <Rocket className="w-4 h-4" />
                                    <span className="hidden sm:inline">Get Started</span>
                                    <span className="sm:hidden">Start</span>
                                </Link>
                                <button 
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="md:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {isMenuOpen && !isAuthenticated() && (
                    <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
                        <nav className="px-4 py-4 space-y-3">
                            <a className="block text-sm font-medium hover:text-primary transition-colors py-2" href="#">Features</a>
                            <a className="block text-sm font-medium hover:text-primary transition-colors py-2" href="#">Documentation</a>
                            <Link to="/pricing" className="block text-sm font-medium hover:text-primary transition-colors py-2">Pricing</Link>
                            <Link to="/shop" className="block text-sm font-medium hover:text-primary transition-colors py-2">Shop</Link>
                            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                                <Link to="/login" className="block text-sm font-semibold py-2 hover:text-primary transition-colors">
                                    Sign In
                                </Link>
                                <Link to="/workspace" className="block bg-primary text-white text-sm font-bold px-4 py-3 rounded-lg hover:bg-blue-700 transition-all text-center">
                                    Get Started
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
        </header>
    )
}
