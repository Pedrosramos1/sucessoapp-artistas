import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Search, SlidersHorizontal, Play, Heart, Check, Camera, Music } from "lucide-react";

const songs = [
  { title: "Exatamente como você é", status: "Público", statusColor: "text-blue-400", plays: "7M", hearts: "3M", price: "R$ 2.550,00", checked: true },
  { title: "Beijo na Testa", status: "Privada", statusColor: "text-muted-foreground", plays: "7M", hearts: "3M", price: "R$ 2.550,00", checked: false },
  { title: "Faixa 1, Rockey", status: "Rascunho", statusColor: "text-purple-400", plays: "3M", hearts: "1M", price: "R$ 1.110,00", checked: true },
  { title: "In-sônia", status: "Não Listado", statusColor: "text-muted-foreground", plays: "2.5M", hearts: "1.5M", price: "R$ 4.430,00", checked: false },
];

const coverColors = [
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
];

const AnimatedPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checkedSongs, setCheckedSongs] = useState<Set<number>>(new Set([0, 2]));
  const [animPhase, setAnimPhase] = useState(0);
  // Phases: 0=initial, 1=show songs, 2=check items, 3=button pulse

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.95]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setAnimPhase(0);
      setCheckedSongs(new Set());
      timeouts.push(setTimeout(() => setAnimPhase(1), 400));
      timeouts.push(setTimeout(() => {
        setAnimPhase(2);
        setCheckedSongs(new Set([0]));
      }, 1400));
      timeouts.push(setTimeout(() => {
        setCheckedSongs(new Set([0, 2]));
      }, 2200));
      timeouts.push(setTimeout(() => setAnimPhase(3), 3000));
      timeouts.push(setTimeout(() => run(), 6000));
    };
    run();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const selectedCount = checkedSongs.size;

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-[240px] md:max-w-xs w-full mx-auto"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div style={{ scale: cardScale }}>
        {/* Phone frame */}
        <div className="relative mx-auto" style={{ maxWidth: 280 }}>
          <div className="relative w-full" style={{ paddingBottom: "207%" }}>
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-b from-[hsl(0_0%_25%)] to-[hsl(0_0%_12%)] shadow-[0_25px_60px_-12px_hsl(0_0%_0%/0.6)]" />
            <div className="absolute inset-[3px] md:inset-[4px] rounded-[2.25rem] md:rounded-[2.75rem] overflow-hidden bg-background">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] md:w-[120px] h-[24px] md:h-[30px] bg-black rounded-b-2xl z-20" />

              {/* Screen content */}
              <div className="absolute inset-0 pt-9 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-center px-4 py-2 relative">
                  <ArrowLeft className="w-4 h-4 text-foreground absolute left-4" />
                  <span className="text-[10px] font-bold text-foreground">Nova Playlist</span>
                </div>

                {/* Cover area */}
                <motion.div
                  className="mx-4 mt-2 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex flex-col items-center py-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: animPhase >= 0 ? 1 : 0, scale: animPhase >= 0 ? 1 : 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-card/60 border border-border flex items-center justify-center mb-2">
                    <Music className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 bg-secondary/80 rounded-full px-2.5 py-1 mb-1">
                    <span className="text-[7px] text-foreground font-medium">Adicionar uma capa</span>
                    <Camera className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span className="text-[6px] text-muted-foreground">PNG ou JPG</span>
                </motion.div>

                {/* Title */}
                <div className="px-4 mt-3 mb-2">
                  <p className="text-[10px] text-primary font-bold leading-tight">Vamos começar a</p>
                  <p className="text-[10px] text-primary font-bold leading-tight">criar sua playlist</p>
                </div>

                {/* Search bar */}
                <div className="mx-4 mb-2 flex items-center gap-2 bg-secondary border border-border rounded-lg px-2.5 py-1.5">
                  <SlidersHorizontal className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[8px] text-muted-foreground flex-1">O que você procura?</span>
                  <Search className="w-3 h-3 text-muted-foreground" />
                </div>

                {/* Selected count */}
                <motion.div
                  className="px-4 mb-1.5"
                  animate={{ opacity: selectedCount > 0 ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[8px] text-muted-foreground font-semibold">{selectedCount} Selecionadas</span>
                </motion.div>

                {/* Song list */}
                <div className="flex-1 px-3 space-y-0.5 overflow-hidden">
                  {songs.map((song, i) => {
                    const isChecked = checkedSongs.has(i);
                    return (
                      <motion.div
                        key={song.title}
                        className="flex items-center gap-2 py-1.5 px-1 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: animPhase >= 1 ? 1 : 0,
                          x: animPhase >= 1 ? 0 : -10,
                        }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        {/* Checkbox */}
                        <motion.div
                          className="w-4 h-4 rounded border-[1.5px] flex items-center justify-center shrink-0"
                          animate={{
                            borderColor: isChecked ? "hsl(216 100% 50%)" : "hsl(var(--border))",
                            backgroundColor: isChecked ? "hsl(216 100% 50%)" : "transparent",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            animate={{ opacity: isChecked ? 1 : 0, scale: isChecked ? 1 : 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </motion.div>
                        </motion.div>

                        {/* Cover art */}
                        <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${coverColors[i]} shrink-0 flex items-center justify-center`}>
                          <Music className="w-3 h-3 text-white/70" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] font-semibold text-foreground truncate leading-tight">{song.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className={`text-[6px] ${song.statusColor}`}>{song.status}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[6px] text-muted-foreground flex items-center gap-0.5">
                              <Play className="w-2 h-2" /> {song.plays}
                            </span>
                            <span className="text-[6px] text-muted-foreground flex items-center gap-0.5">
                              <Heart className="w-2 h-2" /> {song.hearts}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <span className="text-[7px] font-semibold text-primary shrink-0">{song.price}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom button */}
                <div className="px-4 py-3 mt-auto">
                  <motion.div
                    className="w-full rounded-xl py-2 text-center text-[9px] font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-primary"
                    animate={{
                      opacity: animPhase >= 3 ? 1 : 0.5,
                      scale: animPhase >= 3 ? [1, 1.03, 1] : 1,
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    Salvar e Continuar
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80px] md:w-[100px] h-[4px] rounded-full bg-white/30 z-20" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPlayer;
