import type { Metadata } from "next";

import { ThemeToggle } from "@/components/ThemeToggle";
import { fontVariables } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Jean de Dieu — Ingénieur backend",
  description:
    "Portfolio de Jean de Dieu Sessou, ingénieur backend basé à Lomé : APIs, bases de données, déploiement.",
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
