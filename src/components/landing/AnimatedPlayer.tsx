import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Play, Heart, Pause } from "lucide-react";
import playlistCover from "@/assets/playlist-cover.png";

const songs = [
  { id: 1, title: "Furando sinal", plays: 25, hearts: 0, coverGradient: "from-green-500 via-emerald-600 to-green-800" },
  { id: 2, title: "Pro nosso bem", plays: 19, hearts: 1, coverGradient: "from-blue-700 via-indigo-800 to-purple-900" },
  { id: 3, title: "Bagunça minha vida", plays: 26, hearts: 1, coverGradient: "from-cyan-500 via-purple-600 to-pink-700" },
  { id: 4, title: "Segunda taça", plays: 27, hearts: 1, coverGradient: "from-red-600 via-purple-700 to-indigo-800" },
  { id: 5, title: "Quando apaga a luz", plays: 16, hearts: 0, coverGradient: "from-amber-700 via-orange-800 to-red-900" },
  { id: 6, title: "Saudade marcada", plays: 88, hearts: 4, coverGradient: "from-rose-300 via-pink-200 to-orange-200" },
  { id: 7, title: "Tudo indica", plays: 15, hearts: 1, coverGradient: "from-teal-400 via-emerald-500 to-green-600" },
  { id: 8, title: "Alô Ambev", plays: 41, hearts: 0, coverGradient: "from-violet-600 via-purple-700 to-blue-800" },
  { id: 9, title: "S de Saudade", plays: 25, hearts: 1, coverGradient: "from-red-400 via-rose-500 to-pink-600" },
  { id: 10, title: "Desejando Eu", plays: 48, hearts: 3, coverGradient: "from-sky-400 via-blue-500 to-indigo-600" },
  { id: 11, title: "Chicletinho 🍬", plays: 39, hearts: 1, coverGradient: "from-pink-300 via-rose-400 to-red-400" },
  { id: 12, title: "Pra sempre nós", plays: 32, hearts: 2, coverGradient: "from-yellow-500 via-amber-600 to-orange-700" },
];

const AnimatedPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [playingSongIndex, setPlayingSongIndex] = useState(0);
  const [highlightedSong, setHighlightedSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.95]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    const s = (fn: () => void, ms: number) => {
      timeouts.push(setTimeout(() => { if (!cancelled) fn(); }, ms));
    };

    const run = () => {
      if (cancelled) return;
      // Reset
      setScrollOffset(0);
      setPlayingSongIndex(0);
      setHighlightedSong(null);
      setIsPlaying(false);

      // Tap first song → starts playing
      s(() => { setHighlightedSong(0); }, 800);
      s(() => { setHighlightedSong(null); setPlayingSongIndex(0); setIsPlaying(true); }, 1200);

      // Scroll down smoothly
      s(() => setScrollOffset(1), 2800);
      s(() => setScrollOffset(2), 3600);
      s(() => setScrollOffset(3), 4400);

      // Tap song 5 (Quando apaga a luz)
      s(() => setHighlightedSong(4), 5200);
      s(() => { setHighlightedSong(null); setPlayingSongIndex(4); }, 5600);

      // Continue scrolling
      s(() => setScrollOffset(4), 6400);
      s(() => setScrollOffset(5), 7200);
      s(() => setScrollOffset(6), 8000);

      // Tap song 9 (Alô Ambev → index 7)
      s(() => setHighlightedSong(7), 8800);
      s(() => { setHighlightedSong(null); setPlayingSongIndex(7); }, 9200);

      // Scroll back up
      s(() => setScrollOffset(4), 10500);
      s(() => setScrollOffset(2), 11200);
      s(() => setScrollOffset(0), 12000);

      // Tap song 1 again
      s(() => setHighlightedSong(0), 13000);
      s(() => { setHighlightedSong(null); setPlayingSongIndex(0); }, 13400);

      // Loop
      s(() => run(), 15000);
    };

    run();
    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, []);

  const ROW_HEIGHT = 62;
  const translateY = scrollOffset * -ROW_HEIGHT;
  const playingSong = songs[playingSongIndex];

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 max-w-[280px] md:max-w-sm w-full mx-auto"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div style={{ scale: cardScale }}>
        <div className="rounded-2xl bg-black border border-[hsl(0_0%_12%)] shadow-[0_20px_50px_-12px_hsl(0_0%_0%/0.5)] overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-center px-4 py-2.5 relative">
            <div className="absolute left-3 w-7 h-7 rounded-full bg-[hsl(0_0%_15%)] flex items-center justify-center">
              <ArrowLeft className="w-3.5 h-3.5 text-white" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-semibold text-white">Playlist</span>
          </div>

          {/* Cover / hero area */}
          <div className="relative h-28 flex items-end px-4 pb-3 overflow-hidden">
            <img src={playlistCover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            <div className="relative z-10">
              <h3 className="text-[13px] font-bold text-white leading-tight">
                As melhores do Sucesso 🔥
              </h3>
              <span className="text-[9px] text-[hsl(0_0%_50%)]">12 guias</span>
            </div>
          </div>

          {/* Reproduzir button */}
          <div className="px-4 pt-1 pb-2">
            <div className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl py-2.5">
              <Play className="w-3.5 h-3.5 text-white fill-white" />
              <span className="text-[10px] font-bold text-white">Reproduzir Playlist</span>
            </div>
          </div>

          {/* Colaboradores */}
          <div className="px-4 pt-2 pb-1.5">
            <span className="text-[10px] text-[hsl(0_0%_60%)] font-medium">Colaboradores</span>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-1 ring-white/10" />
              <div>
                <span className="text-[9px] text-white font-semibold">@brunosucesso</span>
                <br />
                <span className="text-[8px] text-green-400 font-medium">Administrador(a)</span>
              </div>
            </div>
          </div>

          {/* Guias da playlist header */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <span className="text-[10px] text-[hsl(0_0%_60%)] font-medium">Guias da playlist</span>
            <div className="flex items-center gap-1 bg-[hsl(0_0%_20%)] rounded-full px-2.5 py-1">
              <span className="text-[8px] text-[hsl(0_0%_55%)] font-medium">↕ A-Z</span>
            </div>
          </div>

          {/* Song list with scroll animation */}
          <div className="relative overflow-hidden" style={{ height: 260 }}>
            <motion.div
              animate={{ y: translateY }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="px-3"
            >
              {songs.map((song, i) => {
                const isTapped = highlightedSong === i;
                const isCurrentlyPlaying = playingSongIndex === i && isPlaying;
                return (
                  <div key={song.id}>
                    <motion.div
                      className="flex items-center gap-2.5 py-2 px-1 rounded-lg"
                      animate={{
                        backgroundColor: isTapped
                          ? "hsla(0, 0%, 100%, 0.08)"
                          : "hsla(0, 0%, 0%, 0)",
                        scale: isTapped ? 0.97 : 1,
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="text-[10px] text-[hsl(0_0%_40%)] w-4 text-center font-medium tabular-nums">
                        {i + 1}
                      </span>
                      {/* Square cover */}
                      <div
                        className="w-12 h-12 rounded-lg shrink-0 shadow-md overflow-hidden relative bg-black"
                      >
                        <img src={playlistCover} alt="" className="w-full h-full object-cover" />
                        {/* Playing indicator overlay */}
                        <AnimatePresence>
                          {isCurrentlyPlaying && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black/40 flex items-center justify-center"
                            >
                              <div className="flex items-end gap-[2px] h-3">
                                {[0, 1, 2].map((bar) => (
                                  <motion.div
                                    key={bar}
                                    className="w-[2px] bg-white rounded-full"
                                    animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
                                    transition={{
                                      duration: 0.8,
                                      repeat: Infinity,
                                      delay: bar * 0.15,
                                      ease: "easeInOut",
                                    }}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[10px] font-bold truncate leading-tight ${isCurrentlyPlaying ? "text-orange-400" : "text-white"}`}>
                          {song.title}
                        </p>
                        <div className="flex items-center gap-2.5 mt-0.5">
                          <span className="text-[8px] text-[hsl(0_0%_42%)] flex items-center gap-0.5">
                            <Play className="w-2.5 h-2.5 fill-current" /> {song.plays}
                          </span>
                          <span className="text-[8px] text-[hsl(0_0%_42%)] flex items-center gap-0.5">
                            <Heart className="w-2.5 h-2.5" /> {song.hearts}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                    {/* Separator */}
                    {i < songs.length - 1 && (
                      <div className="ml-[72px] mr-2 h-[0.5px] bg-[hsl(0_0%_13%)]" />
                    )}
                  </div>
                );
              })}
            </motion.div>
            {/* Top & bottom fade */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
          </div>

          {/* Mini player bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={playingSongIndex}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5 px-3 py-2 bg-[hsl(0_0%_6%)] border-t border-[hsl(0_0%_12%)]"
            >
              <div className="w-9 h-9 rounded-md shrink-0 relative overflow-hidden bg-black">
                <img src={playlistCover} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-white truncate">{playingSong.title}</p>
                <p className="text-[7px] text-[hsl(0_0%_45%)]">Bruno Sucesso</p>
                <div className="w-full h-[2px] bg-[hsl(0_0%_18%)] rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-orange-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                </div>
              </div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center">
                {isPlaying ? (
                  <Pause className="w-3 h-3 text-white/60 fill-white/60" />
                ) : (
                  <Play className="w-3 h-3 text-white/60 fill-white/60 ml-0.5" />
                )}
              </div>
              <span className="text-[12px] text-white/40 font-light">✕</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPlayer;
