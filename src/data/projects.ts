/**
 * Conteúdo dos cases, contado como storytelling: blocos de texto e imagem intercalados.
 * Textos trazidos de carolinazampronio.com (com correções de gramática).
 * `summary`, `highlight` e os títulos dos blocos são sínteses editoriais.
 */

export type NoteColor = "yellow" | "pink" | "teal" | "mint" | "lilac";

export type Tool = {
  /** Só para acessibilidade (alt/aria); não aparece escrito no sticker. */
  name: string;
  /** Caminho do logo em /public/stickers. Sem logo → usa o emoji. */
  logo?: string;
  emoji: string;
  /** Anotação "escrita à mão": no hover, ou dentro do balão se callout. */
  note: string;
  color: NoteColor;
  /** Vira balão de fala com pontinha, com a nota escrita dentro. */
  callout?: boolean;
};

/**
 * Frame copiado do layout original (Framer), em px na largura de 641:
 * tamanho do frame, cor de fundo (cor da marca do produto) e retângulo da imagem.
 * A imagem pode vazar do frame (y negativo, ou passar da altura) para dar a
 * sensação de estar "saindo" dele.
 */
export type Frame = {
  w: number;
  h: number;
  bg: string;
  x: number;
  y: number;
  iw: number;
  ih: number;
};

export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  frame: Frame;
};

export type StoryBlock =
  /** Texto corrido, com título opcional. */
  | { kind: "text"; title?: string; text: string[] }
  /** Uma imagem larga, ou várias lado a lado. */
  | { kind: "media"; shots: Shot[]; caption?: string }
  /** Texto de um lado, tela do outro. */
  | { kind: "split"; title?: string; text: string[]; shot: Shot; flip?: boolean }
  /** Números em destaque. */
  | { kind: "stats"; items: { value: string; label: string }[] }
  /** Frase de impacto, escrita "à mão". */
  | { kind: "quote"; text: string };

export type Project = {
  slug: string;
  title: string;
  company: string;
  year: string;
  scope: string;
  summary: string;
  highlight: string;
  color: NoteColor;
  /** "soon" = card desabilitado, em construção, sem página de case. */
  status?: "soon";
  cover?: Shot;
  story: StoryBlock[];
  links: { label: string; href: string }[];
  tools: Tool[];
};

const figma: Tool = {
  name: "Figma",
  logo: "/stickers/figma.svg",
  emoji: "🎨",
  note: "UI e protótipos",
  color: "lilac",
};

const dovetail: Tool = {
  name: "Dovetail",
  logo: "/stickers/dovetail.svg",
  emoji: "🎙️",
  note: "pesquisa com usuários",
  color: "pink",
};

const maze: Tool = {
  name: "Maze",
  logo: "/stickers/maze.svg",
  emoji: "🧪",
  note: "testes de usabilidade",
  color: "teal",
};

const shot = (
  src: string,
  alt: string,
  width: number,
  height: number,
  [w, h, bg, x, y, iw, ih]: [number, number, string, number, number, number, number],
): Shot => ({ src, alt, width, height, frame: { w, h, bg, x, y, iw, ih } });

export const projects: Project[] = [
  {
    slug: "ifood",
    title: "Ativação de parceiros",
    company: "iFood",
    year: "2026",
    scope: "Product Design",
    summary: "Da jornada de cadastro ao primeiro pedido de novos parceiros.",
    highlight: "case em construção",
    color: "yellow",
    status: "soon",
    story: [],
    links: [],
    tools: [],
  },
  {
    slug: "monis-app",
    title: "Monis app",
    company: "Monis",
    year: "2021 – 2023",
    scope: "Product Design",
    summary:
      "Evolução de um produto early stage, da visão de savings para viagens.",
    highlight: "receita recorrente na casa dos 7 dígitos",
    color: "lilac",
    cover: shot("/projects/monis-app/01.png", "Telas do Monis app", 1572, 1146, [641, 490, "#703ffe", 10, 30, 631, 460]),
    story: [
      {
        kind: "text",
        title: "Contexto",
        text: [
          "O produto Monis app pertence à startup Monis, que vive um momento early stage. Entrei no produto logo após seu primeiro lançamento e pude desempenhar um papel importante na evolução.",
        ],
      },
      {
        kind: "split",
        title: "O lançamento",
        text: [
          "Junto com um time de negócios e tecnologia, no primeiro lançamento colocamos no ar uma funcionalidade que estabeleceu fluxo de receita anual recorrente na casa dos 7 dígitos.",
        ],
        shot: shot("/projects/monis-app/03.png", "Tela de configuração de depósitos recorrentes", 592, 928, [641, 508, "#703ffe", 173, 44, 296, 464]),
      },
      {
        kind: "stats",
        items: [
          { value: "7 dígitos", label: "de receita anual recorrente" },
          { value: "8 dígitos", label: "em volume total de pagamentos transacionados" },
        ],
      },
      {
        kind: "text",
        title: "O impacto",
        text: [
          "Também devido a esse lançamento, aumentamos exponencialmente o número de usuários e chegamos a um volume total de pagamentos transacionados da plataforma na casa dos 8 dígitos. Esses resultados aumentaram o tempo de vida da startup, deixando-a mais próxima do momento de breakeven.",
        ],
      },
      {
        kind: "split",
        title: "A virada para viagens",
        flip: true,
        text: [
          "Conduzi conversas valiosas com os usuários no decorrer da jornada, identificando suas necessidades para implementar funcionalidades relevantes.",
          "No processo de descoberta, lideramos a transição do produto de uma visão de savings para viagens, o que resultou em ajustes significativos no produto, adaptando-se para oferecer uma experiência alinhada com essa nova direção.",
        ],
        shot: shot("/projects/monis-app/02.png", "Tela de carregamento do app", 592, 927, [641, 508, "#703ffe", 173, 0, 296, 464]),
      },
      {
        kind: "media",
        shots: [shot("/projects/monis-app/04.png", "Mosaico de telas do Monis app", 1810, 1200, [641, 425, "#703ffe", 0, 0, 641, 425])],
        caption: "algumas das telas que desenhei ao longo da jornada",
      },
    ],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=br.com.monis",
      },
    ],
    tools: [figma, dovetail, maze],
  },
  {
    slug: "monis-viagens",
    title: "Monis Viagens",
    company: "Monis",
    year: "2023",
    scope: "Product Design",
    summary:
      "Landing page no-code para validar uma nova proposta de valor com baixo risco.",
    highlight: "acesso antecipado esgotado",
    color: "teal",
    cover: shot("/projects/monis-viagens/01.png", "Landing page Monis Viagens no desktop", 1760, 1190, [641, 430, "#ebf6ff", 10, 10, 621, 420]),
    story: [
      {
        kind: "text",
        title: "Contexto",
        text: [
          "No projeto \"Monis Viagens\", desempenhei um papel abrangente, desde a identificação das necessidades do usuário e a redução de riscos até a implementação da solução.",
        ],
      },
      {
        kind: "split",
        title: "Pesquisa primeiro",
        text: [
          "Começamos com uma pesquisa aprofundada para entender as dores dos usuários, que direcionou nossa abordagem no produto.",
        ],
        shot: shot("/projects/monis-viagens/03.png", "Seção Guarde, Simplifique, Viaje", 501, 1012, [641, 768, "#fff4d1", 130, 0, 380, 768]),
      },
      {
        kind: "text",
        title: "Validar sem pesar no time",
        text: [
          "Nesta etapa, como ainda havia um alto risco envolvido pela necessidade de validar a nova proposta de valor, optamos por uma solução que não onerasse nosso enxuto time de tecnologia, sem inflar nossa estrutura de custos, e que validasse nossas hipóteses reduzindo risco.",
        ],
      },
      {
        kind: "split",
        title: "Uma landing page no-code",
        flip: true,
        text: [
          "Assim, mergulhei no design de uma landing page, priorizando uma interface amigável e informativa, usando ferramentas no-code, visando coletar interesses e conversões no novo produto.",
        ],
        shot: shot("/projects/monis-viagens/02.png", "Landing page no mobile", 688, 952, [641, 279, "#ebf6ff", 231, 30, 180, 249]),
      },
      {
        kind: "split",
        title: "O resultado",
        text: [
          "Essa estratégia atraiu grande interesse dos usuários, forçando inclusive o fechamento do acesso antecipado devido à alta demanda.",
        ],
        shot: shot("/projects/monis-viagens/04.png", "Simulador de viagem", 828, 804, [641, 622, "#ccffe6", 0, 0, 641, 622]),
      },
      {
        kind: "quote",
        text: "Um projeto que transformou a landing page no epicentro do produto Monis Viagens.",
      },
      {
        kind: "media",
        shots: [shot("/projects/monis-viagens/05.png", "Landing page completa", 1508, 3290, [641, 1351, "#f2edff", 20, 20, 601, 1311])],
        caption: "a landing completa",
      },
    ],
    links: [{ label: "monis.com.br", href: "https://monis.com.br/" }],
    tools: [
      figma,
      dovetail,
      maze,
      {
        name: "Framer",
        logo: "/stickers/framer.svg",
        emoji: "🪄",
        note: "landing no-code",
        color: "yellow",
        callout: true,
      },
    ],
  },
  {
    slug: "start",
    title: "Start Empreendedor",
    company: "Start",
    year: "2021",
    scope: "Product Design",
    summary:
      "Arquitetura de site e roadmap de um ecossistema que orienta empreendedores.",
    highlight: "foco em conversão em vendas",
    color: "pink",
    cover: shot("/projects/start/01.png", "Home do site Start Empreendedor", 1472, 1122, [641, 482, "#5f6eff", 10, 10, 621, 472]),
    story: [
      {
        kind: "text",
        title: "Contexto",
        text: [
          "No projeto \"Start Empreendedor\", um ecossistema que orienta pessoas na jornada do empreendedorismo, trabalhando em colaboração com outros profissionais, participei ativamente de definições conceituais para alinhar estratégias, da gestão de stakeholders para garantir o envolvimento das partes interessadas e da gestão do roadmap para direcionar o desenvolvimento dos produtos oferecidos pelo projeto.",
        ],
      },
      {
        kind: "media",
        shots: [shot("/projects/start/04.png", "Página de curso online e mentorias", 1668, 911, [641, 427, "#ffab30", 10, 44, 621, 339])],
        caption: "produtos do ecossistema: cursos, mentorias e e-books",
      },
      {
        kind: "split",
        title: "Arquitetura que vende",
        flip: true,
        text: [
          "Além disso, concentrei meus esforços na estruturação da arquitetura do site, priorizando a organização e a navegação fluida, com foco na otimização da conversão em vendas dos produtos oferecidos.",
        ],
        shot: shot("/projects/start/03.png", "Página de produto no mobile", 579, 924, [641, 506, "#1dbf74", 171, 30, 298, 476]),
      },
      {
        kind: "media",
        shots: [
          shot("/projects/start/02.png", "Cards de serviços", 518, 944, [641, 506, "#5f6eff", 194, 44, 254, 462]),
          shot("/projects/start/05.png", "Página completa do site", 1472, 2893, [641, 1082, "#5f6eff", 68, 44, 506, 994]),
        ],
        caption: "do detalhe dos cards à página completa",
      },
    ],
    links: [
      { label: "startempreendedor.com", href: "https://startempreendedor.com/home-page" },
    ],
    tools: [figma],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Classes estáticas por cor (Tailwind precisa enxergar a string inteira). */
export const noteBg: Record<NoteColor, string> = {
  yellow: "bg-note-1",
  pink: "bg-note-2",
  teal: "bg-note-3",
  mint: "bg-note-4",
  lilac: "bg-note-5",
};
