import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Using a reliable tech/abstract background video URL
// Fallback to CSS animation if video fails or for smoother loading
const VIDEO_URL = "https://static.videezy.com/system/resources/previews/000/042/375/original/50_03_05_19.mp4"; // Abstract blue tech particles

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        // Auto-dismiss after animation sequence (approx 4.5s)
        const timer = setTimeout(() => {
            onComplete();
        }, 4500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-main overflow-hidden perspective-1000"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setIsVideoLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-30' : 'opacity-0'}`}
                >
                    <source src={VIDEO_URL} type="video/mp4" />
                </video>
                {/* Theme-aware overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-bg-main opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center">
                {/* Logo Icon Animation */}
                <motion.div
                    initial={{ scale: 0, rotateZ: -180, opacity: 0 }}
                    animate={{ scale: 1, rotateZ: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 inline-block"
                >
                    <div className="theme-card w-20 h-20 md:w-28 md:h-28 flex items-center justify-center backdrop-blur-3xl">
                        <span className="text-4xl md:text-5xl font-black text-brand italic drop-shadow-sm">SIC</span>
                    </div>
                </motion.div>

                {/* Main Title Animation */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        className="liquid-text text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-4 text-center px-4"
                        data-text="Build the Future"
                    >
                        Build the Future
                    </motion.h1>
                </div>

                {/* Subtitle Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="relative"
                >
                    <p className="text-lg md:text-2xl text-brand font-medium tracking-widest uppercase">
                        Science & Innovation Club
                    </p>

                    {/* Scanning Line Effect (Theme aware) */}
                    <motion.div
                        initial={{ left: '-100%' }}
                        animate={{ left: '200%' }}
                        transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-brand/10 to-transparent skew-x-12 pointer-events-none"
                    />
                </motion.div>

                {/* Loading Bar */}
                <div className="w-[240px] h-1 bg-border-main mt-12 mx-auto rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 2.5, ease: "easeInOut" }}
                        className="h-full bg-brand shadow-[0_0_15px_var(--brand)]"
                    />
                </div>
            </div>
        </motion.div>
    );
}
