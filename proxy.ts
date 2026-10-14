import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n";

/** Langue préférée : choix mémorisé (cookie), sinon en-tête Accept-Language, sinon français. */
function getLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  return accepted.find((entry) => hasLocale(entry.lang))?.lang as Locale ?? defaultLocale;
}

/** Redirige les URL sans langue (/ ou /projets) vers /fr/… ou /en/… */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasPrefix) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ignore les fichiers internes et tout chemin avec une extension (icônes, images, robots.txt, sitemap.xml…).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
