import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Music, Users, CreditCard, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Só as melhores, sem bagunça",
    subtitle: "É o fim das guias espalhadas pelo WhatsApp.",
    bullets: [
      "Navegue pelos perfis dos maiores compositores do Brasil",
      "Filtre por estilo, vibe e tema",
      "Algoritmo entende seu gosto musical",
    ],
  },
  {
    icon: Music,
    title: "Músicas Sob Encomenda",
    subtitle: "Pra quê correr atrás do sucesso? Agora ele vem até você.",
    bullets: [
      "Abra audições personalizadas",
      "+1500 compositores podem criar pensando em você",
      "Receba músicas sob medida",
    ],
  },
  {
    icon: Users,
    title: "Playlists em Equipe",
    subtitle: "Produtor musical, artista e A&R trabalhando na mesma playlist.",
    bullets: [
      "Crie playlists compartilhadas",
      "Encontre e adicione músicas em equipe",
      "Visualize seu álbum antes mesmo de gravar",
    ],
  },
  {
    icon: CreditCard,
    title: "Um repertório que se paga sozinho",
    subtitle: "Composições gigantes, que cabem no seu bolso.",
    bullets: [
      "Parcele a licença em até 12x",
      "Lance a música",
      "O investimento pode se pagar com a receita do fonograma",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Contratos Seguros",
    subtitle: "Licenciar música pode ser complicado, mas a gente descomplica.",
    bullets: [
      "Envio automático de licenças",
      "Segurança jurídica total",
      "Integração com editoras e associações",
    ],
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* Parallax background glow */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            O App <span className="text-primary">(per)feito</span> pra construir seu repertório.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card transition-colors duration-300"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <motion.div
                className="relative mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <feature.icon className="w-6 h-6" />
              </motion.div>

              <h3 className="relative text-lg font-semibold mb-1">{feature.title}</h3>
              <p className="relative text-muted-foreground text-sm mb-4 italic">{feature.subtitle}</p>

              <ul className="relative space-y-2">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
