import Link from "next/link";
import { noteBg, type Project } from "@/data/projects";
import { EmojiSticker } from "./EmojiSticker";
import { ShotFrame } from "./ShotFrame";

const tilt = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-2"];

/** Grifo lima que "desenha" embaixo do título no hover. */
const titleMarker =
  "bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_0.4em] bg-[position:0_88%] bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_0.4em] group-focus-visible:bg-[length:100%_0.4em]";

function OpenButton() {
  return (
    <span
      aria-hidden
      className="absolute right-4 bottom-4 z-10 grid size-12 place-items-center rounded-chip bg-cta text-on-cta shadow-note transition-all duration-300 ease-out md:translate-y-2 md:scale-90 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:scale-100 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:scale-100 md:group-focus-visible:opacity-100"
    >
      <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </span>
  );
}

function Cover({ project, action }: { project: Project; action?: boolean }) {
  const badge = (
    <span className="absolute top-4 left-4 z-10 rounded-chip bg-surface px-3 py-1 text-xs font-semibold">
      {project.company} · {project.year}
    </span>
  );

  if (project.cover) {
    return (
      <div className="relative transition-transform duration-500 group-hover:scale-[1.02]">
        <ShotFrame shot={project.cover} />
        {badge}
        {action && <OpenButton />}
      </div>
    );
  }

  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-card ${noteBg[project.color]}`}>
      <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold text-ink-muted">
        em construção <EmojiSticker emoji="🚧" rotate={-8} className="ml-2" />
      </span>
      {badge}
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rotation = tilt[index % tilt.length];

  if (project.status === "soon") {
    return (
      <div
        aria-disabled
        className={`relative cursor-not-allowed rounded-card bg-surface p-3 shadow-note ${rotation}`}
      >
        {/* Fita crepe nas bordas: ainda sendo grudado no mural */}
        <span aria-hidden className="tape absolute -top-3 left-8 z-10 h-7 w-28 -rotate-6" />
        <span aria-hidden className="tape absolute -top-2 -right-4 z-10 h-7 w-24 rotate-[38deg]" />

        <div className="opacity-60 saturate-50">
          <Cover project={project} />
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-semibold text-ink-muted">{project.title}</h3>
            <span className="rounded-chip bg-accent px-3 py-1 text-xs font-bold tracking-wide uppercase">
              em breve
            </span>
          </div>
          <p className="mt-2 text-ink-muted">{project.summary}</p>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink-muted">
            <EmojiSticker emoji="✏️" rotate={-8} className="text-lg" /> {project.highlight}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/projetos/${project.slug}`}
      aria-label={`Ver case: ${project.title}`}
      className={`group block rounded-card bg-surface p-3 shadow-note outline-none transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 focus-visible:ring-2 focus-visible:ring-ink ${rotation}`}
    >
      <Cover project={project} action />
      <div className="p-4">
        <h3 className="text-2xl font-semibold">
          <span className={titleMarker}>{project.title}</span>
        </h3>
        <p className="mt-2 text-ink-muted">{project.summary}</p>
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink-muted">
          <EmojiSticker emoji="⭐" rotate={-10} className="text-lg" /> {project.highlight}
        </p>
      </div>
    </Link>
  );
}
