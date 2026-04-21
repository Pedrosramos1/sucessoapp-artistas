import { motion } from "framer-motion";
import { useState } from "react";
import logo from "@/assets/logo-horizontal.png";
import bgHero from "@/assets/bg-hero.png";
import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";
import LeadFormModal from "@/components/landing/LeadFormModal";

const APP_STORE_LINK = "https://apps.apple.com/us/app/sucesso-app/id6670179038";
const GOOGLE_PLAY_LINK = "https://play.google.com/store/apps/details?id=com.brunosucesso.sucesso";

const Download = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{ url: string; name: string }>({ url: "", name: "" });

  const handleDownloadClick = (url: string, name: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", "DownloadClick", { plataforma: name, secao: "PaginaDownload" });
    }
    setSelectedPlatform({ url, name });
    setModalOpen(true);
  };

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={bgHero} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-background/[0.85]" />
      </div>

      {/* Logo header */}
      <header className="relative z-20 flex items-center justify-center px-5 md:px-12 py-6 md:py-8">
        <img src={logo} alt="Sucesso.App" className="h-8 md:h-10" />
      </header>

      {/* Hero content */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-4 text-center max-w-5xl mx-auto pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-8xl leading-[1.1] tracking-tight mb-3 md:mb-4 font-bold"
        >
          Baixe agora o
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-[2rem] sm:text-5xl md:text-6xl lg:text-8xl leading-[1.1] tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 md:mb-8 font-sans font-bold"
        >
          Sucesso.App
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2"
        >
          Escolha sua plataforma e comece a explorar a maior vitrine musical do país.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
        >
          <button
            onClick={() => handleDownloadClick(APP_STORE_LINK, "App Store")}
            className="relative group hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute -inset-5 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.8),hsl(var(--accent)/0.35),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img src={badgeAppStore} alt="Baixar na App Store" className="relative h-14 sm:h-16 md:h-20 w-auto object-contain" />
          </button>
          <button
            onClick={() => handleDownloadClick(GOOGLE_PLAY_LINK, "Google Play")}
            className="relative group hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute -inset-5 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.8),hsl(var(--accent)/0.35),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img src={badgeGooglePlay} alt="Disponível no Google Play" className="relative h-14 sm:h-16 md:h-20 w-auto object-contain" />
          </button>
        </motion.div>

      </section>

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        redirectUrl={selectedPlatform.url}
        plataforma={selectedPlatform.name}
      />
    </main>
  );
};

export default Download;