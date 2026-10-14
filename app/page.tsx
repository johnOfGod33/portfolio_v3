import { ArrowUpRight, Mail, PenLine } from "lucide-react";
import { Fragment } from "react";

import { ChessPuzzle } from "@/components/ChessPuzzle";
import { CopyEmail } from "@/components/CopyEmail";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { LocalTime } from "@/components/LocalTime";
import { ProjectCover } from "@/components/ProjectCover";
import { SectionNav } from "@/components/SectionNav";
import { VinylPlayer } from "@/components/VinylPlayer";
import { experiences, profile, projects, socials, stack } from "@/lib/content";

const sections = [
  { id: "a-propos", label: "À propos" },
  { id: "experience", label: "Expérience" },
  { id: "projets", label: "Projets" },
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

/** Titre de section : collant sur mobile (la navigation disparaît), en display sur desktop. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display sticky top-0 z-10 -mx-6 mb-8 bg-background/90 py-4 pl-6 pr-20 text-[calc(1.75rem*var(--heading-scale))] font-extrabold leading-none tracking-[-0.02em] text-foreground backdrop-blur-sm lg:static lg:mx-0 lg:mb-10 lg:bg-transparent lg:p-0 lg:pr-0 lg:text-[calc(2.25rem*var(--heading-scale))] lg:backdrop-blur-none">
      {children}
    </h2>
  );
}

function Placeholder() {
  return (
    <span className="mono ml-2 text-[11px] font-normal tracking-normal text-faint">
      exemple
    </span>
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
      <header className="flex flex-col pt-14 sm:pt-20 lg:sticky lg:top-0 lg:h-dvh lg:w-[42%] lg:justify-between lg:overflow-y-auto lg:py-20 lg:[scrollbar-width:none]">
        <div>
          <div className="settle" style={{ "--i": 0 } as React.CSSProperties}>
            <VinylPlayer
              playlistId={profile.playlistId}
              playlistUrl={profile.playlistUrl}
            />
          </div>

          <div className="mt-10">
            <AnimatedName text={profile.shortName} />
          </div>
          <div className="settle" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="mt-4 text-lg font-semibold text-foreground">
              {profile.role}
            </p>
            <p className="mt-3 max-w-sm text-pretty leading-7 text-muted-foreground">
              {profile.pitch}
            </p>
          </div>

          <div
            className="settle mt-12 hidden lg:block"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <SectionNav sections={sections} />
          </div>
        </div>

        <div
          className="settle mt-8 flex items-center justify-between gap-6 lg:mt-10"
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
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="flex size-11 items-center justify-center text-muted-foreground transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-primary"
                >
                  <Icon size={19} strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
          <p className="mono text-[13px] text-faint">
            {profile.location} · <LocalTime timeZone={profile.timeZone} />
          </p>
        </div>
      </header>

      <main className="pb-24 pt-16 text-muted-foreground lg:w-[58%] lg:py-20">
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
              Ingénieur logiciel basé au Togo, actuellement en{" "}
              <span className="font-semibold text-foreground">
                master IA &amp; Big Data à l’ESGIS
              </span>
              . Mon parcours n’est pas linéaire : une{" "}
              <span className="font-semibold text-foreground">
                licence en génie mécanique
              </span>
              , puis une reconversion complète vers la tech — j’aimais trop
              ça pour rester ailleurs.
            </p>
            <p>
              Ce virage m’a appris à apprendre vite et à rester polyvalent.
              Je travaille surtout côté backend (APIs, bases de données,
              déploiement) et je fais le frontend quand le projet le demande.
            </p>
            <p>
              En dehors du code : musique, échecs, jeux vidéo et beaucoup de
              lecture. Le disque avec ma photo, c’est ma playlist de code :
              clique dessus pour l’écouter ici même.
            </p>
            <p className="mono pt-2 text-[13px] text-faint">
              {stack.join(" · ")}
            </p>
          </div>
        </section>

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
                key={xp.period}
                className="reveal grid gap-x-8 gap-y-2 sm:grid-cols-[8.5rem_1fr] lg:-mx-5 lg:rounded-xl lg:p-5 lg:transition-colors lg:duration-200 lg:hover:bg-surface"
              >
                <span className="mono pt-1 text-[13px] text-faint">
                  {xp.period}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-normal text-foreground">
                    {xp.title} · {xp.company}
                    {xp.placeholder && <Placeholder />}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[15px] leading-7">
                    {xp.description}
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
            {projects.map((project, i) => {
              const featured = i === 0;
              return (
                <li
                  key={project.name}
                  className={`reveal ${featured ? "sm:col-span-2" : ""}`}
                >
                  <a href={project.href} className="group block">
                    <ProjectCover
                      project={project}
                      index={i}
                      featured={featured}
                    />
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h3 className="flex items-center gap-1 text-lg font-semibold tracking-normal text-foreground transition-colors duration-150 group-hover:text-primary">
                        {project.name}
                        <ArrowUpRight
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        {project.placeholder && <Placeholder />}
                      </h3>
                      <span className="mono text-[13px] text-faint">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-1 text-pretty text-[15px] leading-7">
                      {project.description}
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
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
          <footer className="mono mt-24 text-[13px] text-faint">
            © 2026 {profile.shortName}
          </footer>
        </section>
      </main>
    </div>
  );
}
