import Link from "next/link";
import { site } from "@/data/site";
import { EmojiSticker } from "./EmojiSticker";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        {/* Easter egg: no hover (ou foco) o alien "escreve" um recado, igual aos stickers de ferramentas */}
        <Link
          href="/"
          className="group relative flex items-center gap-2 font-display text-base font-bold outline-none"
        >
          <EmojiSticker emoji="👽" rotate={-8} className="text-3xl" />
          <span className="hidden sm:inline">{site.name}</span>
          <span
            aria-hidden
            className="pointer-events-none absolute top-full left-0 mt-1 translate-y-[-4px] font-hand text-xl font-bold whitespace-nowrap text-ink-muted opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            ↳ pode me chamar de Zamps
          </span>
        </Link>

        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Meu LinkedIn"
          className="die-cut block transition-transform duration-200 hover:-rotate-6 hover:scale-110"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático */}
          <img src="/stickers/linkedin.svg" alt="" className="size-6" draggable={false} />
        </a>
      </nav>
    </header>
  );
}
