import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Heart, Plus, Users } from "lucide-react";

const members = [
  { name: "Artista", initials: "AR", color: "bg-purple-500" },
  { name: "Produtor", initials: "PR", color: "bg-blue-500" },
  { name: "A&R", initials: "A&R", color: "bg-emerald-500" },
];

const songs = [
  { title: "Selfie com o Futuro", artist: "João Machado", duration: "3:42", addedBy: 0 },
  { title: "Beijo na Testa", artist: "Bruno Sucesso", duration: "3:18", addedBy: 1 },
  { title: "Noite de Verão", artist: "Rebeka Lins", duration: "4:01", addedBy: 2 },
  { title: "Coração Blindado", artist: "Guth", duration: "3:55", addedBy: 0 },
  { title: "Céu de Diamante", artist: "Mãozinha", duration: "3:29", addedBy: 1 },
  { title: "Fogo Cruzado", artist: "Nattan", duration: "3:12", addedBy: 2 },
];

const AnimatedPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set([0, 2, 4]));

  // Scroll-linked transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -40]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, -4]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.9, 1, 1, 0.95]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSong((s) => (s + 1) % songs.length);
          return 0;
        }
        return prev + 0.5;
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
      ref={containerRef}
      className="flex-1 max-w-md w-full mx-auto"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          y: cardY,
          rotateX: cardRotateX,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Glow effect behind card */}
        <motion.div
          className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/15 blur-2xl -z-10"
          style={{ opacity: glowOpacity }}
        />

        <div className="rounded-2xl bg-card border border-border shadow-[0_20px_50px_-12px_hsl(0_0%_0%/0.4)] overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-border/50">
            <div className="flex items-center justify-between mb-1">
              <div>
                <motion.p
                  className="text-foreground text-sm font-bold"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Playlist do Álbum
                </motion.p>
                <p className="text-muted-foreground text-xs mt-0.5">6 músicas · Colaborativa</p>
              </div>
              <div className="flex items-center -space-x-2">
                {members.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, scale: 0, x: 20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-7 h-7 rounded-full ${m.color} flex items-center justify-center text-[9px] font-bold text-white border-2 border-card`}
                    title={m.name}
                  >
                    {m.initials}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center border-2 border-card"
                >
                  <Plus className="w-3 h-3 text-muted-foreground" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Now Playing mini bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSong}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="px-5 py-3 bg-primary/5 border-b border-border/30"
            >
              <div className="flex items-center gap-3">
                {/* Visualizer */}
                <div className="flex items-end gap-[2px] h-8 w-8 shrink-0">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[4px] rounded-sm bg-primary"
                      animate={{
                        height: isPlaying ? [6, Math.random() * 26 + 8, 6] : 6,
                      }}
                      transition={{
                        duration: 0.45 + Math.random() * 0.35,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-xs font-semibold truncate">{song.title}</p>
                  <p className="text-muted-foreground text-[10px] truncate">{song.artist}</p>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button whileTap={{ scale: 0.75 }} whileHover={{ scale: 1.15 }} onClick={handlePrev}>
                    <SkipBack className="w-3.5 h-3.5 text-muted-foreground" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isPlaying ? "pause" : "play"}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isPlaying ? (
                          <Pause className="w-3.5 h-3.5 text-primary-foreground" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-primary-foreground ml-0.5" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.75 }} whileHover={{ scale: 1.15 }} onClick={handleNext}>
                    <SkipForward className="w-3.5 h-3.5 text-muted-foreground" />
                  </motion.button>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground/50 w-6 text-right font-mono">
                  {Math.floor((progress / 100) * 3)}:{String(Math.floor(((progress / 100) * 220) % 60)).padStart(2, "0")}
                </span>
                <div className="flex-1 h-[3px] bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground/50 w-6 font-mono">{song.duration}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Song list */}
          <div className="px-2 py-1.5">
            {songs.map((s, i) => {
              const isActive = i === currentSong;
              const member = members[s.addedBy];

              return (
                <motion.div
                  key={s.title}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.35 }}
                  whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)", scale: 1.01 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                  onClick={() => {
                    setCurrentSong(i);
                    setProgress(0);
                  }}
                >
                  <span className="text-[10px] text-muted-foreground w-4 text-right shrink-0 font-mono">
                    {isActive && isPlaying ? (
                      <motion.span
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="text-primary text-xs"
                      >
                        ♪
                      </motion.span>
                    ) : (
                      i + 1
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium truncate transition-colors ${isActive ? "text-primary" : "text-foreground"}`}>
                      {s.title}
                    </p>
                    <p className="text-muted-foreground text-[10px] truncate">{s.artist}</p>
                  </div>

                  <motion.div
                    className={`w-5 h-5 rounded-full ${member.color} flex items-center justify-center shrink-0`}
                    title={`Adicionado por ${member.name}`}
                    whileHover={{ scale: 1.3 }}
                  >
                    <span className="text-[7px] font-bold text-white">{member.initials}</span>
                  </motion.div>

                  <motion.button
                    whileTap={{ scale: 0.7 }}
                    whileHover={{ scale: 1.3 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLiked((prev) => {
                        const next = new Set(prev);
                        if (next.has(i)) next.delete(i);
                        else next.add(i);
                        return next;
                      });
                    }}
                    className="shrink-0"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-all ${
                        liked.has(i) ? "text-red-400 fill-red-400 scale-110" : "text-muted-foreground/30"
                      }`}
                    />
                  </motion.button>

                  <span className="text-[10px] text-muted-foreground/50 shrink-0 w-8 text-right font-mono">
                    {s.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px]">3 colaboradores online</span>
            </div>
            <div className="flex items-center gap-1.5">
              {members.map((m, i) => (
                <motion.div
                  key={m.name}
                  className={`w-2 h-2 rounded-full ${m.color}`}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPlayer;
