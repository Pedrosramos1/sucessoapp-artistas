import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const composers = [
  { name: "Waleria Leão", streams: "8.7B", songs: "11 músicas" },
  { name: "Danillo Davilla", streams: "6.5B", songs: "9 músicas" },
  { name: "Bruno Cesar", streams: "5.3B", songs: "14 músicas" },
  { name: "Bruno Sucesso", streams: "5.2B", songs: "13 músicas" },
  { name: "Rodrigo Reys", streams: "5.1B", songs: "13 músicas" },
  { name: "Marcolino", streams: "4.5B", songs: "8 músicas" },
  { name: "Danielzão", streams: "4.2B", songs: "10 músicas" },
  { name: "Lucas Ing", streams: "4.1B", songs: "9 músicas" },
  { name: "Elan Rubio", streams: "3.8B", songs: "11 músicas" },
  { name: "Leo Soares", streams: "3.6B", songs: "5 músicas" },
  { name: "Dan Candido", streams: "3.5B", songs: "9 músicas" },
  { name: "Edu Valim", streams: "2.8B", songs: "10 músicas" },
  { name: "Marcello Henrique", streams: "2.7B", songs: "10 músicas" },
  { name: "Hugo Henrique", streams: "2.2B", songs: "5 músicas" },
  { name: "Jeff da Sanfona", streams: "2.0B", songs: "6 músicas" },
  { name: "Ikaro", streams: "1.4B", songs: "5 músicas" },
];

// Generate placeholder initials-based avatar colors
const getAvatarColor = (name: string) => {
  const colors = [
    "from-violet-600 to-purple-700",
    "from-blue-600 to-indigo-700",
    "from-emerald-600 to-teal-700",
    "from-rose-600 to-pink-700",
    "from-amber-600 to-orange-700",
    "from-cyan-600 to-blue-700",
    "from-fuchsia-600 to-purple-700",
    "from-lime-600 to-green-700",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name: string) => {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
};

const Composers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Eles escreveram os maiores sucessos da{" "}
            <span className="text-primary">última década.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mentes criadoras de hits que somam mais de 80 Bilhões de streamings.{" "}
            <span className="text-foreground font-medium">E agora um deles pode ser seu.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {composers.map((composer, i) => (
            <motion.div
              key={composer.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: "easeOut" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card/30 hover:border-primary/40 transition-colors duration-300"
            >
              {/* Avatar placeholder with gradient */}
              <div className={`aspect-[3/4] overflow-hidden bg-gradient-to-br ${getAvatarColor(composer.name)} flex items-center justify-center`}>
                <span className="text-4xl md:text-5xl font-bold text-white/80 font-display select-none">
                  {getInitials(composer.name)}
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              {/* Hover glow overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-semibold text-sm md:text-base">{composer.name}</h3>
                <div className="flex flex-col sm:flex-row sm:gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-primary/80">{composer.streams} streams</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{composer.songs}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Composers;
