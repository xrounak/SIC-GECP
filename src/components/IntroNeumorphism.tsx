import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function IntroNeumorphism({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    const title = "Think & Build";

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#E0E5EC] text-[#4d5b7c] font-sans overflow-hidden"
        >
            <div className="relative flex flex-col items-center gap-12">
                {/* Floating Soft Element */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, boxShadow: "9px 9px 16px rgb(163,177,198,0), -9px -9px 16px rgba(255,255,255, 0)" }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)"
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center bg-[#E0E5EC]"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                        className="text-4xl font-black text-brand/50"
                    >
                        S
                    </motion.div>
                </motion.div>

                {/* Text Reveal */}
                <div className="flex space-x-1 overflow-visible p-4">
                    {title.split('').map((char, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                delay: 0.8 + (index * 0.1),
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }}
                            className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#4d5b7c] drop-shadow-sm"
                            style={{
                                textShadow: "1px 1px 2px rgba(163,177,198,0.7), -1px -1px 2px rgba(255,255,255,0.7)"
                            }}
                        >
                            {char}
                        </motion.div>
                    ))}
                </div>

                {/* Loading Bar - Pressed In */}
                <div className="w-48 md:w-64 h-4 rounded-full bg-[#E0E5EC] flex items-center px-1 shadow-[inset_6px_6px_10px_0_rgba(163,177,198, 0.7),_inset_-6px_-6px_10px_0_rgba(255,255,255,0.8)]">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "95%" }}
                        transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
                        className="h-2 rounded-full bg-blue-400 shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
                    />
                </div>
            </div>
        </motion.div>
    );
}
