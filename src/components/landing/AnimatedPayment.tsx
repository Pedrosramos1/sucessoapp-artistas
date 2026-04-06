import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CreditCard, Check } from "lucide-react";

const steps = ["Solicitar licença", "Revisão", "Pagamento"];

const AnimatedPayment = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [filledFields, setFilledFields] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.95]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
      setFilledFields(0);
    }, 4000);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (activeStep === 2) {
      const fieldInterval = setInterval(() => {
        setFilledFields((prev) => {
          if (prev >= 4) return prev;
          return prev + 1;
        });
      }, 600);
      return () => clearInterval(fieldInterval);
    }
  }, [activeStep]);

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-[240px] md:max-w-xs w-full mx-auto"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, scale: cardScale, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="rounded-2xl bg-card border border-border shadow-[0_8px_30px_-8px_hsl(0_0%_0%/0.3)] flex flex-col p-5 relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_hsl(0_0%_0%/0.15)]" />

          {/* Steps */}
          <div className="relative z-10 flex items-center justify-between mb-5">
            {steps.map((step, i) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {i > 0 && (
                    <motion.div
                      className="flex-1 h-[2px] rounded-full"
                      animate={{
                        backgroundColor: i <= activeStep
                          ? "hsl(0 72% 51%)"
                          : "hsl(var(--border))",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                  <motion.div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                    animate={{
                      backgroundColor: i <= activeStep
                        ? "hsl(0 72% 51%)"
                        : "hsl(var(--secondary))",
                      color: i <= activeStep
                        ? "hsl(0 0% 100%)"
                        : "hsl(var(--muted-foreground))",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {i < activeStep ? <Check className="w-3 h-3" /> : i + 1}
                  </motion.div>
                  {i < steps.length - 1 && (
                    <motion.div
                      className="flex-1 h-[2px] rounded-full"
                      animate={{
                        backgroundColor: i < activeStep
                          ? "hsl(0 72% 51%)"
                          : "hsl(var(--border))",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>
                <span className="text-[8px] text-muted-foreground mt-1 whitespace-nowrap">
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Credit Card Banner */}
          <motion.div
            className="relative z-10 flex items-center gap-3 rounded-xl bg-secondary border border-border px-3 py-2.5 mb-4"
            animate={{ opacity: activeStep === 2 ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-5 rounded bg-gradient-to-r from-orange-300 to-orange-100 flex items-center justify-center">
              <CreditCard className="w-4 h-3 text-orange-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-foreground leading-tight">Cartão de Crédito</p>
              <p className="text-[8px] text-muted-foreground leading-tight">Pagamento em até 12x</p>
            </div>
          </motion.div>

          {/* Installment */}
          <div className="relative z-10 mb-3">
            <p className="text-[8px] text-muted-foreground mb-1">Parcelamento</p>
            <div className="rounded-lg bg-secondary border border-border px-3 py-2 flex items-center justify-between">
              <motion.span
                className="text-[10px] font-medium text-foreground"
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              >
                12x de R$ 355,17
              </motion.span>
              <span className="text-[8px] text-muted-foreground">▾</span>
            </div>
          </div>

          {/* Form fields */}
          <div className="relative z-10 space-y-2.5">
            {["Número do Cartão", "Nome no Cartão", "CPF"].map((label, i) => (
              <div key={label}>
                <p className="text-[8px] text-muted-foreground mb-1">{label}</p>
                <motion.div
                  className="rounded-lg bg-secondary border border-border h-7 px-3 flex items-center overflow-hidden"
                  animate={{
                    borderColor: activeStep === 2 && filledFields > i
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="h-[1px] bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: activeStep === 2 && filledFields > i ? "60%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </motion.div>
              </div>
            ))}

            {/* Expiry + CVV row */}
            <div className="flex gap-2">
              <div className="flex-1">
                <p className="text-[8px] text-muted-foreground mb-1">Validade</p>
                <motion.div
                  className="rounded-lg bg-secondary border border-border h-7 px-3 flex items-center"
                  animate={{
                    borderColor: activeStep === 2 && filledFields > 3
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-[9px] text-foreground font-mono"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeStep === 2 && filledFields > 3 ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    12/28
                  </motion.span>
                </motion.div>
              </div>
              <div className="flex-1">
                <p className="text-[8px] text-muted-foreground mb-1">CVV</p>
                <motion.div
                  className="rounded-lg bg-secondary border border-border h-7 px-3 flex items-center"
                  animate={{
                    borderColor: activeStep === 2 && filledFields > 3
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-[9px] text-foreground font-mono"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeStep === 2 && filledFields > 3 ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    •••
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPayment;
