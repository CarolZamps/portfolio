"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** segundos */
  duration?: number;
};

/**
 * Número que conta de 0 até o valor quando entra na tela (pt-BR: vírgula decimal).
 * O HTML já nasce com o valor final (SEO e sem JS); com "reduzir movimento" fica nele.
 */
export function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1.4 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const format = (n: number) =>
    prefix +
    n.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
    suffix;

  const [text, setText] = useState(() => format(to));

  useEffect(() => {
    if (!inView || reduce) return;
    const fmt = (n: number) =>
      prefix +
      n.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
      suffix;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setText(fmt(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} aria-label={format(to)}>
      {text}
    </span>
  );
}
