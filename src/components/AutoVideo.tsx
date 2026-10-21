"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const BASE = "/projetos/diana";

/**
 * Vídeo que se comporta como GIF: mudo, em loop, sem controles, e só toca enquanto
 * está visível (economiza banda e bateria). Com "reduzir movimento" fica parado
 * no poster e ganha controles nativos pra quem quiser dar play.
 *
 * Arquivos: /projetos/diana/<name>.webm, <name>.mp4 e <name>-poster.jpg.
 * `preload="none"`: nada baixa até o vídeo aparecer na tela.
 */
export function AutoVideo({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.4] },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      controls={!!reduce}
      poster={`${BASE}/${name}-poster.jpg`}
      aria-label={alt}
      className={className}
    >
      <source src={`${BASE}/${name}.webm`} type="video/webm" />
      <source src={`${BASE}/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
