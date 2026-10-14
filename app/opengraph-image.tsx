import { ImageResponse } from "next/og";

import { experiences, profile } from "@/lib/content";

// Aperçu affiché quand le lien du portfolio est partagé (LinkedIn, mail, messageries).
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Couleurs du site converties en hex (Satori ne lit pas oklch).
const colors = {
  background: "#fbfcfb",
  foreground: "#151a16",
  muted: "#565d58",
  primary: "#0b7643",
  border: "#dee2df",
};

/** Charge une police Google Fonts (sous-ensemble des caractères utilisés) au build ; null si indisponible. */
async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!fontUrl) return null;
    return await (await fetch(fontUrl)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const currentJob = experiences.find((xp) => !xp.end);
  const status = [
    currentJob && `Chez ${currentJob.company}`,
    profile.location,
    profile.availability,
  ]
    .filter(Boolean)
    .join("  ·  ");

  const bodyText = [profile.role, profile.pitch, status].join(" ");
  const [display, body, bodyBold] = await Promise.all([
    loadGoogleFont("Big+Shoulders", 800, profile.shortName),
    loadGoogleFont("Bricolage+Grotesque", 400, bodyText),
    loadGoogleFont("Bricolage+Grotesque", 600, bodyText),
  ]);
  // Chaque police est déclarée sous son propre nom pour éviter que l'une
  // serve de secours à l'autre (glyphes mélangés).
  const fonts = [
    display && { name: "Display", data: display, weight: 800 as const },
    body && { name: "Body", data: body, weight: 400 as const },
    bodyBold && { name: "Body", data: bodyBold, weight: 600 as const },
  ].filter((font) => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.background,
          color: colors.foreground,
          fontFamily: body ? "Body" : undefined,
          borderBottom: `16px solid ${colors.primary}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: display ? "Display" : undefined,
              fontSize: 168,
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          >
            {profile.shortName}
          </div>
          <div style={{ marginTop: 28, fontSize: 40, fontWeight: 600 }}>
            {profile.role}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 30,
              color: colors.muted,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {profile.pitch}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: colors.primary,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: colors.primary,
            }}
          />
          {status}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.map((font) => ({ ...font, style: "normal" as const })),
    },
  );
}
