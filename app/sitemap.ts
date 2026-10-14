import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

// Chaque page existe en français et en anglais ; les alternates relient les deux versions.
const pages = [
  { path: "", priority: 1 },
  { path: "/projets", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
        ),
      },
    })),
  );
}
