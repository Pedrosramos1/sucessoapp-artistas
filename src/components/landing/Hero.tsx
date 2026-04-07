import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/logo-horizontal.png";
import bgHero from "@/assets/bg-hero.png";
import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";

const APP_STORE_LINK = "https://apps.apple.com/us/app/sucesso-app/id6670179038";
const GOOGLE_PLAY_LINK = "https://play.google.com/store/apps/details?id=com.brunosucesso.sucesso";

const trackDownloadClick = (platform: 'App Store' | 'Google Play') => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', 'DownloadClick', { platform, section: 'hero' });
  }
};

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgHero}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/[0.85]" />
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
          Encontre um hit para chamar de seu!
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
          className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
        >
          <a href={APP_STORE_LINK} target="_blank" rel="noopener noreferrer" onClick={() => trackDownloadClick('App Store')} className="relative group hover:scale-105 transition-transform duration-300">
            <div className="absolute -inset-5 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.8),hsl(var(--accent)/0.35),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img src={badgeAppStore} alt="Baixar na App Store" className="relative h-14 sm:h-16 md:h-20 w-auto object-contain" />
          </a>
          <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noopener noreferrer" onClick={() => trackDownloadClick('Google Play')} className="relative group hover:scale-105 transition-transform duration-300">
            <div className="absolute -inset-5 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.8),hsl(var(--accent)/0.35),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img src={badgeGooglePlay} alt="Disponível no Google Play" className="relative h-14 sm:h-16 md:h-20 w-auto object-contain" />
          </a>
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
