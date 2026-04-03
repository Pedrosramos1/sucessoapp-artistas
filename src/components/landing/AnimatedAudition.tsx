import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Play, Pause } from "lucide-react";

const generateWaveform = (bars: number, seed: number) => {
  const heights: number[] = [];
  for (let i = 0; i < bars; i++) {
    const x = i / bars;
    const base = Math.sin(x * Math.PI) * 0.55 + 0.2;
    const detail = Math.sin(x * 19 + seed) * 0.15 + Math.sin(x * 37 + seed * 2) * 0.1;
    heights.push(Math.max(0.1, Math.min(1, base + detail)));
  }
  return heights;
};

const AnimatedAudition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const duration = 34;
  const totalBars = 60;
  const waveform = useMemo(() => generateWaveform(totalBars, 3), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -30]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.96]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (duration * 20);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentTime = (progress / 100) * duration;
  const playedBars = Math.floor((progress / 100) * totalBars);

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-md w-full mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div style={{ y: cardY, scale: cardScale }} className="relative">
        <div className="rounded-2xl bg-card border border-border shadow-[0_20px_50px_-12px_hsl(0_0%_0%/0.4)] p-6">
          {/* Play + Waveform */}
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
              )}
            </motion.button>

            <div className="flex-1 relative">
              {/* Time badge */}
              <motion.div
                className="absolute -top-7 z-10 pointer-events-none"
                style={{ left: `${Math.min(progress, 98)}%`, transform: "translateX(-50%)" }}
              >
                <div className="bg-foreground text-background text-[9px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap">
                  {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}
                </div>
                <div className="w-px h-2 bg-foreground mx-auto" />
              </motion.div>

              {/* Waveform bars */}
              <div className="flex items-center gap-[2px] h-10">
                {waveform.map((h, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 rounded-full transition-colors duration-100 ${
                      i < playedBars ? "bg-primary" : "bg-muted-foreground/20"
                    }`}
                    style={{ height: `${h * 100}%` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.008, duration: 0.25 }}
                  />
                ))}
              </div>

              {/* Duration */}
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-muted-foreground/40 font-mono">0:00</span>
                <span className="text-[9px] text-muted-foreground/40 font-mono">0:34</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAudition;
