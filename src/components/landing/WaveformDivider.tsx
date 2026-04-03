import { motion } from "framer-motion";
import { useMemo } from "react";

const WaveformDivider = () => {
  const createBars = (count: number, seed: number) =>
    Array.from({ length: count }, (_, i) => ({
      height: 30 + Math.sin(i * seed + 1.2) * 25 + Math.sin(i * seed * 2.3) * 15,
      duration: 4.5 + Math.sin(i * 1.3) * 1.5,
      delay: i * 0.22,
    }));

  const leftBars = useMemo(() => createBars(10, 0.9), []);
  const rightBars = useMemo(() => createBars(10, 1.4), []);

  const barWidth = 12;
  const gap = 5;

  const renderBars = (bars: ReturnType<typeof createBars>, side: "left" | "right") =>
    bars.map((bar, i) => {
      // Left: blue tones → Right: warm purple/orange tones
      const hue = side === "left" ? 216 + i * 4 : 280 - i * 14;
      const sat = side === "left" ? 80 : 60 + i * 3;
      const light = 55 + i * 2;

      return (
        <motion.div
          key={i}
          className="rounded"
          style={{
            width: barWidth,
            height: bar.height,
            background: `hsl(${hue}, ${sat}%, ${light}%)`,
            opacity: 0.45,
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
    <div className="relative z-10">
      {/* Curved light section that overlaps the dark hero */}
      <div
        className="relative w-full bg-background"
        style={{
          borderRadius: "60% 60% 0 0 / 50px 50px 0 0",
          marginTop: "-50px",
          paddingTop: "40px",
          paddingBottom: "0",
        }}
      >
        {/* Left bars decoration */}
        <div
          className="absolute left-4 md:left-8 lg:left-12 flex items-end"
          style={{ bottom: "50%", gap, transform: "translateY(50%)" }}
        >
          {renderBars(leftBars, "left")}
        </div>

        {/* Right bars decoration */}
        <div
          className="absolute right-4 md:right-8 lg:right-12 flex items-end"
          style={{ bottom: "50%", gap, transform: "translateY(50%)" }}
        >
          {renderBars(rightBars, "right")}
        </div>
      </div>
    </div>
  );
};

export default WaveformDivider;
