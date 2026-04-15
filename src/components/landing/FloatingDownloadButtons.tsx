import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";
import LeadFormModal from "./LeadFormModal";

const APP_STORE_LINK = "https://apps.apple.com/us/app/sucesso-app/id6670179038";
const GOOGLE_PLAY_LINK = "https://play.google.com/store/apps/details?id=com.brunosucesso.sucesso";

const floatAnimation = {
  y: [0, -6, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const FloatingDownloadButtons = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.68, 0.76], [0, 1, 1, 0]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.1 ? "auto" : "none"));

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{ url: string; name: string }>({ url: "", name: "" });

  const handleClick = (url: string, name: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", "DownloadClick", { plataforma: name, secao: "Flutuante" });
    }
    setSelectedPlatform({ url, name });
    setModalOpen(true);
  };

  return (
    <>
      <motion.div
        className="fixed right-4 md:right-6 bottom-6 md:bottom-8 z-50 flex flex-col items-center gap-2"
        style={{ opacity, pointerEvents }}
      >
        <motion.button
          onClick={() => handleClick(APP_STORE_LINK, "App Store")}
          className="relative group"
          animate={floatAnimation}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="absolute -inset-4 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.6),hsl(var(--accent)/0.2),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <img src={badgeAppStore} alt="Baixar na App Store" className="relative h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md" />
        </motion.button>
        <motion.button
          onClick={() => handleClick(GOOGLE_PLAY_LINK, "Google Play")}
          className="relative group"
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 0.4 } }}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="absolute -inset-4 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.6),hsl(var(--accent)/0.2),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <img src={badgeGooglePlay} alt="Disponível no Google Play" className="relative h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md" />
        </motion.button>
      </motion.div>

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        redirectUrl={selectedPlatform.url}
        plataforma={selectedPlatform.name}
      />
    </>
  );
};

export default FloatingDownloadButtons;
