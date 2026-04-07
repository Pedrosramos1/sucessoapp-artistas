import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Search, SlidersHorizontal, Play, Heart, Check, Camera, Music, Globe, Lock, Pencil, Eye } from "lucide-react";

const songs = [
  { title: "Exatamente como você é", status: "Público", statusIcon: Globe, statusColor: "text-blue-400", plays: "7M", hearts: "3M", price: "R$ 2.550,00", coverGradient: "from-amber-600 to-orange-400" },
  { title: "Beijo na Testa", status: "Privada", statusIcon: Lock, statusColor: "text-muted-foreground/60", plays: "7M", hearts: "3M", price: "R$ 2.550,00", coverGradient: "from-pink-600 to-rose-400" },
  { title: "Faixa 1, Rockey", status: "Rascunho", statusIcon: Pencil, statusColor: "text-purple-400", plays: "3M", hearts: "1M", price: "R$ 1.110,00", coverGradient: "from-indigo-600 to-blue-400" },
  { title: "In-sônia", status: "Não Listado", statusIcon: Eye, statusColor: "text-muted-foreground/60", plays: "2.5M", hearts: "1.5M", price: "R$ 4.430,00", coverGradient: "from-emerald-700 to-teal-500" },
];

const AnimatedPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checkedSongs, setCheckedSongs] = useState<Set<number>>(new Set());
  const [animPhase, setAnimPhase] = useState(0);

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
      timeouts.push(setTimeout(() => setCheckedSongs(new Set([0, 2])), 2200));
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
        <div className="relative mx-auto" style={{ maxWidth: 280 }}>
          <div className="relative w-full" style={{ paddingBottom: "207%" }}>
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-b from-[hsl(0_0%_25%)] to-[hsl(0_0%_12%)] shadow-[0_25px_60px_-12px_hsl(0_0%_0%/0.6)]" />
            <div className="absolute inset-[3px] md:inset-[4px] rounded-[2.25rem] md:rounded-[2.75rem] overflow-hidden bg-[hsl(240_10%_6%)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] md:w-[120px] h-[24px] md:h-[30px] bg-black rounded-b-2xl z-20" />

              <div className="absolute inset-0 pt-9 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-center px-4 py-2 relative">
                  <ArrowLeft className="w-4 h-4 text-white absolute left-4" strokeWidth={2} />
                  <span className="text-[11px] font-bold text-white">Nova Playlist</span>
                </div>

                {/* Cover area — purple glow card */}
                <motion.div
                  className="mx-4 mt-1 rounded-2xl bg-gradient-to-br from-purple-900/50 via-[hsl(270_50%_12%)] to-blue-900/30 border border-purple-500/15 flex flex-col items-center py-5 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: animPhase >= 0 ? 1 : 0, scale: animPhase >= 0 ? 1 : 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/5 to-transparent" />
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[hsl(240_10%_14%)] border border-[hsl(240_10%_20%)] flex items-center justify-center mb-2.5 relative z-10 shadow-lg">
                    <Music className="w-6 h-6 text-blue-400" />
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-[7px] text-white font-bold">+</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[hsl(240_10%_14%)] rounded-full px-3 py-1.5 mb-1.5 relative z-10 border border-[hsl(240_10%_20%)]">
                    <span className="text-[8px] text-white font-medium">Adicionar uma capa</span>
                    <Camera className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-[6px] text-[hsl(0_0%_50%)] relative z-10">PNG ou JPG, mínimo 00x00px</span>
                </motion.div>

                {/* Title */}
                <div className="px-4 mt-3 mb-3">
                  <p className="text-[13px] font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
                    Vamos começar a
                  </p>
                  <p className="text-[13px] font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
                    criar sua playlist
                  </p>
                </div>

                {/* Divider */}
                <div className="mx-4 h-[0.5px] bg-[hsl(0_0%_15%)] mb-2" />

                {/* Search bar */}
                <div className="mx-4 mb-2 flex items-center gap-2 bg-[hsl(240_8%_10%)] border border-[hsl(0_0%_15%)] rounded-xl px-3 py-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[hsl(0_0%_40%)]" />
                  <span className="text-[9px] text-[hsl(0_0%_40%)] flex-1">O que você procura?</span>
                  <Search className="w-3.5 h-3.5 text-[hsl(0_0%_40%)]" />
                </div>

                {/* Selected count */}
                <motion.div
                  className="px-4 mb-1"
                  animate={{ opacity: selectedCount > 0 ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[9px] text-[hsl(0_0%_50%)] font-medium">{selectedCount} Selecionadas</span>
                </motion.div>

                {/* Song list */}
                <div className="flex-1 px-3 space-y-0 overflow-hidden">
                  {songs.map((song, i) => {
                    const isChecked = checkedSongs.has(i);
                    const StatusIcon = song.statusIcon;
                    return (
                      <motion.div
                        key={song.title}
                        className="flex items-center gap-2.5 py-2 px-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: animPhase >= 1 ? 1 : 0,
                          x: animPhase >= 1 ? 0 : -10,
                        }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        {/* Checkbox — rounded */}
                        <motion.div
                          className="w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center shrink-0"
                          animate={{
                            borderColor: isChecked ? "hsl(216 100% 50%)" : "hsl(0 0% 25%)",
                            backgroundColor: isChecked ? "hsl(216 100% 50%)" : "transparent",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            animate={{ opacity: isChecked ? 1 : 0, scale: isChecked ? 1 : 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </motion.div>
                        </motion.div>

                        {/* Cover art — round */}
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${song.coverGradient} shrink-0 flex items-center justify-center shadow-md`}>
                          <Music className="w-4 h-4 text-white/60" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-bold text-white truncate leading-tight">{song.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <StatusIcon className={`w-2 h-2 ${song.statusColor}`} />
                            <span className={`text-[7px] ${song.statusColor}`}>{song.status}</span>
                            {song.title === "Faixa 1, Rockey" && (
                              <>
                                <Lock className="w-2 h-2 text-muted-foreground/60 ml-1" />
                                <span className="text-[7px] text-muted-foreground/60">Privada</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2.5 mt-0.5">
                            <span className="text-[7px] text-[hsl(0_0%_45%)] flex items-center gap-0.5">
                              <Play className="w-2.5 h-2.5 fill-current" /> {song.plays}
                            </span>
                            <span className="text-[7px] text-[hsl(0_0%_45%)] flex items-center gap-0.5">
                              <Heart className="w-2.5 h-2.5" /> {song.hearts}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <span className="text-[8px] font-bold text-red-400 shrink-0">{song.price}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom button */}
                <div className="px-4 py-3 mt-auto">
                  <motion.div
                    className="w-full rounded-2xl py-2.5 text-center text-[10px] font-bold text-white"
                    style={{
                      background: "linear-gradient(90deg, hsl(216 100% 50%), hsl(270 70% 55%), hsl(340 80% 55%))",
                    }}
                    animate={{
                      opacity: animPhase >= 3 ? 1 : 0.4,
                      scale: animPhase >= 3 ? [1, 1.02, 1] : 1,
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
