import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEF0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function IntroTech({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // --- MATRIX RAIN EFFECT ---
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 14;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops: number[] = new Array(columns).fill(1); // Y-coordinate of drops

        // Pre-calculate colors/chars to save frame time? 
        // Actually, basic fillText is fast enough for this resolution.

        const drawMatrix = () => {
            // Fade out effect (trail)
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = CHARS[Math.floor(Math.random() * CHARS.length)];

                // Randomly brighter characters
                ctx.fillStyle = Math.random() > 0.95 ? '#FFF' : '#00FF41';

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const matrixInterval = setInterval(drawMatrix, 33); // ~30FPS is enough for matrix rain

        // --- TEXT GLITCH EFFECT ---
        let frameId: number;
        let iteration = 0;
        const targetText = 'unknownGmr02';

        const animateText = () => {
            if (!textRef.current) return;

            const currentText = targetText
                .split('')
                .map((_, index) => {
                    if (index < iteration) {
                        return targetText[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('');

            textRef.current.innerText = currentText;

            // Add random RGB Split Glitch via TextShadow
            if (iteration < targetText.length) {
                const rX = (Math.random() - 0.5) * 10;
                const rY = (Math.random() - 0.5) * 5;
                const bX = (Math.random() - 0.5) * 10;
                const bY = (Math.random() - 0.5) * 5;
                textRef.current.style.textShadow = `
                    ${rX}px ${rY}px 0 rgba(255,0,0,0.5),
                    ${bX}px ${bY}px 0 rgba(0,0,255,0.5)
                `;
            } else {
                textRef.current.style.textShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
            }

            if (iteration < targetText.length) {
                iteration += 1 / 3;
                frameId = requestAnimationFrame(animateText);
            } else {
                textRef.current.innerText = targetText;
            }
        };

        const timer = setTimeout(() => {
            animateText();
        }, 800);

        const completeTimer = setTimeout(onComplete, 4500);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(matrixInterval);
            cancelAnimationFrame(frameId);
            clearTimeout(timer);
            clearTimeout(completeTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden font-mono"
        >
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10" />

            <div className="relative z-20 text-center flex flex-col items-center">
                {/* Glitchy SIC Logo */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-brand/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
                    <span className="text-4xl md:text-6xl font-black text-brand italic tracking-tighter mix-blend-screen drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]">
                        SIC
                    </span>
                </div>

                {/* Scramble Text Target */}
                <h1
                    ref={textRef}
                    className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-widest uppercase mb-4 h-20 md:h-24 relative z-20"
                >
                    INIT...
                </h1>

                <p
                    ref={subTextRef}
                    className="text-brand/80 text-sm tracking-[0.5em] uppercase animate-pulse border-t border-b border-brand/20 py-2 px-8"
                >
                    SYSTEM_OVERRIDE
                </p>
            </div>

            {/* CRT TV Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: '100% 2px, 3px 100%' }} />
        </motion.div>
    );
}
