import { motion } from "framer-motion";

const logos = [
  "Abramus", "Sbacem", "Som Livre", "Abramus Digital",
  "Lion Hits", "Oi Balde", "Valim Music", "Bridge", "Bruna Campos",
];

const TrustedBy = () => {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-10 font-medium"
      >
        Trusted by
      </motion.p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left w-max gap-16 items-center">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-muted-foreground/50 hover:text-muted-foreground/80 text-xl font-display font-semibold whitespace-nowrap select-none transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
