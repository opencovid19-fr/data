# Guide d'utilisation de github pour opencovid19-fr/data

Ce guide d'utilisation est a destination de ceux qui ont peut ou pas
d'experience utilisant `git` ou `github` notamment dans un contexte
de projet distribue avec un grand nombre de contributeurs.

## Guide rapide

Les etapes a suivre sont:

 + (A la premiere utilisation) Faire une copie a l'archive d'origine
 (aussi appelee `fork`);
 + Ajouter un fichier de donnees `YAML` dans votre copie personelle;
 + Soumettre vos modifications a l'archive d'origine `pull-request`

Ce guide permet de contribuer sans avoir a installer de programmes sur
votre ordinateur a traver le site github.com. Pour les contributeurs
reguliers les actions avant la soumission peuvent etre faites hors ligne
pour assurer la sauvegarde d'etapes intermediaires.

## Guide en images

### Creation d'une copie personelle (`fork`) 

(:warning: Cette etape n'est a faire que la premiere fois)

La premiere etape est de creer votre copie personelle en cliquant le bouton
`fork` en haut a gauche de l'ecran: 

![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_0.png)

Cette operation vous donne accees a une copie de l'archive sur laquel vous pourrez modifier.
Cette copie se distingue de l'original car elle aura le nom: `<nom d'utilisateur>/data`
(dans mon cas `payoto/data`).

### Creation d'un nouveau fichier de donnees `YAML`

Dans cette copie personnelle creer un nouveau fichier `YAML` en cliquant sur
le bouton `create new file`:

![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_1_fork.png)

Ensuite nommez le nouveau fichier de telle maniere a ce qu'il soit dans
le bon sous dossier:

![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_2_newfile.png)

Ajoutez ensuite le contenu du fichier comme si dessous
:warning: il est preferable de preparer le contenu du fichier
dans un fichier sauvegarde sur votre ordinateur.

Ajoutez ensuite le contenu du fichier comme si dessous:

![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_3_newfiletext.png)

Une fois le contenu ajoute il faut le sauvegarder dans l'archive
en faisant un `commit`. Le commit contient deux parties:

 + Un titre court: `Ajout du <DD/MM/YY> <Departement ou region>`
 + Et une description pas necessaire pour un ajout simple mais utile
 pour une correction.
 
![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_4_commit.png)

Vous avez maintenant ajoute vos donnees a votre copie personnelle de 
l'archive.

### Creation d'une pull request

Il s'agit maintenant de transferer ces modifications a l'archive d'origine
en creant une "pull request".

Depuis votre copie cliquez sur le bouton `Create new pull request`

![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_5_updatedforkmaster.png)

Ici cette ecran vous montre la difference entre la branche master de votre
archive et de l'archive d'origine.

Cliquez sur `Create pull request`

![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_6_startPR.png)

Remarquez que cette operation vous a transfere dans l'archive mere 
(indique par le nom en haut a gauche).

Comme pour le commit ajoutez un titre logique et une explication
si necessaire. Ensuite cliquez sur `Create pull request` (A nouveau!)

![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_7_createPR.png)

C'est bon vos modifications sont soumises a la revue par les pairs 
([code review](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews))!
Pour un explicatif video du procede voir la [video suivante](https://www.youtube.com/watch?v=HW0RPaJqm4g).

![](https://raw.githubusercontent.com/payoto/data/master/docs/img/explain_github_8_PRs.png)

Gardez un oeuil sur vos mail ou sur github car des modifications peuvent
vous etre demandees.

Merci pour vos contributions!

### Installer git sur son ordinateur (a venir)



## Terminologie

 + `repository`
 + `pull request (PR)`
 + `commit`
 + `fork`
