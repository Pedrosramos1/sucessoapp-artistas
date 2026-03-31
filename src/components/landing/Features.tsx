import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Music, Users, CreditCard, ShieldCheck, type LucideIcon } from "lucide-react";

import featureCuradoria from "@/assets/feature-curadoria.jpg";
import featureEncomenda from "@/assets/feature-encomenda.jpg";
import featurePlaylists from "@/assets/feature-playlists.jpg";
import featurePagamento from "@/assets/feature-pagamento.jpg";
import featureContratos from "@/assets/feature-contratos.jpg";

interface FeatureSection {
  icon: LucideIcon;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  bullets: string[];
  reverse?: boolean;
  image: string;
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
      "Envio automático de licenças",
      "Segurança jurídica total",
      "Integração com editoras e associações",
    ],
    image: featureContratos,
  },
];

const FeatureBlock = ({ feature, index }: { feature: FeatureSection; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    feature.reverse ? [80, 0] : [-80, 0]
  );

  return (
    <div
      ref={ref}
      className={`flex flex-col ${feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-20`}
    >
      {/* Text side */}
      <motion.div className="flex-1 max-w-xl" style={{ opacity, x }}>
        <span className="inline-block mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
          {feature.badge}
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {feature.title}{" "}
          <span className="text-primary">{feature.highlight}</span>
        </h2>

        <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
          {feature.subtitle}
        </p>

        <ul className="space-y-4">
          {feature.bullets.map((bullet, i) => (
            <motion.li
              key={bullet}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-3 text-base md:text-lg text-secondary-foreground"
            >
              <span className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
              {bullet}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Visual side — mockup */}
      <motion.div
        className="flex-1 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-auto"
            loading="lazy"
            width={800}
            height={800}
          />
        </div>
      </motion.div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            O App <span className="text-primary">(per)feito</span> pra construir seu repertório.
          </h2>
        </motion.div>

        <div className="space-y-32 lg:space-y-40">
          {features.map((feature, i) => (
            <FeatureBlock key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
