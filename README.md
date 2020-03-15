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

Les contributions se font via les fichiers YAML et non les fichiers CSV/JSON.

Tâches :
- créer les fichiers YAML manquants
- vérifier les fichiers YAML existants

Le plus simple pour contribuer est de copier un fichier YAML existant et de l'adapter avec les nouvelles données. Les données doivent être recopiées à la main depuis les différentes sources de données. Le fichier YAML doit être placé dans le bon répertoire et son nom doit être sous la forme YYYY-MM-DD.yaml (date de la données).

Les sources de données (PDF ou site web) sont notées dans chaque fichier YAML et sont regroupées dans les fichiers CSV/JSON.

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

Données sous Licence Ouverte (sauf mention contraire)

Code sous licence MIT
