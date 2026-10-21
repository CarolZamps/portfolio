"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Diagrama da arquitetura do case "Diana no Portal", com NOMES ILUSTRATIVOS
 * (gateway, /chat, roteador, agentes A a D). A ideia é a real: o webchat do portal
 * reaproveita o endpoint da Diana e, pelo canal, o roteador pula os agentes
 * especializados. Os rótulos de verdade ficam só no deck escondido.
 *
 * Sequência e tempos portados do deck (loop de 10,5 s). Estilos em globals.css (.arch-flow).
 */
const FLOW: [number, string[]][] = [
  [200, ["b-user"]],
  [700, ["l1", "t-post"]],
  [1350, ["n-api", "t-meta"]],
  [1750, ["l2"]],
  [2050, ["n-start"]],
  [2350, ["l3"]],
  [2700, ["n-ctx"]],
  [3000, ["l4"]],
  [3350, ["n-router"]],
  [3850, ["t-badge"]],
  [4300, ["l5", "g1", "g2", "n-spec"]],
  [4950, ["n-rev"]],
  [5250, ["l6"]],
  [5550, ["n-end"]],
  [5950, ["l7", "t-ret"]],
  [7000, ["b-bot"]],
];
const ALL = new Set(FLOW.flatMap(([, ids]) => ids));
const LOOP_MS = 10500;

export function ArchitectureDiagram() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const playRef = useRef<() => void>(() => {});
  // Nasce no estado final: o HTML já mostra o diagrama completo (sem JS, SEO, reduzir movimento).
  const [on, setOn] = useState<Set<string>>(ALL);

  const clear = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    clear();
    setOn(new Set());
    for (const [ms, ids] of FLOW) {
      timers.current.push(
        window.setTimeout(() => setOn((prev) => new Set([...prev, ...ids])), ms),
      );
    }
    timers.current.push(window.setTimeout(() => playRef.current(), LOOP_MS));
  }, [clear]);

  useEffect(() => {
    playRef.current = play;
  }, [play]);

  // Toca (em loop) só enquanto está na tela
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (reduce) {
      setOn(ALL);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else clear();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [reduce, play, clear]);

  const c = (id: string, base: string) => (on.has(id) ? `${base} on` : base);

  return (
    <div ref={box} className="relative">
      <svg
        className="arch-flow"
        viewBox="0 0 1000 365"
        role="img"
        aria-label="Fluxo da mensagem: do webchat no portal, pelo gateway, até o fluxo de agentes da Diana e de volta como resposta síncrona. Diagrama simplificado, com nomes ilustrativos."
      >
        <defs>
          <marker
            id="arch-ah"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto-start-reverse"
          >
            <path className="ah" d="M0,0 L10,5 L0,10 z" />
          </marker>
        </defs>

        {/* molduras */}
        <text className="zt" x="80" y="60" textAnchor="middle">PORTAL</text>
        <rect className="frame" x="10" y="72" width="140" height="150" rx="16" />
        <text className="sm" x="80" y="208">webchat no setup</text>

        <line className="gate" x1="190" y1="36" x2="190" y2="300" />
        <text className="zt" x="190" y="28" textAnchor="middle">GATEWAY</text>
        <text className="sm" x="190" y="316">de APIs</text>

        <rect className="frame dashed" x="225" y="45" width="760" height="255" rx="18" />
        <text className="zt" x="245" y="38" textAnchor="start">DIANA · fluxo de agentes</text>

        {/* balões do chat */}
        <g className={c("b-user", "bub")}>
          <rect className="user" x="50" y="92" width="84" height="26" rx="9" />
          <text x="92" y="109" className="nl on-dark">pergunta</text>
        </g>
        <g className={c("b-bot", "bub")}>
          <rect className="bot" x="22" y="158" width="100" height="30" rx="9" />
          <text x="72" y="177" className="nl small">resposta</text>
        </g>

        {/* ligações */}
        <path className={c("l1", "ln")} pathLength={1} d="M150,130 L236,130" />
        <path className={c("l2", "ln")} pathLength={1} d="M355,130 L369,130" />
        <path className={c("l3", "ln")} pathLength={1} d="M448,130 L461,130" />
        <path className={c("l4", "ln")} pathLength={1} d="M590,130 L603,130" />
        <path className={c("l5", "ln")} pathLength={1} d="M734,130 L785,130" />
        <path className={c("l6", "ln")} pathLength={1} d="M892,130 L905,130" />
        <path
          className={c("l7", "ln")}
          pathLength={1}
          d="M944,150 L944,318 Q944,332 930,332 L94,332 Q80,332 80,318 L80,230"
        />
        <path className={c("g1", "gh")} d="M672,148 C672,190 668,236 704,236" />
        <path className={c("g2", "gh")} d="M810,236 C842,236 842,195 842,148" />

        {/* nós */}
        <g className={c("n-api", "nd")}>
          <rect x="243" y="112" width="112" height="36" rx="10" />
          <text x="299" y="135" className="nl mono">/chat</text>
        </g>
        <g className={c("n-start", "nd")}>
          <rect x="376" y="112" width="72" height="36" rx="10" />
          <text x="412" y="135" className="nl">entrada</text>
        </g>
        <g className={c("n-ctx", "nd")}>
          <rect x="468" y="112" width="122" height="36" rx="10" />
          <text x="529" y="135" className="nl">contexto</text>
        </g>
        <g className={c("n-router", "nd key")}>
          <rect x="610" y="112" width="124" height="36" rx="10" />
          <text x="672" y="135" className="nl">roteador</text>
        </g>
        <g className={c("n-rev", "nd")}>
          <rect x="792" y="112" width="100" height="36" rx="10" />
          <text x="842" y="135" className="nl">revisão</text>
        </g>
        <g className={c("n-end", "nd")}>
          <rect x="912" y="112" width="64" height="36" rx="10" />
          <text x="944" y="135" className="nl">saída</text>
        </g>

        {/* ramo do WhatsApp */}
        <g className={c("n-spec", "grp")}>
          <rect className="spec" x="700" y="210" width="114" height="60" rx="12" />
          <text x="729" y="232" className="sm">agente A</text>
          <text x="786" y="232" className="sm">agente B</text>
          <text x="729" y="254" className="sm">agente C</text>
          <text x="786" y="254" className="sm">agente D</text>
          <text x="757" y="288" className="sm">agentes especializados</text>
        </g>

        {/* decisão */}
        <g className={c("t-badge", "lb")}>
          <rect className="badge" x="606" y="78" width="132" height="24" rx="12" />
          <text x="672" y="94" className="nl small">canal = webchat</text>
        </g>

        {/* rótulos */}
        <text className={c("t-post", "sm lb strong")} x="167" y="120">POST</text>
        <text className={c("t-meta", "sm lb")} x="299" y="167">sessão · mensagem · canal</text>
        <text className={c("t-ret", "sm lb")} x="512" y="324">resposta síncrona</text>

        {/* legenda */}
        <g className="lb on">
          <line className="leg-portal" x1="14" y1="250" x2="36" y2="250" />
          <text className="sm start" x="42" y="254">fluxo do webchat</text>
          <line className="leg-wa" x1="14" y1="272" x2="36" y2="272" />
          <text className="sm start" x="42" y="276">fluxo do WhatsApp</text>
        </g>
      </svg>

      {!reduce && (
        <button
          type="button"
          onClick={play}
          className="absolute top-0 right-0 rounded-chip border border-line bg-surface px-3 py-1 text-sm font-semibold text-ink-muted transition-colors hover:border-cta hover:text-cta focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none"
        >
          ↻ Repetir
        </button>
      )}
    </div>
  );
}
