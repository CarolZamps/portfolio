"use client";

import { motion, useReducedMotion } from "motion/react";
import { stickerHover, stickerIn } from "./stickerMotion";

/** Emoji como sticker die-cut: cola suavemente quando entra na tela. */
export function EmojiSticker({
  emoji,
  index = 0,
  rotate = -6,
  className = "",
  hint,
}: {
  emoji: string;
  /** Ordem de colagem quando há vários juntos. */
  index?: number;
  rotate?: number;
  className?: string;
  /** Easter egg: recado em letra de mão que aparece no hover/foco. */
  hint?: string;
}) {
  const reduce = useReducedMotion();
  const enter = stickerIn(rotate, index, 0.3, reduce);
  const sticker = (
    <motion.span
      aria-hidden
      className={`die-cut inline-block leading-none ${className}`}
      initial={enter.initial}
      whileInView={{ ...enter.target, transition: enter.transition }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      whileHover={stickerHover(reduce)}
    >
      {emoji}
    </motion.span>
  );

  if (!hint) return sticker;

  // O filtro die-cut fica só no emoji; a dica é irmã dele, pra não ganhar borda.
  return (
    <span
      tabIndex={0}
      aria-label={hint}
      className="group relative inline-block cursor-default outline-none"
    >
      {sticker}
      <span
        aria-hidden
        className="pointer-events-none absolute top-full right-0 z-20 mt-1 translate-y-[-4px] font-hand text-xl font-bold whitespace-nowrap text-ink-muted opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        ↳ {hint}
      </span>
    </span>
  );
}
