import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Music, Users, CreditCard, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Só as melhores, sem bagunça",
    description: "Navegue por compositores, filtre por estilo, vibe e tema. Encontre a música perfeita sem perder tempo.",
  },
  {
    icon: Music,
    title: "Músicas Sob Encomenda",
    description: "Solicite audições personalizadas de mais de 1.500 compositores cadastrados na plataforma.",
  },
  {
    icon: Users,
    title: "Playlists em Equipe",
    description: "Crie playlists compartilhadas entre produtor, artista e A&R. Todo mundo na mesma página.",
  },
  {
    icon: CreditCard,
    title: "Um repertório que se paga sozinho",
    description: "Parcele em até 12x sem juros. Invista no seu repertório e lucre com os resultados.",
  },
  {
    icon: ShieldCheck,
    title: "Contratos Seguros",
    description: "Licenças automáticas com segurança jurídica. Tudo registrado e protegido para você.",
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
              <h3 className="relative text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="relative text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
