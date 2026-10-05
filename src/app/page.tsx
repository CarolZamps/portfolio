import { EmojiSticker } from "@/components/EmojiSticker";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-6 pt-20 pb-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex -rotate-2 items-center gap-2 rounded-note bg-accent px-3 py-1 font-hand text-2xl shadow-note">
            oi, pode me chamar de Carol
            <EmojiSticker emoji="👋" index={0} rotate={-8} className="text-3xl" />
          </p>
          <h1 className="text-5xl leading-[1.05] font-semibold md:text-7xl">
            Design orientado a negócio,{" "}
            <span className="relative whitespace-nowrap">
              <span className="animate-marker absolute inset-x-0 bottom-1 -z-10 h-4 bg-accent md:h-6" />
              acelerado por IA
            </span>
          </h1>
        </div>

        <div className="lg:pb-2">
          <p className="text-lg leading-relaxed text-ink-muted">
            Apaixonada por design e inovação, minha jornada é baseada na busca por
            soluções criativas e funcionais, sempre alinhadas às necessidades do
            usuário e negócio.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-display text-lg font-semibold">
            <li className="flex items-center gap-3">
              <EmojiSticker emoji="✏️" index={1} rotate={-10} className="text-3xl" />
              Product Designer
            </li>
            <li className="flex items-center gap-3">
              <EmojiSticker emoji="📍" index={2} rotate={8} className="text-3xl" />
              São Paulo, Brasil
            </li>
          </ul>
        </div>
      </section>

      <section id="projetos" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-24">
        <h2 className="mb-10 flex items-center gap-3 text-3xl font-semibold">
          Projetos recentes <EmojiSticker emoji="👇" rotate={-10} />
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
