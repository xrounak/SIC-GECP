import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import type { ThemeDesign } from '../context/ThemeContext';

const themes: { id: ThemeDesign; icon: string; label: string; color: string }[] = [
    { id: 'brutalism', icon: 'S', label: 'Neo-Brutalism', color: '#FDE047' },
    { id: 'neumorphism', icon: 'I', label: 'Neumorphism', color: '#E0E5EC' },
    { id: 'glassmorphism', icon: 'C', label: 'Glassmorphism', color: 'rgba(255,255,255,0.2)' },
    { id: 'claymorphism', icon: 'G', label: 'Claymorphism', color: '#F472B6' },
    { id: 'minimalism', icon: 'E', label: 'Minimalism', color: '#FFFFFF' },
    { id: 'cyberpunk', icon: 'C', label: 'Cyberpunk', color: '#ff00ff' },
    { id: 'amoled', icon: 'P', label: 'AMOLED Black', color: '#000000' },
];

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="flex flex-col gap-3 p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-2"
                    >
                        {themes.map((t) => (
                            <motion.button
                                key={t.id}
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setTheme(t.id);
                                    setIsOpen(false);
                                }}
                                className={`group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300
                                    ${theme === t.id
                                        ? 'bg-brand text-white shadow-lg ring-2 ring-brand/50 ring-offset-2 ring-offset-transparent'
                                        : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                                    }
                                `}
                                title={t.label}
                                style={{
                                    backgroundColor: theme === t.id ? t.color : undefined,
                                    color: theme === t.id && t.id === 'minimalism' ? '#000' : undefined
                                }}
                            >
                                <span className="text-xl filter drop-shadow-sm group-hover:drop-shadow-md transition-all">
                                    {t.icon}
                                </span>

                                {/* Tooltip label on hover */}
                                <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                                    {t.label}
                                </div>

                                {theme === t.id && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute -left-1 w-1 h-6 bg-brand rounded-full"
                                        initial={false}
                                        style={{ backgroundColor: t.id === 'minimalism' ? '#000' : 'var(--brand)' }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-500
                    ${isOpen ? 'bg-brand rotate-45' : 'bg-white/10 backdrop-blur-xl border border-white/20'}
                `}
            >
                <div className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5">
                    <motion.span
                        animate={{ width: isOpen ? "24px" : "20px" }}
                        className="h-1 bg-white rounded-full"
                    />
                    <motion.span
                        animate={{ width: isOpen ? "24px" : "28px" }}
                        className="h-1 bg-white rounded-full"
                    />
                    <motion.span
                        animate={{ width: isOpen ? "24px" : "16px" }}
                        className="h-1 bg-white rounded-full"
                    />
                </div>

                {!isOpen && (
                    <div className="absolute -inset-1 rounded-full bg-brand/20 animate-pulse -z-10" />
                )}
            </motion.button>
        </div>
    );
}
