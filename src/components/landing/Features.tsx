import { motion } from "framer-motion";
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Features = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            O App <span className="text-primary">(per)feito</span> pra construir seu repertório.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card transition-all duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
