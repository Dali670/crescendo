# Refonte du design Crescendo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refaire le design de la landing, du blog et de l'admin Crescendo avec un système visuel unique, et aligner les textes sur l'offre validée.

**Architecture:** Un seul `site.css` (jetons, base, composants) partagé par `index.html`, `blog.html` et `admin.html`. Aucun build : HTML statique, modules ES, Supabase JS via `config.js` (inchangé). Les règles de contenu et de style sont verrouillées par des tests Node sans dépendance (`node --test`) qui lisent les fichiers.

**Tech Stack:** HTML, CSS, JS (modules ES), Supabase JS (CDN), `node:test` (Node 22).

**Spec:** `docs/superpowers/specs/2026-11-16-refonte-design-crescendo-design.md`

## Global Constraints

- HTML statique, aucune étape de build, aucune dépendance npm ajoutée.
- `config.js` et les appels Supabase (`posts`, rpc `is_admin`) inchangés.
- Langue : français. Marque : « Crescendo ».
- Polices : Bricolage Grotesque (titres), Newsreader (texte).
- Un seul accent : `--signal`. Thèmes clair et sombre, contraste AA (≥ 4.5), focus visible, `prefers-reduced-motion` respecté.
- Bouton unique de la landing : « Réserver un appel découverte gratuit ».
- Preuve : « 15 h par semaine chez un client », jamais présentée comme moyenne.
- Interdits sur les pages : `[NEED`, « 2 semaines », « 3 000 », « 3000 », « 1 nouveau projet », « Garantie par jalon », tout prix en € sur la landing.
- Les données d'article s'insèrent avec `textContent`, jamais `innerHTML`.

## Review Focus

- Article au slug inconnu : titre « Article introuvable », pas de page blanche.
- Supabase injoignable : le blog affiche « Impossible de charger les articles. », pas de liste vide muette.
- Contenu d'article contenant `<script>` ou `<b>` : affiché en texte, jamais interprété.
- Article vide ou très court : temps de lecture minimum 1 min, jamais 0 ni `NaN`.
- Compte connecté sans droit admin : déconnecté avec le message « Ce compte n'a pas les droits admin. ».

## File Structure

- `site.css` : réécrit. Jetons, base, en-tête, pied de page, `.btn`, `.card`, `.prose`, sections de landing, FAQ, admin.
- `index.html` : réécrit, sans `<style>` en ligne.
- `blog.html` : mis en forme, importe `blog-utils.js`.
- `blog-utils.js` : nouveau. Fonction pure `readingTime`.
- `admin.html` : mis en forme, logique Supabase conservée.
- `tests/site.test.mjs` : règles de contenu, de structure et de style.
- `tests/blog-utils.test.mjs` : tests de `readingTime`.

---

### Task 1: Garde-fous de contenu et de structure

**Files:**
- Create: `tests/site.test.mjs`

**Interfaces:**
- Produces: helper local `read(name: string): string` (lit un fichier à la racine). Les tâches 2 à 5 ajoutent leurs tests dans ce même fichier.

- [ ] **Step 1: Écrire les tests (échec attendu)** dans `tests/site.test.mjs`, avec `node:test`, `node:assert/strict`, `node:fs`. Pour chacune des pages `index.html`, `blog.html`, `admin.html` :
  - `no placeholders and no obsolete claims` : aucune des chaînes interdites des Global Constraints (hors règle prix, propre à la landing).
  - `links shared stylesheet` : contient `href="site.css"`.
  - `declares language and viewport` : contient `<html lang="fr">` et `name="viewport"`.
  - `has the three nav links` : contient `href="index.html"`, `href="blog.html"` et `href="admin.html"` dans un `<nav`.
- [ ] **Step 2: Lancer** `node --test tests/` ; attendu : FAIL sur `index.html` (« [NEED », « 2 semaines », `<style>` encore présent côté liens).
- [ ] **Step 3: Commit** `test: garde-fous de contenu et de structure du site`.

### Task 2: Système de design `site.css`

**Files:**
- Modify: `site.css` (réécriture complète)
- Test: `tests/site.test.mjs`

**Interfaces:**
- Produces : jetons `--paper --paper-2 --ink --ink-soft --signal --signal-ink --rule --display --text` ; composants `.wrap .btn .btn-ghost .card .cards .tag .prose .lead .note` ; classes de landing `.hero .block .steps .included .proof .faq .final` ; classes d'admin `.admin .toolbar .editor .posts-table .status`. Les tâches 3 à 5 n'utilisent que ces noms.

- [ ] **Step 1: Écrire les tests** : `tokens exist` (chaque jeton ci-dessus présent dans `site.css`) ; `dark theme defined` (`prefers-color-scheme: dark` et `:root[data-theme="dark"]`) ; `reduced motion respected` (`prefers-reduced-motion`) ; `focus visible` (`:focus-visible`) ; `components exist` (chaque classe de l'interface) ; `contrast AA` : lit les valeurs hex de `:root` et du bloc sombre, calcule le ratio WCAG et exige ≥ 4.5 pour `ink/paper`, `ink-soft/paper`, `signal-ink/signal` dans les deux thèmes.
- [ ] **Step 2: Lancer** ; attendu : FAIL (composants et contraste absents).
- [ ] **Step 3: Réécrire `site.css`.** Valeurs clair : paper `#EEF1F5`, paper-2 `#FFFFFF`, ink `#101B38`, ink-soft `#46506B`, signal `#2339E8`, signal-ink `#FFFFFF`, rule `#B9C2D3`. Valeurs sombre : paper `#0D1530`, paper-2 `#16204A`, ink `#E8ECF8`, ink-soft `#A5AFCB`, signal `#7C8CFF`, signal-ink `#0D1530`, rule `#2E3A6B`. Texte 18 à 19 px, interligne 1,6, titres fluides en `clamp`, `.prose` en colonne de 40 rem, transitions désactivées sous `prefers-reduced-motion`. Reprendre le thème forcé `:root[data-theme]` déjà présent.
- [ ] **Step 4: Lancer** ; attendu : tests de `site.css` PASS.
- [ ] **Step 5: Commit** `feat: système de design partagé`.

### Task 3: Landing `index.html`

**Files:**
- Modify: `index.html` (réécriture, plus de `<style>` en ligne)
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes : classes de la tâche 2.
- Produces : ancre `#reserver` ciblée par tous les boutons d'action.

- [ ] **Step 1: Écrire les tests** : `single call to action label` (≥ 2 occurrences de « Réserver un appel découverte gratuit », aucune autre formulation de bouton) ; `all buttons target #reserver` ; `no inline style block` ; `no price on landing` (aucune regex `\d[\d\s ]*€`) ; `proof is scoped to one client` (contient « 15 h par semaine » et « chez un client », ne contient pas « en moyenne ») ; `sections in order` (ids ou classes `hero, pain, solution, steps, included, proof, faq, final` dans cet ordre) ; `faq has at least 3 details` ; `meta description present`.
- [ ] **Step 2: Lancer** ; attendu : FAIL.
- [ ] **Step 3: Réécrire `index.html`.** Ordre : en-tête avec `<nav>` ; hero (h1 sur factures, devis et relances sans saisie, bouton, ligne de preuve) ; douleur ; solution (Airtable, agent IA connecté aux données du client, workflows n8n) ; parcours en trois étapes (appel découverte gratuit, audit, implémentation, sans prix) ; inclus (diagnostic, tests sur scénarios convenus, guide de prise en main, procédure de reprise manuelle, validation humaine des actions sensibles) ; preuve ; FAQ en `<details>` (accès aux données, erreurs de l'IA, durée, maintenance, sans prix) ; appel final avec `id="reserver"` ; pied de page avec « Crescendo » et lien Blog. Textes tirés de `crescendo-live/.agents/landing/03-offer.md`. Ne rien affirmer que ce fichier ne dit pas ; lien de réservation et mentions légales : le bouton pointe vers `#reserver`, le pied de page n'invente aucune mention.
- [ ] **Step 4: Lancer** ; attendu : PASS.
- [ ] **Step 5: Vérifier à l'œil** : `python -m http.server 8080`, ouvrir `http://localhost:8080/` en clair, sombre, 375 px et 1280 px ; aucun débordement horizontal.
- [ ] **Step 6: Commit** `feat: nouvelle landing alignée sur l'offre`.

### Task 4: Blog

**Files:**
- Create: `blog-utils.js`, `tests/blog-utils.test.mjs`
- Modify: `blog.html`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Produces : `export function readingTime(text: string): number` (minutes entières, 200 mots par minute, minimum 1, `""` donne 1).

- [ ] **Step 1: Écrire les tests** dans `tests/blog-utils.test.mjs` : `readingTime("")` vaut 1 ; 1 mot vaut 1 ; 200 mots vaut 1 ; 201 mots vaut 2 ; 1 000 mots vaut 5 ; `readingTime("a\n\nb")` compte 2 mots. Dans `site.test.mjs` pour `blog.html` : `uses prose column` (contient `class="prose"`) ; `renders text safely` (ne contient aucun `innerHTML =` avec donnée d'article) ; `handles unknown slug` (contient « Article introuvable ») ; `handles load failure` (contient « Impossible de charger les articles. ») ; `sets per-article meta` (écrit `document.title` et `meta[name=description]`).
- [ ] **Step 2: Lancer** ; attendu : FAIL.
- [ ] **Step 3: Implémenter** `readingTime` dans `blog-utils.js`, puis mettre en forme `blog.html` : liste en `.cards`, page article en `.prose` avec date, temps de lecture et lien de retour, `try/catch` autour des appels Supabase. Requêtes Supabase conservées à l'identique (`posts`, `published`, `slug`). Insertion en `textContent`. Un paragraphe par bloc séparé par ligne vide (comportement actuel).
- [ ] **Step 4: Lancer** ; attendu : PASS.
- [ ] **Step 5: Vérifier à l'œil** (serveur local) : liste, article, slug inconnu `blog.html?p=nope`, mode sombre, 375 px.
- [ ] **Step 6: Commit** `feat: blog éditorial avec temps de lecture`.

### Task 5: Espace admin

**Files:**
- Modify: `admin.html`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes : classes `.admin .toolbar .editor .posts-table .status` de la tâche 2.

- [ ] **Step 1: Écrire les tests** : `uses admin layout` (`class="admin"`, `class="editor"`, `class="posts-table"`) ; `status messages are announced` (`role="alert"` et `role="status"`) ; `non-admin message kept` (« Ce compte n'a pas les droits admin. ») ; `uses is_admin rpc and posts table` (`rpc("is_admin")`, `from("posts")`) ; `inputs are labelled` (chaque champ du formulaire a un `<label` ou `aria-label`) ; `noindex` (`<meta name="robots" content="noindex">`).
- [ ] **Step 2: Lancer** ; attendu : FAIL.
- [ ] **Step 3: Mettre en forme `admin.html`.** Barre d'outils (nouvel article, déconnexion) ; tableau des articles (titre, statut Publié ou Brouillon, date, actions Modifier et Supprimer avec `confirm`) ; éditeur en deux colonnes à partir de 60 rem (métadonnées à gauche, contenu à droite). Logique `show`, `load`, `edit`, formulaire et déconnexion conservée, y compris la déconnexion automatique d'un compte non admin.
- [ ] **Step 4: Lancer** ; attendu : PASS.
- [ ] **Step 5: Vérifier à l'œil** : connexion, création d'un brouillon, publication, modification, suppression, à 375 px et 1280 px.
- [ ] **Step 6: Commit** `feat: espace admin sobre et lisible`.

### Task 6: Vérification finale

**Files:** aucun.

- [ ] **Step 1: Lancer** `node --test tests/` ; attendu : tous PASS.
- [ ] **Step 2: Parcours clavier** sur les trois pages (Tab, focus visible, FAQ avec Entrée), et avec la préférence système « réduire les animations ».
- [ ] **Step 3: Contrôler** qu'aucune requête réseau échoue hors Supabase (console du navigateur vide).
- [ ] **Step 4: Rapporter** ce qui reste à fournir : lien de réservation, mentions légales, migration Supabase, décision prix et maintenance.
