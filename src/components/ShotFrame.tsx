import Image from "next/image";
import type { Shot } from "@/data/projects";

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

/**
 * Reproduz o frame do portfólio original: fundo na cor do produto e a imagem
 * posicionada em %, encostando/vazando nas bordas onde está cortada.
 * `unoptimized`: serve o PNG original, sem recompressão (zero perda de qualidade).
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
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          unoptimized
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
