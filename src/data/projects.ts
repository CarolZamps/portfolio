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
  /** Imagem (ou o poster, quando é vídeo). */
  src: string;
  alt: string;
  width: number;
  height: number;
  frame: Frame;
  /** Nome-base do vídeo em /projetos/diana (gera .webm e .mp4, poster = `src`). */
  video?: string;
  /** Segundo vídeo por cima (ex.: o celular sobre o desktop). Medidas em px na base do frame. */
  overlay?: { video: string; alt: string; x: number; y: number; w: number; h: number };
};

export type Stat = {
  /** Texto fixo. Se houver `count`, o número é animado e `value` é ignorado. */
  value?: string;
  label: string;
  sub?: string;
  count?: { to: number; decimals?: number; prefix?: string; suffix?: string };
};

export type Step = {
  label: string;
  title: string;
  text: string;
  shot?: Shot;
  /** Simulação em CSS no lugar de imagem/vídeo (ver Sims.tsx). */
  visual?: "terminal" | "launcher";
};

export type StoryBlock =
  /** Texto corrido, com título, eyebrow e chips opcionais. */
  | {
      kind: "text";
      eyebrow?: string;
      title?: string;
      text: string[];
      chips?: string[];
      /** Visual ao lado do texto (número em destaque ou tela/vídeo). */
      aside?: { stat?: Stat; shot?: Shot; visual?: "whatsapp" };
    }
  /** Uma imagem larga, ou várias lado a lado. */
  | { kind: "media"; shots: Shot[]; caption?: string }
  /** Texto de um lado, tela do outro. */
  | { kind: "split"; title?: string; text: string[]; shot: Shot; flip?: boolean }
  /** Números em destaque (com contagem animada, se pedir). */
  | { kind: "stats"; items: Stat[] }
  /** Cartões em sequência (passos do processo, papéis, aprendizados). */
  | { kind: "steps"; title?: string; items: Step[]; caption?: string }
  /** Diagrama animado da arquitetura (nomes ilustrativos). */
  | { kind: "diagram"; title?: string; text: string[]; caption?: string }
  /** Linha do tempo horizontal (vertical no celular), sem cartões. */
  | { kind: "timeline"; title?: string; items: Omit<Step, "shot" | "visual">[] }
  /** Aviso em destaque, estilo post-it. */
  | { kind: "note"; label?: string; text: string }
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
  /** Capa do card na home (imagem). */
  cover?: Shot;
  /** Capa no topo da página do case, se for diferente da do card (ex.: vídeo). */
  hero?: Shot;
  /** Mostra o atalho escondido pro deck (site.deckPath) no fim do case. */
  deck?: boolean;
  story: StoryBlock[];
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

/** Vídeo em /projetos/diana: o poster vira o `src`; `frame` segue a mesma receita dos prints. */
const clip = (
  video: string,
  alt: string,
  width: number,
  height: number,
  frame: [number, number, string, number, number, number, number],
  overlay?: NonNullable<Shot["overlay"]>,
): Shot => ({
  ...shot(`/projetos/diana/${video}-poster.jpg`, alt, width, height, frame),
  video,
  overlay,
});

const shot = (
  src: string,
  alt: string,
  width: number,
  height: number,
  [w, h, bg, x, y, iw, ih]: [number, number, string, number, number, number, number],
): Shot => ({ src, alt, width, height, frame: { w, h, bg, x, y, iw, ih } });

export const projects: Project[] = [
  {
    slug: "diana-no-portal",
    title: "Diana no Portal",
    company: "iFood",
    year: "2026",
    scope: "Product Design",
    summary: "Um agente de WhatsApp que passou a ajudar parceiros dentro do portal de cadastro.",
    highlight: "feito inteiro com vibe coding, por designers",
    color: "pink",
    deck: true,
    // capa do card: frame do portal, sangrando pela direita e por baixo
    cover: shot("/projetos/diana/portal-poster.jpg", "Portal de ativação de parceiros do iFood, com as seis etapas de configuração", 1300, 794, [641, 440, "var(--color-cta)", 48, 56, 700, 427.6]),
    // topo do case: o mesmo portal, em vídeo
    hero: clip("portal", "Gravação do portal de ativação: o parceiro avança pelas seis etapas", 1300, 794, [641, 420, "var(--color-accent)", 56, 52, 700, 427.6]),
    story: [
      {
        kind: "text",
        eyebrow: "O contexto",
        title: "Ninguém vende antes de terminar o setup",
        text: [
          "Todo parceiro novo do iFood passa por um portal de ativação. São seis etapas obrigatórias, cerca de 40 minutos de configuração, antes da loja ir ao ar.",
        ],
        chips: ["Pagamento · 1 min", "Entrega · 10 min", "Horário · 5 min", "Minha loja · 5 min", "Financeiro · 10 min", "Cardápio · 10 min", "Conclusão"],
        aside: { stat: { value: "~40 min", label: "de configuração, em 6 etapas obrigatórias", sub: "antes da loja ir ao ar" } },
      },
      {
        kind: "text",
        eyebrow: "O problema",
        title: "E, quando travava, ele travava sozinho",
        text: [
          "Entrevistas e forms recorrentes no produto apontavam falta de suporte durante a ativação: a mesma dor, pesquisa após pesquisa.",
          "O portal oferecia um FAQ estático, no rodapé da tela, sem nenhum canal para tirar dúvida no momento em que ela aparece.",
          "A leitura: o parceiro não desistia por falta de vontade. Ele parava numa dúvida que ninguém estava lá para responder.",
        ],
        aside: {
          stat: {
            count: { to: 17258 },
            label: "sessões web sem nenhuma ajuda em tempo real",
            sub: "entre janeiro e março de 2026",
          },
        },
      },
      {
        kind: "text",
        eyebrow: "A oportunidade",
        title: "A ajuda já existia. Só não estava onde a dúvida acontecia.",
        text: [
          "A Diana é o agente de onboarding do iFood. Ela já funcionava como canal autônomo de captação e cadastro, e também respondia dúvidas sobre a plataforma.",
          "Tudo isso acontecia só pelo WhatsApp, fora do fluxo de quem estava configurando a loja. Quem estava no portal, no meio do setup, não alcançava nada disso.",
        ],
        aside: { visual: "whatsapp" },
      },
      {
        kind: "text",
        eyebrow: "A hipótese",
        title: "E se a Diana morasse dentro do portal?",
        text: [
          "Se a inteligência da Diana estivesse dentro do portal, o parceiro resolveria a dúvida sem sair do fluxo e chegaria ao primeiro pedido mais rápido e com mais qualidade.",
          "O obstáculo: pelo roadmap normal levaria meses para entrar na fila de desenvolvimento, e exigiria alinhar a prioridade de dois times. O portal e a Diana são times separados, com backlogs próprios.",
        ],
      },
      {
        kind: "text",
        eyebrow: "A aposta do time",
        title: "Total Football",
        text: [
          "Na Vibe Coding Week, o time testou uma ideia: com IA, o mesmo profissional atua em mais de uma área sem perder a profundidade da sua especialidade. Designer entra em código, engenharia entra em design.",
          "Para mim não era experimento novo. Eu já vinha subindo código no produto, adequando componentes ao design system e ajustando conteúdo direto na interface. A semana só abriu espaço para ir mais longe.",
        ],
        aside: {
          shot: clip("campo", "Campo de futebol: profissionais do time de um lado, desafios do outro", 1400, 800, [641, 366, "var(--color-accent)", 0, 0, 641, 366]),
        },
      },
      {
        kind: "diagram",
        title: "Antes de construir, entender a arquitetura com quem a construiu",
        text: [
          "O webchat do portal reaproveita o mesmo endpoint da Diana. Um roteador decide pelo canal: no webchat, a resposta é síncrona e pula os agentes especializados, indo direto para a revisão.",
          "A mudança no core foi de cerca de 15 linhas, retrocompatível e testada. A rota pelo gateway foi feita pela engenharia.",
        ],
        caption: "diagrama simplificado, com nomes ilustrativos",
      },
      {
        kind: "steps",
        title: "Meu processo",
        items: [
          {
            label: "01 · Figma",
            title: "Esboço no Figma",
            text: "Estados, hierarquia e comportamento definidos antes de qualquer linha de código. É aqui que eu decido o que o componente precisa fazer.",
            shot: clip("figma", "Gravação do esboço do webchat no Figma", 1300, 846, [300, 200, "var(--color-note-5)", 18, 22, 340, 221]),
          },
          {
            label: "02 · Claude Code",
            title: "Tradução no Claude Code",
            text: "O esboço vira contexto. O componente nasce dentro dos padrões do repositório, lendo a documentação que o próprio time escreveu.",
            visual: "terminal",
          },
          {
            label: "03 · Microinterações",
            title: "Refino das microinterações",
            text: "Transição, brilho e resposta ao hover, ajustados iteração a iteração até o gesto parecer natural.",
            visual: "launcher",
          },
        ],
        caption: "o vídeo do passo 1 é uma gravação real do Figma; os passos 2 e 3 são simulações do processo",
      },
      {
        kind: "steps",
        title: "Quem fez o quê",
        items: [
          {
            label: "Eu",
            title: "Front-end, design e microinterações",
            text: "A interface do webchat e o comportamento de cada estado, codados com Claude Code.",
          },
          {
            label: "Outro designer",
            title: "Back-end",
            text: "Roteamento por canal e o contrato de API para o time do portal.",
          },
          {
            label: "Engenharia",
            title: "Revisão e a rota no gateway",
            text: "A camada de gateway, mais delicada, ficou com quem tem a profundidade para isso.",
          },
        ],
      },
      {
        kind: "timeline",
        title: "Cinco dias, do zero ao MVP",
        items: [
          { label: "Dia 1", title: "Entender", text: "A arquitetura, com os devs que a construíram." },
          { label: "Dias 2 a 4", title: "Construir", text: "Front e back, e os merge requests abertos." },
          { label: "Dia 5", title: "MVP rodando", text: "Internamente, já usável." },
          { label: "Depois", title: "Iterar", text: "Ajustes finos da engenharia." },
        ],
      },
      {
        kind: "note",
        label: "o inédito",
        text: "Eu já abria merge request em ajustes pontuais. Aqui foi uma funcionalidade nova inteira, da concepção à produção, construída por designers.",
      },
      {
        kind: "split",
        title: "Tem alguém ali, não um FAQ",
        text: [
          "A solução começa no gesto: o ícone de dúvida vira a Diana quando o mouse se aproxima. É o convite, antes de qualquer conversa.",
        ],
        shot: clip("icone", "O ícone de dúvida se transforma na Diana quando o mouse se aproxima", 720, 720, [600, 600, "var(--color-ink)", 0, 0, 600, 600]),
      },
      {
        kind: "split",
        flip: true,
        title: "Diana consultora, dentro do setup",
        text: [
          "O ícone de ajuda vira a Diana quando o parceiro passa o mouse.",
          "Quick questions por etapa: no financeiro ela sugere perguntas de financeiro, no cardápio sugere perguntas de cardápio.",
          "A mesma base do WhatsApp, agora com resposta síncrona e adaptada ao portal.",
        ],
        shot: clip(
          "diana-desktop",
          "A Diana conversando com um parceiro dentro do portal, no desktop e no celular",
          1040,
          874,
          [641, 520, "var(--color-note-3)", 112, 50, 500, 420.4],
          { video: "diana-mobile", alt: "A mesma conversa no celular", x: 22, y: 150, w: 150, h: 308 },
        ),
      },
      {
        kind: "text",
        eyebrow: "Resultados · teste A/B, base crescente (30/30 → 50/50) · 26.08 a 21.09",
        title: "Um setup com mais qualidade leva o parceiro à primeira venda",
        text: [],
      },
      {
        kind: "stats",
        items: [
          {
            count: { to: 1.6, decimals: 2, prefix: "+", suffix: " p.p." },
            label: "Ativado → 1º pedido",
            sub: "51,00% para 52,68%",
          },
          {
            count: { to: 100, prefix: "~" },
            label: "primeiros pedidos incrementais no período",
            sub: "impacto absoluto",
          },
        ],
      },
      {
        kind: "text",
        text: [
          "O que mudou foi a qualidade do setup, e isso apareceu na etapa seguinte: mais parceiros chegando à primeira venda.",
          "Portal → 1º pedido: +1,10 p.p. Portal → Ativado: 0,00 p.p. Foram 5.470 parceiros no controle e 5.522 na variante, medidos no painel oficial.",
        ],
      },
      {
        kind: "steps",
        title: "O que eu tirei disso",
        items: [
          {
            label: "01",
            title: "A fronteira ficou invisível, a profundidade não",
            text: "Consigo construir e subir código. A rota no gateway continua sendo da engenharia, e saber onde eu paro é parte do trabalho.",
          },
          {
            label: "02",
            title: "Qualidade de código com IA não se garante na revisão",
            text: "Tiramos as boas práticas da cabeça dos devs e viramos documentação. Quem entrou depois no time herdou o padrão.",
          },
          {
            label: "03",
            title: "O gargalo migrou",
            text: "Antes o difícil era construir. Agora é decidir o que vale construir, e isso continua sendo decisão de produto e design.",
          },
          {
            label: "04",
            title: "Dois times, um atalho",
            text: "O que destravou não foi só a ferramenta. Foi conseguir provar a hipótese sem disputar a prioridade de dois backlogs.",
          },
        ],
      },
    ],
    tools: [
      { name: "Figma", logo: "/stickers/figma.svg", emoji: "🎨", note: "esboço do webchat", color: "lilac" },
      { name: "Claude Code", logo: "/stickers/claudecode.svg", emoji: "🤖", note: "front-end e microinterações", color: "yellow" },
      { name: "GitLab", logo: "/stickers/gitlab.svg", emoji: "🦊", note: "MRs abertos por designers", color: "mint" },
    ],
  },
  {
    slug: "ativacao-de-parceiros",
    title: "Ativação de parceiros",
    company: "iFood",
    year: "2026",
    scope: "Product Design",
    summary: "Da jornada de cadastro ao primeiro pedido de novos parceiros.",
    highlight: "case em construção",
    color: "yellow",
    status: "soon",
    story: [],
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
    tools: [
      figma,
      dovetail,
      maze,
      {
        name: "Framer",
        logo: "/stickers/framer.svg",
        emoji: "🪄",
        note: "landing pages no-code e muito mais",
        color: "yellow",
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
