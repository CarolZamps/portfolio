export const site = {
  name: "Carol Zamprônio",
  url: "https://carolinazampronio.com",
  linkedin: "https://www.linkedin.com/in/carolinazampronio/",
};

/**
 * Prévia de compartilhamento (LinkedIn, WhatsApp, Slack...). Igual em todas as
 * páginas, sem nome de projeto. Imagem gerada por scripts/make-og.py.
 * Obs.: no Next, `openGraph` definido numa página substitui o do layout
 * (não mescla), por isso as páginas reaproveitam este objeto inteiro.
 */
export const share = {
  title: "Carol Zamprônio — Product Designer",
  description: "Product Designer em São Paulo. Design orientado a negócio, acelerado por IA.",
  image: { url: "/og.png", width: 1200, height: 630, alt: "Carol Zamprônio, Product Designer" },
};

export const shareMetadata = {
  openGraph: {
    title: share.title,
    description: share.description,
    url: "/",
    siteName: site.name,
    locale: "pt_BR",
    type: "website" as const,
    images: [share.image],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: share.title,
    description: share.description,
    images: [share.image.url],
  },
};
