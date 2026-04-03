import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set([0, 2, 4]));

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
      className="flex-1 max-w-md w-full mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-2xl bg-card border border-border shadow-[0_20px_50px_-12px_hsl(0_0%_0%/0.4)] overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-foreground text-sm font-bold">Playlist do Álbum</p>
              <p className="text-muted-foreground text-xs mt-0.5">6 músicas · Colaborativa</p>
            </div>
            <div className="flex items-center -space-x-2">
              {members.map((m) => (
                <div
                  key={m.name}
                  className={`w-7 h-7 rounded-full ${m.color} flex items-center justify-center text-[9px] font-bold text-white border-2 border-card`}
                  title={m.name}
                >
                  {m.initials}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center border-2 border-card">
                <Plus className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Now Playing mini bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSong}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
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
                      height: isPlaying ? [6, Math.random() * 24 + 8, 6] : 6,
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.3,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-foreground text-xs font-semibold truncate">{song.title}</p>
                <p className="text-muted-foreground text-[10px] truncate">{song.artist}</p>
              </div>

              <div className="flex items-center gap-2">
                <motion.button whileTap={{ scale: 0.8 }} onClick={handlePrev}>
                  <SkipBack className="w-3.5 h-3.5 text-muted-foreground" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 text-primary-foreground" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-primary-foreground ml-0.5" />
                  )}
                </motion.button>
                <motion.button whileTap={{ scale: 0.8 }} onClick={handleNext}>
                  <SkipForward className="w-3.5 h-3.5 text-muted-foreground" />
                </motion.button>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-2 h-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Song list */}
        <div className="px-2 py-2 max-h-[280px] overflow-hidden">
          {songs.map((s, i) => {
            const isActive = i === currentSong;
            const member = members[s.addedBy];

            return (
              <motion.div
                key={s.title}
                layout
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                  isActive ? "bg-primary/10" : "hover:bg-secondary/50"
                }`}
                onClick={() => {
                  setCurrentSong(i);
                  setProgress(0);
                }}
              >
                <span className="text-[10px] text-muted-foreground w-4 text-right shrink-0 font-mono">
                  {isActive && isPlaying ? (
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="text-primary text-xs"
                    >
                      ♪
                    </motion.span>
                  ) : (
                    i + 1
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                    {s.title}
                  </p>
                  <p className="text-muted-foreground text-[10px] truncate">{s.artist}</p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full ${member.color} flex items-center justify-center shrink-0`}
                  title={`Adicionado por ${member.name}`}
                >
                  <span className="text-[7px] font-bold text-white">{member.initials}</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.8 }}
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
                    className={`w-3.5 h-3.5 transition-colors ${
                      liked.has(i) ? "text-red-400 fill-red-400" : "text-muted-foreground/30"
                    }`}
                  />
                </motion.button>

                <span className="text-[10px] text-muted-foreground/50 shrink-0 w-8 text-right">
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
          <div className="flex items-center gap-1">
            {members.map((m, i) => (
              <motion.div
                key={m.name}
                className={`w-2 h-2 rounded-full ${m.color}`}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedPlayer;
