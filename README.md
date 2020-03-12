# data
Données nationales concernant l'épidémie de COVID19

⚠️ Dépôt en cours d'initialisation - ouverture prévue dans la journée ⚠️

## Bulletins Santé publique France

[Santé publique France](https://www.santepubliquefrance.fr) publie chaque jour un point épidémiologique. Ces derniers contiennent de nombreuses informations, structurées dans un fichier PDF ou dans un tableau HTML.

Le dossier `bulletins-spf` contient la retranscription (partielle à ce stade) du contenu des points épidémiologiques. Le format `YAML` a été retenu pour se relative simplicité de saisie.

Un script permet de transformer ces données en un unique fichier `bulletins-spf.json`, contenu dans le dossier `dist`.

### Produire le fichier JSON

Prérequis :
- Node.js et yarn (ou npm) installé

```
yarn
yarn bulletins-spf:build
```

# Licence

Données sous Licence Ouverte (sauf mention du contraire)

Code sous licence MIT
