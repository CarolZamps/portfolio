import Image from "next/image";

/**
 * Sticker da Carol "mal colado": o canto inferior direito descola e mostra
 * o verso branco do adesivo. O corte é uma diagonal (x + y = 170%) e a aba
 * é o reflexo do canto sobre essa linha.
 *
 * Camadas, de baixo pra cima: sticker recortado → sombra que a aba projeta
 * sobre a ilustração → aba (verso do adesivo, mais escura perto da dobra).
 * Filtros ficam no wrapper e o clip-path no filho, senão o clip corta o blur.
 */
const flapBox =
  "absolute right-0 bottom-0 size-[24%] transition-all duration-300 group-hover/avatar:size-[32%]";
const triangle = "block size-full [clip-path:polygon(100%_0,0_100%,0_0)]";

export function AvatarSticker({ className = "" }: { className?: string }) {
  return (
    <span className={`group/avatar relative inline-block -rotate-6 ${className}`}>
      <span className="die-cut-soft block h-full transition-[clip-path] duration-300 [clip-path:polygon(-20%_-20%,120%_-20%,120%_56%,56%_120%,-20%_120%)] group-hover/avatar:[clip-path:polygon(-20%_-20%,120%_-20%,120%_48%,48%_120%,-20%_120%)]">
        <Image
          src="/stickers/carol.png"
          alt="Ilustração da Carol"
          width={401}
          height={607}
          priority
          className="h-full w-auto"
        />
      </span>

      {/* Sombra da aba sobre a ilustração: maior que a aba e deslocada pra dentro */}
      <span aria-hidden className={`${flapBox} origin-bottom-right scale-[1.35] blur-[3px]`}>
        <span className={`${triangle} bg-ink/30`} />
      </span>

      {/* Verso do adesivo dobrado: claro na ponta, sombreado na dobra */}
      <span
        aria-hidden
        className={`${flapBox} drop-shadow-[-1px_-1px_1px_rgb(28_28_30/0.18)]`}
      >
        <span className={`${triangle} bg-linear-to-br from-surface from-30% to-line`} />
      </span>
    </span>
  );
}
