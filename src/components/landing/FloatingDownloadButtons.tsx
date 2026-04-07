import { motion, useScroll, useTransform } from "framer-motion";
import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";

const APP_STORE_LINK = "https://apps.apple.com/us/app/sucesso-app/id6670179038";
const GOOGLE_PLAY_LINK = "https://play.google.com/store/apps/details?id=com.brunosucesso.sucesso";

const FloatingDownloadButtons = () => {
  const { scrollYProgress } = useScroll();
  // Show between 20% and 75% of page scroll
  const opacity = useTransform(scrollYProgress, [0.15, 0.22, 0.7, 0.78], [0, 1, 1, 0]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.1 ? "auto" : "none"));

  return (
    <motion.div
      className="fixed right-4 md:right-6 bottom-6 md:bottom-8 z-50 flex flex-col items-center gap-2"
      style={{ opacity, pointerEvents }}
    >
      <a
        href={APP_STORE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group hover:scale-105 transition-transform duration-300"
      >
        <div className="absolute -inset-3 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.8),hsl(var(--accent)/0.35),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <img
          src={badgeAppStore}
          alt="Baixar na App Store"
          className="relative h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-lg"
        />
      </a>
      <a
        href={GOOGLE_PLAY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group hover:scale-105 transition-transform duration-300"
      >
        <div className="absolute -inset-3 rounded-2xl bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.8),hsl(var(--accent)/0.35),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <img
          src={badgeGooglePlay}
          alt="Disponível no Google Play"
          className="relative h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-lg"
        />
      </a>
    </motion.div>
  );
};

export default FloatingDownloadButtons;
