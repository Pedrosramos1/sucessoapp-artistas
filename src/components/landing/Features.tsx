import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Search, Music, Users, CreditCard, ShieldCheck, type LucideIcon } from "lucide-react";
import AnimatedPlayer from "./AnimatedPlayer";
import AnimatedAudition from "./AnimatedAudition";

import featureCuradoria from "@/assets/feature-curadoria.png";
import featureEncomenda from "@/assets/feature-encomenda.png";
import featurePlaylists from "@/assets/feature-playlists.png";
import featurePagamento from "@/assets/feature-pagamento.png";
import featureContratos from "@/assets/feature-contratos.png";
import screenExplorar from "@/assets/screen-explorar.png";

import iconMusicCircle from "@/assets/icon-music-circle.png";
import iconDiagonal from "@/assets/icon-diagonal.png";
import iconDocument from "@/assets/icon-document.png";

interface FeatureSection {
  icon: LucideIcon;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  bullets: string[];
  reverse?: boolean;
  image: string;
  scrollScreen?: string;
  animatedPlayer?: boolean;
}

const features: FeatureSection[] = [
  {
    icon: Search,
    badge: "Curadoria Inteligente",
    title: "Só as melhores,",
    highlight: "sem bagunça.",
    subtitle: "É o fim das guias espalhadas pelo WhatsApp.",
    bullets: [
      "Navegue pelos perfis dos maiores compositores do Brasil",
      "Filtre por estilo, vibe e tema",
      "Algoritmo entende seu gosto musical",
    ],
    image: featureCuradoria,
    scrollScreen: screenExplorar,
  },
  {
    icon: Music,
    badge: "Sob Medida",
    title: "Músicas",
    highlight: "Sob Encomenda.",
    subtitle: "Pra quê correr atrás do sucesso? Agora ele vem até você.",
    bullets: [
      "Abra audições personalizadas",
      "+1500 compositores podem criar pensando em você",
      "Receba músicas sob medida",
    ],
    reverse: true,
    image: featureEncomenda,
  },
  {
    icon: Users,
    badge: "Colaboração",
    title: "Playlists",
    highlight: "em Equipe.",
    subtitle: "Produtor musical, artista e A&R trabalhando na mesma playlist.",
    bullets: [
      "Crie playlists compartilhadas",
      "Encontrem e adicione músicas em equipe",
      "Visualize seu álbum antes mesmo de gravar",
    ],
    image: featurePlaylists,
    animatedPlayer: true,
  },
  {
    icon: CreditCard,
    badge: "Investimento",
    title: "Um repertório que",
    highlight: "se paga sozinho.",
    subtitle: "Composições gigantes, que cabem no seu bolso.",
    bullets: [
      "Parcele a licença em até 12x",
      "Lance a música",
      "O investimento pode se pagar com a receita do fonograma",
    ],
    reverse: true,
    image: featurePagamento,
  },
  {
    icon: ShieldCheck,
    badge: "Segurança",
    title: "Contratos",
    highlight: "Seguros.",
    subtitle: "Licenciar música pode ser complicado, mas a gente descomplica.",
    bullets: [
      "Envio automático de licenças*",
      "Segurança jurídica total",
      "Integração com editoras e associações",
    ],
    image: featureContratos,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const PhoneMockup = ({ screenSrc }: { screenSrc: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const screenY = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-35%"]);

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-xs w-full mx-auto"
      variants={itemVariants}
    >
      <div className="relative mx-auto" style={{ width: 280, height: 580 }}>
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[hsl(0_0%_25%)] to-[hsl(0_0%_12%)] shadow-[0_25px_60px_-12px_hsl(0_0%_0%/0.6)]" />
        <div className="absolute inset-[4px] rounded-[2.75rem] overflow-hidden bg-black">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-20" />
          <motion.img
            src={screenSrc}
            alt="App screenshot"
            className="w-full h-auto"
            style={{ y: screenY }}
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full bg-white/30 z-20" />
      </div>
    </motion.div>
  );
};

const StaticImageCard = ({ feature }: { feature: FeatureSection }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 30,
  });

  const innerX = useSpring(useTransform(mouseX, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const innerY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="flex-1 max-w-md w-full"
      style={{ perspective: 800 }}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-border bg-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.04 : 1,
          boxShadow: isHovered
            ? "0 25px 60px -12px hsl(216 100% 50% / 0.25), 0 0 40px hsl(274 79% 66% / 0.1)"
            : "0 4px 20px -4px hsl(0 0% 0% / 0.3)",
        }}
        transition={{
          scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          boxShadow: { duration: 0.4, ease: "easeOut" },
        }}
      >
        <motion.div style={{ x: innerX, y: innerY, scale: 1.05 }}>
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-auto"
            loading="lazy"
            width={800}
            height={800}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? "linear-gradient(135deg, hsl(216 100% 50% / 0.08), hsl(274 79% 66% / 0.06))"
              : "linear-gradient(135deg, transparent, transparent)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const FeatureImageCard = ({ feature }: { feature: FeatureSection }) => {
  if (feature.scrollScreen) {
    return <PhoneMockup screenSrc={feature.scrollScreen} />;
  }
  if (feature.animatedPlayer) {
    return <AnimatedPlayer />;
  }
  return <StaticImageCard feature={feature} />;
};

const FeatureBlock = ({ feature, index }: { feature: FeatureSection; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div className="flex-1 max-w-xl" style={{ opacity, y }}>
        <motion.span
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          variants={itemVariants}
        >
          <feature.icon className="w-3.5 h-3.5" />
          {feature.badge}
        </motion.span>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4"
          variants={itemVariants}
        >
          {feature.title}{" "}
          <span className="text-highlight">{feature.highlight}</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-lg mb-8 leading-relaxed"
          variants={itemVariants}
        >
          {feature.subtitle}
        </motion.p>

        <ul className="space-y-4">
          {feature.bullets.map((bullet, i) => (
            <motion.li
              key={bullet}
              variants={{
                hidden: { opacity: 0, x: -24 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.45,
                    delay: 0.3 + i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              className="flex items-start gap-3 text-base text-secondary-foreground"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {bullet}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <FeatureImageCard feature={feature} />
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="relative py-28 px-4 overflow-hidden">
      {/* Decorative brand elements — subtle background accents */}
      <motion.div
        className="absolute top-16 right-[5%] hidden lg:block pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={iconMusicCircle} alt="" aria-hidden="true" className="w-28 opacity-[0.06]" />
      </motion.div>

      <motion.div
        className="absolute top-[40%] left-[3%] hidden lg:block pointer-events-none"
        animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <img src={iconDiagonal} alt="" aria-hidden="true" className="w-40 opacity-[0.04]" />
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] right-[4%] hidden lg:block pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={iconDocument} alt="" aria-hidden="true" className="w-20 opacity-[0.06]" />
      </motion.div>


      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-8"
        >
          <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Nossa Plataforma
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            O App <span className="text-highlight">(per)feito</span> pra construir seu repertório.
          </h2>
        </motion.div>

        <div className="space-y-28 lg:space-y-36 mt-24">
          {features.map((feature, i) => (
            <FeatureBlock key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
