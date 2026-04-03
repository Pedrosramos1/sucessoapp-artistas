import { motion } from "framer-motion";
import { useState } from "react";
import { X, Music2, Play } from "lucide-react";

import composerWaleria from "@/assets/composer-waleria.png";
import composerHugoHenrique from "@/assets/composer-hugo-henrique.png";
import composerJeff from "@/assets/composer-jeff.png";
import composerIkaro from "@/assets/composer-ikaro.png";
import composerElias from "@/assets/composer-elias.png";
import composerDanillo from "@/assets/composer-danillo.png";
import composerDanielzao from "@/assets/composer-danielzao.png";
import composerElan from "@/assets/composer-elan.png";
import composerLeoSoares from "@/assets/composer-leo-soares.png";
import composerDanCandido from "@/assets/composer-dan-candido.png";
import composerEduValim from "@/assets/composer-edu-valim.png";
import composerMarcello from "@/assets/composer-marcello.png";

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
    hits: [
      "Zé Neto e Cristiano - Oi Balde, Estado Decadente, Deu Moral",
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
    hits: [
      "Ana Castela - Chicletinho",
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
    hits: [
      "João Gomes",
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
    hits: [
      "Luan Santana - Abalo Emocional, Aluga-se",
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
    hits: [
      "Felipe e Rodrigo - Caos De Alguém",
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

const row1 = composers.slice(0, Math.ceil(composers.length / 2));
const row2 = composers.slice(Math.ceil(composers.length / 2));

const ComposerCard = ({
  composer,
  onClick,
}: {
  composer: Composer;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="shrink-0 w-[220px] group cursor-pointer text-left"
  >
    <div
      className={`aspect-square rounded-2xl bg-gradient-to-br ${getAvatarColor(composer.name)} flex items-center justify-center relative overflow-hidden border border-border/50 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-[1.04] group-hover:shadow-lg group-hover:shadow-primary/15`}
    >
      {composer.photo ? (
        <img
          src={composer.photo}
          alt={composer.name}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{
            imageRendering: "auto",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        />
      ) : (
        <span className="text-4xl font-bold text-white/60 font-display select-none">
          {getInitials(composer.name)}
        </span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-[11px] text-white/80 font-medium">
          {composer.streams} streams
        </p>
      </div>
    </div>
    <div className="mt-2.5 px-0.5">
      <h3 className="font-semibold text-sm truncate group-hover:text-highlight transition-colors">
        {composer.name}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5">Compositor</p>
    </div>
  </button>
);

const ScrollRow = ({
  items,
  direction,
  onSelect,
  speed = 35,
}: {
  items: Composer[];
  direction: "left" | "right";
  onSelect: (c: Composer) => void;
  speed?: number;
}) => {
  const doubled = [...items, ...items];
  const animName = direction === "left" ? "scroll-left" : "scroll-right";

  return (
    <div className="relative overflow-hidden group/row">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-6 w-max"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {doubled.map((composer, i) => (
          <ComposerCard
            key={`${composer.name}-${i}`}
            composer={composer}
            onClick={() => onSelect(composer)}
          />
        ))}
      </div>
    </div>
  );
};

const Composers = () => {
  const [selected, setSelected] = useState<Composer | null>(null);

  return (
    <>
      <section id="composers" className="relative py-28 overflow-hidden">
        <div className="relative px-4 max-w-6xl mx-auto mb-16">
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
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Juntos, somam mais de{" "}
              <span className="text-highlight">60 bilhões de visualizações</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mentes criadoras de hits que somam mais de 80 Bilhões de streamings.{" "}
              <span className="text-foreground font-medium">
                E agora um deles pode ser seu.
              </span>
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          <ScrollRow items={row1} direction="left" onSelect={setSelected} speed={40} />
          <ScrollRow items={row2} direction="right" onSelect={setSelected} speed={45} />
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[80vh] rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 overflow-hidden"
          >
            <div className={`relative p-6 bg-gradient-to-br ${getAvatarColor(selected.name)}`}>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 overflow-hidden">
                  {selected.photo ? (
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: "auto" }}
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white font-display">
                      {getInitials(selected.name)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selected.name}</h3>
                  <p className="text-white/80 text-sm font-medium flex items-center gap-1.5">
                    <Music2 className="w-3.5 h-3.5" />
                    {selected.streams} streams • {selected.hits.length} hits
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium">
                Principais Hits
              </p>
              <ul className="space-y-1">
                {selected.hits.map((hit, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Play className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-sm text-secondary-foreground leading-snug">{hit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Composers;
