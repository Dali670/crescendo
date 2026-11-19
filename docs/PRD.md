# PRD — Site Crescendo

## Problème

Les dirigeants de PME voient leurs équipes ressaisir les mêmes données tous les jours : saisie en double, relances faites à la main, reporting recopié d'un outil à l'autre. Chaque tâche paraît petite, mais additionnées sur un mois elles occupent des journées entières et chaque ressaisie ajoute un risque d'erreur. Beaucoup de PME ont déjà essayé un script ou un outil no-code branché dans un coin. Il fonctionne jusqu'au jour où un outil change, et personne ne sait plus comment il marche.

Crescendo, agence d'automatisation et d'IA, n'a aujourd'hui qu'un site qui doit convaincre un dirigeant en quelques minutes de réserver un appel. Ce site existe en deux versions qui divergent (look, prix affichés, vouvoiement et tutoiement), et sa prise de contact par formulaire n'envoie rien. L'agence ne reçoit donc pas les demandes de visiteurs qui remplissent ce formulaire.

## Solution

Un seul site Crescendo qui présente l'offre, prouve le sérieux de l'agence et amène le visiteur à réserver un appel découverte. Le visiteur comprend le problème, voit la méthode en quatre étapes, connaît le prix avant de s'engager et réserve un créneau. Un blog publie les articles de l'agence. Un espace admin permet à l'auteur unique de rédiger, publier et retirer ses articles.

## Utilisateur cible

**Visiteur** : dirigeant ou fondateur d'une PME de 10 à 250 salariés, en particulier une PME marketing. Il décide et paie. Il sait que son équipe perd du temps sur des tâches manuelles, il a peut-être déjà essayé un outil no-code, et il se demande si le prix est justifié et si son équipe utilisera vraiment l'automate. Il lit sur ordinateur ou sur téléphone, souvent entre deux rendez-vous.

**Auteur** : le propriétaire de Crescendo, seul à écrire sur le blog et à utiliser l'espace admin.

## User Stories

1. US-1. En tant que visiteur, je veux comprendre en quelques secondes ce que fait Crescendo et pour qui, afin de savoir si le site me concerne.
2. US-2. En tant que visiteur, je veux voir le problème décrit avec des tâches concrètes (saisie en double, relances, reporting), afin de reconnaître ma situation.
3. US-3. En tant que visiteur, je veux voir comment Crescendo travaille en quatre étapes, chacune validée avant la suivante, afin de mesurer mon risque.
4. US-4. En tant que visiteur, je veux connaître le prix du diagnostic (300 €) et du projet au forfait (3 000 €, soit 2 700 € restants après déduction du diagnostic), afin de comparer le coût et le gain avant de m'engager.
5. US-5. En tant que visiteur, je veux savoir que je peux m'arrêter après le diagnostic sans engagement pour l'étape suivante, afin de ne pas craindre de payer pour rien.
6. US-6. En tant que visiteur, je veux lire les réponses aux objections courantes (prix, rentabilité, adoption par l'équipe), afin de lever mes doutes sans appeler.
7. US-7. En tant que visiteur, je veux réserver un appel découverte de 45 minutes depuis n'importe quelle page, afin de passer à l'action au moment où je suis convaincu.
8. US-8. En tant que visiteur, je veux savoir quand et comment je serai recontacté (réponse sous un jour ouvré), afin de savoir à quoi m'attendre.
9. US-9. En tant que visiteur, je veux savoir que Crescendo lance un seul nouveau projet par mois, afin de comprendre pourquoi les créneaux sont limités.
10. US-10. En tant que visiteur, je veux naviguer depuis un menu clair, y compris sur téléphone, afin d'atteindre la méthode, les services, les prix, la FAQ ou le blog.
11. US-11. En tant que visiteur, je veux lire les mentions légales et la politique de confidentialité depuis le pied de page, afin de vérifier à qui je confie mes informations.
12. US-12. En tant que visiteur, je veux voir la liste des articles publiés sur le blog, afin de juger de l'expertise de l'agence.
13. US-13. En tant que visiteur, je veux lire un article avec son temps de lecture, afin de décider si je le lis maintenant.
14. US-14. En tant que visiteur, je veux voir un message clair quand le blog est vide ou ne charge pas, afin de ne pas croire que le site est cassé.
15. US-15. En tant que visiteur, je veux ne jamais voir un article non publié, afin de ne lire que des contenus terminés.
16. US-16. En tant qu'auteur, je veux me connecter à l'espace admin avec mon email et mon mot de passe, afin d'accéder à mes articles.
17. US-17. En tant qu'auteur, je veux créer un article avec un titre, une adresse, un résumé et un contenu, afin de le rédiger.
18. US-18. En tant qu'auteur, je veux enregistrer un article sans le publier, afin de le terminer plus tard.
19. US-19. En tant qu'auteur, je veux publier, modifier, dépublier et supprimer un article, afin de contrôler ce que les visiteurs voient.
20. US-20. En tant qu'auteur, je veux voir la liste de mes articles avec leur statut et leur date de création, afin de m'y retrouver.
21. US-21. En tant qu'auteur, je veux me déconnecter, afin de protéger l'espace admin sur un appareil partagé.
22. US-22. En tant que personne connectée sans droit d'auteur, je veux voir un refus clair, afin de comprendre pourquoi je ne peux pas modifier d'article.

## Critères de succès

- Depuis chaque page, un visiteur atteint la réservation d'un appel découverte en un seul clic.
- Chaque page du site mentionne le même prix : 300 € pour le diagnostic, 3 000 € pour le projet.
- Le site emploie le vouvoiement sur toutes les pages, sans exception.
- Les liens « Mentions légales » et « Politique de confidentialité » ouvrent chacun une page qui existe.
- Un article publié apparaît sur la page du blog sans autre action de l'auteur.
- Un article non publié n'apparaît jamais sur la page du blog.
- Un visiteur non connecté ne peut ni voir la liste des articles non publiés, ni en créer, modifier ou supprimer.
- La landing, le blog et l'admin s'affichent sans défilement horizontal à 360 px de large.
- Un visiteur qui demande à être recontacté reçoit une réponse sous un jour ouvré.
- Aucune page n'affiche de texte provisoire ni de bloc d'attente.

## Hors périmètre

- Les prix des offres autres que le diagnostic et le projet au forfait.
- Le paiement en ligne.
- Un espace client.
- Les commentaires, la recherche, les images dans les articles et la mise en forme riche des articles.
- Plusieurs auteurs ou plusieurs rôles dans l'admin.
- Une version dans une autre langue que le français.
- Des témoignages ou des chiffres de résultats non vérifiés.
- Tout contenu qui promet un résultat chiffré à un visiteur.
- Un blog avec calendrier d'envoi ou newsletter.

## Décisions d'implémentation

- Le site est en français, avec la marque « Crescendo ».
- La première chose affichée est la promesse : « Un premier automate en service sous 2 semaines, bâti sur une architecture qui tient ».
- Le bouton principal s'écrit toujours « Réserver un appel découverte », jamais « Réserver un audit gratuit » ni à la deuxième personne du singulier.
- Les prix s'écrivent « 300 € » et « 3 000 € », avec l'espace avant le symbole.
- La landing suit cet ordre : promesse, problème, solution, méthode en quatre étapes, services avec garantie par jalon, prix, questions fréquentes, réservation.
- Les quatre étapes affichent chacune leur durée : appel découverte de 45 minutes, diagnostic d'architecture, premier automate en 1 à 2 semaines, prise en main et 1 mois de support.
- Le support après livraison couvre uniquement les corrections de bugs de l'automate livré, pas les évolutions.
- Le paiement se fait par jalon, après validation de chaque étape.
- Le visiteur réserve en cliquant sur un bouton qui ouvre l'agenda de réservation. Le formulaire de contact actuel n'est pas conservé, car il n'envoie rien.
- Le menu comprend : Nos services, Blog, Prix, FAQ et le bouton de réservation. Sur téléphone, il se replie en un menu.
- Le lien vers l'espace admin n'est pas dans le menu public. Il se trouve dans le pied de page.
- Les coordonnées de l'agence et la mention « 1 nouveau projet par mois » figurent dans le pied de page.
- Le blog affiche des cartes d'article cliquables, avec un état de chargement et un message quand il n'y a aucun article.
- L'article s'affiche en colonne étroite, avec le temps de lecture.
- Dans l'admin, une ligne vide dans le contenu crée un nouveau paragraphe.
- Le site propose un thème clair et un thème sombre, appliqué selon le réglage de l'appareil.
- La page est utilisable au clavier, avec un focus visible et un lien « Aller au contenu ».

## Notes complémentaires

- **Décisions confirmées le 2026-11-19** : (1) le site de référence est celui qui est en ligne sur Vercel, et la version clair/Bricolage Grotesque du dépôt est secondaire ; (2) le formulaire de contact est retiré au profit de la réservation directe ; (3) le lien admin quitte le menu public ; (4) les prix restent affichés.
- **Incohérences à corriger sur le site actuel** : « Réserver ton appel découverte » (tutoiement) et « Réserver un audit gratuit » ; les prix écrits « €300 » ; le texte « 1 nouveau projet lancé par mois » alors que le pied de page dit « 1 nouveau projet par mois ».
- **Pages manquantes** : « Mentions légales » et « Politique de confidentialité » sont liées mais n'existent pas encore.
- **Coordonnées affichées** : l'email et le téléphone du pied de page doivent être confirmés comme publics et à jour.
- **Données de contact des visiteurs** : tant que la prise de contact passe par la réservation, aucune donnée personnelle n'est stockée sur le site. Un retour au formulaire impose un stockage, une notification et une protection contre le spam.
- **Preuve** : « 15 h par semaine gagnées chez un client » existe sur la landing du dépôt mais pas sur le site Site123. À reprendre seulement si le chiffre est vérifiable, avec la mention d'un seul client.
- **Cadre de l'offre** : « Diagnostic puis automate » est la source de vérité (voir le contexte marketing et le cadrage de l'offre déjà rédigés).
