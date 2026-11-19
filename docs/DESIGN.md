# Design System — Crescendo

## Product Context
- **Quoi** : site vitrine d'une agence d'IA et d'automatisation pour PME : landing, blog éditorial et espace admin pour gérer les articles.
- **Pour qui** : dirigeants et responsables opérationnels de PME (10 à 250 salariés), en particulier PME marketing.
- **Espace** : agences IA et automatisation, vente consultative B2B (pas un SaaS).
- **Type** : marketing et éditorial (landing + blog), avec un admin sobre.
- **Memorable thing** : un dirigeant de PME comprend en 3 secondes qu'on lui rend du temps, sans jargon IA. *(proposée par Claude, à confirmer)*

## Aesthetic Direction
- **Direction** : Editorial/Magazine, sobre.
- **Décoration** : minimal. La typographie et les filets font le travail.
- **Mood** : sérieux, concret, lisible. Le bleu est rare, donc l'action « Réserver un appel découverte » est la chose la plus visible de la page.
- **Références** : `site.css` du dépôt et `docs/superpowers/specs/2026-11-16-refonte-design-crescendo-design.md` (approche « A · Affiné »). Aucune recherche web.

## Typography
- **Display/Hero** : Bricolage Grotesque, 700 — titres, interface, navigation.
- **Body** : Newsreader — texte long, blog lisible sans fatigue.
- **Data/Tables** : Geist avec `tabular-nums` — chiffres alignés.
- **Code** : JetBrains Mono.
- **Loading** : Google Fonts, `family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Geist:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap`
- **Scale** : texte 19px (1.1875rem), lead 20px, h3 19px, h2 `clamp(1.6rem, 3.4vw, 2.4rem)`, h1 `clamp(2.2rem, 6vw, 4rem)`. Interlignage texte 1.6, titres 1.1, `letter-spacing: -0.02em` sur les titres.

## Color
- **Approche** : restrained. Un accent unique et des neutres froids.
- **Primary (signal)** : `#2339E8` — actions, liens, focus. Sombre : `#7C8CFF`.
- **Secondary** : `#DDE2FB` (`--signal-soft`) — survol des boutons secondaires. Sombre : `#212C66`.
- **Neutrals** : papier `#EEF1F5`, surface `#FFFFFF`, filet `#B9C2D3`, bordure de champ `#6F7B94`, encre douce `#46506B`, encre `#101B38`.
- **Semantic** : success `#0F7B4B`, warning `#8A5A00`, error `#B3261E`, info `#2339E8`.
- **Dark mode** : automatique via `prefers-color-scheme`, avec `data-theme="light|dark"` pour forcer. Papier `#0D1530`, surface `#16204A`, encre `#E8ECF8`, encre douce `#A5AFCB`, filet `#2E3A6B`, bordure de champ `#7684C0`, success `#5FD3A0`, warning `#F2C26B`, error `#FF8A80`.

## Spacing
- **Base** : 8px.
- **Densité** : spacieux.
- **Scale** : 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **Approche** : hybrid. Grille disciplinée pour la landing et l'admin, colonne étroite (62ch) pour le blog.
- **Grid** : une colonne sur mobile, contenu centré dans `.wrap` ; marges 20px (mobile) puis 32px dès 48rem.
- **Max content width** : 68rem (1088px) ; paragraphes limités à 62ch.
- **Border radius** : sm:3px (focus), md:10px (boutons, champs, cartes), lg:14px (blocs de mockup), full:9999px

## Motion
- **Approche** : minimal-fonctionnel. Seules les transitions de couleur sur boutons et focus.
- **Easing** : enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration** : micro(50-100ms) court(150-250ms) moyen(250-400ms) long(400-700ms). Boutons : 200ms. `prefers-reduced-motion` désactive les transitions.

## Accessibilité
- Contraste AA minimum, thèmes clair et sombre.
- Focus visible : contour 3px couleur signal, décalé de 3px.
- Cibles tactiles de 44px minimum (boutons, champs, liens de menu).

## Decisions Log
| Date | Décision | Rationale |
|------|----------|-----------|
| 2026-11-19 | Création initiale | /design — site vitrine Crescendo ; on documente le système déjà présent dans `site.css` et on ajoute `--signal-soft`, les couleurs sémantiques, Geist et JetBrains Mono. |
| 2026-11-19 | Système du dépôt retenu, pas le look Site123 | Le site Site123 (sombre, Inter + Space Grotesk) est une autre direction. Le dépôt garde clair, Bricolage Grotesque et Newsreader. |
