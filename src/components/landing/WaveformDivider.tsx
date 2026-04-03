import { motion } from "framer-motion";
import { useMemo } from "react";

const WaveformDivider = () => {
  const leftBars = useMemo(() => {
    const heights = [0.4, 0.7, 0.3, 0.85, 0.5, 0.65, 0.35, 0.8, 0.45, 0.6];
    return heights.map((h, i) => ({
      height: h,
      duration: 4.5 + Math.sin(i * 1.3) * 1.5,
      delay: i * 0.2,
      color: `hsl(${220 + i * 8}, ${70 + i * 3}%, ${55 + i * 2}%)`,
    }));
  }, []);

  const rightBars = useMemo(() => {
    const heights = [0.5, 0.75, 0.4, 0.9, 0.55, 0.7, 0.45, 0.65, 0.8, 0.5];
    return heights.map((h, i) => ({
      height: h,
      duration: 4.2 + Math.sin(i * 1.7) * 1.3,
      delay: i * 0.18,
      // Right side: warm gradient (purple → orange/coral)
      color: `hsl(${280 - i * 12}, ${65 + i * 2}%, ${55 + i * 3}%)`,
    }));
  }, []);

  const barWidth = 14;

  const renderBars = (bars: typeof leftBars) =>
    bars.map((bar, i) => {
      const h = bar.height * 80;
      return (
        <motion.div
          key={i}
          className="flex-shrink-0"
          style={{ width: barWidth, originY: "bottom" } as React.CSSProperties}
          animate={{
            scaleY: [1, 0.65 + Math.random() * 0.15, 1, 0.7 + Math.random() * 0.15, 1],
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bar.delay,
          }}
        >
          <div
            style={{
              width: barWidth,
              height: h,
              background: bar.color,
              borderRadius: 4,
              opacity: 0.5,
            }}
          />
        </motion.div>
      );
    });

  return (
    <div className="relative w-full">
      {/* Curved white section overlay */}
      <div
        className="relative z-10 w-full"
        style={{
          background: "hsl(var(--background))",
          borderRadius: "50% 50% 0 0 / 80px 80px 0 0",
          marginTop: "-40px",
          paddingTop: "20px",
        }}
      />

      {/* Left waveform bars — positioned absolutely */}
      <div className="absolute left-0 bottom-0 z-0 flex items-end gap-[5px] pl-4 pb-4 opacity-60">
        {renderBars(leftBars)}
      </div>

      {/* Right waveform bars — positioned absolutely */}
      <div className="absolute right-0 bottom-0 z-0 flex items-end gap-[5px] pr-4 pb-4 opacity-60">
        {renderBars(rightBars)}
      </div>
    </div>
  );
};

export default WaveformDivider;
