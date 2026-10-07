import Link from "next/link";
import { notFound } from "next/navigation";
import { ShotFrame } from "@/components/ShotFrame";
import { StickerBoard } from "@/components/StickerBoard";
import { Story } from "@/components/Story";
import { getProject, projects } from "@/data/projects";
import { shareMetadata } from "@/data/site";

// Cases "em breve" não têm página
export function generateStaticParams() {
  return projects.filter((p) => !p.status).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  // A aba mostra o nome do case; a prévia de compartilhamento é a do portfólio.
  return {
    title: project ? `${project.title} — Carol Zamprônio` : "Projeto",
    ...shareMetadata,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.status) notFound();

  return (
    <article className="mx-auto max-w-6xl px-6 pt-12 pb-24">
      <Link
        href="/#projetos"
        aria-label="Voltar para todos os projetos"
        className="group inline-grid size-11 place-items-center rounded-chip bg-cta text-on-cta shadow-note outline-none transition-colors hover:bg-cta-hover focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-5 transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 5-7 7 7 7" />
        </svg>
      </Link>

      <header className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-ink-muted">
            {project.company} · {project.year} · {project.scope}
          </p>
          <h1 className="mt-2 text-5xl font-semibold md:text-6xl">{project.title}</h1>
          <p className="mt-4 text-xl text-ink-muted">{project.summary}</p>
        </div>

        {project.tools.length > 0 && <StickerBoard tools={project.tools} />}
      </header>

      {project.cover && (
        <ShotFrame shot={project.cover} priority className="mt-12 shadow-note" />
      )}

      <div className="mt-20 md:mt-28">
        <Story blocks={project.story} />
      </div>

      {project.links.length > 0 && (
        <div className="mt-24 flex flex-wrap items-center gap-3">
          <span className="font-hand text-2xl">ver em produção →</span>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-chip border border-line bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:border-cta hover:text-cta"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}

    </article>
  );
}
