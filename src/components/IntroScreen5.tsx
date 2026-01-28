import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const particleCount = 100;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = Math.random() > 0.5 ? 'var(--brand)' : '#ffffff';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas!.width) this.x = 0;
                else if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                else if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                ctx!.fillStyle = this.color;
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const timer = setTimeout(onComplete, 5000);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

            <div className="relative z-10 text-center">
                {/* Floating Glass Logo */}
                <motion.div
                    initial={{ y: 50, opacity: 0, rotateY: 90 }}
                    animate={{ y: 0, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="w-28 h-28 mx-auto flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-xl rounded-full shadow-[0_0_40px_rgba(var(--brand-rgb),0.2)]">
                        <span className="text-5xl font-black text-brand italic">SIC</span>
                    </div>
                </motion.div>

                {/* Particle Assemble Effect for Text (Simulated with Motion) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="relative"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-widest uppercase">
                        unknownGmr02
                    </h1>

                    {/* Animated Underline */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1.5, duration: 2 }}
                        className="h-1 bg-gradient-to-r from-transparent via-brand to-transparent mt-4"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="text-brand/60 font-medium tracking-[0.5em] mt-8 uppercase text-sm"
                >
                    The Future of Innovation
                </motion.p>
            </div>
        </motion.div>
    );
}
