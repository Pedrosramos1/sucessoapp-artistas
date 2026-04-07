import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-horizontal.png";

const CTA_LINK = "#";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Aurora Borealis background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-background/40" />

        {/* Aurora band 1 — wide blue sweep */}
        <motion.div
          className="absolute w-[250%] h-[60%] opacity-50"
          style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(216 100% 50% / 0.35) 30%, hsl(200 100% 60% / 0.2) 50%, transparent 80%)",
            top: "5%",
            left: "-75%",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -20, 10, 0],
            scaleX: [1, 1.1, 0.95, 1],
            rotate: [0, 2, -1, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Aurora band 2 — purple/violet ribbon */}
        <motion.div
          className="absolute w-[200%] h-[45%] opacity-40"
          style={{
            background: "linear-gradient(170deg, transparent 0%, hsl(274 79% 66% / 0.4) 25%, hsl(260 80% 55% / 0.25) 50%, transparent 75%)",
            top: "15%",
            left: "-50%",
            filter: "blur(50px)",
          }}
          animate={{
            x: [-30, 60, 0, -30],
            y: [0, 15, -10, 0],
            scaleY: [1, 1.15, 0.9, 1],
            rotate: [0, -3, 1.5, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Aurora band 3 — cyan accent */}
        <motion.div
          className="absolute w-[180%] h-[35%] opacity-30"
          style={{
            background: "linear-gradient(190deg, transparent 0%, hsl(190 100% 50% / 0.3) 30%, hsl(216 100% 60% / 0.2) 60%, transparent 85%)",
            top: "25%",
            left: "-40%",
            filter: "blur(70px)",
          }}
          animate={{
            x: [20, -50, 30, 20],
            y: [-10, 20, -5, -10],
            scaleX: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vertical shimmer streaks */}
        <motion.div
          className="absolute w-full h-full opacity-20"
          style={{
            background: "repeating-linear-gradient(95deg, transparent, transparent 120px, hsl(216 100% 60% / 0.08) 120px, transparent 240px)",
            filter: "blur(20px)",
          }}
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom horizon glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[40%] opacity-40"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, hsl(216 100% 50% / 0.2) 0%, hsl(274 79% 66% / 0.1) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ opacity: [0.4, 0.25, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
        <img src={logo} alt="SucessoApp" className="h-7 md:h-8" />
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">A plataforma</a>
          <a href="#composers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Compositores</a>
        </div>
      </nav>

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-4 text-center max-w-5xl mx-auto"
        style={{ y: yText, opacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-8xl leading-[1.1] tracking-tight mb-3 md:mb-4 font-bold"
        >
          Encontre um hit para chamar de seu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-[1.5rem] sm:text-3xl md:text-4xl lg:text-6xl leading-[1.15] tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 md:mb-8 font-sans font-semibold"
        >
          Na maior vitrine musical do país.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2"
        >
          Acesse músicas dos compositores dos maiores sucessos do Brasil e compre seu repertório em até 12x, com licenças automáticas em poucos cliques.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Button
            asChild
            size="lg"
            className="text-primary-foreground w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-lg"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <a href={CTA_LINK} target="_blank" rel="noopener noreferrer">
              Explorar músicas agora
            </a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 md:mt-4 text-xs md:text-sm font-medium text-primary"
        >
          (Gratuito para artistas)
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-1 md:p-1.5">
          <motion.div
            className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
