import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function IntroClaymorphism({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f0f4f8] overflow-hidden"
        >
            {/* Floating Blobs Background */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#FF8F8F] rounded-[2rem] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),_inset_10px_10px_20px_rgba(255,255,255,0.5),_10px_20px_30px_rgba(255,143,143,0.3)] opacity-80"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#8FBCFF] rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),_inset_10px_10px_20px_rgba(255,255,255,0.5),_10px_20px_30px_rgba(143,188,255,0.3)] opacity-80"
            />

            {/* Main Title Card */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                className="relative z-10 px-8 py-6 md:px-12 md:py-8 bg-white rounded-[2rem] md:rounded-[3rem] shadow-[20px_20px_60px_#d1d9e6,_-20px_-20px_60px_#ffffff] flex flex-col items-center gap-4 w-[90%] max-w-md md:w-auto"
            >
                <div className="w-20 h-20 bg-[#98FB98] rounded-[2rem] flex items-center justify-center transform -rotate-12 shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.1),_inset_5px_5px_10px_rgba(255,255,255,0.5),_10px_10px_20px_rgba(152,251,152,0.4)]">
                    <span className="text-3xl font-black text-white">SIC</span>
                </div>

                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl md:text-5xl font-nunito font-extrabold text-[#4a5568]"
                    >
                        Science & Innovation Club
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-lg text-[#a0aec0] font-bold mt-2"
                    >
                        Let's Build Together
                    </motion.p>
                </div>

                {/* Bouncing Loader */}
                <div className="flex gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                            className="w-4 h-4 rounded-full bg-[#FFB6C1] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),_inset_2px_2px_4px_rgba(255,255,255,0.5)]"
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
