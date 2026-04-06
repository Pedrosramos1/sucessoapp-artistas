import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CreditCard, Check, ShieldCheck } from "lucide-react";

const steps = ["Solicitar licença", "Revisão", "Pagamento"];

const AnimatedPayment = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [filledFields, setFilledFields] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.95]);

  // Auto-play animation loop
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const run = () => {
      // Step 0
      setActiveStep(0); setFilledFields(0); setShowCompletion(false);
      timeout = setTimeout(() => {
        // Step 1
        setActiveStep(1);
        timeout = setTimeout(() => {
          // Step 2 - start filling fields
          setActiveStep(2);
          let field = 0;
          const fillNext = () => {
            field++;
            setFilledFields(field);
            if (field < 5) timeout = setTimeout(fillNext, 500);
            else timeout = setTimeout(() => {
              // Show completion
              setShowCompletion(true);
              timeout = setTimeout(() => {
                // Reset and loop
                run();
              }, 3000);
            }, 800);
          };
          timeout = setTimeout(fillNext, 400);
        }, 1200);
      }, 1200);
    };
    run();
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

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
        style={{ rotateX, rotateY, scale: cardScale, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative mx-auto" style={{ maxWidth: 280 }}>
          <div className="relative w-full" style={{ paddingBottom: "207%" }}>
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-b from-[hsl(0_0%_25%)] to-[hsl(0_0%_12%)] shadow-[0_25px_60px_-12px_hsl(0_0%_0%/0.6)]" />
            <div className="absolute inset-[3px] md:inset-[4px] rounded-[2.25rem] md:rounded-[2.75rem] overflow-hidden bg-background">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] md:w-[120px] h-[24px] md:h-[30px] bg-black rounded-b-2xl z-20" />

              <div className="absolute inset-0 pt-10 px-4 pb-6 flex flex-col">
                {/* Steps */}
                <div className="flex items-center justify-between mb-5">
                  {steps.map((step, i) => (
                    <div key={step} className="flex flex-col items-center flex-1">
                      <div className="flex items-center w-full">
                        {i > 0 && (
                          <motion.div className="flex-1 h-[2px] rounded-full" animate={{ backgroundColor: i <= activeStep ? "hsl(0 72% 51%)" : "hsl(var(--border))" }} transition={{ duration: 0.4 }} />
                        )}
                        <motion.div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                          animate={{ backgroundColor: i <= activeStep ? "hsl(0 72% 51%)" : "hsl(var(--secondary))", color: i <= activeStep ? "hsl(0 0% 100%)" : "hsl(var(--muted-foreground))" }}
                          transition={{ duration: 0.4 }}
                        >
                          {i < activeStep ? <Check className="w-3 h-3" /> : i + 1}
                        </motion.div>
                        {i < steps.length - 1 && (
                          <motion.div className="flex-1 h-[2px] rounded-full" animate={{ backgroundColor: i < activeStep ? "hsl(0 72% 51%)" : "hsl(var(--border))" }} transition={{ duration: 0.4 }} />
                        )}
                      </div>
                      <span className="text-[7px] text-muted-foreground mt-1 whitespace-nowrap">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Credit Card Banner */}
                <motion.div className="flex items-center gap-3 rounded-xl bg-secondary border border-border px-3 py-2.5 mb-4" animate={{ opacity: activeStep === 2 ? 1 : 0.5 }} transition={{ duration: 0.3 }}>
                  <div className="w-8 h-5 rounded bg-gradient-to-r from-orange-300 to-orange-100 flex items-center justify-center">
                    <CreditCard className="w-4 h-3 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold text-foreground leading-tight">Cartão de Crédito</p>
                    <p className="text-[7px] text-muted-foreground leading-tight">Pagamento em até 12x</p>
                  </div>
                </motion.div>

                {/* Installment */}
                <div className="mb-3">
                  <p className="text-[7px] text-muted-foreground mb-1">Parcelamento</p>
                  <div className="rounded-lg bg-secondary border border-border px-3 py-2 flex items-center justify-between">
                    <span className="text-[9px] font-medium text-foreground">12x de R$ 355,17</span>
                    <span className="text-[7px] text-muted-foreground">▾</span>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-2.5">
                  {["Número do Cartão", "Nome no Cartão", "CPF"].map((label, i) => (
                    <div key={label}>
                      <p className="text-[7px] text-muted-foreground mb-1">{label}</p>
                      <motion.div className="rounded-lg bg-secondary border border-border h-6 px-3 flex items-center overflow-hidden" animate={{ borderColor: activeStep === 2 && filledFields > i ? "hsl(var(--primary))" : "hsl(var(--border))" }} transition={{ duration: 0.3 }}>
                        <motion.div className="h-[1px] bg-primary rounded-full" animate={{ width: activeStep === 2 && filledFields > i ? "60%" : "0%" }} transition={{ duration: 0.5, ease: "easeOut" }} />
                      </motion.div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-[7px] text-muted-foreground mb-1">Validade</p>
                      <motion.div className="rounded-lg bg-secondary border border-border h-6 px-3 flex items-center" animate={{ borderColor: activeStep === 2 && filledFields > 3 ? "hsl(var(--primary))" : "hsl(var(--border))" }} transition={{ duration: 0.3 }}>
                        <motion.span className="text-[8px] text-foreground font-mono" animate={{ opacity: activeStep === 2 && filledFields > 3 ? 1 : 0 }} transition={{ duration: 0.3 }}>12/28</motion.span>
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[7px] text-muted-foreground mb-1">CVV</p>
                      <motion.div className="rounded-lg bg-secondary border border-border h-6 px-3 flex items-center" animate={{ borderColor: activeStep === 2 && filledFields > 3 ? "hsl(var(--primary))" : "hsl(var(--border))" }} transition={{ duration: 0.3 }}>
                        <motion.span className="text-[8px] text-foreground font-mono" animate={{ opacity: activeStep === 2 && filledFields > 3 ? 1 : 0 }} transition={{ duration: 0.3 }}>•••</motion.span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Confirm button */}
                <motion.div
                  className="mt-4 rounded-xl py-2.5 text-center text-[10px] font-bold"
                  animate={{ backgroundColor: filledFields >= 4 ? "hsl(0 72% 51%)" : "hsl(var(--secondary))", color: filledFields >= 4 ? "hsl(0 0% 100%)" : "hsl(var(--muted-foreground))" }}
                  transition={{ duration: 0.3 }}
                >
                  Confirmar Pagamento
                </motion.div>

                {/* Completion overlay */}
                <motion.div
                  className="absolute inset-0 rounded-[2.25rem] md:rounded-[2.75rem] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm z-30"
                  animate={{ opacity: showCompletion ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ pointerEvents: showCompletion ? "auto" : "none" }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4 shadow-[0_0_40px_hsl(142_71%_45%/0.4)]"
                    animate={{ scale: showCompletion ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  >
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </motion.div>
                  <motion.p
                    className="text-foreground font-bold text-sm mb-1"
                    animate={{ opacity: showCompletion ? 1 : 0, y: showCompletion ? 0 : 10 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    Compra Realizada!
                  </motion.p>
                  <motion.p
                    className="text-muted-foreground text-[10px] flex items-center gap-1"
                    animate={{ opacity: showCompletion ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    Licença enviada para seu e-mail
                  </motion.p>
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80px] md:w-[100px] h-[4px] rounded-full bg-white/30 z-20" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPayment;
