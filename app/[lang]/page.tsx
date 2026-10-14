import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Mail,
  PenLine,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { ChessPuzzle } from "@/components/ChessPuzzle";
import { CopyEmail } from "@/components/CopyEmail";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { InlineScript } from "@/components/InlineScript";
import { LocalTime } from "@/components/LocalTime";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionNav } from "@/components/SectionNav";
import { experiences, profile, projects, socials, stack } from "@/lib/content";
import { formatDuration, formatPeriod } from "@/lib/dates";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, intlLocale, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

// Nombre de projets affichés sur l’accueil ; les autres sont sur /projets.
const HOME_PROJECTS = 3;


const socialIcons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Articles: PenLine,
};

const iconLinks = [
  ...socials.map((social) => ({
    ...social,
    icon: socialIcons[social.label as keyof typeof socialIcons],
  })),
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const currentJob = experiences.find((xp) => !xp.end);
// Liens repris dans la section Contact, à côté du CV.
const contactLinks = socials.filter((social) =>
  ["LinkedIn", "GitHub"].includes(social.label),
);

// Données structurées schema.org : aident Google à comprendre qui est la personne du site.
function personJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role[lang],
    description: profile.pitch[lang],
    url: `${siteUrl}/${lang}`,
    image: `${siteUrl}/avatar.webp`,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lomé",
      addressCountry: "TG",
    },
    ...(currentJob && {
      worksFor: {
        "@type": "Organization",
        name: currentJob.company[lang],
        url: currentJob.url,
      },
    }),
    knowsAbout: stack,
    sameAs: socials
      .map((social) => social.href)
      .filter((href) => href.startsWith("http")),
  };
}

/** Met en avant les passages entourés de **…** (chiffres clés des expériences). */
function Emphasis({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

/** Titre de section : collant sur mobile (la navigation disparaît), en display sur desktop. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display sticky top-0 z-10 -mx-6 mb-8 bg-background/90 px-6 py-4 text-[calc(1.75rem*var(--heading-scale))] font-extrabold leading-none tracking-[-0.02em] text-foreground backdrop-blur-sm lg:static lg:mx-0 lg:mb-10 lg:bg-transparent lg:p-0 lg:pr-0 lg:text-[calc(2.25rem*var(--heading-scale))] lg:backdrop-blur-none">
      {children}
    </h2>
  );
}

function AnimatedName({ text }: { text: string }) {
  return (
    <h1
      aria-label={text}
      className="display text-[calc(clamp(3rem,6vw,4.5rem)*var(--heading-scale))] font-extrabold leading-[0.92] tracking-[-0.02em] text-foreground"
    >
      {text.split(" ").map((word, w, words) => (
        <Fragment key={w}>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {[...word].map((char, c) => {
              const index =
                words.slice(0, w).reduce((n, prev) => n + prev.length, 0) + c;
              return (
                <span
                  key={c}
                  className="letter"
                  style={{ "--l": index } as React.CSSProperties}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </h1>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  // Ordre pensé pour un recruteur : la preuve d’abord, le parcours ensuite.
  const sections = [
    { id: "experience", label: t.nav.experience },
    { id: "projets", label: t.nav.projects },
    { id: "a-propos", label: t.nav.about },
    { id: "partie", label: t.nav.game },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-16">
      <InlineScript
        type="application/ld+json"
        html={JSON.stringify(personJsonLd(lang)).replace(/</g, "\\u003c")}
      />
      <header className="flex flex-col pt-14 sm:pt-20 lg:sticky lg:top-0 lg:h-dvh lg:w-[42%] lg:justify-between lg:overflow-y-auto lg:py-20 lg:[scrollbar-width:none] short:py-10">
        <div>
          <AnimatedName text={profile.shortName} />
          <div className="settle" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="mt-4 text-lg font-semibold text-foreground">
              {profile.role[lang]}
            </p>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              {currentJob && (
                <>
                  <span>
                    {t.hero.at}{" "}
                    <a
                      href={currentJob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-foreground"
                    >
                      {currentJob.company[lang]}
                    </a>
                  </span>
                  <span aria-hidden="true">·</span>
                </>
              )}
              <span>{profile.location}</span>
              {/* La disponibilité a sa propre ligne : pas de séparateur orphelin au retour à la ligne. */}
              <span className="inline-flex basis-full items-center gap-1.5 text-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-primary"
                />
                {profile.availability[lang]}
              </span>
            </p>
            <p className="mt-3 max-w-sm text-pretty leading-7 text-muted-foreground">
              {profile.pitch[lang]}
            </p>
            <a
              href={profile.cvUrl}
              className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-foreground short:mt-4 px-5 text-sm font-medium text-background transition-[background-color,transform] duration-200 hover:bg-primary active:scale-[0.97]"
            >
              <Download
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
              />
              {t.hero.cv}
            </a>
          </div>

          <div
            className="settle mt-12 hidden lg:block short:mt-6"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <SectionNav sections={sections} label={t.nav.label} />
          </div>
        </div>

        <div className="mt-10 short:mt-6">
          <div
            className="settle flex items-center justify-between gap-6"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            <ul className="-ml-3 flex items-center">
              {iconLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex size-11 items-center justify-center text-muted-foreground transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-primary"
                  >
                    <Icon size={19} strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono text-[13px] text-faint">
              <LocalTime
                timeZone={profile.timeZone}
                locale={intlLocale[lang]}
              />{" "}
              {t.hero.inLome}
            </p>
          </div>
        </div>
      </header>

      <main className="pb-32 pt-16 text-muted-foreground lg:w-[58%] lg:py-20">
        <section
          id="experience"
          aria-labelledby="h-experience"
          className="mb-28 scroll-mt-16 lg:mb-36"
        >
          <SectionHeading>
            <span id="h-experience">{t.nav.experience}</span>
          </SectionHeading>
          <ol className="flex flex-col gap-3">
            {experiences.map((xp) => (
              <li
                key={xp.start}
                className="reveal grid gap-x-8 gap-y-2 sm:grid-cols-[8.5rem_1fr] lg:-mx-5 lg:rounded-xl lg:p-5 lg:transition-colors lg:duration-200 lg:hover:bg-surface"
              >
                <p className="mono flex flex-col pt-1 text-[13px] text-faint">
                  <span>{formatPeriod(lang, xp.start, xp.end)}</span>
                  <span>{formatDuration(lang, xp.start, xp.end)}</span>
                </p>
                <div>
                  <h3 className="text-lg font-semibold tracking-normal text-foreground">
                    {xp.title[lang]} ·{" "}
                    {xp.url ? (
                      <a
                        href={xp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 transition-colors duration-150 hover:text-primary"
                      >
                        {xp.company[lang]}
                        <ArrowUpRight
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    ) : (
                      xp.company[lang]
                    )}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[15px] leading-7">
                    <Emphasis text={xp.summary[lang]} />
                  </p>
                  <p className="mono mt-3 text-[13px] text-faint">
                    {xp.stack.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="projets"
          aria-labelledby="h-projets"
          className="mb-28 scroll-mt-16 lg:mb-36"
        >
          <SectionHeading>
            <span id="h-projets">{t.nav.projects}</span>
          </SectionHeading>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {projects.slice(0, HOME_PROJECTS).map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                lang={lang}
                t={t.projects}
                featured={i === 0}
              />
            ))}
          </ul>
          {projects.length > HOME_PROJECTS && (
            <Link
              href={`/${lang}/projets`}
              className="group mt-10 inline-flex min-h-11 items-center gap-2 font-medium text-foreground transition-colors duration-150 hover:text-primary"
            >
              {t.projects.seeAll}
              <span className="mono text-[13px] font-normal text-faint">
                {projects.length}
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </Link>
          )}
        </section>

        <section
          id="a-propos"
          aria-labelledby="h-a-propos"
          className="mb-28 scroll-mt-16 lg:mb-36"
        >
          <SectionHeading>
            <span id="h-a-propos">{t.nav.about}</span>
          </SectionHeading>
          <div className="reveal flex flex-col gap-4 text-pretty text-[17px] leading-[1.7]">
            <p>
              <Emphasis text={t.about.intro} />
            </p>
            <p>{t.about.outside}</p>
            <p className="mono pt-2 text-[13px] text-faint">
              {stack.join(" · ")}
            </p>
          </div>
        </section>

        <section
          id="partie"
          aria-labelledby="h-partie"
          className="mb-28 scroll-mt-16 lg:mb-36"
        >
          <SectionHeading>
            <span id="h-partie">{t.nav.game}</span>
          </SectionHeading>
          <div className="reveal">
            <ChessPuzzle t={t.chess} />
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="h-contact"
          className="scroll-mt-16"
        >
          <h2
            id="h-contact"
            className="display reveal max-w-lg text-balance text-[calc(clamp(2rem,4.5vw,3rem)*var(--heading-scale))] font-extrabold leading-[1] tracking-[-0.02em] text-foreground"
          >
            {t.contact.heading}
          </h2>
          <CopyEmail
            email={profile.email}
            copyLabel={t.contact.copy(profile.email)}
            copiedLabel={t.contact.copied}
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-lg font-medium text-primary underline decoration-primary/40 decoration-1 underline-offset-[6px] transition-colors duration-150 hover:decoration-primary"
          />
          <ul className="mt-2 flex flex-wrap gap-x-6">
            <li>
              <a
                href={profile.cvUrl}
                className="mono inline-flex min-h-11 items-center gap-1.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-primary"
              >
                <Download size={13} strokeWidth={2} aria-hidden="true" />
                {t.contact.cv}
              </a>
            </li>
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono inline-flex min-h-11 items-center gap-1 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-primary"
                >
                  {link.label}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <footer className="mono mt-24 text-[13px] text-faint">
            © 2026 {profile.shortName}
          </footer>
        </section>
      </main>
    </div>
  );
}
