import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function IntroAmoled({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        >
            {/* Central Glowing Orb/Logo */}
            <div className="relative">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-gray-900 bg-black shadow-[0_0_50px_rgba(0,0,0,1)] flex items-center justify-center relative z-10"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t border-r border-[#00ffcc] opacity-50 blur-[2px]"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-b border-l border-[#ff00ff] opacity-50 blur-[2px]"
                    />

                    <span className="text-3xl md:text-5xl font-thin tracking-tighter text-white mix-blend-difference z-20">SIC</span>
                </motion.div>

                {/* Rays */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, times: [0, 0.5, 1], repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 rotate-45"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2.5, times: [0, 0.5, 1], delay: 0.5, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[1px] bg-gradient-to-r from-transparent via-magenta-500 to-transparent opacity-20 -rotate-45"
                />

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2 text-center text-white font-sans tracking-[0.3em] text-xs md:text-sm whitespace-nowrap"
                >
                    <span className="text-[#00ffcc]">UNKNOWN</span>
                    <span className="text-gray-600 mx-2">|</span>
                    <span className="text-[#ff00ff]">GMR02</span>
                </motion.h1>
            </div>
        </motion.div>
    );
}
