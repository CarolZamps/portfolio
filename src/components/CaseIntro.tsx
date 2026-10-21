"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Abertura do case, portada da capa do deck: um cursor "Carol" desenha um frame de
 * Figma em volta do cabeçalho, o título é digitado e a segunda parte ganha marca-texto.
 * Sem JS (ou com reduzir movimento) a página nasce no estado final. Estilos em globals.css (.fi).
 * A sequência é guiada por classes c1..c9 no wrapper, como no deck.
 */
const ALL = ["anim", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];
const PAD = 26;

export function CaseIntro({
  meta,
  first,
  second,
  summary,
}: {
  meta: string;
  /** Primeira parte do título (digitada primeiro). */
  first: string;
  /** Segunda parte, com marca-texto. */
  second: string;
  summary: string;
}) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const cur = cursor.current;
    if (!el || !cur) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const timers: number[] = [];
    const reset = () => {
      timers.forEach(window.clearTimeout);
      el.classList.remove(...ALL);
    };

    // Estado final, sem animar: frame só no desktop
    if (reduce || !desktop) {
      el.classList.add(...(desktop ? ["c1", "c2", "c3"] : []), "c4", "c5", "c6", "c7", "c8");
      return reset;
    }

    const at = (x: number, y: number) => {
      cur.style.transform = `translate(${Math.round(x)}px,${Math.round(y)}px)`;
    };
    const rel = (target: Element | null, fn: (r: DOMRect, base: DOMRect) => [number, number]) => {
      if (!target) return [0, 0] as [number, number];
      return fn(target.getBoundingClientRect(), el.getBoundingClientRect());
    };
    const corners = () => ({
      tl: rel(el, (r, b) => [r.left - b.left - PAD, r.top - b.top - PAD]),
      br: rel(el, (r, b) => [r.right - b.left + PAD - 6, r.bottom - b.top + PAD - 8]),
      mid: rel(el, (r, b) => [r.right - b.left - 90, r.bottom - b.top + 10]),
      hl: rel(el.querySelector(".fi-hl"), (r, b) => [r.left - b.left - 12, r.bottom - b.top - 16]),
      meta: rel(el.querySelector(".fi-meta"), (r, b) => [r.left - b.left - 10, r.bottom - b.top - 14]),
    });

    el.querySelectorAll<HTMLElement>(".fi-tw").forEach((t) => {
      // ainda inline aqui: scrollWidth seria 0, então mede pelo retângulo
      t.style.setProperty("--w", `${Math.ceil(t.getBoundingClientRect().width) + 5}px`);
    });

    el.classList.add("anim");
    cur.style.transition = "none";
    const start = corners().mid;
    at(start[0], start[1]);
    void cur.offsetWidth;
    cur.style.transition = "";

    const run = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    run(240, () => {
      el.classList.add("c1");
      const [x, y] = corners().tl;
      at(x, y);
    });
    run(900, () => {
      el.classList.add("c2");
      const [x, y] = corners().br;
      at(x, y);
    });
    run(1620, () => el.classList.add("c3"));
    run(1900, () => el.classList.add("c4"));
    run(2900, () => {
      const [x, y] = corners().hl;
      at(x, y);
    });
    run(3250, () => el.classList.add("c5"));
    run(4000, () => el.classList.add("c6"));
    run(4420, () => {
      const [x, y] = corners().meta;
      at(x, y);
    });
    run(4760, () => el.classList.add("c7"));
    run(5480, () => el.classList.add("c8"));
    run(6050, () => el.classList.add("c9"));

    return reset;
  }, [reduce]);

  return (
    <div ref={root} className="fi w-fit max-w-3xl">
      <div className="fi-frame" aria-hidden>
        <span className="fi-name">{first.trim()} {second}</span>
        <i className="fi-hd tl" />
        <i className="fi-hd tr" />
        <i className="fi-hd bl" />
        <i className="fi-hd br" />
      </div>

      <p className="fi-meta text-sm font-semibold text-ink-muted">{meta}</p>
      <h1 className="fi-title mt-2 text-5xl font-semibold md:text-6xl">
        <span className="fi-tw" style={{ ["--n" as string]: first.length }}>{first}</span>
        <span className="fi-tw fi-hl" style={{ ["--n" as string]: second.length }}>{second}</span>
      </h1>
      <p className="fi-sum mt-4 text-xl text-ink-muted">{summary}</p>

      <div ref={cursor} className="fi-cursor" aria-hidden>
        <svg width="17" height="19" viewBox="0 0 17 19" fill="none">
          <path
            d="M1.2 1.1 L1.2 15.4 L5.1 11.7 L7.7 17.2 L10.6 15.8 L8 10.4 L13.6 10.2 Z"
            fill="var(--color-cta)"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="fi-pill">Carol</span>
      </div>
    </div>
  );
}
