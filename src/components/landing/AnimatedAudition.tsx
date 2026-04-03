import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Play, Pause } from "lucide-react";

const generateWaveform = (bars: number, seed: number) => {
  const heights: number[] = [];
  for (let i = 0; i < bars; i++) {
    const x = i / bars;
    const envelope = Math.sin(x * Math.PI) * 0.5 + 0.15;
    const d1 = Math.sin(x * 23 + seed) * 0.18;
    const d2 = Math.sin(x * 41 + seed * 2.3) * 0.1;
    const d3 = Math.sin(x * 67 + seed * 0.7) * 0.06;
    heights.push(Math.max(0.04, Math.min(1, envelope + d1 + d2 + d3)));
  }
  return heights;
};

const AnimatedAudition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const duration = 34;
  const totalBars = 80;
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
  const remainingTime = duration - currentTime;

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-md w-full mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div style={{ y: cardY, scale: cardScale }}>
        {/* Apple-style voice memo card */}
        <div className="rounded-[20px] bg-[hsl(220_10%_14%)] border border-white/[0.08] shadow-[0_20px_60px_-15px_hsl(0_0%_0%/0.5),inset_0_1px_0_0_hsl(0_0%_100%/0.04)] p-5">
          {/* Title row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/90 text-[13px] font-semibold tracking-tight">Demo — Sertanejo</p>
              <p className="text-white/35 text-[11px] mt-0.5">João Machado · Hoje, 14:32</p>
            </div>
            <div className="text-white/30 text-[11px] font-mono tabular-nums">
              0:{String(Math.floor(duration)).padStart(2, "0")}
            </div>
          </div>

          {/* Waveform area */}
          <div className="relative mb-3">
            {/* Playhead line */}
            <motion.div
              className="absolute top-0 bottom-0 w-[1.5px] bg-white/80 z-10 rounded-full"
              style={{ left: `${progress}%` }}
            />

            {/* Time tooltip on playhead */}
            <motion.div
              className="absolute -top-5 z-20 pointer-events-none"
              style={{ left: `${Math.min(Math.max(progress, 3), 97)}%`, transform: "translateX(-50%)" }}
            >
              <div className="bg-white/90 text-black text-[9px] font-mono font-medium px-1.5 py-[2px] rounded-[4px] whitespace-nowrap shadow-sm backdrop-blur-sm">
                {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}.{String(Math.floor((currentTime % 1) * 100)).padStart(2, "0")}
              </div>
            </motion.div>

            {/* Waveform */}
            <div className="flex items-center gap-[1.5px] h-14 px-px">
              {waveform.map((h, i) => {
                const isPlayed = i <= playedBars;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full"
                    style={{
                      height: `${h * 100}%`,
                      backgroundColor: isPlayed
                        ? "hsl(0 85% 60%)"         /* Apple red for played */
                        : "hsl(0 0% 100% / 0.12)",  /* Subtle white for unplayed */
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.006, duration: 0.2 }}
                  />
                );
              })}
            </div>
          </div>

          {/* Controls row — Apple style */}
          <div className="flex items-center justify-between">
            <span className="text-white/35 text-[11px] font-mono tabular-nums w-10">
              {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-5">
              {/* Rewind 15s */}
              <button className="text-white/40 hover:text-white/60 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10" />
                  <polyline points="12 2 12 6 8 2" />
                  <text x="9" y="16" fontSize="7" fill="currentColor" stroke="none" fontWeight="600">15</text>
                </svg>
              </button>

              {/* Play / Pause */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-sm flex items-center justify-center transition-colors border border-white/[0.06]"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white/90" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-white/90 ml-0.5" fill="currentColor" />
                )}
              </motion.button>

              {/* Forward 15s */}
              <button className="text-white/40 hover:text-white/60 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 1-10 10" />
                  <polyline points="12 2 12 6 16 2" />
                  <text x="9" y="16" fontSize="7" fill="currentColor" stroke="none" fontWeight="600">15</text>
                </svg>
              </button>
            </div>

            <span className="text-white/35 text-[11px] font-mono tabular-nums w-10 text-right">
              -{Math.floor(remainingTime / 60)}:{String(Math.floor(remainingTime % 60)).padStart(2, "0")}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAudition;
