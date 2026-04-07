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
        {/* Aurora band 1 — intense blue sweep */}
        <motion.div
          className="absolute w-[300%] h-[70%] opacity-70"
          style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(216 100% 50% / 0.55) 20%, hsl(200 100% 55% / 0.4) 45%, hsl(190 90% 50% / 0.2) 65%, transparent 85%)",
            top: "0%",
            left: "-100%",
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 120, -60, 0],
            y: [0, -30, 15, 0],
            scaleX: [1, 1.15, 0.9, 1],
            rotate: [0, 3, -2, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Aurora band 2 — vivid purple/violet */}
        <motion.div
          className="absolute w-[250%] h-[55%] opacity-65"
          style={{
            background: "linear-gradient(170deg, transparent 0%, hsl(274 79% 66% / 0.6) 20%, hsl(260 85% 55% / 0.45) 40%, hsl(240 70% 60% / 0.2) 60%, transparent 80%)",
            top: "10%",
            left: "-75%",
            filter: "blur(35px)",
          }}
          animate={{
            x: [-50, 100, 0, -50],
            y: [0, 25, -15, 0],
            scaleY: [1, 1.2, 0.85, 1],
            rotate: [0, -4, 2, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Aurora band 3 — bright cyan/teal */}
        <motion.div
          className="absolute w-[220%] h-[45%] opacity-55"
          style={{
            background: "linear-gradient(185deg, transparent 0%, hsl(180 100% 45% / 0.45) 25%, hsl(200 100% 55% / 0.35) 50%, transparent 75%)",
            top: "20%",
            left: "-60%",
            filter: "blur(45px)",
          }}
          animate={{
            x: [30, -80, 50, 30],
            y: [-15, 30, -10, -15],
            scaleX: [1, 0.85, 1.15, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Central bright glow pulse */}
        <motion.div
          className="absolute w-[80%] h-[50%] left-[10%] top-[10%]"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, hsl(216 100% 55% / 0.4) 0%, hsl(274 79% 66% / 0.2) 40%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vertical shimmer streaks */}
        <motion.div
          className="absolute w-full h-full opacity-30"
          style={{
            background: "repeating-linear-gradient(92deg, transparent, transparent 80px, hsl(216 100% 60% / 0.12) 80px, transparent 160px)",
            filter: "blur(12px)",
          }}
          animate={{ x: [-80, 80, -80] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom horizon glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[45%]"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, hsl(216 100% 50% / 0.35) 0%, hsl(274 79% 66% / 0.15) 35%, transparent 65%)",
            filter: "blur(30px)",
          }}
          animate={{ opacity: [0.6, 0.35, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
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
