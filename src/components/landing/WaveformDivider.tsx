import { motion } from "framer-motion";
import { useMemo } from "react";

const WaveformDivider = () => {
  const bars = useMemo(() => {
    const count = 32;
    return Array.from({ length: count }, (_, i) => {
      const x = i / count;
      const h = Math.sin(x * Math.PI) * 0.5 + 0.2 + Math.sin(x * 7.3) * 0.15 + Math.sin(x * 13.1) * 0.1;
      return {
        height: Math.max(0.15, Math.min(1, h)),
        delay: i * 0.06,
        duration: 1.8 + Math.sin(i * 1.7) * 0.6,
      };
    });
  }, []);

  return (
    <div className="w-full flex items-center justify-center py-6 overflow-hidden">
      <div className="flex items-center gap-[6px] h-20 w-full max-w-4xl px-4">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              background: `linear-gradient(180deg, hsl(270 80% 65%), hsl(216 100% 55%))`,
              height: `${bar.height * 100}%`,
              borderRadius: "3px 3px 0 0",
              clipPath: "polygon(0 0, 40% 0, 50% 12%, 60% 0, 100% 0, 100% 100%, 60% 100%, 50% 88%, 40% 100%, 0 100%)",
            }}
            animate={{
              scaleY: [1, 0.4 + Math.random() * 0.3, 1, 0.5 + Math.random() * 0.3, 1],
            }}
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaveformDivider;
