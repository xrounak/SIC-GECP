import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

const ScrambleText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    // Generate initial random string of same length
    const [displayText, setDisplayText] = useState(() =>
        text.split('').map(() => characters[Math.floor(Math.random() * characters.length)]).join('')
    );
    const [isScrambling, setIsScrambling] = useState(true);

    const scramble = useCallback(async () => {
        setIsScrambling(true);
        const original = text.split('');
        const duration = 12; // number of iterations

        for (let i = 0; i < duration; i++) {
            const scrambled = original.map((char) => {
                // Reveal correct characters only at the very end
                if (i > duration * 0.8 && Math.random() > 0.5) return char;
                return characters[Math.floor(Math.random() * characters.length)];
            }).join('');

            setDisplayText(scrambled);
            await new Promise(r => setTimeout(r, 60 + (i * 5))); // Slightly slowing down
        }

        setDisplayText(text);
        setIsScrambling(false);
    }, [text]);

    useEffect(() => {
        const timer = setTimeout(scramble, delay * 1000);
        return () => clearTimeout(timer);
    }, [scramble, delay]);

    return (
        <span className={`${isScrambling ? 'text-brand/80' : 'text-white'} transition-colors duration-500`}>
            {displayText}
        </span>
    );
};

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 5500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
            {/* Dynamic Grid Background with Pulsing Scanline */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.2) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-brand/30 blur-[1px] z-10 pointer-events-none"
            />

            <div className="relative z-20">
                {/* Advanced SVG Logo Animation */}
                <motion.div className="flex justify-center mb-12 relative group">
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-brand/20 blur-2xl rounded-lg"
                    />
                    <svg width="140" height="140" viewBox="0 0 100 100">
                        <motion.path
                            d="M 10,10 L 90,10 L 90,90 L 10,90 Z"
                            fill="transparent"
                            stroke="var(--brand)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M 15,15 L 85,15 L 85,85 L 15,85 Z"
                            fill="transparent"
                            stroke="var(--brand)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                        />
                        <motion.text
                            x="50"
                            y="62"
                            textAnchor="middle"
                            fill="var(--brand)"
                            className="text-4xl font-black italic tracking-tighter"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            style={{ filter: 'drop-shadow(0 0 8px var(--brand))' }}
                        >
                            SIC
                        </motion.text>
                    </svg>
                </motion.div>

                {/* Scramble Name with Enhanced Styling */}
                <h1 className="text-6xl md:text-9xl font-mono font-bold tracking-tighter mb-4 text-center">
                    <ScrambleText text="unknownGmr02" delay={0.8} />
                </h1>

                {/* Cyberpunk Decorative Line */}
                <div className="relative h-[2px] w-full mb-6 overflow-hidden bg-white/5">
                    <motion.div
                        initial={{ left: '-100%' }}
                        animate={{ left: '100%' }}
                        transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 bottom-0 w-1/3 bg-brand shadow-[0_0_15px_var(--brand)]"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                    className="text-brand font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-center brightness-125"
                >
                    [ SYSTEM_CORES_STABILIZED ]
                </motion.p>
            </div>

            {/* Terminal Style Side Logs */}
            <div className="absolute bottom-10 left-10 font-mono text-[10px] text-brand/40 space-y-1 hidden md:block select-none">
                <p>{'>'} STATUS: OPTIMIZING_NEURAL_LINKS...</p>
                <p>{'>'} THEME: {document.documentElement.getAttribute('data-theme')?.toUpperCase() || 'AMOLED'}</p>
                <p>{'>'} BYTES: {Math.floor(Math.random() * 99999)} KB</p>
                <p>{'>'} COMPILING: SUCCESS</p>
            </div>

            {/* Vignette & Glitch Overlay */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
            <motion.div
                animate={{
                    opacity: [0, 0.05, 0, 0.1, 0, 0.02, 0],
                }}
                transition={{ repeat: Infinity, duration: 5, times: [0, 0.1, 0.2, 0.25, 0.3, 0.4, 1] }}
                className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
            />
        </motion.div>
    );
}
