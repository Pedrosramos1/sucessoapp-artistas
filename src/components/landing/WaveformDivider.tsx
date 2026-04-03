import { motion } from "framer-motion";
import { useMemo } from "react";

const WaveformDivider = () => {
  const bars = useMemo(() => {
    // Create ribbon bars with varying heights matching the reference
    const heights = [
      0.55, 0.75, 0.45, 0.85, 0.35, 0.65, 0.90, 0.40, 0.70, 0.50,
      0.80, 0.60, 0.95, 0.45, 0.70, 0.35, 0.55, 0.80, 0.40, 0.65,
      0.50, 0.85, 0.60, 0.75, 0.45, 0.90, 0.55, 0.70, 0.85, 0.95,
    ];
    return heights.map((h, i) => ({
      height: h,
      animDuration: 2.2 + Math.sin(i * 1.3) * 0.8,
      animDelay: i * 0.12,
    }));
  }, []);

  const barWidth = 28;
  const notchDepth = 6;

  return (
    <div className="w-full overflow-hidden py-4">
      <div className="flex items-start justify-center gap-[10px] h-32 mx-auto max-w-6xl px-4">
        {bars.map((bar, i) => {
          const h = bar.height * 120;
          return (
            <motion.div
              key={i}
              className="flex-shrink-0"
              style={{ width: barWidth }}
              animate={{
                scaleY: [1, 0.45 + Math.random() * 0.25, 1, 0.5 + Math.random() * 0.2, 1],
              }}
              transition={{
                duration: bar.animDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar.animDelay,
              }}
            >
              <svg
                width={barWidth}
                height={h}
                viewBox={`0 0 ${barWidth} ${h}`}
                fill="none"
                style={{ display: "block", transformOrigin: "top" }}
              >
                <defs>
                  <linearGradient id={`grad-${i}`} x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="hsl(270, 75%, 65%)" />
                    <stop offset="100%" stopColor="hsl(216, 100%, 55%)" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,0 L${barWidth},0 L${barWidth},${h - notchDepth} L${barWidth / 2},${h} L0,${h - notchDepth} Z`}
                  fill={`url(#grad-${i})`}
                />
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WaveformDivider;
