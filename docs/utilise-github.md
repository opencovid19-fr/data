# Guide d'utilisation de github pour opencovid19-fr/data

Ce guide d'utilisation est à destination de ceux qui ont peu ou pas
d'expérience utilisant `git` ou `github` notamment dans un contexte
de projet distribué avec un grand nombre de contributeurs.

## Guide rapide

Afin de créer un fichier YAML vous devez faire votre propre copie du dépôt, depuis laquelle vous pourrez soumettre vos `pull requests`.

Les étapes à suivre sont:

- (À la première utilisation) Faire une copie (`fork`) du dépôt d'origine
- Ajouter un fichier de données `YAML` dans votre copie personnelle en créant une branche pour chaque fichier YAML
  - Exemple : pour le fichier ARS Corse du 15 mars, je créé une branche ars-corse-15-03
- Soumettre vos modifications a l'archive d'origine en faisant une `pull request`.
- Votre pull request sera examinée par d'autres personnes avant d’être ajoutée à l'archive d'origine (`merge`). Il est possible que vous ayez des modifications à faire s'il y a des erreurs.

Ce guide permet de contribuer la donnée sans avoir à installer de programme sur votre ordinateur directement à travers l'interface de github.com. Si c'est votre cas passez directement au [guide en images](#guide-en-images). 

Pour les contributeurs plus réguliers les actions avant la soumission peuvent être faites hors ligne pour assurer la sauvegarde d'étapes intermédiaires. Les sources suivantes devraient être utiles.

### Autres sources d'information

[Un tutoriel de l’équipe Beta Gouv](https://github.com/betagouv/beta.gouv.fr/wiki/Tutoriel-Github) vous explique très clairement les premières étapes à suivre (pour leur site).

Vous parlez anglais mais ne connaissez pas git? Les ressources sur git sont infinies!

> Some general tutorials on why and how we use git:
> [This guide](https://www.atlassian.com/git/tutorials/why-git) will help you understand why this project needs git.
>  The equivalent [documentation from Github](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/merging-a-pull-request) is also good to help you understand pull requests.
>
> Git is also a command line program some good introductory resources on how you can use it offline:
> [GitHub Standard Fork & Pull Request Workflow ](https://gist.github.com/Chaser324/ce0505fbed06b947d962).
> Begginning to use git? Follow these [5mn ELI5 explainer](https://dev.to/sublimegeek/git-staging-area-explained-like-im-five-1anh) which will help understand what the lingo means.
> This [git guide](https://www.atlassian.com/git/tutorials) can help you understand anything from the basics to the hardcore features.
> Want the info from Github itself
> Looking for something specific? [the full git documentation is here](https://git-scm.com/doc).

## Guide en images

Cette section détaille étape par étape la marche à suivre pour ajouter une donnée, entièrement depuis votre navigateur web.

### Création d'une copie personelle (`fork`) 

:warning: Cette étape n'est à faire que la première fois

La première étape est de créer votre copie personnelle en cliquant sur le bouton `fork` en haut à gauche de l’écran: 

![](img/explain_github_0.png)

Cette opération vous donne accès à une copie de l'archive sur laquelle vous pourrez modifier. Cette copie se distingue de l'original car elle aura le nom: `<nom d'utilisateur>/data` (dans mon cas `payoto/data`).

### Création d'un nouveau fichier de donnees `YAML`

Dans cette copie personnelle, créez un nouveau fichier `YAML` en cliquant sur le bouton `create new file`:

![](img/explain_github_1_fork.png)

Ensuite nommez le nouveau fichier de manière à ce qu'il soit dans le bon sous-dossier:

![](img/explain_github_2_newfile.png)

Ajoutez ensuite le contenu du fichier comme ci-dessous :warning: il est préférable de préparer le contenu du fichier dans un fichier sauvegarde sur votre ordinateur.

Ajoutez ensuite le contenu du fichier comme ci-dessous:

![](img/explain_github_3_newfiletext.png)

Une fois le contenu ajouté, il faut le sauvegarder dans l'archive en créant une nouvelle branche et en faisant un `commit`. Pas de panique github fait tout pour nous! Le commit contient deux parties:

 + Un titre court: `Ajout du <DD/MM/YY> <Departement ou region>`
 + Et une description pas nécessaire pour un ajout simple mais utile pour une correction.

 On donne un nom clair à la nouvelle branche: 

  + Standard: Ajout <source>-<geographie>-AAAA-MM-JJ
  + exemple: Ajout ars-guadeloupe-2020-03-20
 
![](img/explain_github_4_branch.png)

:warning: Github vous suggère automatiquement de faire une pull request dans votre copie de l'archive. Simplement retournez à la page d'accueil de votre `fork` en cliquant en haut à gauche sur l'onglet `code`:

![](img/explain_github_4_branch2.png)

Vous avez maintenant ajouté vos données dans une nouvelle branche de votre copie personnelle de l'archive. Il s'agit maintenant d'ajouter cette branche au dépôt parent. 

### Création d'une pull request

Il s'agit maintenant de transférer ces modifications à l'archive d'origine en créant une "pull request".

Depuis votre copie cliquez sur le bouton `Compare & pull request` pour la branche que vous voulez ajouter:

![](img/explain_github_5_updatedforkbranch.png)

Ici cet écran vous montre la différence entre la branche `payoto:ars-guadeloupe-2020-03-20` (de votre archive) et de la branche `master` de l'archive d'origine.

Cliquez sur `Create pull request`

![](img/explain_github_6_startPR.png)

Remarquez que cette opération vous a transféré dans l'archive mère (indique par le nom en haut à gauche).

Comme pour le commit ajoutez un titre logique et une explication si nécessaire. Ensuite cliquez sur `Create pull request` (A nouveau!)

![](img/explain_github_7_createPR.png)

C'est bon vos modifications sont soumises à la revue par les pairs ([code review](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews))! Pour un explicatif vidéo du procédé voir la [vidéo suivante](https://www.youtube.com/watch?v=HW0RPaJqm4g).

![](img/explain_github_8_PRs.png)

Gardez un oeil sur vos mails ou sur github car des modifications peuvent vous être demandées.

Merci pour vos contributions!

### Installer git sur son ordinateur (a venir)

## Terminologie

 + `repository`
 + `pull request (PR)`
 + `commit`
 + `fork`
