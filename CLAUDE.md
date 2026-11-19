# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Site vitrine d'une agence B2B (Crescendo, IA et automatisation pour PME) : landing, blog et espace admin. Site statique en HTML, sans étape de build, servi sur Vercel. Les documents de cadrage sont dans `docs/` (`PRD.md`, `PLAN.md`, `DESIGN.md`, `VERIFICATION.md`) et le contexte marketing dans `.agents/`.

## Commandes

```bash
npm run dev            # sert v2-site123/ sur http://localhost:3000
npm run check          # tests Node (tests/site.test.mjs, tests/blog-utils.test.mjs)
npm run test:e2e       # Playwright, lance `npx serve v2-site123 -l 3000` tout seul
npx playwright test e2e/p1-c2-bouton-agenda.spec.js   # un seul fichier E2E
node --test tests/blog-utils.test.mjs                  # un seul fichier de tests Node
```

Il n'y a ni lint, ni vérification de types, ni build. `npm test` est identique à `npm run check`.

## Source de vérité

Ne pas recopier ces documents ici ni dans le code : les lire, et les mettre à jour à la source.

- `docs/PRD.md` : le quoi et le pourquoi (problème, user stories US-n, critères de succès, hors périmètre, formulations imposées).
- `docs/PLAN.md` : le découpage en phases et leurs critères d'acceptation (`P<phase>-C<n>`). Sert de référence à `/verifie`.
- `docs/DESIGN.md` : le système de design (typographie, couleurs, espacements, accessibilité). Voir l'écart avec le site de référence plus bas.
- `docs/VERIFICATION.md` : comment lancer et prouver le site, et couverture des critères par les tests.
- `.agents/` : contexte marketing (`product-marketing.md`) et offre, copie et maquette de la landing (`landing/`). `.agents/skills/` contient des skills, pas du contenu de site.

En cas de conflit entre ces sources, l'ordre de priorité est : **PRD > PLAN > DESIGN > `.agents/`**. Signaler l'écart à l'utilisateur plutôt que de trancher en silence.

## Trois copies du site, une seule vivante

- **`v2-site123/`** : le site de référence (celui qui est en ligne sur Vercel, issu de Site123). C'est là que se font les phases du plan (`docs/PLAN.md`) et que cible Playwright. Pages : `index`, `blog`, `admin`, `mentions-legales`, `politique-confidentialite`, plus `nav.js` (menu mobile et FAQ), `config.js` et `blog-utils.mjs`.
- **Racine** (`index.html`, `blog.html`, `admin.html`, `site.css`) : ancienne refonte « clair, Bricolage Grotesque ». Les tests Node de `tests/site.test.mjs` visent **uniquement ces fichiers racine**, pas `v2-site123/`. Un test Node vert ne prouve donc rien sur le site de référence : c'est `npm run test:e2e` qui le fait. La liste `FORBIDDEN` de ces tests (« 3 000 », « 1 nouveau projet »…) contredit le contenu actuel de `v2-site123/`.
- **`v2-claude/`** : copie de travail de `v2-site123/`, ne pas y toucher.

`docs/DESIGN.md` décrit le look de la racine, pas celui de `v2-site123/` (voir « Décisions » dans le PRD) : ne pas le prendre pour l'état du site en ligne.

## Architecture

- **CSS** : `v2-site123/` charge le CSS Tailwind précompilé du CDN Site123 (URL absolues). Une classe utilitaire absente de ce CSS n'a aucun effet : `min-w-0` ou `grid-cols-[...]` ajoutés à la main ne changent rien. Pour un nouveau style, il faut un `<style>` ou une feuille propre chargée par la page.
- **Données** : Supabase, deux tables `posts` et `admins` (`supabase/migrations/`). Le client est créé dans `config.js` avec la clé publique, importé par `blog.html` et `admin.html`.
- **Autorisation** : appliquée par les politiques RLS, pas par le code de la page. Un visiteur lit seulement `published = true`. Seule une personne listée dans `admins` (fonction `is_admin()`) crée, modifie ou supprime. Donner le droit auteur à un compte : `insert into public.admins (user_id) values ('<uuid>')`.
- **Prise de contact** : un bouton ouvre l'agenda `https://cal.com/dali-ubpfej/cal-ia` dans un nouvel onglet. Aucune donnée de visiteur n'est stockée. Le formulaire de contact encore présent dans `v2-site123/index.html` n'envoie rien et sera retiré en phase 8.
- **Base locale** : `supabase start` (config dans `supabase/config.toml`). Le conteneur `supabase_vector_*` redémarre en boucle sur Windows (accès TCP 2375 au démon Docker), sans conséquence sur le reste.

## Conventions de contenu

Le PRD fixe les formulations, et les tests Playwright les vérifient :

- français, vouvoiement, bouton principal « Réserver un appel découverte » partout (en-tête, menu mobile, pied de page) ;
- prix « 300 € » et « 3 000 € » (« 2 700 € restants » après déduction) ;
- « 1 nouveau projet par mois » et « Réponse sous un jour ouvré », jamais de texte provisoire (`[NEED`).

## Définition de done

- Une phase du PLAN n'est terminée que lorsque `/verifie` est vert.
- N'annonce jamais « c'est fait » sans le rapport de vérification.
- On corrige le code, jamais un test pour le faire passer.
