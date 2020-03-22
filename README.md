[🇬🇧 English](README.en.md)

# Données nationales concernant l'épidémie de COVID19

L'information officielle sur la progression de l'épidémie en France est assez fragmentée, et n'est presque jamais structurée sous forme de données.

L'objectif de ce dépôt est de consolider l'information officielle, et de la rendre disponible dans des formats ouverts et aisément réutilisables (JSON, CSV…).

Inutile de perdre du temps à écrire des scrappers, à ce stade il est plus efficace de recopier les données à la main, et d'indiquer la source.

## Données résultantes

- [chiffres-cles.json](https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.json)
- [chiffres-cles.csv](https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.csv)

## Sources utilisées

- [Santé publique France](https://www.santepubliquefrance.fr)
- Agences Régionales de Santé - Merci de prendre les issues ouvertes pour traiter les ARS x date, et que ce travail ne soit pas fait en double.
- Préfectures
- [Vidéos du Ministère des Solidarités et de la Santé](https://www.dailymotion.com/MinSoliSante)

## Fichiers sources

Les informations à la source sont au format PDF ou dans des communiqués au format HTML.

Ces informations sont collectées et regroupées dans des fichiers YAML.

1 fichier YAML par source et par publication (donc par date).

## Comment contribuer ?

Vous pouvez [vous proposer comme volontaire sur un département ou une région dans ce pad](https://lite.framacalc.org/9fl9-opencovid19-frdata-volontaires).

Vous pouvez aussi consulter [le guide de contribution pour l'ensemble des projets de collecte de données](https://github.com/opencovid19-fr/comment-contribuer).

Les contributions se font via les fichiers YAML et non dans le fichier de sortie (CSV/JSON).

Tâches :

- créer les fichiers YAML manquants (:warning: vérifier dans les [PR](https://github.com/opencovid19-fr/data/pulls) que le fichier n'est pas déjà proposé)
- vérifier les [pull requests](https://github.com/opencovid19-fr/data/pulls) en faisant une [code review](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews) ([tuto vidéo](https://www.youtube.com/watch?v=HW0RPaJqm4g))

Le plus simple pour contribuer est de copier un fichier YAML existant et de l'adapter avec les nouvelles données. Les données doivent être recopiées à la main depuis les différentes sources de données. Le fichier YAML doit être placé dans le bon répertoire et son nom doit être sous la forme YYYY-MM-DD.yaml (date du bulletin).

Les sources de données (PDF ou site web) sont notées dans chaque fichier YAML. Si vous cherchez des sources de données, les sources actuelles sont regroupées dans le fichier de sortie (CSV/JSON).

### Comment compléter les fichiers YAML

Consigne générale : le nombre d'espaces en début de ligne est très important, ainsi que la position des tirets `-`, soyez vigilant en complétant les fichiers.

#### Entête de fichier YAML

Voici un exemple de bloc YAML pour une entête de fichier :
```yaml
date: 2020-03-10
source:
  nom: nom-de-la-source-de-donnees
  url: https://site.web/lien-vers-le-bulletin.pdf
  archive: https://web.archive.org/web/XXXXXX/https://site.web/lien-vers-le-bulletin
```
Le fichier YAML doit commencer par la date du bulletin, suivi pour un bloc source. Il convient de mettre le nom et l'url de la source (de préférence un bulletin PDF ou à defaut une page web). Pour les pages web, il convient de rajouter une `archive:`, voir section suivante.

##### Comment créer une 'archive'
1. Rendez-vous sur le site https://web.archive.org/save
2. Dans le champ texte, collez l'url de votre source
3. Appuyez sur 'save page'. Un lien commençant par `https://web.archive.org/web/` sera généré
4. Vérifiez que ce lien fonctionne : en l'ouvrant dans votre navigateur, vous devez voir la bone page apparaître
4. Collez le lien complet derrière la balise `archive:`

Notez que le lien peut prendre du temps avant d'être fonctionnel. Il est également possible d'archiver un fichier PDF. Certains bulletins web ou PDF sont écrasés chaque jour donc pensez à faire des archives sur https://web.archive.org/save.

#### Bloc YAML par région ou département 

Voici un exemple de bloc YAML pour une région ou un département:
```yaml
  nom: region-ou-departement-exemple
  code: Exemple
  depistes: 1000
  casConfirmes: 500
  gueris: 40 # valeur copiée du fichier YAML précédent
  deces: 10
  hospitalises: 10
  reanimation: 5
  victimes:
    - age: 85
      date: 2020-03-10
      sexe: homme
    - sexe: femme
      date: 2020-03-10
    - date: 2020-03-10
```

Les champs `casConfirmes`, `gueris`, `depistes` et `deces` comptabilisent le total par catégorie depuis le début de la crise Covid-19. Par contre, les champs `hospitalises` et `reanimation` donnent le nombre de patient par catégorie à l'instant de l'édition du bulletin d'information, ces 2 chiffres peuvent bien sûr évoluer à la hausse ou à la baisse.

Notez qu'il est possible si besoin d'ajouter des commentaires en fin de ligne en utilisant le caractère `#`

Le bloc `victimes` détaille les informations du bulletin concernant les personnes décédées (et non les personnes contaminées). Attention ce champ ne comptabilise pas toutes les victimes depuis le début de la crise, mais uniquement les victimes annoncées dans le bulletin. Pour chaque victime, on ajoute un tiret `-`, puis les informations sur la personne. Si aucune information, ajoutez la date du décès `- date: 2020-03-10`. Si vous disposez de plus d'information, ajoutez un tiret `-` par victime puis toutes les informations disponibles `age`, `sexe` et/ou `date` (cf. exemple ci-dessus)

Notez qu'il est possible que certains bulletins soient érronés. Dans ce cas, corrigez le fichier YAML sur lequel l'erratum s'applique. Il convient de noter via un commentaire `#` la raison de la différence entre le nombre indiqué dans le YAML et le nombre indiqué dans sa source. Exemple :
```yaml
  casConfirmes: 29 # Erratum du bulletin 13/03 : 1 cas compté en double. La valeur 30 du bulletin du 12/03 est donc erronée
```

## Produire les fichiers JSON et CSV

### Pré-requis

- Node.js >= 10
- yarn ou npm

### En action

```
yarn
yarn build
```

ou

```
npm install
npm run build
```

## Licence

2020 © Les contributeurs du dépôt.

Les données sont publiées sous [Licence Ouverte 2.0](https://spdx.org/licenses/etalab-2.0.html) (sauf mention contraire).

Les codes sources sont publiés sous [licence MIT](https://spdx.org/licenses/MIT.html).
