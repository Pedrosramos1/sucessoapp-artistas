import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Heart } from "lucide-react";

const songs = [
  { title: "Selfie com o Futuro", artist: "João Machado", genre: "Pop", duration: "3:42", color: "from-purple-500/30 to-blue-500/20" },
  { title: "Beijo na Testa", artist: "Bruno Sucesso", genre: "Sertanejo", duration: "3:18", color: "from-orange-500/30 to-red-500/20" },
  { title: "Noite de Verão", artist: "Rebeka Lins", genre: "Pop", duration: "4:01", color: "from-pink-500/30 to-purple-500/20" },
  { title: "Coração Blindado", artist: "Guth", genre: "Sertanejo", duration: "3:55", color: "from-blue-500/30 to-cyan-500/20" },
  { title: "Céu de Diamante", artist: "Mãozinha", genre: "Pop", duration: "3:29", color: "from-emerald-500/30 to-teal-500/20" },
];

const AnimatedPlayer = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set([0, 2]));

  // Auto-advance songs
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSong((s) => (s + 1) % songs.length);
          return 0;
        }
        return prev + 0.8;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  const handleNext = () => {
    setCurrentSong((s) => (s + 1) % songs.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSong((s) => (s - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  const song = songs[currentSong];

  return (
    <motion.div
      className="flex-1 max-w-sm w-full mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-3xl bg-[hsl(240_15%_8%)] border border-white/10 shadow-[0_25px_60px_-12px_hsl(0_0%_0%/0.5)] overflow-hidden">
        <div className="pt-6 px-5 pb-5 flex flex-col">
            {/* Header */}
            <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium mb-3 text-center">
              Músicas sob encomenda
            </p>

            {/* Now Playing Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSong}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className={`rounded-2xl bg-gradient-to-br ${song.color} border border-white/10 p-4 mb-4`}
              >
                {/* Album art placeholder */}
                <div className="w-full aspect-square rounded-xl bg-white/5 mb-3 flex items-center justify-center overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center z-10">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-white/20"
                      animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  {/* Visualizer bars */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-[3px]">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] rounded-full bg-primary/60"
                        animate={{
                          height: isPlaying
                            ? [4, Math.random() * 20 + 6, 4]
                            : 4,
                        }}
                        transition={{
                          duration: 0.4 + Math.random() * 0.4,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">{song.title}</p>
                    <p className="text-white/50 text-xs mt-0.5">{song.artist}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => {
                      setLiked((prev) => {
                        const next = new Set(prev);
                        if (next.has(currentSong)) next.delete(currentSong);
                        else next.add(currentSong);
                        return next;
                      });
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${liked.has(currentSong) ? "text-red-400 fill-red-400" : "text-white/30"}`}
                    />
                  </motion.button>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white/60 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-white/30">
                      {Math.floor((progress / 100) * 3)}:{String(Math.floor(((progress / 100) * 220) % 60)).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-white/30">{song.duration}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <motion.button whileTap={{ scale: 0.8 }} onClick={handlePrev}>
                <SkipBack className="w-5 h-5 text-white/50" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 rounded-full bg-primary flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </motion.button>
              <motion.button whileTap={{ scale: 0.8 }} onClick={handleNext}>
                <SkipForward className="w-5 h-5 text-white/50" />
              </motion.button>
            </div>

            {/* Playlist */}
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Próximas</p>
            <div className="flex-1 overflow-hidden space-y-1">
              {songs.map((s, i) => {
                if (i === currentSong) return null;
                return (
                  <motion.div
                    key={s.title}
                    layout
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => {
                      setCurrentSong(i);
                      setProgress(0);
                    }}
                  >
                    <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                      <Play className="w-3 h-3 text-white/40" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white/80 text-xs font-medium truncate">{s.title}</p>
                      <p className="text-white/30 text-[10px] truncate">{s.artist}</p>
                    </div>
                    <span className="text-[10px] text-white/20 shrink-0">{s.duration}</span>
                  </motion.div>
                );
              })}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedPlayer;
