import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Using a reliable abstract background video URL suitable for glassmorphism
const VIDEO_URL = "https://static.videezy.com/system/resources/previews/000/042/375/original/50_03_05_19.mp4";

export default function IntroGlassmorphism({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden perspective-1000"
        >
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src={VIDEO_URL} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
            </div>

            {/* Glass Card */}
            <motion.div
                initial={{ rotateX: 20, rotateY: -20, opacity: 0, scale: 0.9 }}
                animate={{ rotateX: 0, rotateY: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-10 p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center gap-6 w-[90%] max-w-lg md:w-auto"
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/20 to-transparent border border-white/30 flex items-center justify-center transform rotate-45"
                >
                    <span className="text-3xl font-black text-white -rotate-45">G</span>
                </motion.div>

                <div className="text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-4xl md:text-6xl font-thin tracking-[0.2em]"
                    >
                        GLASS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 1.2 }}
                        className="text-sm tracking-[0.5em] mt-2 uppercase font-light"
                    >
                        Reality Refracted
                    </motion.p>
                </div>

                {/* Shimmering Loader */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
