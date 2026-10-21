import type { NextConfig } from "next";
import { site } from "./src/data/site";

const nextConfig: NextConfig = {
  async rewrites() {
    // Deck escondido: /p/<slug> serve public/p/<slug>/index.html
    return [
      { source: site.deckPath, destination: `${site.deckPath}/index.html` },
      { source: `${site.deckPath}/`, destination: `${site.deckPath}/index.html` },
    ];
  },
  async headers() {
    // Nunca indexar o que está em /p/ (além da meta robots dentro do próprio deck)
    return [
      {
        source: "/p/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
