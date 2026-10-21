"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Barras do teste A/B (Ativado → 1º pedido). Partem do zero, sem truncar o eixo,
 * pra não exagerar a diferença. As barras crescem quando entram na tela.
 */
const BARS = [
  { label: "Controle", value: "51,00%", pct: 51, n: "5.470 parceiros", tone: "bg-pattern" },
  { label: "Variante", value: "52,68%", pct: 52.68, n: "5.522 parceiros", tone: "bg-cta" },
] as const;

export function ABChart() {
  const reduce = useReducedMotion();
  return (
    <figure
      className="rounded-card bg-surface p-6 shadow-note"
      aria-label="Taxa de Ativado para primeiro pedido: 51,00% no controle e 52,68% na variante"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">Controle × variante</p>
        <span className="rounded-chip bg-cta px-3 py-1 text-sm font-bold whitespace-nowrap text-on-cta">+1,60 p.p.</span>
      </div>
      <div className="mt-6 flex items-end justify-center gap-10">
        {BARS.map((b, i) => (
          <div key={b.label} className="flex w-full max-w-36 flex-col items-center gap-1.5">
            <span className={`font-display text-2xl font-semibold ${i ? "text-cta" : ""}`}>{b.value}</span>
            <motion.i
              aria-hidden
              className={`block w-full origin-bottom rounded-t-xl rounded-b-sm ${b.tone}`}
              style={{ height: b.pct * 3 }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
            />
            <span className="mt-1 text-sm font-semibold">{b.label}</span>
            <span className="text-xs text-ink-muted">{b.n}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
