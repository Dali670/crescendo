# Vérification : Crescendo

> Type : App web statique (HTML + Tailwind CDN + Supabase) · Source des parcours : docs/PLAN.md

## Lancer l'app

- Commande : `npx serve v2-site123 -l 3000` (lancée automatiquement par Playwright)
- URL / port : http://localhost:3000
- Données ou compte de test : aucun pour la phase 1 (pages publiques). Phase 6 : compte auteur de démo à définir.

## Contrôles rapides

- Commande : `npm run check` (tests Node : `tests/site.test.mjs`, `tests/blog-utils.test.mjs`). Pas de lint ni de types dans le projet.

## E2E

- Commande : `npm run test:e2e` (Playwright, chromium, trace `retain-on-failure`)

## Couverture des parcours

| Critère | Scénario (résumé) | Test |
|---|---|---|
| P1-C1 | Aucun formulaire de contact (déplacé en phase 8) | n/a (phase 8) |
| P1-C2 | Depuis chaque page, « Réserver un appel découverte » ouvre l'agenda | `e2e/p1-c2-bouton-agenda.spec.js` |
| P1-C3 | « Réponse sous un jour ouvré » affiché près de la réservation | `e2e/p1-c3-reponse-jour-ouvre.spec.js` |
| P1-C4 | « 1 nouveau projet par mois » écrit de la même façon partout | `e2e/p1-c4-un-projet-par-mois.spec.js` |
| P2-C1 … P8-C4 | Phases 2 à 8 | pas encore de test |

Couverture : 3/4 parcours de la phase 1 (le 4e est en phase 8).

## Parcours

Voir docs/PLAN.md.

## Checklist déclenchée par le diff

Aucun item pour l'instant.

## Tests retirés

Aucun.
