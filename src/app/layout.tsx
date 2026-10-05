import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Inter } from "next/font/google";
import { DieCutFilter } from "@/components/DieCutFilter";
import { Header } from "@/components/Header";
import { EmojiSticker } from "@/components/EmojiSticker";
import { share, shareMetadata, site } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

// Favicon e ícone de celular vêm de src/app/icon.png e apple-icon.png.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Carolina Zamprônio — Product Designer",
  description: share.description,
  ...shareMetadata,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <DieCutFilter />
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="px-6 py-10 text-center font-hand text-2xl text-ink-muted">
          feito por mim mesma <EmojiSticker emoji="👽" rotate={8} />
        </footer>
      </body>
    </html>
  );
}
