import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Play, Heart, ChevronDown, SkipBack, SkipForward, Pause, Share2, Repeat, LayoutList } from "lucide-react";
import { useScroll, useTransform } from "framer-motion";

const songs = [
  {
    id: 1,
    title: "Furando sinal",
    plays: 25,
    hearts: 0,
    coverGradient: "from-green-500 via-emerald-600 to-green-800",
    tags: ["Sertanejo", "Pop", "Arrocha"],
    compositores: ["@brunosucesso", "@elanrubio"],
    duration: "1:24",
  },
  {
    id: 2,
    title: "Pro nosso bem",
    plays: 19,
    hearts: 1,
    coverGradient: "from-blue-700 via-indigo-800 to-purple-900",
    tags: ["Sertanejo", "Pop", "Vaneira"],
    compositores: ["@brunosucesso", "@elanrubio"],
    duration: "1:17",
  },
  {
    id: 3,
    title: "Bagunça minha vida",
    plays: 26,
    hearts: 1,
    coverGradient: "from-cyan-500 via-purple-600 to-pink-700",
    tags: ["Sertanejo", "Bachata", "Vaneira"],
    compositores: ["@marcellohenrique", "@brunosucesso"],
    duration: "1:37",
  },
  {
    id: 4,
    title: "Segunda taça",
    plays: 27,
    hearts: 1,
    coverGradient: "from-red-600 via-purple-700 to-indigo-800",
    tags: ["Sertanejo", "Pop"],
    compositores: ["@brunosucesso"],
    duration: "1:45",
  },
];

const AnimatedPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<"playlist" | "player">("playlist");
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.95]);

  // Animation loop: show playlist → click song → show player → back to playlist
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      // Start with playlist
      setActiveView("playlist");
      setIsPlaying(false);
      setProgress(0);
      setActiveSongIndex(0);

      // After 2s, "click" first song
      timeouts.push(setTimeout(() => {
        setActiveSongIndex(0);
        setActiveView("player");
        setIsPlaying(true);
      }, 2000));

      // Animate progress
      timeouts.push(setTimeout(() => setProgress(15), 2500));
      timeouts.push(setTimeout(() => setProgress(30), 3000));
      timeouts.push(setTimeout(() => setProgress(45), 3500));

      // After 4.5s, go back to playlist
      timeouts.push(setTimeout(() => {
        setActiveView("playlist");
        setIsPlaying(false);
        setProgress(0);
      }, 4500));

      // Click second song
      timeouts.push(setTimeout(() => {
        setActiveSongIndex(2);
        setActiveView("player");
        setIsPlaying(true);
      }, 6000));

      timeouts.push(setTimeout(() => setProgress(20), 6500));
      timeouts.push(setTimeout(() => setProgress(40), 7000));

      // Back to playlist and restart
      timeouts.push(setTimeout(() => {
        setActiveView("playlist");
        setIsPlaying(false);
        setProgress(0);
      }, 8000));

      timeouts.push(setTimeout(() => run(), 10000));
    };
    run();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const activeSong = songs[activeSongIndex];

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
        <div className="rounded-2xl bg-[hsl(260_20%_5%)] border border-[hsl(0_0%_12%)] shadow-[0_20px_50px_-12px_hsl(0_0%_0%/0.5)] overflow-hidden">
          <AnimatePresence mode="wait">
            {activeView === "playlist" ? (
              <motion.div
                key="playlist"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PlaylistView
                  songs={songs}
                  activeSongIndex={activeSongIndex}
                  isPlaying={isPlaying}
                />
              </motion.div>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <PlayerView song={activeSong} progress={progress} isPlaying={isPlaying} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Playlist View ──
const PlaylistView = ({
  songs,
  activeSongIndex,
  isPlaying,
}: {
  songs: typeof import("./AnimatedPlayer").default extends never ? never : any[];
  activeSongIndex: number;
  isPlaying: boolean;
}) => {
  const activeSong = isPlaying ? songs[activeSongIndex] : null;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-2.5 relative">
        <ArrowLeft className="w-4 h-4 text-white absolute left-4" strokeWidth={2} />
        <span className="text-[10px] font-semibold text-white">Playlist</span>
      </div>

      {/* Cover area */}
      <div className="relative h-28 flex items-end px-4 pb-3 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0_0%_20%)] to-[hsl(260_20%_5%)]" />
        {/* Faded logo/watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <div className="w-24 h-24 rounded-full border-4 border-white/30" />
        </div>
        <div className="relative z-10">
          <h3 className="text-sm font-bold text-white leading-tight">
            As preferidas da Oi Balde 🔥
          </h3>
          <span className="text-[9px] text-[hsl(0_0%_55%)]">12 guias</span>
        </div>
      </div>

      {/* Reproduzir button */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl py-2 cursor-pointer">
          <Play className="w-3 h-3 text-white fill-white" />
          <span className="text-[10px] font-bold text-white">Reproduzir Playlist</span>
        </div>
      </div>

      {/* Colaboradores */}
      <div className="px-4 pt-2 pb-1">
        <span className="text-[9px] text-[hsl(0_0%_60%)] font-medium">Colaboradores</span>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          <div>
            <span className="text-[8px] text-white font-medium">@brunosucesso</span>
            <br />
            <span className="text-[7px] text-green-400">Administrador(a)</span>
          </div>
        </div>
      </div>

      {/* Guias da playlist header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1.5">
        <span className="text-[9px] text-[hsl(0_0%_60%)] font-medium">Guias da playlist</span>
        <div className="flex items-center gap-1 bg-[hsl(0_0%_18%)] rounded-full px-2 py-0.5">
          <span className="text-[7px] text-[hsl(0_0%_55%)]">↕ A-Z</span>
        </div>
      </div>

      {/* Song list */}
      <div className="px-3 pb-2">
        {songs.map((song, i) => (
          <motion.div
            key={song.id}
            className="flex items-center gap-2 py-2 px-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <span className="text-[9px] text-[hsl(0_0%_40%)] w-3 text-center font-medium">{i + 1}</span>
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${song.coverGradient} shrink-0 flex items-center justify-center shadow-md overflow-hidden`}>
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold text-white truncate leading-tight">{song.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[7px] text-[hsl(0_0%_42%)] flex items-center gap-0.5">
                  <Play className="w-2 h-2 fill-current" /> {song.plays}
                </span>
                <span className="text-[7px] text-[hsl(0_0%_42%)] flex items-center gap-0.5">
                  <Heart className="w-2 h-2" /> {song.hearts}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini player bar at bottom */}
      <AnimatePresence>
        {activeSong && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="flex items-center gap-2 px-3 py-2 bg-[hsl(260_15%_10%)] border-t border-[hsl(0_0%_12%)]"
          >
            <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${activeSong.coverGradient} shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-bold text-white truncate">{activeSong.title}</p>
              <p className="text-[7px] text-[hsl(0_0%_45%)]">Bruno Sucesso</p>
              <div className="w-full h-[1.5px] bg-[hsl(0_0%_20%)] rounded-full mt-0.5 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "15%" }} />
              </div>
            </div>
            <button className="text-white/60">
              <span className="text-[10px]">✕</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Player View ──
const PlayerView = ({
  song,
  progress,
  isPlaying,
}: {
  song: (typeof songs)[0];
  progress: number;
  isPlaying: boolean;
}) => {
  const elapsed = Math.floor((progress / 100) * 97);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col">
      {/* Cover art background */}
      <div className={`relative h-44 bg-gradient-to-br ${song.coverGradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(260_20%_5%)]" />
        {/* Collapse arrow */}
        <div className="absolute top-3 left-4">
          <ChevronDown className="w-5 h-5 text-white/80" />
        </div>
        {/* Song info */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-[5px] text-white font-bold">✓</span>
            </div>
            <span className="text-[7px] text-green-400 font-medium">Guia 100% disponível</span>
          </div>
          <h3 className="text-base font-bold text-white">{song.title}</h3>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-2">
        <div className="w-full h-[3px] bg-[hsl(0_0%_18%)] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(216, 100%, 50%), hsl(270, 70%, 55%))" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[7px] text-[hsl(0_0%_45%)]">{timeStr}</span>
          <span className="text-[7px] text-[hsl(0_0%_45%)]">{song.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 py-3 px-4">
        <Repeat className="w-3.5 h-3.5 text-[hsl(0_0%_40%)]" />
        <LayoutList className="w-3.5 h-3.5 text-[hsl(0_0%_40%)]" />
        <SkipBack className="w-4 h-4 text-white/70" />
        <motion.div
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
          animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-black fill-black" />
          ) : (
            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
          )}
        </motion.div>
        <SkipForward className="w-4 h-4 text-white/70" />
        <Share2 className="w-3.5 h-3.5 text-[hsl(0_0%_40%)]" />
        <Heart className="w-3.5 h-3.5 text-[hsl(0_0%_40%)]" />
      </div>

      {/* Tags */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[7px] text-[hsl(0_0%_40%)] uppercase tracking-wider">Tags</span>
          <div className="flex gap-1 flex-wrap">
            {song.tags.map((tag) => (
              <span
                key={tag}
                className="text-[7px] px-2 py-0.5 rounded-full bg-[hsl(0_0%_18%)] text-[hsl(0_0%_65%)] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Compositores */}
      <div className="px-4 pb-2">
        <span className="text-[8px] text-[hsl(0_0%_60%)] font-medium">Compositores</span>
        <div className="flex items-center gap-2 mt-1">
          {song.compositores.map((comp) => (
            <div key={comp} className="flex items-center gap-1 bg-[hsl(0_0%_15%)] rounded-full px-2 py-1">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
              <span className="text-[7px] text-white font-medium">{comp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats card */}
      <div className="mx-4 mb-2 rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_15%)] p-3">
        <div className="flex items-center justify-end gap-3 mb-1.5">
          <span className="text-[7px] text-[hsl(0_0%_45%)] flex items-center gap-0.5">
            <Play className="w-2.5 h-2.5 fill-current" /> {song.plays}
          </span>
          <span className="text-[7px] text-[hsl(0_0%_45%)] flex items-center gap-0.5">
            <Heart className="w-2.5 h-2.5" /> {song.hearts}
          </span>
        </div>
        <div className="space-y-0.5">
          <p className="text-[7px] text-[hsl(0_0%_50%)]">
            Estilo: <span className="text-white font-medium">Sertanejo</span>
          </p>
          <p className="text-[7px] text-[hsl(0_0%_50%)]">
            Cadastrada em: <span className="text-white font-medium">02/12/2025</span>
          </p>
        </div>
      </div>

      {/* Trecho da letra */}
      <div className="mx-4 mb-3 rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_15%)] p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[9px] font-bold text-[hsl(0_0%_70%)]">aA</span>
          <span className="text-[8px] text-white font-medium">Trecho da letra</span>
        </div>
        <p className="text-[7px] text-[hsl(0_0%_40%)] italic">Letra não informada...</p>
      </div>
    </div>
  );
};

export default AnimatedPlayer;
