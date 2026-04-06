import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";



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

const extractArtists = (hits: string[]): string[] => {
  const artists = new Set<string>();
  hits.forEach((hit) => {
    const parts = hit.split(" - ");
    if (parts.length > 1) {
      // Split by comma to get individual artists from collabs
      parts[0].split(",").forEach((a) => {
        const trimmed = a.trim();
        if (trimmed) artists.add(trimmed);
      });
    }
  });
  return Array.from(artists).slice(0, 6);
};

const composers: Composer[] = [
  {
    name: "Waleria Leão",
    streams: "8.7B",
    photo: composerWaleria,
    hits: [
      "Zezé Di Camargo e Luciano - A Ferro e Fogo",
      "Marília Mendonça, Tayrone - Cé Tá Preparada",
      "Matheus e Kauan - Cronômetro",
      "Danilo e Davi - Mudou O Texto",
      "Gusttavo Lima - Cara da Derrota",
      "Zé Neto e Cristiano - Cadeira de Aço, Bebi Minha Bicicleta",
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
      "Wesley Safadão, Marília Mendonça - Ninguém é de Ferro",
      "Marília Mendonça - Eu Sei de Cor",
      "Henrique e Juliano - De Trás Pra Frente",
      "Maiara e Maraisa - 10%",
      "Danilo e Davi - Apaga Apaga Apaga",
      "Felipe Araújo, Jorge e Mateus - Chave Cópia",
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
      "Gusttavo Lima - Termina Comigo Antes",
      "Simone Mendes - Você Mereceu",
      "Marília Mendonça - Estranho",
      "Mari Fernandez - Pé na Rua",
      "Jorge e Mateus - Paradigmas",
      "Murilo Huff, Maiara e Maraisa - Perfeito Pra Ficar Sozinho",
      "Hugo e Guilherme - Auto Controle",
      "Diego e Victor Hugo, Raí Saia Rodada - Pisadinha",
      "Xand Avião, Zé Vaqueiro - Superação Digital",
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
      "Zé Neto e Cristiano - Alô Ambev",
      "Danilo e Davi - Apaga Apaga Apaga",
      "Gustavo Mioto, Mc Don Juan - Quando Apaga a Luz",
      "Felipe Amorim, Hugo e Guilherme - Querendo e Não Podendo",
      "Murilo Huff, Henrique e Juliano - Desejando Eu",
      "Henrique e Juliano - Eterno Replay",
      "Marília Mendonça, Luíza e Maurílio - Furando o Sinal",
      "Diego e Victor Hugo - Sinal de Oração",
      "Luan Santana, Fernando e Sorocaba - Meu Melhor Lugar",
      "Matheus e Kauan - Amanhã",
      "Zé Felipe, Virginia - Tranquilita",
      "Dilsinho, Avine Vinny - Me Valoriza",
    ],
  },
  {
    name: "Rodrigo Reys",
    streams: "5.1B",
    photo: composerRodrigoReys,
    hits: [
      "Murilo Huff - Mitos e Verdades",
      "Zé Neto e Cristiano - Estado Decadente, Derreter Essa Aliança, Me Bloqueia",
      "Mari Fernandez - Para de Me Assistir",
      "Dilsinho, Matheus Fernandes - Baby Me Atende",
      "Tierry - Chorei No Cabaré",
      "Tarcísio do Acordeon - Meu Sonho",
      "Hugo e Guilherme - Auto Controle",
      "Henrique e Juliano - Mentiroso Eu",
      "Marília Mendonça, Murilo Huff - Frieza",
      "Gusttavo Lima - Bloqueado",
    ],
  },
  {
    name: "Marcolino",
    streams: "4.5B",
    photo: composerMarcolino,
    hits: [
      "Ana Castela, Luan Santana - DEJA VU",
      "Matheus e Kauan - A Nossa Praia, Oitava Dose",
      "Diego e Victor Hugo - A Culpa é do Meu Grau",
      "Dilsinho - Dog, Ninguém",
      "Simone Mendes, Guilherme e Benuto - Manda um Oi",
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
      "Henrique e Juliano - Quem Ama Sempre Entende, Cuida Bem Dela",
      "Zé Neto e Cristiano - Abaixa o Som",
      "Jorge e Mateus - O Que Eu Taba Falando",
      "Marcos e Belutti - Câmera Lenta",
      "Panda - Desapego",
      "Luiza Martins - Descontando Traição",
      "João Neto e Frederico - Cê Acredita, Eu Nem Me Reconheço",
      "Maiara e Maraisa - Show Completo",
      "Felipe Araújo - Big Bang",
    ],
  },
  {
    name: "Lucas Ing",
    streams: "4.1B",
    photo: composerLucasIng,
    hits: [
      "Jorge e Mateus - Cantada Boba",
      "Henrique e Juliano - Alô Inveja, Ce Me Conhece Eu Me Conheço",
      "Ana Castela - Fronteira",
      "Luan Santana, Luan Pereira - Eu Sou Sentimento",
      "Simone Mendes - Contra O Mundo",
      "Matheus e Kauan - Me Ama Mesmo",
      "Hugo e Guilherme, Guilherme e Benuto - Haja Colírio",
      "Israel e Rodolfo, Hugo e Guilherme - Amor Não Dá em Copo",
    ],
  },
  {
    name: "Elan Rubio",
    streams: "3.8B",
    photo: composerElan,
    hits: [
      "Zé Neto e Cristiano - Oi Balde",
      "Henrique e Juliano - Eterno Replay",
      "Danilo e Davi - Mudou O Texto, Substituto",
      "Murilo Huff, Henrique e Juliano - Desejando Eu",
      "Gusttavo Lima - Saudade Fudida",
      "Nattan, Ana Castela - Pega Cabuloso",
      "Matheus e Kauan - Expectativa x Realidade",
      "Maiara e Maraisa, Murilo Huff - Perfeito Pra Ficar Sozinho",
      "Juliette, Silva - Labirinto",
      "Jorge e Mateus - Hit do Ano, Endereço",
      "Hugo e Guilherme - Quer Terminar Termina",
    ],
  },
  {
    name: "Leo Soares",
    streams: "3.6B",
    photo: composerLeoSoares,
    hits: [
      "Israel e Rodolfo - Batom de Cereja, Arruma um Bão",
      "Ana Castela, Israel e Rodolfo - Bombonzinho",
      "Simone Mendes, Hugo Henrique - Quem Melhor Do Que nós Dois",
      "Henrique e Juliano - Acordo",
      "Hugo e Guilherme - Elevador",
    ],
  },
  {
    name: "Dan Candido",
    streams: "3.5B",
    photo: composerDanCandido,
    hits: [
      "Henrique e Juliano - Quase Algo, Amigo da Minha Saudade, Novo Eu",
      "Gustavo Mioto - Eu Fujo",
      "Matheus e Kauan, Felipe e Rodrigo - Próximo Amor",
      "Luan Santana - MEIO TERMO",
      "Zé Neto e Cristiano - Um Mês e Pouco",
      "Gusttavo Lima, Ana Castela - Canudinho",
      "Mari Fernandez, NATTAN - Comunicação Falhou",
      "Jorge e Mateus - Louca Pra ficar",
      "Diego e Victor Hugo - Bestasexual",
    ],
  },
  {
    name: "Edu Valim",
    streams: "2.8B",
    photo: composerEduValim,
    hits: [
      "Henrique e Juliano - Sala de Espera, Meia Metade",
      "Marília Mendonça, Henrique e Juliano - Sabiá",
      "Jorge e Mateus, Gustavo Mioto - Anti Amor",
      "Jorge e Mateus - Se o Amor Tiver Lugar",
      "Gustavo Mioto - Com ou Sem Mim",
      "Grupo Menos é Mais, Luíza Sonza - Memórias",
      "Lauana Prado, Zé Neto e Cristiano - Sombra Desconhecida",
      "Cristiano Araújo - Por Que",
      "Simone Mendes - 400 Fios",
      "Hugo e Guilherme, Kamisa 10 - Seu Santo É forte",
    ],
  },
  {
    name: "Marcello Henrique",
    streams: "2.7B",
    photo: composerMarcello,
    hits: [
      "Murilo Huff, Henrique e Juliano - Desejando Eu",
      "Luan Pereira, Kaique e Felipe - Vacilona",
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
      "Matheus e Kauan, Ana Castela - Ilusão de Ótica",
      "Matheus e Kauan - Não Recomendo",
      "Marília Mendonça - Ausência",
      "Murilo Huff, Marília Mendonça - Uma Ex",
    ],
  },
  {
    name: "Jeff da Sanfona",
    streams: "2.0B",
    photo: composerJeff,
    hits: [
      "Danilo e Davi - Apaga Apaga Apaga, Mudou o Texto",
      "Nattan, Diego e Victor Hugo - Andar de Baixo",
      "Léo Santana, Mc Don Juan, Mari Fernandez - Áudio Que Te Entrega",
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
      "Lauana Prado, Diego e Arnaldo - Desconhecido",
      "Zé Neto e Cristiano - Dubai",
      "Felipe e Rodrigo - Problemão",
      "Marília Mendonça, Maiara e Maraisa - Você Não Manda em Mim",
    ],
  },
  {
    name: "Elias Mafra",
    streams: "766M",
    photo: composerElias,
    hits: [
      "Guilherme e Benuto, Luan Santana - Quarto 67",
      "Maiara e Maraisa, Yasmin Santos - Solteira De Corpo",
      "Simone Mendes, Yasmin Santos - Nem a Pau",
      "Ana Castela, Guilherme e Benuto - Mesma Língua",
      "Lauana Prado - Você Humilha",
      "Hugo e Guilherme, Iguinho e Lulinha - Pilantrou",
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

const ComposerCarouselCard = ({
  composer,
}: {
  composer: Composer;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const artists = extractArtists(composer.hits);

  return (
    <div className="flex-shrink-0 w-[240px] sm:w-[280px] lg:w-[320px]">
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
        <div className="relative aspect-square overflow-hidden">
          {composer.photo ? (
            <motion.img
              src={composer.photo}
              alt={composer.name}
              className="w-full h-full object-cover"
              loading="lazy"
              style={{ imageRendering: "auto" }}
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${getAvatarColor(composer.name)} flex items-center justify-center`}>
              <span className="text-5xl font-bold text-white/60 font-display select-none">
                {getInitials(composer.name)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        <div className="px-4 pt-3 pb-2 text-center">
          <h3 className="font-bold text-base truncate">{composer.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            STREAMS{" "}
            <span className="text-primary font-semibold">{composer.streams}</span>
          </p>
        </div>

        {artists.length > 0 && (
          <div className="px-0 pb-4 overflow-hidden">
            <div className="border-t border-border pt-3 mx-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center mb-3">
                Artistas
              </p>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap gap-4">
                {[...artists, ...artists].map((artist, i) => (
                  <span
                    key={`${artist}-${i}`}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground shrink-0"
                  >
                    <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${getAvatarColor(artist)} flex items-center justify-center shrink-0`}>
                      <span className="text-[8px] font-bold text-white/80 select-none">
                        {getInitials(artist)}
                      </span>
                    </span>
                    {artist}
                  </span>
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

const Composers = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const updateTrackWidth = () => {
      if (!trackRef.current) return;
      setTrackWidth(trackRef.current.scrollWidth);
    };

    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);

    if (typeof ResizeObserver === "undefined") {
      return () => {
        window.removeEventListener("resize", updateTrackWidth);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updateTrackWidth();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTrackWidth);
    };
  }, []);

  const animationDuration = trackWidth > 0 ? Math.max(trackWidth / 90, 32) : 32;

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
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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

        <div className="relative">
          <div className="overflow-hidden py-8" style={{ touchAction: "pan-y" }}>
            <div
              className="w-full"
              style={{
                paddingLeft: "max(1.5rem, calc((100vw - 320px) / 2))",
                paddingRight: "max(1.5rem, calc((100vw - 320px) / 2))",
              }}
            >
              <motion.div
                className="flex w-max"
                style={{ willChange: "transform" }}
                animate={trackWidth > 0 ? { x: [0, -trackWidth] } : { x: 0 }}
                transition={{
                  duration: animationDuration,
                  ease: "linear",
                  repeat: Infinity,
                }}
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
              </motion.div>
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

