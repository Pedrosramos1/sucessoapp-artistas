import { motion } from "framer-motion";

import abramusLogo from "@/assets/partners/abramus.png";
import sbacemLogo from "@/assets/partners/sbacem.png";
import somLivreLogo from "@/assets/partners/som-livre.png";
import abramusDigitalLogo from "@/assets/partners/abramus-digital.png";
import lionHitsLogo from "@/assets/partners/lion-hits.png";
import oiBaldeLogo from "@/assets/partners/oi-balde.png";
import valimLogo from "@/assets/partners/valim.png";
import bridgeLogo from "@/assets/partners/bridge.png";
import brunaCamposLogo from "@/assets/partners/bruna-campos.png";

const logos = [
  { name: "Abramus", src: abramusLogo },
  { name: "Sbacem", src: sbacemLogo },
  { name: "Som Livre", src: somLivreLogo },
  { name: "Abramus Digital", src: abramusDigitalLogo },
  { name: "Lion Hits", src: lionHitsLogo },
  { name: "Oi Balde", src: oiBaldeLogo },
  { name: "Valim Publishing", src: valimLogo },
  { name: "Bridge", src: bridgeLogo },
  { name: "Bruna Campos", src: brunaCamposLogo },
];

const TrustedBy = () => {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-10 md:py-14 border-y border-border/50 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-muted-foreground text-xs uppercase tracking-[0.2em] mb-10 font-medium"
      >
        Parceiros & Editoras
      </motion.p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left w-max gap-16 items-center">
          {doubled.map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              className="h-10 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 select-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
