/**
 * Filtro SVG que gera a borda branca "die-cut" seguindo o contorno
 * de qualquer coisa com transparência (logo, emoji, balão de callout).
 *
 * 1. dilata o alfa da forma  2. borra  3. corta de novo (threshold)
 * → contorno arredondado/orgânico, sem desenhar borda manual por logo.
 */
export function DieCutFilter() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="die-cut" x="-40%" y="-40%" width="180%" height="180%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="grown" />
        <feGaussianBlur in="grown" stdDeviation="2.5" result="soft" />
        <feComponentTransfer in="soft" result="shape">
          <feFuncA type="table" tableValues="0 0 0 1 1 1" />
        </feComponentTransfer>
        <feFlood style={{ floodColor: "var(--color-surface)" }} />
        <feComposite in2="shape" operator="in" result="border" />
        <feMerge>
          <feMergeNode in="border" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
}
