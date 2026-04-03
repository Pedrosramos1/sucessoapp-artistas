import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useMemo, useState } from "react";

const generateWaveform = (bars: number, seed: number) => {
  const heights: number[] = [];
  for (let i = 0; i < bars; i++) {
    const x = i / bars;
    const envelope = Math.sin(x * Math.PI) * 0.55 + 0.15;
    const d1 = Math.sin(x * 19 + seed) * 0.2;
    const d2 = Math.sin(x * 43 + seed * 2.7) * 0.12;
    const d3 = Math.sin(x * 71 + seed * 0.5) * 0.06;
    heights.push(Math.max(0.06, Math.min(1, envelope + d1 + d2 + d3)));
  }
  return heights;
};

const AnimatedAudition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const duration = 30;
  const totalBars = 50;
  const waveform = useMemo(() => generateWaveform(totalBars, 4), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -20]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.94, 1, 1, 0.97]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 100 / (duration * 20)));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const currentTime = (progress / 100) * duration;
  const playedBars = Math.floor((progress / 100) * totalBars);

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-sm w-full mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div style={{ y: cardY, scale: cardScale }}>
        <div className="rounded-2xl bg-card border border-border shadow-[0_8px_30px_-8px_hsl(0_0%_0%/0.3)] aspect-square flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Subtle inner shadow for depth */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_hsl(0_0%_0%/0.15)]" />

          {/* Time badge */}
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${8 + (progress / 100) * 84}%`,
              top: "32%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="bg-secondary text-foreground text-[11px] font-mono font-medium px-3 py-1 rounded-full shadow-[0_2px_10px_-2px_hsl(0_0%_0%/0.3)] border border-border whitespace-nowrap">
              {String(Math.floor(currentTime / 60)).padStart(2, "0")}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}.{String(Math.floor((currentTime % 1) * 100)).padStart(2, "0")}
            </div>
            {/* Stem line */}
            <div className="w-[1px] h-4 bg-muted-foreground/40 mx-auto" />
          </motion.div>

          {/* Playhead line */}
          <motion.div
            className="absolute z-10 top-[48%] bottom-[30%] w-[1px] bg-[hsl(0_0%_70%)]"
            style={{
              left: `${8 + (progress / 100) * 84}%`,
            }}
          />

          {/* Waveform */}
          <div className="flex items-center gap-[2px] h-16 w-full relative z-0 mt-8">
            {waveform.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-full"
                style={{
                  height: `${h * 100}%`,
                  backgroundColor: i <= playedBars
                    ? "hsl(0 75% 58%)"
                    : "hsl(0 60% 75% / 0.4)",
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.008, duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAudition;
