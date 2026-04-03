import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Search, Music, Users, CreditCard, ShieldCheck, type LucideIcon } from "lucide-react";

import featureCuradoria from "@/assets/feature-curadoria.jpg";
import featureEncomenda from "@/assets/feature-encomenda.jpg";
import featurePlaylists from "@/assets/feature-playlists.jpg";
import featurePagamento from "@/assets/feature-pagamento.jpg";
import featureContratos from "@/assets/feature-contratos.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

interface FeatureCard {
  icon: LucideIcon;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  bullets: string[];
  image: string;
}

const features: FeatureCard[] = [
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
      "Encontre e adicione músicas em equipe",
      "Visualize seu álbum antes mesmo de gravar",
    ],
    image: featurePlaylists,
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
    image: featurePagamento,
  },
  {
    icon: ShieldCheck,
    badge: "Segurança",
    title: "Contratos",
    highlight: "Seguros.",
    subtitle: "Licenciar música pode ser complicado, mas a gente descomplica.",
    bullets: [
      "Envio automático de licenças",
      "Segurança jurídica total",
      "Integração com editoras e associações",
    ],
    image: featureContratos,
  },
];

// ─── Carousel Card ───────────────────────────────────────────────────────────

/**
 * Each card calculates its own distance from the viewport center
 * using useScroll + useTransform for continuous, GPU-accelerated interpolation.
 *
 * - scrollXProgress tracks the card's horizontal position relative to the
 *   scroll container.
 * - We map the card's center offset to scale and opacity using useTransform
 *   for buttery-smooth 60fps transitions with zero JS-driven reflows.
 */
const CarouselCard = ({
  feature,
  containerRef,
}: {
  feature: FeatureCard;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Distance-from-center calculation:
   * We track the card's position within the scroll container.
   * The offset range [-1, 0, 1] maps to [far-left, center, far-right].
   * Scale and opacity are interpolated continuously across this range.
   */
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["start end", "end start"],
  });

  // Map scroll position to visual properties — continuous interpolation, no binary states
  const rawScale = useTransform(scrollXProgress, [0, 0.5, 1], [0.88, 1, 0.88]);
  const rawOpacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.55, 1, 0.55]);
  const rawY = useTransform(scrollXProgress, [0, 0.5, 1], [16, 0, 16]);

  // Spring physics for fluid, organic motion
  const scale = useSpring(rawScale, { stiffness: 300, damping: 30 });
  const opacity = useSpring(rawOpacity, { stiffness: 300, damping: 30 });
  const y = useSpring(rawY, { stiffness: 300, damping: 30 });

  // Shadow interpolation — center card gets a vivid glow
  const shadowOpacity = useTransform(scrollXProgress, [0, 0.5, 1], [0, 0.3, 0]);
  const springedShadow = useSpring(shadowOpacity, { stiffness: 300, damping: 30 });
  const [shadowVal, setShadowVal] = useState(0);
  useMotionValueEvent(springedShadow, "change", (v) => setShadowVal(v));

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[420px] xl:w-[460px] snap-center"
      style={{ scale, opacity, y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-border bg-card h-full flex flex-col"
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          boxShadow: `0 25px 60px -12px hsl(216 100% 50% / ${(shadowVal + (isHovered ? 0.15 : 0)).toFixed(3)}),
                      0 0 40px hsl(274 79% 66% / ${(shadowVal * 0.4 + (isHovered ? 0.08 : 0)).toFixed(3)})`,
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={feature.image}
            alt={feature.title}
            className="w-full h-52 sm:h-60 object-cover"
            loading="lazy"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-semibold uppercase tracking-widest text-muted-foreground self-start">
            <feature.icon className="w-3.5 h-3.5" />
            {feature.badge}
          </span>

          <h3 className="text-xl sm:text-2xl font-extrabold leading-tight mb-2">
            {feature.title}{" "}
            <span className="text-highlight">{feature.highlight}</span>
          </h3>

          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
            {feature.subtitle}
          </p>

          <ul className="space-y-2.5 mt-auto">
            {feature.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-sm text-secondary-foreground"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Carousel Container ──────────────────────────────────────────────────────

/**
 * Horizontal scroll carousel with:
 * - Native scroll + snap for mobile
 * - Drag support via Framer Motion for desktop
 * - Dynamic focus: each card interpolates scale/opacity based on center distance
 * - Padding ensures lateral cards are partially visible (depth cue)
 */
const Features = () => {
  const scrollRef = useRef<HTMLDivElement>(null!);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div > div")?.offsetWidth ?? 400;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section id="features" className="relative py-28 overflow-hidden">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-4">
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Plataforma Completa
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-muted-foreground mb-4">
            Da organização à venda
          </p>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            O caminho mais curto entre sua composição e o artista certo.
            Sua Loja de Hits que trabalha 24h por dia vendendo suas composições por você.
          </p>
        </motion.div>
      </div>

      {/* Carousel track */}
      <div className="relative">
        {/* Scroll container — horizontal, snap, drag-enabled */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-[max(1rem,calc((100vw-460px)/2))] py-8 snap-x snap-mandatory scroll-smooth"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {features.map((feature) => (
            <CarouselCard
              key={feature.badge}
              feature={feature}
              containerRef={scrollRef}
            />
          ))}
        </div>

        {/* Edge fade overlays — visual depth cue */}
        <div
          className="absolute inset-y-0 left-0 w-16 md:w-32 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to right, hsl(var(--background)), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 md:w-32 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to left, hsl(var(--background)), transparent)",
          }}
        />

        {/* Navigation arrows */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            canScrollLeft
              ? "opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground cursor-pointer"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            canScrollRight
              ? "opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground cursor-pointer"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Próximo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Features;
