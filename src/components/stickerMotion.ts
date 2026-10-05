import type { TargetAndTransition, Transition } from "motion/react";

/**
 * Animação de "colar" compartilhada por todos os stickers.
 * Leve de propósito: entra quase no lugar (pouca escala, poucos graus),
 * com mola macia sem quique perceptível, e intervalo curto entre eles.
 */
const STAGGER = 0.08;

export function stickerIn(rotate: number, index: number, baseDelay: number, reduce: boolean | null) {
  const initial: TargetAndTransition = reduce
    ? { opacity: 0 }
    : { opacity: 0, scale: 1.12, y: -6, rotate: rotate + 6 };
  const target: TargetAndTransition = { opacity: 1, scale: 1, y: 0, rotate };
  const transition: Transition = reduce
    ? { duration: 0.2, delay: baseDelay + index * 0.04 }
    : {
        type: "spring",
        stiffness: 220,
        damping: 26,
        mass: 0.6,
        delay: baseDelay + index * STAGGER,
        opacity: { duration: 0.25, delay: baseDelay + index * STAGGER },
      };
  return { initial, target, transition };
}

export const stickerHover = (reduce: boolean | null): TargetAndTransition | undefined =>
  reduce
    ? undefined
    : { scale: 1.06, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 22 } };
