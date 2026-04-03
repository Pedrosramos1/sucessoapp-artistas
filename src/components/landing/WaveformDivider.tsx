import { motion } from "framer-motion";
import { useMemo } from "react";

const WaveformDivider = () => {
  const createBars = (count: number, seed: number) =>
    Array.from({ length: count }, (_, i) => ({
      height: 35 + Math.sin(i * seed + 1.2) * 28 + Math.sin(i * seed * 2.3) * 15,
      duration: 4.5 + Math.sin(i * 1.3) * 1.5,
      delay: i * 0.22,
    }));

  const leftBars = useMemo(() => createBars(10, 0.9), []);
  const rightBars = useMemo(() => createBars(10, 1.4), []);

  const barWidth = 12;
  const gap = 5;

  const renderBars = (bars: ReturnType<typeof createBars>, side: "left" | "right") =>
    bars.map((bar, i) => {
      const hue = side === "left" ? 216 + i * 5 : 280 - i * 14;
      const sat = side === "left" ? 80 : 60 + i * 3;
      const light = 55 + i * 2;

      return (
        <motion.div
          key={i}
          className="rounded-sm"
          style={{
            width: barWidth,
            height: bar.height,
            background: `hsl(${hue}, ${sat}%, ${light}%)`,
            opacity: 0.4,
            transformOrigin: "bottom",
          }}
          animate={{
            scaleY: [1, 0.6 + Math.random() * 0.2, 1, 0.7 + Math.random() * 0.15, 1],
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bar.delay,
          }}
        />
      );
    });

  return (
    <div className="relative">
      {/* Curved white section rising over dark hero */}
      <div
        className="relative z-10 w-full"
        style={{
          background: "hsl(0, 0%, 97%)",
          borderRadius: "50% 50% 0 0 / 60px 60px 0 0",
          marginTop: "-60px",
          height: "120px",
        }}
      >
        {/* Left bars */}
        <div
          className="absolute left-6 md:left-12 lg:left-20 bottom-4 flex items-end"
          style={{ gap }}
        >
          {renderBars(leftBars, "left")}
        </div>

        {/* Right bars */}
        <div
          className="absolute right-6 md:right-12 lg:right-20 bottom-4 flex items-end"
          style={{ gap }}
        >
          {renderBars(rightBars, "right")}
        </div>
      </div>
    </div>
  );
};

export default WaveformDivider;
