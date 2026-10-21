/** Efeitos sonoros (ver public/sfx.js). Só tocam se a pessoa ligar o botão de som. */
export type SfxName = "pop" | "msg-in" | "msg-out" | "tick" | "swish" | "peel" | "click";

type SfxApi = {
  play: (name: SfxName, volume?: number) => void;
  readonly enabled: boolean;
  setEnabled: (on: boolean) => void;
  toggle: () => void;
};

declare global {
  interface Window {
    Sfx?: SfxApi;
  }
}

export function sfx(name: SfxName, volume?: number) {
  if (typeof window === "undefined") return;
  try {
    window.Sfx?.play(name, volume);
  } catch {
    // áudio indisponível: tudo bem, o site funciona sem som
  }
}
