import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ShieldCheck, FileText, Check, Lock, Stamp } from "lucide-react";

const AnimatedContract = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  // Phases: 0=doc appears, 1=clauses fill, 2=signature, 3=stamp/seal, 4=shield verified

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.95]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase(0);
      timeouts.push(setTimeout(() => setPhase(1), 600));
      timeouts.push(setTimeout(() => setPhase(2), 1800));
      timeouts.push(setTimeout(() => setPhase(3), 2800));
      timeouts.push(setTimeout(() => setPhase(4), 3600));
      timeouts.push(setTimeout(() => run(), 6500));
    };
    run();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const clauses = [
    "Licença de uso fonográfico",
    "Cessão de direitos autorais",
    "Prazo de exploração: 5 anos",
    "Distribuição: todas as plataformas",
  ];

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-[280px] md:max-w-sm w-full mx-auto"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div style={{ scale: cardScale }}>
        {/* Document card */}
        <div className="relative rounded-2xl bg-card border border-border shadow-[0_8px_30px_-8px_hsl(0_0%_0%/0.3)] overflow-hidden">
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_hsl(0_0%_0%/0.15)]" />

          {/* Header */}
          <div className="relative z-10 flex items-center gap-3 px-5 pt-5 pb-3 border-b border-border">
            <motion.div
              className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"
              animate={{ scale: phase >= 0 ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FileText className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <p className="text-xs font-bold text-foreground">Contrato de Licenciamento</p>
              <p className="text-[9px] text-muted-foreground">Acordo nº #2024-0847</p>
            </div>
            <motion.div
              className="ml-auto"
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Lock className="w-3.5 h-3.5 text-green-500" />
            </motion.div>
          </div>

          {/* Clauses */}
          <div className="relative z-10 px-5 py-4 space-y-2.5">
            {clauses.map((clause, i) => (
              <motion.div
                key={clause}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -15 }}
                animate={{
                  opacity: phase >= 1 ? 1 : 0,
                  x: phase >= 1 ? 0 : -15,
                }}
                transition={{ duration: 0.35, delay: i * 0.15 }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                  animate={{
                    borderColor: phase >= 2 ? "hsl(142 71% 45%)" : "hsl(var(--border))",
                    backgroundColor: phase >= 2 ? "hsl(142 71% 45%)" : "transparent",
                  }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <motion.div
                    animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0 }}
                    transition={{ duration: 0.2, delay: i * 0.1 }}
                  >
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>
                <span className="text-[10px] text-secondary-foreground">{clause}</span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="relative z-10 mx-5 border-t border-dashed border-border" />

          {/* Signature area */}
          <div className="relative z-10 px-5 py-4">
            <p className="text-[8px] text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Assinatura Digital</p>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <motion.div
                  className="h-8 rounded-lg border border-border bg-secondary relative overflow-hidden"
                  animate={{
                    borderColor: phase >= 3 ? "hsl(var(--primary))" : "hsl(var(--border))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Signature line animation */}
                  <motion.svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 40"
                    fill="none"
                  >
                    <motion.path
                      d="M 15 28 Q 30 8, 45 22 T 75 18 Q 90 12, 105 24 T 135 16 Q 148 10, 160 22 L 175 20"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: phase >= 3 ? 1 : 0,
                        opacity: phase >= 3 ? 1 : 0,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </motion.svg>
                </motion.div>
                <p className="text-[7px] text-muted-foreground mt-1">João Silva — Artista</p>
              </div>

              {/* Stamp / Seal */}
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -30 }}
                animate={{
                  scale: phase >= 3 ? 1 : 0,
                  rotate: phase >= 3 ? 0 : -30,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
              >
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-primary/60 flex items-center justify-center">
                  <Stamp className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Verified banner */}
          <motion.div
            className="relative z-10 mx-5 mb-4 rounded-xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: phase >= 4 ? "auto" : 0,
              opacity: phase >= 4 ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2.5 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
              <motion.div
                className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_hsl(142_71%_45%/0.3)]"
                initial={{ scale: 0 }}
                animate={{ scale: phase >= 4 ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              >
                <ShieldCheck className="w-4 h-4 text-white" />
              </motion.div>
              <div>
                <p className="text-[10px] font-bold text-green-500">Contrato Verificado</p>
                <p className="text-[8px] text-muted-foreground">Assinatura digital válida</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedContract;
