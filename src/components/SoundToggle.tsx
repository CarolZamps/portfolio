"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("sfx-change", onChange);
  return () => window.removeEventListener("sfx-change", onChange);
}

/** Botão de som: desligado por padrão, lembra a escolha (public/sfx.js). */
export function SoundToggle() {
  const on = useSyncExternalStore(
    subscribe,
    () => window.Sfx?.enabled ?? false,
    () => false,
  );
  const label = on ? "Desligar o som" : "Ligar o som";

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={label}
      title={label}
      onClick={() => window.Sfx?.toggle()}
      className="fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-note outline-none transition-colors hover:border-cta hover:text-cta focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" stroke="none" />
        {on ? (
          <>
            <path d="M15.5 9a4 4 0 0 1 0 6" />
            <path d="M18 6.5a8 8 0 0 1 0 11" />
          </>
        ) : (
          <path d="m16 9.5 5 5m0-5-5 5" />
        )}
      </svg>
    </button>
  );
}
