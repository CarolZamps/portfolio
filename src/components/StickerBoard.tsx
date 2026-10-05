import type { Tool } from "@/data/projects";
import { EmojiSticker } from "./EmojiSticker";
import { Sticker } from "./Sticker";

/**
 * Rodapé do case estilo moodboard: os stickers "colam" um a um,
 * na horizontal, quando o rodapé entra na tela.
 */
export function StickerBoard({ tools }: { tools: Tool[] }) {
  return (
    <aside
      aria-labelledby="ferramentas"
      className="mt-20 border-t-2 border-dashed border-line pt-10"
    >
      <h2
        id="ferramentas"
        className="mb-10 -rotate-1 font-hand text-3xl font-bold tracking-normal text-ink-muted"
      >
        o que usei por aqui <EmojiSticker emoji="✏️" rotate={10} />
      </h2>
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-12 pb-8">
        {tools.map((tool, i) => (
          <Sticker key={tool.name} tool={tool} index={i} />
        ))}
      </ul>
    </aside>
  );
}
