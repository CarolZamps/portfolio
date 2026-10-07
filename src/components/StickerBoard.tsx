import type { Tool } from "@/data/projects";
import { Sticker } from "./Sticker";

/**
 * Ferramentas do case, ao lado do título: stickers pequenos que "colam"
 * um a um quando a página abre (já estão na tela, então disparam na hora).
 */
export function StickerBoard({ tools }: { tools: Tool[] }) {
  return (
    <aside aria-labelledby="ferramentas" className="lg:max-w-sm">
      <h2
        id="ferramentas"
        className="mb-4 font-hand text-2xl font-bold tracking-normal text-ink-muted lg:text-right"
      >
        o que usei por aqui
      </h2>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-7 lg:justify-end">
        {tools.map((tool, i) => (
          <Sticker key={tool.name} tool={tool} index={i} />
        ))}
      </ul>
    </aside>
  );
}
