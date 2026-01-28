import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for parallax
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const moveX = clientX - window.innerWidth / 2;
            const moveY = clientY - window.innerHeight / 2;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        const timer = setTimeout(onComplete, 5000);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden perspective-1000"
        >
            {/* Background Parallax Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-brand/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            x: useTransform(mouseX, [-500, 500], [Math.random() * -50, Math.random() * 50]),
                            y: useTransform(mouseY, [-500, 500], [Math.random() * -50, Math.random() * 50]),
                        }}
                    />
                ))}
            </div>

            <motion.div
                style={{ rotateX, rotateY }}
                className="relative z-10 text-center"
            >
                {/* 3D Flying Logo */}
                <motion.div
                    initial={{ z: -500, opacity: 0, scale: 0.5 }}
                    animate={{ z: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full animate-pulse" />
                        <div className="relative theme-card w-32 h-32 flex items-center justify-center backdrop-blur-3xl border border-white/10">
                            <span className="text-6xl font-black text-brand italic">SIC</span>
                        </div>
                    </div>
                </motion.div>

                {/* Layered Text Reveal */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(var(--brand-rgb),0.3)]"
                    >
                        unknownGmr02
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, z: -100 }}
                    animate={{ opacity: 1, z: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-4 text-xl md:text-2xl text-brand/80 font-light tracking-[0.5em] uppercase"
                >
                    Science & Innovation Club
                </motion.p>

                {/* Progress Ring */}
                <div className="mt-12 flex justify-center">
                    <svg className="w-16 h-16 transform -rotate-90">
                        <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="transparent"
                            className="text-white/10"
                        />
                        <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="transparent"
                            className="text-brand"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.5, duration: 4, ease: "linear" }}
                        />
                    </svg>
                </div>
            </motion.div>
        </motion.div>
    );
}
