import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect } from 'react';

export default function IntroClean({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    const title = "unknownGmr02";

    const containerVariants: Variants = {
        visible: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.5
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.5 }
        }
    };

    // Letters slide up from an invisible mask
    const letterVariants: Variants = {
        hidden: {
            y: 100,
            opacity: 0,
            skewY: 5
        },
        visible: {
            y: 0,
            opacity: 1,
            skewY: 0,
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1] // Apple-style ease
            }
        }
    };

    const lineVariants: Variants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { delay: 1.5, duration: 1.2, ease: "anticipate" }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-[#111]"
        >
            {/* Subtle Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-white to-gray-100 z-0" />

            <motion.div variants={containerVariants} className="relative z-10 flex flex-col items-center">

                {/* Logo or Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "backOut" }}
                    className="w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8 border border-black/10 bg-white/50 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transform rotate-45"
                >
                    <span className="text-lg md:text-xl font-bold font-serif -rotate-45">S</span>
                </motion.div>

                {/* Masked Typography Reveal */}
                <div className="overflow-hidden relative -my-4 px-2 py-4">
                    <motion.div variants={containerVariants} className="flex space-x-[2px] md:space-x-1">
                        {title.split('').map((char, index) => (
                            <motion.span
                                key={`${char}-${index}`}
                                variants={letterVariants}
                                className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tighter text-[#111] inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                {/* Elegant Line Separator */}
                <motion.div
                    variants={lineVariants}
                    className="h-px bg-[#111] w-24 my-8"
                />

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="text-xs font-semibold tracking-[0.4em] uppercase text-gray-400"
                >
                    Experiences Crafted
                </motion.p>
            </motion.div>
        </motion.div>
    );
}
