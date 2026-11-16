# Refonte du design du site Crescendo (landing, blog, admin)

Date : 2026-11-16. Statut : en attente d'approbation.

## Intention

Le site actuel (`index.html`, `blog.html`, `admin.html`, `site.css`) fonctionne mais ressemble à un prototype : trois pages avec des styles dupliqués, une landing qui contient des blocs `[NEED : …]` visibles, un blog en texte brut et un admin sans mise en forme propre. Le but est un site qui inspire confiance à un dirigeant ou un DAF de PME marketing, et qui l'amène à **réserver un appel découverte gratuit**. Le design sert cette action, et le blog de l'auteur unique (le propriétaire du site) doit être agréable à lire.

## Objectifs

- Une identité visuelle unique et cohérente sur les trois pages.
- Landing : hiérarchie claire, un seul bouton d'action répété, preuve et FAQ lisibles.
- Blog : lecture confortable (colonne de texte étroite, typographie soignée), liste d'articles nette.
- Admin : outil sobre, utilisable au clavier et sur mobile, séparé visuellement du site public.
- Thèmes clair et sombre, accessibles (contraste AA, focus visible, `prefers-reduced-motion` respecté).
- Textes alignés sur `crescendo-live/.agents/landing/03-offer.md`.

## Hors périmètre

- Nouvelles fonctions (markdown, images, commentaires, recherche, formulaire de contact).
- Changement de base de données, de framework ou d'hébergement.
- Migrations Supabase (voir « À prévoir »).
- Prix affichés sur le site (décision du propriétaire en attente).

## Anti-objectifs

- Un look « template SaaS » générique, avec dégradés néon ou effets décoratifs.
- Un site plus lourd ou plus lent que l'actuel.
- Une promesse chiffrée ou un délai que l'offre ne tient pas.

## Contraintes

- Rester en HTML statique, ES modules et Supabase JS (CDN), sans étape de build.
- `config.js` et les appels Supabase (`posts`, `is_admin`) restent inchangés.
- Langue : français. Marque : « Crescendo ».
- Polices actuelles conservées : Bricolage Grotesque (titres) et Newsreader (texte).

## Approches étudiées

1. **A · Affiné (retenue).** On garde l'identité (bleu électrique, fond gris-bleu, thème sombre auto) et on la structure : variables CSS partagées, échelle typographique, espacement régulier, composants communs (en-tête, bouton, carte, pied de page). Peu de risque, rapide, cohérent avec le blog éditorial.
2. **B · Partition.** Sombre par défaut, lignes de portée et barres montantes. Plus mémorable, mais décoratif, plus long à régler, et le sombre fatigue pour lire des articles.
3. **C · Éditorial.** Crème et serif avec accent orange. Très bon pour le blog, mais change entièrement la marque et ressemble moins à une agence d'automatisation.

Une version « Sobre » sombre à dégradé vert néon existe dans le projet Claude Code web de Crescendo. Elle n'est pas reprise : le propriétaire a demandé que le design soit refait ici (choix du propriétaire).

**Choix : A.** Décidé par Claude sur délégation du propriétaire, qui a dit « à toi de les faire ». Le propriétaire peut le renverser avant la planification.

## Design retenu

**Système.** Un seul `site.css` pour les trois pages (fin du `<style>` en ligne de `index.html`). Jetons de couleur dans `:root` avec variante sombre. Un seul accent (`--signal`, bleu). Échelle de titres fluide, texte en 18 à 19 px, interligne 1,6. Rayons peu marqués, bordures fines.

**Landing, dans l'ordre :** en-tête et lien « Blog » ; hero (promesse, un bouton, une ligne de preuve) ; douleur ; solution (Airtable, agent IA, n8n) ; étapes du parcours (appel, audit, implémentation) ; ce qui est inclus ; preuve (« 15 h par semaine chez un client », jamais présentée comme moyenne) ; FAQ en `<details>` ; appel final ; pied de page.

**Blog.** Liste en cartes ; page article en colonne de 38 à 42 rem, date et temps de lecture, lien de retour, `<title>` et `<meta description>` par article.

**Admin.** Même jetons mais mise en page d'outil : barre simple, tableau des articles avec statut (Publié, Brouillon), éditeur en deux colonnes sur grand écran, boutons explicites, messages d'état visibles. Le bouton de suppression demande confirmation (déjà le cas).

**Textes, décisions de Claude à valider :**
- Le hero « sous 2 semaines », « 1 nouveau projet par mois », « garantie par jalon » et « 3 000 € » contredisent l'offre validée : ils sont retirés.
- Parcours : appel découverte gratuit, puis implémentation à 2 000 € HT, fonctionnalités à 500 € HT, maintenance mensuelle. **Aucun prix affiché sur la page** tant que le propriétaire n'a pas tranché (HT ou TTC, affiché ou non).
- Bouton : « Réserver un appel découverte gratuit » (libellé de `03-offer.md`, pas « audit gratuit »).
- Les blocs `[NEED : …]` ne sont plus visibles : soit le texte est reformulé sans l'information manquante, soit le bloc est retiré. Lien de réservation et mentions légales restent à fournir (voir « À prévoir »).

## Laissé au réalisateur

Valeurs exactes des couleurs, tailles et espacements ; micro-animations discrètes ; structure des fichiers CSS ; vérifications de contraste et de rendu mobile.

## À prévoir (hors de ce design)

- Lien de réservation de l'agenda et mentions légales : à fournir.
- Maintenance : 300 € (projet web) contre 500 € ou 1 500 € HT par mois (`03-offer.md`). Le design suit `03-offer.md`, sans afficher le prix. Les prix de maintenance restent à confirmer.
- Les tables `posts` et la fonction `is_admin` n'existent que sur le Supabase distant : écrire une migration pour pouvoir les recréer.
- Le dépôt `crescendo-live` est vide ; `crescendo` reste le dépôt du site.

## Vérification

Ouvrir les trois pages en local (clair, sombre, 375 px et 1280 px), parcourir au clavier, contrôler le contraste, lire un article, se connecter à l'admin et créer, modifier, publier un brouillon.
