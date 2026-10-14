import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { Dock } from "@/components/Dock";
import { InlineScript } from "@/components/InlineScript";
import { profile } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { fontVariables } from "@/lib/fonts";
import { hasLocale, locales, ogLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

import "../globals.css";

// Les deux langues sont générées au build ; toute autre valeur renvoie une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  const title = `${profile.name} — ${profile.role[lang]}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${profile.name}` },
    description: t.meta.description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    keywords: [
      profile.role.fr,
      profile.role.en,
      "développeur backend",
      "backend developer",
      "FastAPI",
      "Python",
      "Node.js",
      "MongoDB",
      "AWS",
      "Lomé",
      "Togo",
      "remote",
      profile.name,
    ],
    alternates: {
      canonical: `/${lang}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
    openGraph: {
      type: "profile",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: `/${lang}`,
      siteName: profile.name,
      title,
      description: t.meta.description,
      firstName: "Jean de Dieu",
      lastName: "Sessou",
    },
    twitter: { card: "summary_large_image", title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfb" },
    { media: "(prefers-color-scheme: dark)", color: "#0e120f" },
  ],
};

// Applique le thème choisi avant le premier rendu, pour éviter un flash du mauvais thème.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body>
        {children}
        <Dock lang={lang} t={t} />
      </body>
    </html>
  );
}
