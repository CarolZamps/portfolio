import Image from "next/image";
import type { Shot } from "@/data/projects";
import { AutoVideo } from "./AutoVideo";

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

/**
 * Reproduz o frame do portfólio original: fundo na cor do produto e a mídia
 * posicionada em %, encostando/vazando nas bordas onde está cortada.
 * Vale para imagem e para vídeo (`shot.video`), e um segundo vídeo pode ficar por cima
 * (`shot.overlay`). `unoptimized`: serve o PNG original, sem recompressão.
 */
export function ShotFrame({
  shot,
  priority,
  className = "",
}: {
  shot: Shot;
  priority?: boolean;
  className?: string;
}) {
  const f = shot.frame;
  const o = shot.overlay;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-card ${className}`}
      style={{ aspectRatio: `${f.w} / ${f.h}`, backgroundColor: f.bg }}
    >
      <div
        className="absolute"
        style={{
          left: pct(f.x, f.w),
          top: pct(f.y, f.h),
          width: pct(f.iw, f.w),
          height: pct(f.ih, f.h),
        }}
      >
        {shot.video ? (
          <AutoVideo name={shot.video} alt={shot.alt} className="size-full object-cover" />
        ) : (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            unoptimized
            priority={priority}
            className="object-cover"
          />
        )}
      </div>

      {o && (
        <div
          className="absolute overflow-hidden rounded-[10%/5%] shadow-note ring-4 ring-surface"
          style={{
            left: pct(o.x, f.w),
            top: pct(o.y, f.h),
            width: pct(o.w, f.w),
            height: pct(o.h, f.h),
          }}
        >
          <AutoVideo name={o.video} alt={o.alt} className="size-full object-cover" />
        </div>
      )}
    </div>
  );
}
