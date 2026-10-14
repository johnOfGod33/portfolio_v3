---
name: Jean de Dieu — Portfolio
description: Portfolio minimal d'un ingénieur backend de Lomé — clair par défaut, une seule teinte vert profond, titres condensés, une playlist et un échiquier pour la personnalité.
colors:
  background: "oklch(0.99 0.002 155)"
  foreground: "oklch(0.21 0.01 155)"
  muted-foreground: "oklch(0.47 0.012 155)"
  faint: "oklch(0.53 0.01 155)"
  border: "oklch(0.91 0.006 155)"
  surface: "oklch(0.965 0.006 155)"
  input: "oklch(0.66 0.014 155)"
  primary: "oklch(0.5 0.12 155)"
  primary-soft: "oklch(0.5 0.12 155 / 0.14)"
  background-dark: "oklch(0.17 0.006 155)"
  foreground-dark: "oklch(0.94 0.004 155)"
  muted-foreground-dark: "oklch(0.72 0.01 155)"
  faint-dark: "oklch(0.64 0.01 155)"
  border-dark: "oklch(0.28 0.008 155)"
  surface-dark: "oklch(0.21 0.008 155)"
  input-dark: "oklch(0.45 0.014 155)"
  primary-dark: "oklch(0.77 0.13 155)"
  primary-soft-dark: "oklch(0.77 0.13 155 / 0.2)"
  cover-pale: "oklch(0.9 0.06 155)"
  cover-pale-ink: "oklch(0.3 0.08 155)"
  cover-deep: "oklch(0.26 0.03 155)"
  cover-deep-ink: "oklch(0.86 0.1 155)"
  cover-accent: "oklch(0.5 0.12 155)"
  cover-accent-ink: "oklch(0.97 0.02 155)"
  cover-pale-dark: "oklch(0.32 0.06 155)"
  cover-pale-ink-dark: "oklch(0.88 0.09 155)"
  cover-deep-dark: "oklch(0.88 0.05 155)"
  cover-deep-ink-dark: "oklch(0.25 0.04 155)"
  board-light: "oklch(0.93 0.03 140)"
  board-dark: "oklch(0.6 0.075 150)"
  board-selected: "oklch(0.85 0.15 100 / 0.55)"
  board-mated: "oklch(0.62 0.2 28 / 0.55)"
  vinyl-groove: "oklch(0.16 0 0)"
typography:
  display:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "calc(clamp(3rem, 6vw, 4.5rem) * var(--heading-scale))"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "calc(2.25rem * var(--heading-scale))"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline-contact:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "calc(clamp(2rem, 4.5vw, 3rem) * var(--heading-scale))"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  cover-title:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "calc(clamp(2rem, 4vw, 2.75rem) * var(--heading-scale))"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  body-small:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "28px"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
rounded:
  focus: "4px"
  board: "12px"
  surface: "1.05rem"
  full: "9999px"
spacing:
  gutter: "24px"
  gutter-md: "48px"
  column-gap: "64px"
  heading-gap: "32px"
  heading-gap-lg: "40px"
  section-gap: "112px"
  section-gap-lg: "144px"
components:
  text-link:
    textColor: "{colors.foreground}"
  text-link-hover:
    textColor: "{colors.primary}"
  email-link:
    textColor: "{colors.primary}"
    typography: "{typography.title}"
    height: "44px"
  section-nav-item:
    textColor: "{colors.faint}"
    height: "40px"
  section-nav-item-active:
    textColor: "{colors.foreground}"
  experience-row-hover:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.surface}"
    padding: "20px"
  project-cover:
    backgroundColor: "{colors.cover-pale}"
    textColor: "{colors.cover-pale-ink}"
    rounded: "{rounded.surface}"
    padding: "20px"
  vinyl-badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    size: "28px"
  theme-toggle:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    size: "44px"
  theme-toggle-hover:
    textColor: "{colors.primary}"
  vinyl-record:
    backgroundColor: "{colors.vinyl-groove}"
    rounded: "{rounded.full}"
    size: "80px"
  chess-board:
    rounded: "{rounded.board}"
    width: "20rem"
---

# Design System: Jean de Dieu — Portfolio

## Overview

**Creative North Star: "Une page, un disque, un échiquier"**

Pas de métaphore à décoder : une page claire, sobre, où la personnalité tient dans deux objets réels de la vie de Jean de Dieu. Sa playlist de code, qu'on lance en cliquant sur un vinyle dont son portrait est l'étiquette, et un problème d'échecs qu'on peut jouer. Tout le reste se tait : texte bien composé, une seule teinte vert profond (clin d'œil discret au Togo), des titres condensés à l'allure industrielle qui rappellent sa formation en génie mécanique.

La page est à deux colonnes sur desktop : à gauche, une colonne fixe qui dit qui il est et où l'on se trouve ; à droite, le contenu qui défile. Sur mobile tout s'empile et les titres de section prennent le relais de la navigation en restant collés en haut. Le clair est le mode par défaut, le sombre est son égal, pas un bonus : la préférence système décide d'abord, puis le visiteur peut basculer. Le mouvement existe pour que la page se pose et réponde, jamais pour faire spectacle.

Rejets confirmés : le template SaaS (cards partout, gradients, eyebrow + gros CTA), le portfolio Awwwards sur-animé, le CV corporate, le cliché « hacker » (noir + vert néon, faux terminal), et le joli-mais-froid. Le vert est profond et posé, jamais néon ; la mono est réservée aux données, jamais une identité « terminal ».

**Key Characteristics:**
- Une teinte (155°) pour tout le système, en clair comme en sombre ; l'accent est rare dans l'interface mais s'affirme à l'échelle du bloc sur les couvertures de projets.
- Trois voix typographiques aux rôles étanches : Big Shoulders pour les titres, Bricolage Grotesque pour le texte, Geist Mono pour les données.
- Colonne gauche fixe (vinyle, nom, rôle, pitch, navigation scrollspy, réseaux + heure de Lomé), colonne droite qui défile, un bouton de thème rond flottant en haut à droite.
- Deux objets signature : le vinyle-lecteur et l'échiquier jouable. Ce sont les seuls éléments qui ont des couleurs propres, et avec le bouton de thème flottant, les seuls à porter une ombre.
- Pas de card au repos : une surface n'apparaît qu'au survol.
- Tout le mouvement se coupe sous `prefers-reduced-motion`.

## Colors

Une seule famille chromatique, vert profond à 155°, déclinée en neutres à peine teintés et un accent ajusté par thème ; seuls les objets (vinyle, échiquier) ont leurs couleurs à eux.

### Primary
- **Vert Lomé** (`{colors.primary}` en clair, `{colors.primary-dark}` en sombre) : liens au survol, adresse email, trait actif de la navigation, pastille play du vinyle, barres d'égaliseur, anneau de focus. Contraste 5.5:1 sur le fond clair, 9.7:1 sur le fond sombre.
- **Vert Lomé voilé** (`{colors.primary-soft}` / `{colors.primary-soft-dark}`) : fond de la sélection de texte uniquement.

### Secondary
- **Tons de couverture** : trois tons de la même teinte pour les couvertures typographiques de projets, chacun avec son encre. Pâle (`{colors.cover-pale}` + `{colors.cover-pale-ink}`), profond (`{colors.cover-deep}` + `{colors.cover-deep-ink}`), accent (`{colors.cover-accent}` + `{colors.cover-accent-ink}`). En thème sombre, le pâle et le profond s'inversent (`cover-pale-dark`, `cover-deep-dark`) pour garder un bloc clair et un bloc sombre dans chaque thème ; le ton accent reste identique. Attribution cyclique (`index % 3`).

### Tertiary
- **Échiquier de club** (`{colors.board-light}` / `{colors.board-dark}`) : cases claires et foncées, identiques dans les deux thèmes, car l'échiquier est un objet et non une surface du site.
- **Case sélectionnée** (`{colors.board-selected}`, jaune) et **roi maté** (`{colors.board-mated}`, rouge) : états de jeu, confinés au plateau.
- **Sillons du vinyle** (`{colors.vinyl-groove}` et voisins achromatiques) : matière du disque, la seule couleur sans teinte du système.

### Neutral
- **Papier** (`{colors.background}` / `{colors.background-dark}`) : fond de page. Un blanc à peine verdi, un noir à peine verdi.
- **Encre** (`{colors.foreground}` / `{colors.foreground-dark}`) : titres, nom, rôle, mots mis en avant dans le texte. 17:1 et 16:1.
- **Encre douce** (`{colors.muted-foreground}` / `{colors.muted-foreground-dark}`) : couleur par défaut du texte courant de la colonne droite et du pitch.
- **Discret** (`{colors.faint}` / `{colors.faint-dark}`) : données en mono (dates, stack, heure, pied de page), liens inactifs de la navigation. 5.1:1 sur le fond clair, 4.8:1 sur `surface` (lignes survolées).
- **Surface** (`{colors.surface}` / `{colors.surface-dark}`) : fond d'une ligne d'expérience au survol, fond de repli d'une couverture de projet.
- **Trait** (`{colors.border}` / `{colors.border-dark}`) : soulignement des liens au repos, trait inactif de la navigation, liseré du vinyle, barre de défilement.
- **Bordure interactive** (`{colors.input}` / `{colors.input-dark}`) : héritée de shadcn pour `components/ui`, inutilisée dans la page actuelle.

### Named Rules
**The One Hue Rule.** Toute couleur d'interface partage la teinte 155°. Les seules exceptions sont les objets : le plateau d'échecs (cases 140–150°, jaune de sélection, rouge de mat) et les sillons achromatiques du vinyle. Une nouvelle teinte dans l'interface demande une décision explicite.

**The Block-Scale Accent Rule.** Dans l'interface, l'accent reste rare (états et liens). Il ne s'engage en masse qu'à l'échelle d'un bloc entier, sur les couvertures de projets, et toujours en tons de la même teinte.

**The Equal Themes Rule.** Chaque token existe en clair et en sombre, réglé pour son fond. Le thème suit la préférence système jusqu'à ce que le visiteur choisisse avec le bouton de thème ; son choix (`localStorage` clé `theme`) est posé en `data-theme` sur `<html>` par un script inline avant le premier rendu. Les valeurs sombres s'appliquent sous `:root[data-theme="dark"]` et sous `@media (prefers-color-scheme: dark)` pour `:root:not([data-theme="light"])` ; toute règle dépendante du thème (tokens, tons de couverture) doit être écrite pour ces deux sélecteurs.

## Typography

**Display Font:** Big Shoulders (repli Arial Narrow, sans-serif), axe `opsz`
**Body Font:** Bricolage Grotesque (repli ui-sans-serif, system-ui), axes `opsz` et `wdth`
**Label/Mono Font:** Geist Mono (repli ui-monospace), chiffres tabulaires

**Character:** Big Shoulders, condensée et industrielle, donne aux titres une allure de plaque d'atelier, discret rappel du génie mécanique. Bricolage Grotesque garde le texte chaleureux et un peu irrégulier, loin du sans-serif par défaut. Geist Mono n'apparaît que là où il y a des données.

### Hierarchy
- **Display** (Big Shoulders 800, `{typography.display}`, interligne 0.92, tracking -0.02em) : le nom dans la colonne gauche, lettres posées une à une au chargement.
- **Headline** (Big Shoulders 800, 1.75rem × scale sur mobile, 2.25rem × scale dès `lg`, interligne 1, tracking -0.02em) : titres de section. Le titre de contact suit la même voix à plus grande taille (`{typography.headline-contact}`).
- **Cover title** (Big Shoulders 800, interligne 0.88, tracking -0.02em) : nom de projet sur la couverture typographique ; version mise en avant à `clamp(2.75rem, 7vw, 5rem) × scale`.
- **Title** (Bricolage 600, 18px) : rôle sous le nom, intitulé d'expérience, nom de projet sous sa couverture.
- **Body** (Bricolage 400, 17px, interligne 1.7) : texte d'À propos. Descriptions d'expérience et de projet en 15px / 28px. Colonnes contenues (`max-w-sm` pour le pitch, `max-w-xs` pour le texte d'échecs), `text-pretty` partout.
- **Label** (Geist Mono 400, 13px, tracking -0.01em, tabulaire) : dates, stack, heure locale, pied de page. 12px dans les couvertures et le lien Spotify, 9px pour les coordonnées de l'échiquier.

### Named Rules
**The Same Voice Rule.** Tous les titres en Big Shoulders (nom, sections, contact, couvertures) partagent la même graisse (800) et la même famille de tracking que le nom. Un titre de section ne doit jamais paraître plus léger ou plus serré que le nom. Valeur unique : tracking -0.02em, graisse 800, y compris pour « Échec et mat. ».

**The Data-Only Mono Rule.** Geist Mono sert uniquement aux données (dates, stack, coordonnées, heure). Jamais pour un titre, un paragraphe ou un bouton de navigation.

**The Heading Scale Rule.** Toute taille de titre en police display s'écrit `calc(<taille> * var(--heading-scale))`. La variable (1.22 pour Big Shoulders, dans `app/globals.css`) compense la largeur de la police. Pour changer de police de titre : remplacer `fontDisplay` dans `lib/fonts.ts` par une déclaration de `lib/fonts-reserve.ts` (garder `variable: "--font-display"`), puis régler `--heading-scale` sur sa valeur : Unbounded 0.66, Funnel Display 0.82, Anybody 0.95, Bricolage Grotesque 1. Les polices de réserve ne sont pas importées, donc jamais chargées.

## Layout

Conteneur centré `max-w-6xl` (72rem), gouttières 24px puis 48px dès `md`.

**Desktop (≥1024px) :** deux colonnes séparées de 64px. La colonne gauche (42 %) est collante sur toute la hauteur (`100dvh`), défile seule si besoin, sans barre visible : en haut le vinyle, le nom, le rôle, le pitch puis la navigation de sections ; en bas les icônes sociales et « Lomé, Togo · heure locale ». La colonne droite (58 %) défile : À propos, Expérience, Projets, Une partie ?, Contact.

**Mobile et tablette :** tout s'empile ; la navigation disparaît et chaque titre de section devient collant en haut de l'écran (fond `background` à 90 % + léger flou), pleine largeur.

**Rythme :** 112px entre sections (144px dès `lg`), 32px sous un titre de section (40px dès `lg`). Projets en grille 2 colonnes dès `sm` (gouttières 24px / 48px), le premier projet occupe les deux colonnes en 16:9, les suivants en 4:3. Expériences en grille date (8.5rem) + contenu dès `sm`. `scroll-mt-16` sur les sections pour les ancres.

### Named Rules
**The Fixed Identity Rule.** Sur desktop, l'identité (vinyle, nom, navigation, contact rapide) ne quitte jamais l'écran ; seul le contenu défile.

## Elevation & Depth

Le site est plat ; seuls les objets et l'unique contrôle flottant ont du relief. Le texte, les sections et les lignes n'ont aucune ombre, et la profondeur de l'interface vient d'un passage à `surface` au survol. Le vinyle, sa pastille et l'échiquier sont traités comme des choses posées sur la page, avec des ombres douces teintées de la même teinte.

### Shadow Vocabulary
- **Disque** (`box-shadow: 0 6px 18px oklch(0.2 0.02 155 / 0.25)`) : le vinyle.
- **Pastille** (`box-shadow: 0 2px 6px oklch(0.2 0.02 155 / 0.3)`) : bouton play/pause sur le disque.
- **Plateau** (`box-shadow: 0 10px 30px oklch(0.25 0.04 155 / 0.18)`) : l'échiquier.
- **Pièce** (`drop-shadow: 0 1px 1px oklch(0.2 0.02 155 / 0.35)`) : chaque pièce d'échecs.
- **Flottant** (`box-shadow: 0 4px 14px oklch(0.2 0.02 155 / 0.12)`) : le bouton de thème, seul élément `fixed` au-dessus du contenu.

### Named Rules
**The Objects-Only Shadow Rule.** Une ombre signale un objet physique (disque, plateau, pièce) ou un contrôle qui flotte réellement au-dessus du contenu (bouton de thème). Aucune ombre sur une section, une ligne, une couverture ou un lien.

**The Hover Surface Rule.** Les surfaces n'existent pas au repos : une ligne d'expérience prend `surface` et un coin arrondi seulement au survol, sur desktop.

## Shapes

Coins généreux et doux sur les blocs (1.05rem, `rounded-xl` dérivé de `--radius: 0.75rem`) : couvertures de projets et lignes d'expérience au survol. L'échiquier a des coins plus serrés (12px), le focus 4px. Le cercle est réservé au vinyle, à son étiquette (portrait, ~70 % du disque), à sa pastille, au bouton de thème et aux points de coups possibles. Pas de bordure de bloc : les seuls traits sont le soulignement des liens, le trait de la navigation et le liseré du disque.

**The Vinyl Texture Exception.** Les sillons du disque (`repeating-radial-gradient`) sont le seul dégradé du système : une texture de matière, pas une décoration. Aucun autre dégradé.

## Components

### Liens
- **Lien de texte :** soulignement fin (1px, `border`, décalé de 4px) qui prend la couleur de l'accent au survol, 150ms.
- **Email de contact :** bouton qui copie l'adresse (icône copier → coche pendant 1.8s, annonce `aria-live`), Bricolage 500 18px en `primary`, soulignement `primary` à 40 % qui se renforce au survol, cible ≥44px. Repli `mailto:` si le presse-papier échoue.
- **Icônes sociales :** GitHub, LinkedIn, Articles (blog, icône plume `PenLine`), Email, 19px, trait 1.75, cible 44px, `muted-foreground` → `primary` au survol avec une montée de 2px.

### Bouton de thème
Bouton rond de 44px fixé en haut à droite (16px du bord, 24px dès `md`), au-dessus de tout : fond `background` à 85 % flouté, liseré `border`, icône lune (vers le sombre) ou soleil (vers le clair) 18px trait 1.75 en `foreground`. Survol : liseré et icône en `primary`, échelle 1.05, l'icône pivote de 20° ; appui 0.95. L'icône reste invisible tant que le thème n'est pas connu côté client. `aria-label` décrit l'action (« Passer en mode sombre »).

### Navigation
- **Scrollspy à trait :** liste verticale de la colonne gauche (desktop uniquement), Bricolage 500 14px, hauteur 40px. Chaque lien est précédé d'un trait de 1px : 28px en `border` au repos, 56px en `foreground` au survol, 56px en `primary` quand la section est active (texte en `foreground`, `aria-current`). La section active est celle qui traverse la bande centrale de l'écran (IntersectionObserver, marge -40 % / -55 %). Transitions 200–300ms.
- **Mobile :** pas de menu ; les titres de section collants font office de repère.

### Cards / Containers
- **Ligne d'expérience :** pas de card. Date en mono à gauche, intitulé + description + stack à droite ; au survol (desktop) fond `surface`, coins 1.05rem, padding 20px.
- **Couverture de projet :** capture réelle (`image`, `object-top`, zoom 1.03 au survol) si elle existe ; sinon couverture typographique : nom du projet énorme en Big Shoulders 800 posé en bas, stack en mono 12px en haut, sur un ton plat de la teinte (cycle des trois tons), montée de 6px du titre au survol. Le nom sous la couverture passe en `primary` et sa flèche glisse en diagonale.

### Vinyle-lecteur (signature)
Disque de 80px aux sillons fins, portrait en étiquette sur ~70 % du disque, point central couleur fond. Pastille play/pause `primary` de 28px en bas à droite. Le disque tourne (2.4s/tour) uniquement pendant la lecture ; trois barres d'égaliseur `primary` dansent à côté de « En écoute ». Légende en deux lignes (état + consigne) et un petit lien mono « Ouvrir dans Spotify ». Piloté par l'API iFrame Spotify chargée en `requestIdleCallback` ; le lecteur Spotify reste monté à pleine taille (80px × 320px) mais en `opacity: 0`, `pointer-events: none`, `inert`, car Spotify refuse de jouer dans un cadre de hauteur nulle. Si le script échoue, le clic ouvre la playlist dans un nouvel onglet. Survol : échelle 1.04 ; appui : 0.97.

### Échiquier (signature)
Mat en un coup, max 20rem de côté, cases vert de club, coordonnées en mono 9px dans la couleur de la case opposée. Pièces Staunton dessinées en SVG (viewBox 45×45), couleurs fixes dans les deux thèmes. Sélection : case jaune et pièce soulevée (×1.1). Coups possibles : points ronds. Mauvais coup : message « Pas encore. » et retour à la position après 1.1s. Mat : roi noir sur case rouge, « Échec et mat. » et invitation à écrire. Chaque case est un bouton avec un `aria-label` complet ; les pièces glissent (380ms) via `transform`.

### Mouvement
- **Arrivée (settle) :** les blocs de la colonne gauche passent du flou au net en montant de 6px, 700ms, `cubic-bezier(0.16, 1, 0.3, 1)`, décalés de 70ms (`--i`).
- **Nom :** chaque lettre se pose l'une après l'autre (650ms, +35ms par lettre, départ à 120ms), mot entier insécable, `aria-label` sur le titre.
- **Révélation au scroll :** `animation-timeline: view()` (montée de 24px, entrée 0–35 %), seulement sous `@supports` ; sans support, le contenu est simplement là.
- **Survols :** montées de 2–6px, changements de couleur 150–200ms.
- **Réduction :** sous `prefers-reduced-motion`, settle, lettres, révélation, disque, égaliseur et glissement des pièces sont coupés.

## Do's and Don'ts

### Do:
- **Do** garder toute couleur d'interface à la teinte 155°, avec une valeur réglée pour chaque thème, écrite à la fois pour `[data-theme="dark"]` et pour la préférence système.
- **Do** écrire toute taille de titre display en `calc(… * var(--heading-scale))` et changer de police de titre via `lib/fonts-reserve.ts` + `--heading-scale`.
- **Do** donner à chaque titre Big Shoulders la graisse 800 et le même tracking que le nom.
- **Do** réserver Geist Mono aux données : dates, stack, heure, coordonnées.
- **Do** donner une couverture typographique (nom en Big Shoulders sur un ton plat de la teinte, stack en mono) à tout projet sans capture, et une capture réelle via `image` dès qu'elle existe.
- **Do** traiter le vinyle et l'échiquier comme des objets : couleurs fixes, ombres douces teintées, identiques dans les deux thèmes.
- **Do** laisser la préférence système décider tant que le visiteur n'a pas choisi, puis respecter son choix persistant.
- **Do** couper tout mouvement sous `prefers-reduced-motion` et prévoir un rendu complet sans `animation-timeline`.
- **Do** garder des cibles d'au moins 40–44px (navigation, icônes, email, cases de l'échiquier par leur taille).

### Don't:
- **Don't** ajouter d'eyebrow ou de surtitre en petites capitales au-dessus d'une section.
- **Don't** utiliser de dégradé décoratif ; les sillons du vinyle sont la seule exception, en tant que matière.
- **Don't** poser de card par défaut : une surface apparaît au survol, pas au repos.
- **Don't** mettre d'ombre ailleurs que sur un objet (disque, pastille, plateau, pièce) ou le bouton de thème flottant.
- **Don't** passer en vert néon sur noir, faux terminal, effet de frappe ou mono généralisée : c'est le cliché « hacker » rejeté.
- **Don't** réintroduire Geist Sans comme police de texte : jugée trop basique, remplacée par Bricolage Grotesque.
- **Don't** monter une direction à métaphore : la personnalité passe par la playlist et les échecs, pas par un concept.
- **Don't** faire de scroll-jacking ni d'animation qui retarde la lecture du contenu.
- **Don't** masquer le lecteur Spotify en hauteur nulle : il doit rester à taille réelle, invisible et inerte.
- **Don't** utiliser les composants `components/ui` (button, sheet) sans les restyler aux tokens ci-dessus ; ils sont présents mais inutilisés.
