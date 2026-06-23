import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'logo' | 'welcome' | 'done'>('logo');
  const [wordIndex, setWordIndex] = useState(0);

  const quote = "Your body can stand almost anything. It's your mind that you have to convince.".split(' ');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; color: string;
    }> = [];

    const colors = ['#00D4FF', '#0099CC', '#0066FF', '#00FFCC', '#ffffff'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animFrame: number;
    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      // Draw light streaks
      for (let i = 0; i < 4; i++) {
        const x = ((t * 0.3 + i * 0.25) % 1.5 - 0.25) * canvas.width;
        const grad = ctx.createLinearGradient(x - 100, 0, x + 100, canvas.height);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, `rgba(0,212,255,${0.04 + i * 0.01})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(x - 100, 0, 200, canvas.height);
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Energy pulse
      const pulseRadius = 60 + Math.sin(t * 3) * 20;
      const pulse = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, pulseRadius
      );
      pulse.addColorStop(0, 'rgba(0,212,255,0.08)');
      pulse.addColorStop(1, 'transparent');
      ctx.fillStyle = pulse;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    const logoTimer = setTimeout(() => setPhase('welcome'), 2600);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(logoTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === 'welcome') {
      const interval = setInterval(() => {
        setWordIndex(prev => {
          if (prev >= quote.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9998] loader-bg flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Logo Phase */}
          <AnimatePresence mode="wait">
            {phase === 'logo' && (
              <motion.div
                key="logo"
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Outer ring */}
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-400/20"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center backdrop-blur-sm">
                    <motion.span
                      className="text-5xl font-black text-transparent bg-clip-text"
                      style={{ backgroundImage: 'linear-gradient(135deg, #00D4FF, #0066FF)' }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      FP
                    </motion.span>
                  </div>
                </div>

                <motion.h1
                  className="mt-6 text-4xl md:text-6xl font-black tracking-widest uppercase"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.2em' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="text-white">Fitness</span>
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00D4FF, #0066FF)' }}> Pro</span>
                </motion.h1>

                <motion.div
                  className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />

                <motion.p
                  className="mt-3 text-cyan-400/70 text-sm tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  Elevate Your Potential
                </motion.p>

                {/* Loading bar */}
                <motion.div className="mt-8 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                  />
                </motion.div>
              </motion.div>
            )}

            {phase === 'welcome' && (
              <motion.div
                key="welcome"
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  className="text-2xl md:text-3xl text-cyan-400 font-light tracking-widest uppercase mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Welcome to
                </motion.h2>
                <motion.h1
                  className="text-5xl md:text-8xl font-black uppercase mb-8"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <span className="text-white">Fitness </span>
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00D4FF, #0066FF)' }}>Pro</span>
                </motion.h1>

                <div className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10 min-h-[80px]">
                  {quote.map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: i <= wordIndex ? 1 : 0, y: i <= wordIndex ? 0 : 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-4 flex-wrap justify-center">
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold tracking-wide hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setPhase('done'); setTimeout(onComplete, 800); }}
                  >
                    Start Your Transformation
                  </motion.button>
                  <motion.button
                    className="px-8 py-3 border border-cyan-500/50 rounded-full text-cyan-400 font-semibold tracking-wide hover:bg-cyan-500/10 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setPhase('done'); setTimeout(onComplete, 800); }}
                  >
                    Join Fitness Pro
                  </motion.button>
                </div>

                <motion.button
                  className="mt-6 text-white/40 text-sm hover:text-white/60 transition-colors underline underline-offset-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  onClick={() => { setPhase('done'); setTimeout(onComplete, 800); }}
                >
                  Skip Intro
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
