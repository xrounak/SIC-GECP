import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden"
        >
            {/* Background Soft Pulse */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand rounded-full blur-[150px]"
            />

            <div className="relative z-10 text-center">
                {/* Circular Mask Reveal for Logo */}
                <motion.div
                    initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                    animate={{ clipPath: 'circle(100% at 50% 50%)' }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center">
                        <span className="text-4xl font-serif italic text-black font-bold">SIC</span>
                    </div>
                </motion.div>

                {/* Typography Expansion */}
                <motion.h1
                    initial={{ letterSpacing: '2em', opacity: 0, filter: 'blur(10px)' }}
                    animate={{ letterSpacing: '0.2em', opacity: 1, filter: 'blur(0px)' }}
                    transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-light text-black uppercase tracking-widest"
                >
                    unknownGmr02
                </motion.h1>

                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="h-px bg-black/20 w-32 mx-auto mt-6"
                />

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="mt-4 text-xs md:text-sm text-black/40 font-medium tracking-[1em] uppercase"
                >
                    Science & Innovation
                </motion.p>
            </div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.05)]" />
        </motion.div>
    );
}
