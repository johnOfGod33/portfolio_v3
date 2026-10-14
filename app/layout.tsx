import type { Metadata, Viewport } from "next";

import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";

import "./globals.css";

const description =
  "Jean de Dieu Sessou, ingénieur backend à Lomé, ouvert au remote. APIs Python / FastAPI et Node.js, MongoDB, IA appliquée et déploiement sur AWS, chez EdoMatch.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "ingénieur backend",
    "développeur backend",
    "backend engineer",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description,
    firstName: "Jean de Dieu",
    lastName: "Sessou",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfb" },
    { media: "(prefers-color-scheme: dark)", color: "#0e120f" },
  ],
};

// Applique le thème choisi avant le premier rendu, pour éviter un flash du mauvais thème.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
