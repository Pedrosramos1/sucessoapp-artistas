import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Play, Pause, Mic, Send, CheckCircle2 } from "lucide-react";

// Generate a realistic-looking waveform
const generateWaveform = (bars: number, seed: number) => {
  const heights: number[] = [];
  for (let i = 0; i < bars; i++) {
    const x = i / bars;
    // Create an organic waveform shape
    const base = Math.sin(x * Math.PI) * 0.6 + 0.2;
    const detail = Math.sin(x * 17 + seed) * 0.15 + Math.sin(x * 31 + seed * 2) * 0.1;
    const noise = Math.sin(i * 7.3 + seed * 3) * 0.08;
    heights.push(Math.max(0.08, Math.min(1, base + detail + noise)));
  }
  return heights;
};

const demos = [
  { title: "Demo — Sertanejo Romântico", composer: "João Machado", duration: 32, seed: 1 },
  { title: "Demo — Pop Dançante", composer: "Bruno Sucesso", duration: 28, seed: 5 },
  { title: "Demo — Forró Moderno", composer: "Rebeka Lins", duration: 35, seed: 9 },
];

const WaveformPlayer = ({
  demo,
  isActive,
  onSelect,
}: {
  demo: (typeof demos)[0];
  isActive: boolean;
  onSelect: () => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalBars = 50;
  const waveform = useMemo(() => generateWaveform(totalBars, demo.seed), [demo.seed]);

  useEffect(() => {
    if (!isPlaying || !isActive) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return prev + 100 / (demo.duration * 20);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, isActive, demo.duration]);

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
      setProgress(0);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isActive]);

  const currentTime = (progress / 100) * demo.duration;
  const playedBars = Math.floor((progress / 100) * totalBars);

  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`rounded-xl border p-4 cursor-pointer transition-colors ${
        isActive
          ? "bg-primary/5 border-primary/30"
          : "bg-card border-border/50 hover:border-border"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
            setIsPlaying(!isPlaying);
          }}
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isActive && isPlaying
              ? "bg-primary shadow-lg shadow-primary/25"
              : "bg-secondary"
          }`}
        >
          {isActive && isPlaying ? (
            <Pause className="w-4 h-4 text-primary-foreground" />
          ) : (
            <Play className="w-4 h-4 text-foreground ml-0.5" />
          )}
        </motion.button>
        <div className="min-w-0 flex-1">
          <p className={`text-xs font-semibold truncate ${isActive ? "text-primary" : "text-foreground"}`}>
            {demo.title}
          </p>
          <p className="text-[10px] text-muted-foreground truncate">{demo.composer}</p>
        </div>
      </div>

      {/* Waveform */}
      <div className="relative">
        {/* Time badge */}
        {isActive && (
          <motion.div
            className="absolute -top-6 z-10"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-foreground text-background text-[9px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap">
              {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}.
              {String(Math.floor((currentTime % 1) * 100)).padStart(2, "0")}
            </div>
            <div className="w-px h-2 bg-foreground mx-auto" />
          </motion.div>
        )}

        <div className="flex items-center gap-[2px] h-10 pt-2">
          {waveform.map((h, i) => {
            const isPlayed = i < playedBars;
            return (
              <motion.div
                key={i}
                className={`flex-1 rounded-full transition-colors duration-150 ${
                  isPlayed && isActive ? "bg-primary" : "bg-muted-foreground/20"
                }`}
                style={{ height: `${h * 100}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.008, duration: 0.3 }}
              />
            );
          })}
        </div>

        {/* Duration */}
        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] text-muted-foreground/50 font-mono">0:00</span>
          <span className="text-[9px] text-muted-foreground/50 font-mono">
            0:{String(demo.duration).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedAudition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDemo, setActiveDemo] = useState(0);
  const [step, setStep] = useState<"listening" | "approved">("listening");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -40]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, -4]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.9, 1, 1, 0.95]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  // Auto-cycle demos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => {
        const next = (prev + 1) % demos.length;
        if (next === 0) {
          setStep((s) => (s === "listening" ? "approved" : "listening"));
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-md w-full mx-auto"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          y: cardY,
          rotateX: cardRotateX,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/15 blur-2xl -z-10"
          style={{ opacity: glowOpacity }}
        />

        <div className="rounded-2xl bg-card border border-border shadow-[0_20px_50px_-12px_hsl(0_0%_0%/0.4)] overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-border/50">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Mic className="w-4 h-4 text-primary" />
              </motion.div>
              <div>
                <p className="text-foreground text-sm font-bold">Audição Personalizada</p>
                <p className="text-muted-foreground text-[10px]">3 demos recebidas · Sertanejo Romântico</p>
              </div>
            </div>

            {/* Status badge */}
            <motion.div
              className="mt-3 flex items-center gap-2"
              key={step}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {step === "listening" ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Ouvindo demos
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Demo aprovada
                </span>
              )}
            </motion.div>
          </div>

          {/* Demos list */}
          <div className="p-3 space-y-2.5">
            {demos.map((demo, i) => (
              <WaveformPlayer
                key={demo.title}
                demo={demo}
                isActive={activeDemo === i}
                onSelect={() => setActiveDemo(i)}
              />
            ))}
          </div>

          {/* Footer action */}
          <div className="px-5 py-3 border-t border-border/30">
            <motion.button
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold py-2.5 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-3.5 h-3.5" />
              Solicitar nova audição
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAudition;
