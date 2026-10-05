"use client";

import { motion, useReducedMotion } from "motion/react";
import { stickerHover, stickerIn } from "./stickerMotion";

/** Emoji como sticker die-cut: cola suavemente quando entra na tela. */
export function EmojiSticker({
  emoji,
  index = 0,
  rotate = -6,
  className = "",
}: {
  emoji: string;
  /** Ordem de colagem quando há vários juntos. */
  index?: number;
  rotate?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const enter = stickerIn(rotate, index, 0.3, reduce);
  return (
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
}
