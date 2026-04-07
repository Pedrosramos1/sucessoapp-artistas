import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { artistPhotos } from "./artistPhotos";


import composerWaleria from "@/assets/composer-waleria.jpg";
import composerHugoHenrique from "@/assets/composer-hugo-henrique.jpg";
import composerJeff from "@/assets/composer-jeff.jpg";
import composerIkaro from "@/assets/composer-ikaro.png";
import composerElias from "@/assets/composer-elias.jpg";
import composerDanillo from "@/assets/composer-danillo.png";
import composerDanielzao from "@/assets/composer-danielzao.jpg";
import composerElan from "@/assets/composer-elan.jpg";
import composerLeoSoares from "@/assets/composer-leo-soares.jpg";
import composerDanCandido from "@/assets/composer-dan-candido.jpg";
import composerEduValim from "@/assets/composer-edu-valim.jpg";
import composerMarcello from "@/assets/composer-marcello.jpg";
import composerBrunoCesar from "@/assets/composer-bruno-cesar.jpg";
import composerBrunoSucesso from "@/assets/composer-bruno-sucesso.jpg";
import composerRodrigoReys from "@/assets/composer-rodrigo-reys.jpg";
import composerMarcolino from "@/assets/composer-marcolino.jpg";
import composerLucasIng from "@/assets/composer-lucas-ing.jpg";

interface Composer {
  name: string;
  streams: string;
  hits: string[];
  photo?: string;
}


const composers: Composer[] = [
  {
    name: "Waleria Leão",
    streams: "8.7B",
    photo: composerWaleria,
    hits: [
      "Zezé Di Camargo e Luciano - A Ferro e Fogo",
      "Marília Mendonça - Cé Tá Preparada",
      "Matheus e Kauan - Cronômetro",
      "Danilo e Davi - Mudou O Texto",
      "Gusttavo Lima - Cara da Derrota",
      "Zé Neto e Cristiano - Cadeira de Aço",
      "Luan Santana - Mulher Segura",
      "Hugo e Guilherme - Fraca pra Beber",
      "Henrique e Juliano - Localiza Aí BB",
      "Wesley Safadão - Despedida",
      "Felipe Araújo - Amor da Sua Cama",
    ],
  },
  {
    name: "Danillo Davilla",
    streams: "6.5B",
    photo: composerDanillo,
    hits: [
      "Wesley Safadão - Ninguém é de Ferro",
      "Marília Mendonça - Eu Sei de Cor",
      "Henrique e Juliano - De Trás Pra Frente",
      "Maiara e Maraisa - 10%",
      "Danilo e Davi - Apaga Apaga Apaga",
      "Felipe Araújo - Chave Cópia",
      "Matheus e Kauan - Expectativa e Realidade",
      "Jorge e Mateus - Medida Certa",
      "Gabriel Diniz - Paraquedas",
    ],
  },
  {
    name: "Bruno Cesar",
    streams: "5.3B",
    photo: composerBrunoCesar,
    hits: [
      "Zé Neto e Cristiano - Oi Balde",
      "Gusttavo Lima - Termina Comigo Antes",
      "Simone Mendes - Você Mereceu",
      "Marília Mendonça - Estranho",
      "Mari Fernandez - Pé na Rua",
      "Jorge e Mateus - Paradigmas",
      "Murilo Huff - Perfeito Pra Ficar Sozinho",
      "Hugo e Guilherme - Auto Controle",
      "Diego e Victor Hugo - Pisadinha",
      "Xand Avião - Superação Digital",
      "Zé Felipe - Você e Eu",
      "Matheus e Kauan - Anticorpos",
      "Zezé Di Camargo - Amor Anestésico",
      "Wesley Safadão - Copo Meu",
    ],
  },
  {
    name: "Bruno Sucesso",
    streams: "5.2B",
    photo: composerBrunoSucesso,
    hits: [
      "Ana Castela - Chicletinho",
      "Zé Neto e Cristiano - Alô Ambev",
      "Danilo e Davi - Apaga Apaga Apaga",
      "Gustavo Mioto - Quando Apaga a Luz",
      "Felipe Amorim - Querendo e Não Podendo",
      "Murilo Huff - Desejando Eu",
      "Henrique e Juliano - Eterno Replay",
      "Marília Mendonça - Furando o Sinal",
      "Diego e Victor Hugo - Sinal de Oração",
      "Luan Santana - Meu Melhor Lugar",
      "Matheus e Kauan - Amanhã",
      "Zé Felipe - Tranquilita",
      "Dilsinho - Me Valoriza",
    ],
  },
  {
    name: "Rodrigo Reys",
    streams: "5.1B",
    photo: composerRodrigoReys,
    hits: [
      "João Gomes",
      "Murilo Huff - Mitos e Verdades",
      "Zé Neto e Cristiano - Estado Decadente",
      "Mari Fernandez - Para de Me Assistir",
      "Matheus Fernandes - Baby Me Atende",
      "Tierry - Chorei No Cabaré",
      "Tarcísio do Acordeon - Meu Sonho",
      "Hugo e Guilherme - Auto Controle",
      "Henrique e Juliano - Mentiroso Eu",
      "Marília Mendonça - Frieza",
      "Gusttavo Lima - Bloqueado",
    ],
  },
  {
    name: "Marcolino",
    streams: "4.5B",
    photo: composerMarcolino,
    hits: [
      "Luan Santana - Abalo Emocional",
      "Ana Castela - DEJA VU",
      "Matheus e Kauan - A Nossa Praia",
      "Diego e Victor Hugo - A Culpa é do Meu Grau",
      "Dilsinho - Ninguém",
      "Guilherme e Benuto - Manda um Oi",
      "Maiara e Maraisa - Coração Infectado",
      "Marília Mendonça - Tentativas",
    ],
  },
  {
    name: "Danielzão",
    streams: "4.2B",
    photo: composerDanielzao,
    hits: [
      "Diego e Victor Hugo - Tubarões",
      "Henrique e Juliano - Cuida Bem Dela",
      "Zé Neto e Cristiano - Abaixa o Som",
      "Jorge e Mateus - O Que Eu Tava Falando",
      "Marcos e Belutti - Câmera Lenta",
      "Panda - Desapego",
      "Luiza Martins - Descontando Traição",
      "João Neto e Frederico - Cê Acredita",
      "Maiara e Maraisa - Show Completo",
      "Felipe Araújo - Big Bang",
    ],
  },
  {
    name: "Lucas Ing",
    streams: "4.1B",
    photo: composerLucasIng,
    hits: [
      "Felipe e Rodrigo - Caos De Alguém",
      "Jorge e Mateus - Cantada Boba",
      "Henrique e Juliano - Alô Inveja",
      "Ana Castela - Fronteira",
      "Luan Santana - Eu Sou Sentimento",
      "Simone Mendes - Contra O Mundo",
      "Matheus e Kauan - Me Ama Mesmo",
      "Hugo e Guilherme - Haja Colírio",
      "Israel e Rodolfo - Amor Não Dá em Copo",
    ],
  },
  {
    name: "Elan Rubio",
    streams: "3.8B",
    photo: composerElan,
    hits: [
      "Zé Neto e Cristiano - Oi Balde",
      "Henrique e Juliano - Eterno Replay",
      "Danilo e Davi - Mudou O Texto",
      "Murilo Huff - Desejando Eu",
      "Gusttavo Lima - Saudade Fudida",
      "Nattan - Pega Cabuloso",
      "Matheus e Kauan - Expectativa x Realidade",
      "Maiara e Maraisa - Perfeito Pra Ficar Sozinho",
      "Juliette - Labirinto",
      "Jorge e Mateus - Hit do Ano, Endereço",
      "Hugo e Guilherme - Quer Terminar Termina",
    ],
  },
  {
    name: "Leo Soares",
    streams: "3.6B",
    photo: composerLeoSoares,
    hits: [
      "Israel e Rodolfo - Batom de Cereja",
      "Ana Castela - Bombonzinho",
      "Simone Mendes - Quem Melhor Do Que nós Dois",
      "Henrique e Juliano - Acordo",
      "Hugo e Guilherme - Elevador",
    ],
  },
  {
    name: "Dan Candido",
    streams: "3.5B",
    photo: composerDanCandido,
    hits: [
      "Henrique e Juliano - Quase Algo",
      "Gustavo Mioto - Eu Fujo",
      "Matheus e Kauan - Próximo Amor",
      "Luan Santana - MEIO TERMO",
      "Zé Neto e Cristiano - Um Mês e Pouco",
      "Gusttavo Lima - Canudinho",
      "Mari Fernandez - Comunicação Falhou",
      "Jorge e Mateus - Louca Pra ficar",
      "Diego e Victor Hugo - Bestasexual",
    ],
  },
  {
    name: "Edu Valim",
    streams: "2.8B",
    photo: composerEduValim,
    hits: [
      "Henrique e Juliano - Sala de Espera",
      "Marília Mendonça - Sabiá",
      "Gustavo Mioto - Anti Amor",
      "Jorge e Mateus - Se o Amor Tiver Lugar",
      "Gustavo Mioto - Com ou Sem Mim",
      "Grupo Menos é Mais - Memórias",
      "Lauana Prado - Sombra Desconhecida",
      "Cristiano Araújo - Por Que",
      "Simone Mendes - 400 Fios",
      "Hugo e Guilherme - Seu Santo É forte",
    ],
  },
  {
    name: "Marcello Henrique",
    streams: "2.7B",
    photo: composerMarcello,
    hits: [
      "Murilo Huff - Desejando Eu",
      "Kaique e Felipe - Vacilona",
      "Hugo e Guilherme - Quer Terminar Termina",
      "Henrique e Juliano - Gaiola",
      "Israel e Rodolffo - Só de Sacanagem",
      "Zé Neto e Cristiano - Fica Pra Dormir",
      "Guilherme e Benuto - Ciúme louco",
      "Felipe Araújo - Big Bang",
      "Felipe e Rodrigo - Caos de Alguém",
      "Zé Felipe - Mais Que Dólar",
    ],
  },
  {
    name: "Hugo Henrique",
    streams: "2.2B",
    photo: composerHugoHenrique,
    hits: [
      "Hugo Henrique - Mala",
      "Ana Castela - Ilusão de Ótica",
      "Matheus e Kauan - Não Recomendo",
      "Marília Mendonça - Ausência",
      "Murilo Huff - Uma Ex",
      "Hugo Henrique - Terminar Pra Que",
    ],
  },
  {
    name: "Jeff da Sanfona",
    streams: "2B",
    photo: composerJeff,
    hits: [
      "Danilo e Davi - Apaga Apaga Apaga",
      "Diego e Victor Hugo - Andar de Baixo",
      "Léo Santana - Áudio Que Te Entrega",
      "Henry Freitas - Porra de Love",
      "Wesley Safadão - Edinalva",
    ],
  },
  {
    name: "Ikaro",
    streams: "1.4B",
    photo: composerIkaro,
    hits: [
      "Diego e Victor Hugo - Tubarões",
      "Panda - Má Influência",
      "Lauana Prado - Desconhecido",
      "Zé Neto e Cristiano - Dubai",
      "Felipe e Rodrigo - Problemão",
      "Marília Mendonça - Você Não Manda em Mim",
    ],
  },
  {
    name: "Elias Mafra",
    streams: "766M",
    photo: composerElias,
    hits: [
      "Luan Santana - Quarto 67",
      "Maiara e Maraisa - Solteira De Corpo",
      "Yasmin Santos - Nem a Pau",
      "Ana Castela - Mesma Língua",
      "Lauana Prado - Você Humilha",
      "Iguinho e Lulinha - Pilantrou",
      "Matheus e Kauan - Amanhã",
      "Zé Neto e Cristiano - Até a Próxima Briga",
      "Bruno e Marrone - Chega De Nove Horas",
      "Dilsinho - Provocador De Lágrimas",
    ],
  },
];

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

const getInitials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const parseStreams = (str: string): { value: number; suffix: string } => {
  const match = str.match(/^([\d.]+)([BM]?)$/);
  if (!match) return { value: 0, suffix: "" };
  return { value: parseFloat(match[1]), suffix: match[2] };
};

const useCountUp = (target: number, duration: number, start: boolean) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!start) { setCurrent(0); return; }
    let startTime: number | null = null;
    let raf: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * target);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return current;
};

const extractArtistSongs = (hits: string[], max = 6): { artist: string; song: string }[] => {
  return hits
    .filter((h) => h.includes(" - "))
    .map((h) => {
      const parts = h.split(" - ");
      const songs = parts.slice(1).join(" - ").trim();
      const firstSong = songs.split(",")[0].trim();
      return { artist: parts[0].trim(), song: firstSong };
    })
    .slice(0, max);
};

const ComposerCarouselCard = ({
  composer,
}: {
  composer: Composer;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const { value: targetNum, suffix } = parseStreams(composer.streams);
  const animatedValue = useCountUp(targetNum, 1800, isInView);
  const artistSongs = extractArtistSongs(composer.hits);

  return (
    <div ref={cardRef} className="flex-shrink-0 w-[240px] sm:w-[280px] lg:w-[320px]">
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-border bg-card h-full flex flex-col"
        animate={{
          scale: isHovered ? 1.04 : 1,
          boxShadow: isHovered
            ? "0 24px 60px -18px hsl(var(--primary) / 0.24), 0 0 30px hsl(var(--accent) / 0.12)"
            : "0 12px 30px -24px hsl(var(--foreground) / 0.22)",
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center pt-5 pb-3 px-4 text-center gap-2">
          <motion.div
            className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-primary/30 shrink-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {composer.photo ? (
              <img
                src={composer.photo}
                alt={composer.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${getAvatarColor(composer.name)} flex items-center justify-center`}>
                <span className="text-2xl font-bold text-white/60 font-display select-none">
                  {getInitials(composer.name)}
                </span>
              </div>
            )}
          </motion.div>
          <h3 className="font-bold text-base truncate w-full">{composer.name}</h3>
          <p className="text-xs text-muted-foreground">
            STREAMS{" "}
            <span className="text-detail font-semibold drop-shadow-[0_0_8px_hsl(var(--detail)/0.6)]">
              {suffix === "M"
                ? `${Math.floor(animatedValue)}M`
                : `${animatedValue.toFixed(1)}B`}
            </span>
          </p>
        </div>

        {artistSongs.length > 0 && (
          <div className="px-0 pb-4 overflow-hidden">
            <div className="border-t border-border pt-3 mx-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center mb-3">
                Músicas
              </p>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap gap-5">
                {[...artistSongs, ...artistSongs].map((item, i) => (
                  <div
                    key={`${item.artist}-${i}`}
                    className="inline-flex flex-col items-center gap-1.5 shrink-0 min-w-[100px]"
                  >
                    {artistPhotos[item.artist] ? (
                      <img
                        src={artistPhotos[item.artist]}
                        alt={item.artist}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(item.artist)} flex items-center justify-center shrink-0`}>
                        <span className="text-[9px] font-bold text-white/80 select-none">
                          {getInitials(item.artist)}
                        </span>
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.artist}</span>
                    <div className="inline-flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-detail shrink-0"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z"/></svg>
                      <span className="text-[10px] text-foreground/70 whitespace-nowrap">{item.song}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 0 1px hsl(var(--primary) / 0.35)"
              : "inset 0 0 0 1px transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

const CARD_WIDTH_LG = 320;
const CARD_GAP = 24;
const CARD_STEP = CARD_WIDTH_LG + CARD_GAP;
const SPEED = 0.5; // px per frame

const Composers = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const updateTrackWidth = () => {
      if (!trackRef.current) return;
      setTrackWidth(trackRef.current.scrollWidth);
    };
    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateTrackWidth) : null;
    if (trackRef.current && ro) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", updateTrackWidth);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (trackWidth <= 0) return;
    const animate = () => {
      if (!pausedRef.current) {
        offsetRef.current -= SPEED;
        if (Math.abs(offsetRef.current) >= trackWidth) {
          offsetRef.current += trackWidth;
        }
        if (scrollRef.current) {
          scrollRef.current.style.transform = `translateX(${offsetRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trackWidth]);

  const jump = (dir: 1 | -1) => {
    offsetRef.current += dir * CARD_STEP;
    if (trackWidth > 0 && Math.abs(offsetRef.current) >= trackWidth) {
      offsetRef.current += trackWidth * (offsetRef.current < 0 ? 1 : -1);
    }
  };

  return (
    <>
      <section id="composers" className="relative py-16 md:py-28 overflow-hidden">
        <div className="relative px-4 max-w-6xl mx-auto mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-detail shrink-0" />
              Compositores na plataforma
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 md:mb-4">
              Juntos, somam mais de{" "}
              <span className="text-highlight">60 bilhões de visualizações</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              Mentes criadoras de hits que somam mais de 80 Bilhões de streamings.{" "}
              <span className="text-foreground font-medium">
                E agora um deles pode ser seu.
              </span>
            </p>
          </motion.div>
        </div>

        <div className="relative group">
          {/* Botão esquerda */}
          <button
            onClick={() => jump(1)}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-detail hover:text-white hover:border-detail transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* Botão direita */}
          <button
            onClick={() => jump(-1)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-detail hover:text-white hover:border-detail transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Próximo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <div
            className="overflow-hidden py-8"
            style={{ touchAction: "pan-y" }}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <div
              ref={scrollRef}
              className="flex w-max"
              style={{ willChange: "transform" }}
            >
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  ref={groupIndex === 0 ? trackRef : undefined}
                  className="flex gap-6 pr-6 shrink-0"
                  aria-hidden={groupIndex === 1}
                >
                  {composers.map((composer, i) => (
                    <ComposerCarouselCard
                      key={`${groupIndex}-${composer.name}-${i}`}
                      composer={composer}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-y-0 left-0 w-16 md:w-32 pointer-events-none z-10"
            style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-16 md:w-32 pointer-events-none z-10"
            style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
          />
        </div>
      </section>
    </>
  );
};

export default Composers;

