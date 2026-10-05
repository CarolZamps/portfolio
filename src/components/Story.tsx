import type { StoryBlock } from "@/data/projects";
import { Reveal } from "./Reveal";
import { ShotFrame } from "./ShotFrame";

function Prose({ title, text }: { title?: string; text: string[] }) {
  return (
    <div>
      {title && <h2 className="mb-5 text-3xl font-semibold md:text-4xl">{title}</h2>}
      <div className="space-y-5 text-lg leading-relaxed text-ink-muted md:text-xl">
        {text.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </div>
  );
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="max-w-3xl">
          <Prose title={block.title} text={block.text} />
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
          {block.caption && (
            <figcaption className="mt-4 text-center font-hand text-2xl text-ink-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "stats":
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <div
              key={item.value}
              className={`rounded-card p-8 shadow-note ${i % 2 ? "rotate-1 bg-note-2" : "-rotate-1 bg-accent"}`}
            >
              <p className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                {item.value}
              </p>
              <p className="mt-2 text-lg">{item.label}</p>
            </div>
          ))}
        </div>
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
