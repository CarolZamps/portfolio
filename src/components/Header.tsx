import Link from "next/link";
import { site } from "@/data/site";
import { EmojiSticker } from "./EmojiSticker";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-display text-lg font-bold">
          <EmojiSticker emoji="👽" rotate={-8} className="text-5xl" />
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/#projetos" className="hover:text-cta">
            Projetos
          </Link>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Meu LinkedIn"
            className="die-cut block transition-transform duration-200 hover:-rotate-6 hover:scale-110"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático */}
            <img src="/stickers/linkedin.svg" alt="" className="size-7" draggable={false} />
          </a>
        </div>
      </nav>
    </header>
  );
}
