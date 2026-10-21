import type { StoryBlock } from "@/data/projects";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { ShotFrame } from "./ShotFrame";

function Prose({
  eyebrow,
  title,
  text,
  chips,
}: {
  eyebrow?: string;
  title?: string;
  text: string[];
  chips?: string[];
}) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wide text-ink-muted uppercase">{eyebrow}</p>
      )}
      {title && <h2 className="mb-5 text-3xl font-semibold md:text-4xl">{title}</h2>}
      <div className="space-y-5 text-lg leading-relaxed text-ink-muted md:text-xl">
        {text.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
      {chips && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-chip border border-line bg-surface px-3 py-1.5 text-sm font-semibold"
            >
              {chip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Caption({ children }: { children: string }) {
  return <p className="mt-4 text-center font-hand text-2xl text-ink-muted">{children}</p>;
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="max-w-3xl">
          <Prose eyebrow={block.eyebrow} title={block.title} text={block.text} chips={block.chips} />
        </div>
      );

    case "split":
      // Frame bem horizontal fica pequeno numa coluna: empilha e usa a largura toda
      if (block.shot.frame.w / block.shot.frame.h > 1.6) {
        return (
          <div className="space-y-10">
            <div className="max-w-3xl">
              <Prose title={block.title} text={block.text} />
            </div>
            <ShotFrame shot={block.shot} className="shadow-note" />
          </div>
        );
      }
      return (
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className={block.flip ? "md:order-2" : ""}>
            <Prose title={block.title} text={block.text} />
          </div>
          <ShotFrame shot={block.shot} className="shadow-note" />
        </div>
      );

    case "media": {
      const [first] = block.shots;
      const tall = first.frame.h > first.frame.w;
      return (
        <figure>
          {block.shots.length === 1 ? (
            <ShotFrame shot={first} className={`shadow-note ${tall ? "mx-auto max-w-2xl" : ""}`} />
          ) : (
            <div className="grid items-start gap-8 md:grid-cols-2">
              {block.shots.map((s) => (
                <ShotFrame key={s.src} shot={s} className="shadow-note" />
              ))}
            </div>
          )}
          {block.caption && <figcaption><Caption>{block.caption}</Caption></figcaption>}
        </figure>
      );
    }

    case "stats":
      return (
        <div className={`grid gap-6 ${block.items.length > 1 ? "sm:grid-cols-2" : "max-w-md"}`}>
          {block.items.map((item, i) => (
            <div
              key={item.label}
              className={`rounded-card p-8 shadow-note ${i % 2 ? "rotate-1 bg-note-2" : "-rotate-1 bg-accent"}`}
            >
              <p className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                {item.count ? <CountUp {...item.count} /> : item.value}
              </p>
              <p className="mt-2 text-lg">{item.label}</p>
              {item.sub && <p className="mt-1 text-sm font-medium text-ink-muted">{item.sub}</p>}
            </div>
          ))}
        </div>
      );

    case "steps": {
      const cols = block.items.length >= 4 ? "lg:grid-cols-4 md:grid-cols-2" : "md:grid-cols-3";
      return (
        <div>
          {block.title && <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{block.title}</h2>}
          <ol className={`grid items-start gap-6 ${cols}`}>
            {block.items.map((item) => (
              <li key={item.title} className="rounded-card bg-surface p-5 shadow-note">
                {item.shot && <ShotFrame shot={item.shot} className="mb-5" />}
                <span className="inline-block rounded-chip bg-accent px-3 py-1 text-xs font-bold tracking-wide uppercase">
                  {item.label}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-ink-muted">{item.text}</p>
              </li>
            ))}
          </ol>
          {block.caption && <Caption>{block.caption}</Caption>}
        </div>
      );
    }

    case "diagram":
      return (
        <div className="space-y-10">
          <div className="max-w-3xl">
            <Prose title={block.title} text={block.text} />
          </div>
          <figure>
            <div className="rounded-panel bg-surface p-4 pt-12 shadow-note md:p-8 md:pt-12">
              <ArchitectureDiagram />
            </div>
            {block.caption && <figcaption><Caption>{block.caption}</Caption></figcaption>}
          </figure>
        </div>
      );

    case "note":
      return (
        <aside className="relative mx-auto max-w-2xl -rotate-1 rounded-note bg-note-1 p-6 pt-8 shadow-note">
          <span aria-hidden className="tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2" />
          {block.label && <p className="font-hand text-3xl leading-none font-bold">{block.label}</p>}
          <p className="mt-2 text-lg leading-relaxed">{block.text}</p>
        </aside>
      );

    case "quote":
      return (
        <blockquote className="mx-auto max-w-3xl text-center font-hand text-4xl leading-snug md:text-5xl">
          <span className="relative">
            “{block.text}”
            <span aria-hidden className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-accent/70" />
          </span>
        </blockquote>
      );
  }
}

export function Story({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="space-y-24 md:space-y-32">
      {blocks.map((block, i) => (
        <Reveal key={i}>
          <Block block={block} />
        </Reveal>
      ))}
    </div>
  );
}
