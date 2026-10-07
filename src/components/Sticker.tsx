"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { noteBg, type Tool } from "@/data/projects";
import { stickerHover, stickerIn } from "./stickerMotion";

/** Hash simples → mesma "bagunça" a cada reload. */
function seeded(label: string, salt: number) {
  let h = salt;
  for (const ch of label) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return ((h >>> 0) % 1000) / 1000; // 0..1
}

function Mark({ tool, size }: { tool: Tool; size: string }) {
  if (tool.logo) {
    // eslint-disable-next-line @next/next/no-img-element -- SVG estático, sem otimização
    return <img src={tool.logo} alt={tool.name} className={`${size} w-auto`} draggable={false} />;
  }
  return (
    <span role="img" aria-label={tool.name} className="text-4xl leading-none">
      {tool.emoji}
    </span>
  );
}

type Props = {
  tool: Tool;
  index: number;
  /** Delay base antes do primeiro sticker colar (s). */
  baseDelay?: number;
};

export function Sticker({ tool, index, baseDelay = 0.15 }: Props) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  // A anotação do hover mede a si mesma e se desloca pra nunca vazar da tela.
  const noteRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);

  function keepNoteOnScreen() {
    const el = noteRef.current;
    if (!el) return;
    const margin = 12;
    const r = el.getBoundingClientRect();
    const left = r.left - shift;
    const right = r.right - shift;
    let next = 0;
    if (right > innerWidth - margin) next = innerWidth - margin - right;
    if (left + next < margin) next = margin - left;
    setShift(next);
  }

  const rotate = Math.round((seeded(tool.name, 7) - 0.5) * 24); // -12..12°
  const nudge = Math.round((seeded(tool.name, 13) - 0.5) * 10); // -5..5px (vertical)
  const hasTape = !tool.callout && index % 3 === 1;
  const enter = stickerIn(rotate, index, baseDelay, reduce);
  const lift = stickerHover(reduce);

  return (
    <motion.li
      className="relative list-none outline-none"
      style={{ top: nudge }}
      initial={enter.initial}
      // atraso só na entrada; ao sair do hover volta na hora
      whileInView={{ ...enter.target, transition: enter.transition }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      whileHover={lift && { ...lift, zIndex: 20 }}
      onHoverStart={() => {
        keepNoteOnScreen();
        setHover(true);
      }}
      onHoverEnd={() => setHover(false)}
      onFocus={() => {
        keepNoteOnScreen();
        setHover(true);
      }}
      onBlur={() => setHover(false)}
      tabIndex={0}
    >
      {hasTape && (
        <span
          aria-hidden
          className="absolute -top-2 left-1/2 z-10 h-3 w-8 -translate-x-1/2 -rotate-6 bg-accent-soft/70"
        />
      )}

      {/* O filtro die-cut contorna tudo que está aqui dentro (logo, balão e pontinha). */}
      <div className={hover ? "die-cut-lift" : "die-cut"}>
        {tool.callout ? (
          <div
            className={`relative flex max-w-44 items-center gap-2 rounded-card px-3 py-2 ${noteBg[tool.color]}`}
          >
            <Mark tool={tool} size="h-6" />
            <span className="font-hand text-lg leading-tight">{tool.note}</span>
            <span
              aria-hidden
              className={`absolute -bottom-1.5 left-5 size-4 rotate-45 rounded-[2px] ${noteBg[tool.color]}`}
            />
          </div>
        ) : (
          <Mark tool={tool} size="h-9" />
        )}
      </div>

      {!tool.callout && (
        <motion.span
          ref={noteRef}
          aria-hidden={!hover}
          initial={false}
          style={{ translate: `${shift}px 0` }}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : -4 }}
          className="pointer-events-none absolute top-full left-0 mt-1 w-max max-w-52 font-hand text-lg leading-tight text-ink-muted"
        >
          ↳ {tool.note}
        </motion.span>
      )}
    </motion.li>
  );
}
