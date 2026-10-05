"""
Gera a imagem de compartilhamento (OG) usada por LinkedIn, WhatsApp, Slack etc.

    python3 scripts/make-og.py   →  public/og.png (1200x630)

Cores espelham os tokens de src/app/globals.css (tema Pop). Se mudar um token
ou o título do hero, ajuste aqui e rode de novo.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from scipy import ndimage as nd

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "scripts" / "fonts"
S = 2  # desenha em 2x e reduz no fim, pra ficar nítido

# tokens (globals.css)
INK = (21, 21, 21)
PAPER = (255, 255, 255)
PATTERN = (217, 217, 224)
ACCENT = (198, 244, 50)
TAPE = (236, 224, 194)

W, H = 1200 * S, 630 * S


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size * S)


def die_cut(img: Image.Image, border: int, shadow: bool = True) -> Image.Image:
    """Borda branca seguindo o contorno + sombra leve, igual ao filtro do site."""
    pad = border * 3
    c = Image.new("RGBA", (img.width + 2 * pad, img.height + 2 * pad))
    c.alpha_composite(img, (pad, pad))
    a = np.asarray(c)[..., 3] > 40
    yy, xx = np.mgrid[-border : border + 1, -border : border + 1]
    grown = nd.binary_dilation(a, structure=xx**2 + yy**2 <= border**2)
    mask = Image.fromarray((grown * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(S))
    out = Image.new("RGBA", c.size)
    if shadow:
        sh = Image.new("RGBA", c.size, INK + (0,))
        sh.putalpha(mask.point(lambda v: v * 0.16).filter(ImageFilter.GaussianBlur(10 * S)))
        out.alpha_composite(sh, (0, 6 * S))
    white = Image.new("RGBA", c.size, PAPER + (255,))
    white.putalpha(mask)
    out.alpha_composite(white)
    out.alpha_composite(c)
    return out


def main() -> None:
    og = Image.new("RGBA", (W, H), PAPER + (255,))
    d = ImageDraw.Draw(og)

    # fundo pontilhado de board
    gap, r = 24 * S, 1.3 * S
    for y in range(gap // 2, H, gap):
        for x in range(gap // 2, W, gap):
            d.ellipse((x - r, y - r, x + r, y + r), fill=PATTERN)

    # Só o hero: post-it + título, centralizados (sem avatar, nome ou URL)
    f_title = font("Bricolage-700.ttf", 72)
    lines = ["Design orientado a negócio,", "acelerado por IA"]
    line_h = 84 * S
    block_h = 74 * S + 36 * S + line_h * len(lines)
    top = (H - block_h) // 2

    # post-it lima com fita crepe
    hello = "oi, pode me chamar de Carol"
    f_hand = font("Caveat-700.ttf", 40)
    tw = d.textlength(hello, font=f_hand)
    note = Image.new("RGBA", (int(tw + 40 * S), 66 * S))
    nd_ = ImageDraw.Draw(note)
    nd_.rounded_rectangle((0, 0, note.width - 1, note.height - 1), 4 * S, fill=ACCENT)
    nd_.text((20 * S, 6 * S), hello, font=f_hand, fill=INK)
    note = note.rotate(2, resample=Image.BICUBIC, expand=True)
    nx = (W - note.width) // 2
    og.alpha_composite(note, (nx, top))
    tape = Image.new("RGBA", (80 * S, 24 * S), TAPE + (225,)).rotate(-8, expand=True)
    og.alpha_composite(tape, (nx + note.width - 64 * S, top - 14 * S))

    # título, com o grifo lima em "acelerado por IA"
    y = top + 74 * S + 36 * S
    for i, line in enumerate(lines):
        lw = d.textlength(line, font=f_title)
        x = (W - lw) / 2
        if i == len(lines) - 1:
            d.rectangle((x, y + 54 * S, x + lw, y + 78 * S), fill=ACCENT)
        d.text((x, y), line, font=f_title, fill=INK)
        y += line_h

    out = og.convert("RGB").resize((1200, 630), Image.LANCZOS)
    out.save(ROOT / "public/og.png", optimize=True)
    print("public/og.png", out.size)


if __name__ == "__main__":
    main()
