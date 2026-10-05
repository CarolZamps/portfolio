"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
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
    <span role="img" aria-label={tool.name} className="text-6xl leading-none">
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

  const rotate = Math.round((seeded(tool.name, 7) - 0.5) * 24); // -12..12°
  const nudge = Math.round((seeded(tool.name, 13) - 0.5) * 28); // -14..14px (vertical)
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
      whileHover={lift && { ...lift, zIndex: 10 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
    >
      {hasTape && (
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 z-10 h-4 w-12 -translate-x-1/2 -rotate-6 bg-accent-soft/70"
        />
      )}

      {/* O filtro die-cut contorna tudo que está aqui dentro (logo, balão e pontinha). */}
      <div className={hover ? "die-cut-lift" : "die-cut"}>
        {tool.callout ? (
          <div
            className={`relative flex max-w-56 items-center gap-3 rounded-card px-4 py-3 ${noteBg[tool.color]}`}
          >
            <Mark tool={tool} size="h-10" />
            <span className="font-hand text-2xl leading-tight">{tool.note}</span>
            <span
              aria-hidden
              className={`absolute -bottom-2.5 left-7 size-6 rotate-45 rounded-note ${noteBg[tool.color]}`}
            />
          </div>
        ) : (
          <Mark tool={tool} size="h-16" />
        )}
      </div>

      {!tool.callout && (
        <motion.span
          aria-hidden={!hover}
          initial={false}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : -4 }}
          className="pointer-events-none absolute top-full left-0 mt-2 font-hand text-xl whitespace-nowrap text-ink-muted"
        >
          ↳ {tool.note}
        </motion.span>
      )}
    </motion.li>
  );
}
