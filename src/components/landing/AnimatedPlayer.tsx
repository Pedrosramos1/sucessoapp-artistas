import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Play, Heart } from "lucide-react";

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
  const [playingSongIndex, setPlayingSongIndex] = useState(1); // "Pro nosso bem" playing

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.95]);

  // Auto-scroll animation through the song list
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      setScrollOffset(0);

      // Gradually scroll down
      timeouts.push(setTimeout(() => { if (!cancelled) setScrollOffset(1); }, 1500));
      timeouts.push(setTimeout(() => { if (!cancelled) setScrollOffset(2); }, 2500));
      timeouts.push(setTimeout(() => { if (!cancelled) setScrollOffset(3); }, 3500));
      timeouts.push(setTimeout(() => { if (!cancelled) setScrollOffset(4); }, 4500));
      timeouts.push(setTimeout(() => { if (!cancelled) setScrollOffset(5); }, 5500));
      timeouts.push(setTimeout(() => { if (!cancelled) setScrollOffset(6); }, 6500));

      // Scroll back to top
      timeouts.push(setTimeout(() => { if (!cancelled) setScrollOffset(3); }, 8000));
      timeouts.push(setTimeout(() => { if (!cancelled) setScrollOffset(0); }, 9000));

      // Restart
      timeouts.push(setTimeout(() => { if (!cancelled) run(); }, 11000));
    };

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Each song row ~62px, show 4 visible at a time
  const translateY = scrollOffset * -62;
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
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0_0%_18%)] to-black" />
            {/* Watermark circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-[6px] border-white/8 opacity-40" />
              <div className="absolute w-16 h-16 rounded-full border-[3px] border-white/6 opacity-30" />
            </div>
            <div className="relative z-10">
              <h3 className="text-[13px] font-bold text-white leading-tight">
                As preferidas da Oi Balde 🔥
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
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="px-3"
            >
              {songs.map((song, i) => (
                <div key={song.id}>
                  <div className="flex items-center gap-2.5 py-2 px-1">
                    <span className="text-[10px] text-[hsl(0_0%_40%)] w-4 text-center font-medium tabular-nums">
                      {i + 1}
                    </span>
                    {/* Square cover with rounded corners */}
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${song.coverGradient} shrink-0 shadow-md overflow-hidden relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-white truncate leading-tight">{song.title}</p>
                      <div className="flex items-center gap-2.5 mt-0.5">
                        <span className="text-[8px] text-[hsl(0_0%_42%)] flex items-center gap-0.5">
                          <Play className="w-2.5 h-2.5 fill-current" /> {song.plays}
                        </span>
                        <span className="text-[8px] text-[hsl(0_0%_42%)] flex items-center gap-0.5">
                          <Heart className="w-2.5 h-2.5" /> {song.hearts}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Separator line */}
                  {i < songs.length - 1 && (
                    <div className="ml-[72px] mr-2 h-[0.5px] bg-[hsl(0_0%_15%)]" />
                  )}
                </div>
              ))}
            </motion.div>
            {/* Fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>

          {/* Mini player bar */}
          <div className="flex items-center gap-2.5 px-3 py-2 bg-[hsl(0_0%_6%)] border-t border-[hsl(0_0%_12%)]">
            <div className={`w-9 h-9 rounded-md bg-gradient-to-br ${playingSong.coverGradient} shrink-0 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold text-white truncate">{playingSong.title}</p>
              <p className="text-[7px] text-[hsl(0_0%_45%)]">Bruno Sucesso</p>
              {/* Progress bar */}
              <div className="w-full h-[2px] bg-[hsl(0_0%_18%)] rounded-full mt-1 overflow-hidden">
                <motion.div
                  className="h-full bg-orange-500 rounded-full"
                  animate={{ width: ["10%", "45%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
            <span className="text-[12px] text-white/50 font-light cursor-pointer">✕</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPlayer;
