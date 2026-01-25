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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden perspective-1000"
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setIsVideoLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-60' : 'opacity-0'}`}
                >
                    <source src={VIDEO_URL} type="video/mp4" />
                </video>
                {/* CSS Fallback / Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-[#0B0F1A] opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#0B0F1A]/50 to-[#0B0F1A]" />
            </div>

            {/* Content Container with 3D Depth */}
            <div className="relative z-10 text-center transform-style-3d">
                {/* Logo Icon Animation */}
                <motion.div
                    initial={{ scale: 0, rotateZ: -180, opacity: 0 }}
                    animate={{ scale: 1, rotateZ: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 inline-block"
                >
                    <div className="w-24 h-24 bg-gradient-to-tr from-brand to-accent rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.6)] backdrop-blur-xl border border-white/20">
                        <span className="text-5xl">⚛️</span>
                    </div>
                </motion.div>

                {/* Main Title Animation */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                    >
                        SIC
                    </motion.h1>
                </div>

                {/* Subtitle Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="relative"
                >
                    <p className="text-xl md:text-2xl text-accent font-light tracking-widest uppercase">
                        Science & Innovation Club
                    </p>

                    {/* Scanning Line Effect */}
                    <motion.div
                        initial={{ left: '-100%' }}
                        animate={{ left: '200%' }}
                        transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                </motion.div>

                {/* Loading Bar */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    transition={{ delay: 0.8, duration: 2.5, ease: "circOut" }}
                    className="h-1 bg-gradient-to-r from-brand to-accent mt-12 mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                />
            </div>
        </motion.div>
    );
}
