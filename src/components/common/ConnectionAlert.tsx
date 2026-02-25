import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ShieldCheck, Phone } from 'lucide-react';

export default function ConnectionAlert() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show after a short delay
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="theme-card max-w-md w-full p-8 relative border-brand/30 shadow-2xl shadow-brand/20 bg-bg-surface/95"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-text-muted hover:text-brand transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center text-brand animate-pulse">
                                <AlertTriangle size={32} />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-text-primary border-b-2 border-brand/50 inline-block px-4 pb-1">
                                    Network Advisory
                                </h2>
                                <p className="text-text-secondary leading-relaxed">
                                    There is currently a widespread connectivity issue affecting <span className="text-brand font-bold">Supabase (Indian Servers)</span>.
                                </p>
                            </div>

                            <div className="theme-card bg-bg-main/50 p-5 border-brand/20 w-full rounded-2xl text-left">
                                <p className="text-[10px] uppercase tracking-widest text-brand font-black mb-4 opacity-70">Recommended Actions</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 text-text-primary">
                                        <div className="mt-0.5 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                                            <ShieldCheck size={14} />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-bold">Use a VPN</p>
                                            <p className="text-text-muted text-xs">Switch to US or Europe region for stable access.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-text-primary">
                                        <div className="mt-0.5 w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                                            <Phone size={14} />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-bold">Support Hotline</p>
                                            <p className="text-brand font-mono">+91 6207163458</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={handleClose}
                                className="theme-button w-full py-4 text-sm font-black uppercase tracking-widest shadow-lg shadow-brand/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                I Understand
                            </button>

                            <p className="text-[9px] text-text-muted uppercase tracking-[0.3em] font-medium pt-2">
                                Science & Innovation Club • GEC Palamu
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
