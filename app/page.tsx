import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Mail,
  PenLine,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { ChessPuzzle } from "@/components/ChessPuzzle";
import { CopyEmail } from "@/components/CopyEmail";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { LocalTime } from "@/components/LocalTime";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionNav } from "@/components/SectionNav";
import { VinylPlayer } from "@/components/VinylPlayer";
import { experiences, profile, projects, socials, stack } from "@/lib/content";
import { formatDuration, formatPeriod } from "@/lib/dates";
import { siteUrl } from "@/lib/site";

// Nombre de projets affichés sur l’accueil ; les autres sont sur /projets.
const HOME_PROJECTS = 3;

// Ordre pensé pour un recruteur : la preuve d’abord, le parcours ensuite.
const sections = [
  { id: "experience", label: "Expérience" },
  { id: "projets", label: "Projets" },
  { id: "a-propos", label: "À propos" },
  { id: "partie", label: "Une partie ?" },
  { id: "contact", label: "Contact" },
];

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
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.pitch,
  url: siteUrl,
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
      name: currentJob.company,
      url: currentJob.url,
    },
  }),
  knowsAbout: stack,
  sameAs: socials
    .map((social) => social.href)
    .filter((href) => href.startsWith("http")),
};

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
    <h2 className="display sticky top-0 z-10 -mx-6 mb-8 bg-background/90 py-4 pl-6 pr-20 text-[calc(1.75rem*var(--heading-scale))] font-extrabold leading-none tracking-[-0.02em] text-foreground backdrop-blur-sm lg:static lg:mx-0 lg:mb-10 lg:bg-transparent lg:p-0 lg:pr-0 lg:text-[calc(2.25rem*var(--heading-scale))] lg:backdrop-blur-none">
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

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="flex flex-col pt-14 sm:pt-20 lg:sticky lg:top-0 lg:h-dvh lg:w-[42%] lg:justify-between lg:overflow-y-auto lg:py-20 lg:[scrollbar-width:none] short:py-10">
        <div>
          <AnimatedName text={profile.shortName} />
          <div className="settle" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="mt-4 text-lg font-semibold text-foreground">
              {profile.role}
            </p>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              {currentJob && (
                <>
                  <span>
                    Chez{" "}
                    <a
                      href={currentJob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-foreground"
                    >
                      {currentJob.company}
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
                {profile.availability}
              </span>
            </p>
            <p className="mt-3 max-w-sm text-pretty leading-7 text-muted-foreground">
              {profile.pitch}
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
              Télécharger mon CV
            </a>
          </div>

          <div
            className="settle mt-12 hidden lg:block short:mt-6"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <SectionNav sections={sections} />
          </div>
        </div>

        <div className="mt-10 short:mt-6">
          {/* Hors du bloc animé : un filter/transform sur un parent casserait le position: fixed du mini-lecteur mobile. */}
          <div className="lg:mb-6 short:mb-4">
            <VinylPlayer
              playlistId={profile.playlistId}
              playlistUrl={profile.playlistUrl}
            />
          </div>
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
              <LocalTime timeZone={profile.timeZone} /> à Lomé
            </p>
          </div>
        </div>
      </header>

      <main className="pb-24 pt-16 text-muted-foreground lg:w-[58%] lg:py-20">
        <section
          id="experience"
          aria-labelledby="h-experience"
          className="mb-28 scroll-mt-16 lg:mb-36"
        >
          <SectionHeading>
            <span id="h-experience">Expérience</span>
          </SectionHeading>
          <ol className="flex flex-col gap-3">
            {experiences.map((xp) => (
              <li
                key={xp.start}
                className="reveal grid gap-x-8 gap-y-2 sm:grid-cols-[8.5rem_1fr] lg:-mx-5 lg:rounded-xl lg:p-5 lg:transition-colors lg:duration-200 lg:hover:bg-surface"
              >
                <p className="mono flex flex-col pt-1 text-[13px] text-faint">
                  <span>{formatPeriod(xp.start, xp.end)}</span>
                  <span>{formatDuration(xp.start, xp.end)}</span>
                </p>
                <div>
                  <h3 className="text-lg font-semibold tracking-normal text-foreground">
                    {xp.title} ·{" "}
                    {xp.url ? (
                      <a
                        href={xp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 transition-colors duration-150 hover:text-primary"
                      >
                        {xp.company}
                        <ArrowUpRight
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    ) : (
                      xp.company
                    )}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[15px] leading-7">
                    <Emphasis text={xp.summary} />
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
            <span id="h-projets">Projets</span>
          </SectionHeading>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {projects.slice(0, HOME_PROJECTS).map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                featured={i === 0}
              />
            ))}
          </ul>
          {projects.length > HOME_PROJECTS && (
            <Link
              href="/projets"
              className="group mt-10 inline-flex min-h-11 items-center gap-2 font-medium text-foreground transition-colors duration-150 hover:text-primary"
            >
              Voir tous les projets
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
            <span id="h-a-propos">À propos</span>
          </SectionHeading>
          <div className="reveal flex flex-col gap-4 text-pretty text-[17px] leading-[1.7]">
            <p>
              Je suis ingénieur logiciel au Togo, en{" "}
              <span className="font-semibold text-foreground">
                M2 intelligence artificielle à l’ESGIS
              </span>
              . Au départ, j’ai fait une{" "}
              <span className="font-semibold text-foreground">
                licence en génie mécanique
              </span>
              , puis je me suis entièrement reconverti dans la tech parce que
              j’aimais trop ça pour rester ailleurs. Ce virage m’a appris à
              apprendre vite.
            </p>
            <p>
              Hors du code, il y a la musique, les échecs, les jeux vidéo et
              beaucoup de lecture. Le disque avec ma photo, c’est justement ce
              que j’écoute en codant. Clique dessus, ça se lance ici.
            </p>
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
            <span id="h-partie">Une partie ?</span>
          </SectionHeading>
          <div className="reveal">
            <ChessPuzzle />
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
            Un projet, un poste, une question ? Écris-moi.
          </h2>
          <CopyEmail
            email={profile.email}
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-lg font-medium text-primary underline decoration-primary/40 decoration-1 underline-offset-[6px] transition-colors duration-150 hover:decoration-primary"
          />
          <ul className="mt-2 flex flex-wrap gap-x-6">
            <li>
              <a
                href={profile.cvUrl}
                className="mono inline-flex min-h-11 items-center gap-1.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-primary"
              >
                <Download size={13} strokeWidth={2} aria-hidden="true" />
                Mon CV
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
