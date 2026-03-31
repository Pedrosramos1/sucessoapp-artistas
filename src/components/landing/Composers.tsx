import { motion } from "framer-motion";

const composers = [
  { name: "Waleria Leão", streams: "10B+", songs: "200+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/waleria-leao.webp" },
  { name: "Danielzão", streams: "8B+", songs: "180+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/danielzao.webp" },
  { name: "Batista Lima", streams: "5B+", songs: "150+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/batista-lima.webp" },
  { name: "Junior Pepato", streams: "4B+", songs: "120+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/junior-pepato.webp" },
  { name: "Dorgival Dantas", streams: "6B+", songs: "250+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/dorgival-dantas.webp" },
  { name: "Roobin", streams: "3B+", songs: "100+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/roobin.webp" },
  { name: "Kuke Viana", streams: "2B+", songs: "90+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/kuke-viana.webp" },
  { name: "Nattan", streams: "7B+", songs: "160+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/nattan.webp" },
  { name: "Gabriel Bala", streams: "2.5B+", songs: "80+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/gabriel-bala.webp" },
  { name: "Iguinho e Lulinha", streams: "4B+", songs: "130+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/iguinho-lulinha.webp" },
  { name: "Éder Samaniego", streams: "1.5B+", songs: "70+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/eder-samaniego.webp" },
  { name: "Edu Luppa", streams: "3B+", songs: "110+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/edu-luppa.webp" },
  { name: "Philipe Amorim", streams: "2B+", songs: "85+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/philipe-amorim.webp" },
  { name: "Felipe Amorim", streams: "5B+", songs: "140+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/felipe-amorim.webp" },
  { name: "Diego Silveira", streams: "1B+", songs: "60+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/diego-silveira.webp" },
  { name: "Rapha Lucas", streams: "2B+", songs: "95+", image: "https://sucessoapp.com/wp-content/uploads/2024/01/rapha-lucas.webp" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const Composers = () => {
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
            Eles escreveram os maiores sucessos da{" "}
            <span className="text-primary">última década.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Mentes criadoras de hits que somam mais de 80 Bilhões de streamings.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
        >
          {composers.map((composer) => (
            <motion.div
              key={composer.name}
              variants={item}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card/30 hover:border-primary/40 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={composer.image}
                  alt={composer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-semibold text-sm md:text-base">{composer.name}</h3>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{composer.streams} streams</span>
                  <span>•</span>
                  <span>{composer.songs} músicas</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Composers;
