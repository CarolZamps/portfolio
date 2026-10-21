"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { SolutionBlock } from "@/data/projects";
import { AutoVideo } from "./AutoVideo";

/**
 * Seção "Diana consultora, dentro do setup": texto em duas colunas, um palco largo com os
 * vídeos do desktop e do celular lado a lado, e três cartões que mostram o valor
 * (responsivo, design system, fluidez de uso). Os visuais dos cartões são ilustrativos.
 */

/** Um mesmo chat que encolhe e estica: o componente se adapta a qualquer largura. */
function ResponsiveDemo() {
  return (
    <div className="sol-resp" role="img" aria-label="O mesmo chat se ajustando de uma tela larga para uma estreita">
      <div className="sol-resp-frame">
        <div className="sol-resp-head">
          <i />
          <b />
        </div>
        <span className="sol-resp-msg in">Como cadastro minha conta?</span>
        <span className="sol-resp-msg out">Te explico aqui mesmo.</span>
        <div className="sol-resp-input" />
      </div>
    </div>
  );
}

/** Tokens em vez de valores soltos: cor, tipografia, espaçamento e raio. */
function TokensDemo() {
  const rows = [
    { k: "cor", v: <span className="sol-sw"><i style={{ background: "var(--color-cta)" }} /><i style={{ background: "var(--color-accent)" }} /><i style={{ background: "var(--color-ink)" }} /></span>, t: "color.brand" },
    { k: "texto", v: <span className="font-display text-2xl leading-none font-semibold">Aa</span>, t: "font.display" },
    { k: "espaço", v: <span className="sol-sp"><i /><i /><i /></span>, t: "space.scale" },
    { k: "raio", v: <span className="sol-rad" />, t: "radius.card" },
  ];
  return (
    <ul className="sol-tokens" aria-label="Tokens do design system: cor, texto, espaço e raio">
      {rows.map((r) => (
        <li key={r.k}>
          <span className="sol-tk">{r.k}</span>
          <span className="sol-tv">{r.v}</span>
          <code>{r.t}</code>
        </li>
      ))}
    </ul>
  );
}

/** A Diana sugere as perguntas da etapa em que o parceiro está. */
const STEPS = [
  { etapa: "Financeiro", q: ["Como cadastro minha conta?", "Quando recebo os repasses?"] },
  { etapa: "Cardápio", q: ["Como subo meus itens?", "Posso importar uma planilha?"] },
  { etapa: "Horário", q: ["Como defino meus dias?", "E feriados?"] },
];

function ContextFlow() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!visible || reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % STEPS.length), 2400);
    return () => window.clearInterval(t);
  }, [visible, reduce]);

  const step = STEPS[i];
  return (
    <div ref={box} className="sol-flow" role="img" aria-label="Em cada etapa do setup, a Diana sugere as perguntas daquele assunto">
      <div className="sol-flow-steps">
        {STEPS.map((s, k) => (
          <span key={s.etapa} className={k === i ? "on" : ""}>
            {s.etapa}
          </span>
        ))}
      </div>
      <div key={step.etapa} className="sol-flow-q">
        {step.q.map((q) => (
          <span key={q}>{q}</span>
        ))}
      </div>
    </div>
  );
}

const VISUALS = { responsive: ResponsiveDemo, system: TokensDemo, flow: ContextFlow } as const;

export function Solution({ block }: { block: SolutionBlock }) {
  return (
    <div className="space-y-10 md:space-y-14">
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
        <h2 className="text-3xl font-semibold md:text-4xl">
          {block.title.split("\n").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-ink-muted md:text-xl">
          {block.text.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>
      </div>

      {/* palco largo e preto (como o do vídeo do ícone): o celular sobrepõe o desktop; paddings diferentes dão ar de colagem */}
      <div
        className="rounded-card bg-black pt-6 pr-3 pb-3 pl-4 shadow-note md:pt-9 md:pr-5 md:pb-5 md:pl-8"
      >
        <div className="relative">
          <div
            className="ml-auto w-[76%] overflow-hidden rounded-2xl bg-surface ring-1 ring-white/10 md:w-[80%]"
            style={{ aspectRatio: "1040 / 874" }}
          >
            <AutoVideo name={block.desktop.video} alt={block.desktop.alt} className="size-full object-cover" />
          </div>
          <div
            className="absolute bottom-0 left-0 z-10 w-[34%] overflow-hidden rounded-[1.6rem] bg-surface shadow-2xl ring-1 ring-white/20 md:w-[27%]"
            style={{ aspectRatio: "424 / 924" }}
          >
            <AutoVideo name={block.mobile.video} alt={block.mobile.alt} className="size-full object-cover" />
          </div>
        </div>
      </div>

      <ul className="grid items-stretch gap-6 md:grid-cols-3">
        {block.cards.map((c) => {
          const Visual = VISUALS[c.visual];
          return (
            <li key={c.title} className="flex flex-col rounded-card bg-surface p-5 shadow-note">
              <div className="mb-5 grid h-52 place-items-center overflow-hidden rounded-2xl bg-paper ring-1 ring-line">
                <Visual />
              </div>
              <span className="w-fit rounded-chip bg-accent px-3 py-1 text-xs font-bold tracking-wide uppercase">{c.label}</span>
              <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-ink-muted">{c.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
