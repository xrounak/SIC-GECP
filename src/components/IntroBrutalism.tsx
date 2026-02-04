import { motion } from 'framer-motion';
import { useEffect } from 'react';

const steps = (count: number) => (v: number) => Math.round(v * count) / count;

export default function IntroBrutalism({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 3500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFDD00] text-black font-mono overflow-hidden"
        >
            {/* Massive Background Text Loop */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 select-none overflow-hidden">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="whitespace-nowrap text-9xl font-black uppercase tracking-tighter">
                        WARNING SYSTEM INIT WARNING SYSTEM INIT
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative z-10 border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full mx-4"
            >
                <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-4">
                    <span className="font-bold text-xl">SYSTEM_BOOT.EXE</span>
                    <div className="flex gap-2">
                        <div className="w-6 h-6 bg-black rounded-full" />
                        <div className="w-6 h-6 bg-transparent border-2 border-black rounded-full" />
                    </div>
                </div>

                <div className="space-y-4">
                    <motion.h1
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                        className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none px-4"
                    >
                        UNKNOWN
                        <br />
                        <span className="text-transparent stroke-black stroke-2" style={{ WebkitTextStroke: '2px black' }}>GMR02</span>
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 2, ease: steps(10) }}
                        className="h-8 bg-black mt-8"
                    />

                    <div className="flex justify-between font-bold text-sm tracking-widest mt-2">
                        <span>LOADING ASSETS...</span>
                        <span>100%</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
