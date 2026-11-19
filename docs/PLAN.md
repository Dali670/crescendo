# Plan : Site Crescendo

> PRD source : `docs/PRD.md`

## Décisions architecturales

Décisions durables qui s'appliquent à toutes les phases :

- **Site de référence** : la version en ligne sur Vercel (landing issue de Site123 avec le blog et l'admin du dépôt).
- **Routes** : `index.html` (landing), `blog.html` (liste et article), `admin.html` (espace de l'auteur), `mentions-legales.html` et `politique-confidentialite.html`. Toutes à la racine du site.
- **Schéma** : deux tables, `posts` (titre, adresse, résumé, contenu, publié, dates) et `admins` (comptes auteurs). Inchangées.
- **Modèles clés** : Article (publié ou non), Auteur (compte connecté listé dans `admins`).
- **Autorisation** : un visiteur lit uniquement les articles publiés. Seul un auteur (droit vérifié côté base) crée, modifie, publie et supprime.
- **Prise de contact** : bouton qui ouvre un agenda de réservation externe. Aucun formulaire et aucune donnée de visiteur stockée sur le site.
- **Ton et format** : français, vouvoiement, prix « 300 € » et « 3 000 € », bouton principal « Réserver un appel découverte ».
- **Déploiement** : le site est déployé sur Vercel depuis son dossier.

---

## Phase 1 : Réservation unique

**User stories** : US-7, US-8, US-9

### Ce qu'on livre

Le formulaire de contact disparaît. Un seul bouton « Réserver un appel découverte » ouvre l'agenda de réservation, depuis chaque page. Le site dit qu'une réponse arrive sous un jour ouvré et qu'un seul nouveau projet est lancé par mois, avec la même formulation partout.

### Critères d'acceptation

- [ ] ~~Aucune page ne contient de formulaire de contact~~ (déplacé en phase 8, décision du 2026-11-19 : retrait plus tard)
- [ ] Depuis chaque page, un clic sur « Réserver un appel découverte » ouvre l'agenda
- [ ] « Réponse sous un jour ouvré » est affiché près de la réservation
- [ ] « 1 nouveau projet par mois » s'écrit de la même façon sur toute la page

## Bloquée par

Aucune — démarrable immédiatement

---

## Phase 2 : Offre cohérente

**User stories** : US-1, US-2, US-3, US-4, US-5

### Ce qu'on livre

La landing dit la même chose du début à la fin : la promesse, le problème, la méthode en quatre étapes avec leurs durées, la garantie par jalon, le paiement par jalon et les deux prix. Le vouvoiement s'applique partout. Le texte « Réserver un audit gratuit » et le tutoiement disparaissent.

### Critères d'acceptation

- [ ] Aucune phrase de la landing n'emploie le tutoiement
- [ ] Les prix s'écrivent « 300 € » et « 3 000 € » partout, avec « 2 700 € restants » après déduction
- [ ] Le bouton principal porte toujours le même texte
- [ ] Les quatre étapes affichent leur durée
- [ ] La garantie « vous vous arrêtez là, sans engagement pour l'étape 2 » est visible

## Bloquée par

Aucune — démarrable immédiatement

---

## Phase 3 : FAQ et menu mobile fonctionnels

**User stories** : US-6, US-10

### Ce qu'on livre

Les questions de la FAQ s'ouvrent et se ferment. Le menu mobile s'ouvre et se ferme et mène aux sections. Le lien vers l'espace admin quitte le menu public et se trouve dans le pied de page.

### Critères d'acceptation

- [ ] Un clic sur une question affiche sa réponse, un second clic la masque
- [ ] À 360 px, le bouton de menu ouvre un panneau avec Nos services, Blog, Prix, FAQ et le bouton de réservation
- [ ] Le menu se ferme au clic sur un lien et avec la touche Échap
- [ ] « Espace Admin » n'est ni dans le menu ordinateur ni dans le menu mobile
- [ ] Le pied de page contient le lien vers l'espace admin

## Bloquée par

- Phase 1 (le bouton du menu doit déjà être le bon)

---

## Phase 4 : Pages légales

**User stories** : US-11

### Ce qu'on livre

Les pages « Mentions légales » et « Politique de confidentialité » existent et sont liées depuis le pied de page de chaque page. La politique décrit les données réellement traitées : aucune donnée de visiteur stockée, comptes d'auteur uniquement.

### Critères d'acceptation

- [ ] Les deux liens du pied de page ouvrent une page qui existe, sur toutes les pages
- [ ] Chaque page a un titre, un contenu rédigé et la même navigation que le reste du site
- [ ] La politique ne mentionne aucun formulaire de contact

## Bloquée par

Aucune — démarrable immédiatement

---

## Phase 5 : Blog lisible

**User stories** : US-12, US-13, US-14, US-15

### Ce qu'on livre

Le blog affiche les articles publiés en cartes cliquables. Un article s'ouvre en colonne étroite avec son temps de lecture. Le blog affiche « Aucun article pour le moment » quand il est vide et un message d'erreur quand il ne charge pas. Son look suit celui de la landing.

### Critères d'acceptation

- [ ] Un article publié apparaît sur la page du blog sans autre action de l'auteur
- [ ] Un article non publié n'apparaît pas, ni dans la liste ni par son adresse
- [ ] Un article affiche son temps de lecture
- [ ] Sans article, le message d'état vide s'affiche
- [ ] Une adresse d'article inconnue affiche « Article introuvable »
- [ ] Le blog et la landing partagent la même navigation et le même pied de page

## Bloquée par

- Phase 3 (même navigation)

---

## Phase 6 : Admin de l'auteur

**User stories** : US-16, US-17, US-18, US-19, US-20, US-21, US-22

### Ce qu'on livre

L'auteur se connecte, voit la liste de ses articles avec statut et date de création, crée un article, l'enregistre sans le publier, puis le publie, le modifie, le dépublie ou le supprime, et se déconnecte. Une personne connectée sans droit d'auteur voit un refus clair et ne peut rien modifier.

### Critères d'acceptation

- [ ] Connexion réussie avec un compte auteur, échec lisible avec de mauvais identifiants
- [ ] Un article enregistré sans publication n'est pas visible sur le blog
- [ ] Publier, dépublier, modifier et supprimer fonctionnent et se voient sur le blog
- [ ] Une ligne vide dans le contenu crée un nouveau paragraphe
- [ ] La liste affiche titre, statut et date de création
- [ ] Un compte connecté non auteur reçoit un refus et aucune action n'aboutit
- [ ] Un visiteur non connecté ne peut pas lire les articles non publiés

## Bloquée par

- Phase 3 (même navigation)

---

## Phase 8 : Retrait du formulaire de contact

**User stories** : US-7, US-8

### Ce qu'on livre

Le formulaire de contact, qui n'envoie rien, disparaît de la landing. Le visiteur n'a plus que la réservation d'un appel découverte pour prendre contact. La section de réservation garde son texte et ses informations (réponse sous un jour ouvré, un projet par mois).

### Critères d'acceptation

- [ ] Aucune page ne contient de formulaire de contact
- [ ] La section de réservation garde un seul bouton « Réserver un appel découverte »
- [ ] Aucun lien ni texte du site ne renvoie à un formulaire
- [ ] « Réponse sous un jour ouvré » et « 1 nouveau projet par mois » restent affichés

## Bloquée par

- Phase 3 (la navigation et le pied de page sont stabilisés)

---

## Phase 7 : Vérification de bout en bout

**User stories** : aucune nouvelle, valide les critères de succès du PRD

### Ce qu'on livre

Un passage complet du site avec les critères de succès du PRD : un visiteur réserve en un clic, les prix et le vouvoiement sont identiques partout, aucune page n'affiche de texte provisoire, et le site s'utilise sur téléphone, au clavier et dans les deux thèmes. Les coordonnées publiques du pied de page sont confirmées par le propriétaire.

### Critères d'acceptation

- [ ] Chaque critère de succès du PRD est vérifié et coché
- [ ] Aucune page ne défile horizontalement à 360 px
- [ ] Toutes les actions principales se font au clavier avec un focus visible
- [ ] Thèmes clair et sombre lisibles sur la landing, le blog et l'admin
- [ ] Les coordonnées du pied de page sont confirmées comme publiques et à jour
- [ ] Les tests existants du dépôt passent

## Bloquée par

- Phases 1 à 6 et 8
