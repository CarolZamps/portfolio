"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A Diana só existia aqui: conversa de WhatsApp, fora do portal. A conversa acontece
 * quando o celular entra na tela (digitando… → mensagem → resposta → digitando… → mensagem)
 * e recomeça se sair e voltar. Sem JS ou com reduzir movimento, aparece inteira.
 * Estilos em globals.css (.wa).
 */
type Step =
  | { kind: "typing"; at: number }
  | { kind: "in" | "out"; at: number; text: string; time: string };

const SCRIPT: Step[] = [
  { kind: "typing", at: 400 },
  { kind: "in", at: 1600, text: "Oi, tudo bem? Aqui é a Diana do iFood. Como posso te ajudar?", time: "11:14" },
  { kind: "out", at: 3200, text: "Estou com dúvidas para conseguir montar o meu cardápio. Você pode me ajudar com isso?", time: "11:15" },
  { kind: "typing", at: 4200 },
  { kind: "in", at: 5600, text: "Claro, consigo sim. Pode me contar qual é a sua dúvida, que eu vou te dar o suporte necessário.", time: "11:16" },
];

export function WhatsAppPhone() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  // Nasce completo (HTML estático); ao entrar na tela, zera e toca
  const [n, setN] = useState(SCRIPT.length);

  useEffect(() => {
    if (reduce) {
      setN(SCRIPT.length);
      return;
    }
    if (!inView) return;
    setN(0);
    const timers = SCRIPT.map((s, i) => window.setTimeout(() => setN(i + 1), s.at));
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduce]);

  const pop = {
    initial: reduce ? false : { opacity: 0, y: 16, height: 0, marginTop: 0 },
    animate: { opacity: 1, y: 0, height: "auto", marginTop: 10 },
    exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.2 } },
    transition: { duration: 0.45, ease: [0.2, 0.7, 0.3, 1] as const },
  };

  return (
    <div
      ref={ref}
      className="wa"
      role="img"
      aria-label="Conversa no WhatsApp: a Diana se apresenta, o parceiro pede ajuda para montar o cardápio e ela se oferece para dar o suporte"
    >
      <div className="wa-head">
        <span className="wa-back">‹</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projetos/diana/diana-av.png" alt="" width={64} height={64} />
        <span className="wa-name">
          <b>
            Diana · iFood <i className="wa-vfy">✓</i>
          </b>
          <span>online</span>
        </span>
      </div>
      <div className="wa-body">
        <AnimatePresence initial={false}>
          {SCRIPT.slice(0, n).map((s, i) =>
            s.kind === "typing" ? (
              // o "digitando…" só existe até a mensagem seguinte chegar
              i === n - 1 && (
                <motion.div key={`t${i}`} className="wa-msg in wa-typing" aria-hidden {...pop}>
                  <span />
                  <span />
                  <span />
                </motion.div>
              )
            ) : (
              <motion.div key={`m${i}`} className={`wa-msg ${s.kind}`} {...pop}>
                {s.text}
                <i>{s.time}</i>
              </motion.div>
            ),
          )}
        </AnimatePresence>
      </div>
      <div className="wa-foot">
        <span>Mensagem</span>
        <em>↑</em>
      </div>
    </div>
  );
}
