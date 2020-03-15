# Données nationales concernant l'épidémie de COVID19

L'information officielle sur la progression de l'épidémie en France est assez fragmentée, et n'est presque jamais structurée sous forme de données.

L'objectif de ce dépôt est de consolider l'information officielle, et de la rendre disponible dans des formats ouverts et aisément réutilisables (JSON, CSV…).

Inutile de perdre du temps à écrire des scrappers, à ce stade il est plus efficace de recopier les données à la main, et d'indiquer la source.

## Données résultantes

- [chiffres-cles.json](https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.json)
- [chiffres-cles.csv](https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.csv)

## Sources utilisées

- [Santé publique France](https://www.santepubliquefrance.fr)
- Agences Régionales de Santé
- Préfectures

## Fichiers sources

Les informations à la source sont au format PDF ou dans des communiqués au format HTML.

Ces informations sont collectées et regroupées dans des fichiers YAML.

1 fichier YAML par source et par publication (donc par date).

## Comment contribuer ?

Vous pouvez [vous proposer comme volontaire sur un département ou une région dans ce pad](https://semestriel.framapad.org/p/9fkg-opencovid19-frdata-volontaires?lang=fr).

Les contributions se font via les fichiers YAML et non dans le fichier de sortie(CSV/JSON).

Tâches :

- créer les fichiers YAML manquants
- vérifier les [pull requests](https://github.com/opencovid19-fr/data/pulls)

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
Le fichier YAML doit commencer par la date du bulletin, suivi pour un bloc source. Il convient de mettre le nom et l'url de la source (de préférence un bulletin PDF ou une page web). Il est possible d'ajouter `archive:` est de coller un lien vers une page web archivée sur https://web.archive.org, en effet certains bulletins web sont écrasés chaque jour sur la même url.

#### Bloc YAML par région ou département 

Voici un exemple de bloc YAML pour une région ou un département:
```yaml
  nom: region-ou-departement-exemple
  code: Exemple
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

Les champs `casConfirmes`, `gueris` et `deces` comptabilisent le total par catégorie depuis le début de la crise Covid-19. Par contre, les champs `hospitalises` et `reanimation` donnent le nombre de patient par catégorie à l'instant de l'édition du bulletin d'information, ces 2 chiffres peuvent bien sûr évoluer à la hausse ou à la baisse.

Notez qu'il est possible si besoin d'ajouter des commentaires en fin de ligne en utilisant le caractère `#`

Le bloc `victimes` détaille les informations du bulletin concernant les personnes décédés (et non les personnes contaminées). Attention ce champ ne comptabilise pas toutes les victimes depuis le début de la crise, mais uniquement les victimes annoncées dans le bulletin. Pour chaque victime, on ajoute un tiret `-`, puis les informations sur la personne. Si aucune information, ajoutez la date du décès `- date: 2020-03-10`. Si vous disposez de plus d'information, ajoutez un tiret `-` par victime puis toutes les informations disponibles `age`, `sexe` et/ou `date` (cf. exemple ci-dessus)

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
