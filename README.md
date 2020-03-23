[🇬🇧 English](README.en.md)

# Données nationales concernant l'épidémie de COVID19

L'information officielle sur la progression de l'épidémie en France est assez fragmentée, et n'est presque jamais structurée sous forme de données.

L'objectif de ce dépôt est de consolider l'information officielle, et de la rendre disponible dans des formats ouverts et aisément réutilisables (JSON, CSV…).

Inutile de perdre du temps à écrire des scrappers, à ce stade il est plus efficace de recopier les données à la main, et d'indiquer la source.

## Données résultantes

- [chiffres-cles.json](https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.json)
- [chiffres-cles.csv](https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.csv)

## Sources utilisées

- [Santé publique France](https://www.santepubliquefrance.fr). Voir [data/sante-publique-france](https://github.com/opencovid19-fr/data/tree/master/sante-publique-france)
- Agences Régionales de Santé - Merci de prendre les issues ouvertes pour traiter les ARS x date, et que ce travail ne soit pas fait en double. Voir [data/agences-regionales-sante](https://github.com/opencovid19-fr/data/tree/master/agences-regionales-sante)
- Préfectures
- [Vidéos du Ministère des Solidarités et de la Santé](https://www.dailymotion.com/MinSoliSante). Voir [data/ministere-sante](https://github.com/opencovid19-fr/data/tree/master/ministere-sante)

## Fichiers sources

Les informations à la source sont au format PDF ou dans des communiqués au format HTML, ou pour les vidéos ce sont des informations partagées à l'oral.

Ces informations sont collectées et regroupées dans des fichiers YAML.

1 fichier YAML par source et par publication (donc par date). Le nom de chaque fichier a pour modèle `YYYY-MM-DD.yaml`.

## Comment contribuer ?

Vous pouvez [vous proposer comme volontaire sur un département ou une région dans ce pad](https://lite.framacalc.org/9fl9-opencovid19-frdata-volontaires).

Vous pouvez aussi consulter [le guide de contribution pour l'ensemble des projets de collecte de données](https://github.com/opencovid19-fr/comment-contribuer).

> :rotating_light: **Les contributions se font via les fichiers YAML et non dans le fichier de sortie (CSV/JSON).**

Tâches :

:one: créer les fichiers YAML manquants (:warning: vérifier dans les [PR](https://github.com/opencovid19-fr/data/pulls) que le fichier n'est pas déjà proposé)
  
:two: vérifier les [pull requests](https://github.com/opencovid19-fr/data/pulls) en faisant une [code review](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews) ([tuto vidéo](https://www.youtube.com/watch?v=HW0RPaJqm4g))

Le plus simple pour contribuer est de copier un fichier YAML existant et de l'adapter avec les nouvelles données. Les données doivent être recopiées à la main depuis les différentes sources de données. Le fichier YAML doit être placé dans le bon répertoire et son nom doit être sous la forme YYYY-MM-DD.yaml (date du bulletin).

Les sources de données (PDF, videos ou site web) sont notées dans chaque fichier YAML. Si vous cherchez des sources de données, les sources actuelles sont regroupées dans le fichier de sortie (CSV/JSON).

### Comment compléter les fichiers YAML

Consignes générales :   
:arrow_right: le nombre d'espaces en début de ligne est très important, ainsi que la position des tirets `-`, soyez vigilant en complétant les fichiers   
:arrow_right: Ne pas mettre d'espaces entre les nombres. `255 000` :arrow_forward: `255000`

##### Entête de fichier YAML

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

### Les données collectées

##### Les données nationales

* `casConfirmes` : nombre de cas confirmés
* `deces` : nombre de décès
* `hospitalises` : nombre de personnes hospitalisées
* `reanimation` : nombre de personnes en réanimation
* `gueris` : nombre de personnes guéries (sorties de l'hôpital)
* `depistes` : nombre de personnes dépistées (testées par PCR)

##### Les données internationales

* `casConfirmes` : nombre de cas confirmés au niveau mondial
* `gueris` : nombre de cas guéris au niveau mondial
* `deces` : nombre de décès au niveau mondial
* `paysTouches` : nombre de pays touchés

####  Autres données collectées (si elles sont mentionnées dans les sources)

Sur la capacité de lits, la capacite totale de lits disponibles `capaciteTotaleLitsDisponibles` est définie par la somme de :    
- `capaciteLitsReanimation` : capacite de lits de réanimation (équipés de respirateurs)
- `capaciteLitsSoinsContinus` : capacité de lits de soins continus*
- `capaciteLitsSoinsIntensifs` : capacité de lits de soins intensifs

> :ledger: *  _Les USC (Unités de Soins Continus) ont pour vocation de prendre en charge « des malades qui nécessitent, en raison de la gravité de leur état ou du traitement qui leur est appliqué, une observation clinique (incluant une surveillance rapprochée des paramètres vitaux) et biologique répétée et méthodique »._ 

> Source : [Décret n° 2002-466 du 5 avril 2002 relatif aux conditions techniques de fonctionnement auxquelles doivent satisfaire les établissements de santé pour pratiquer les activités de réanimation, de soins intensifs et de surveillance continue](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000000585557&categorieLien=id) 

#### Bloc YAML par région ou département 

Voici un exemple de bloc YAML pour une région ou un département:
```yaml
  nom: region-ou-departement-exemple
  code: Exemple
  casConfirmes: 500
  gueris: 40 # valeur copiée du fichier YAML précédent
  deces: 10
  depistes: 5000
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

> Les champs `casConfirmes`, `gueris`, `deces` et `depistes` comptabilisent le total par catégorie depuis le début de la crise Covid-19.

> Les champs `hospitalises` et `reanimation` donnent le nombre de patient par catégorie à l'instant de l'édition du bulletin d'information, ces 2 chiffres peuvent bien sûr évoluer à la hausse ou à la baisse.

Notez qu'il est possible si besoin d'ajouter des commentaires en fin de ligne en utilisant le caractère `#`

> Le bloc `victimes` détaille les informations du bulletin concernant les personnes décédées (et non les personnes contaminées). Attention ce champ ne comptabilise pas toutes les victimes depuis le début de la crise, mais uniquement les victimes annoncées dans le bulletin.

> Pour chaque victime, on ajoute un tiret `-`, puis les informations sur la personne. Si aucune information, ajoutez la date du décès `date: 2020-03-10`. Si vous disposez de plus d'information, ajoutez un tiret `-` par victime puis toutes les informations disponibles `age`, `sexe` et/ou `date` (cf. exemple ci-dessus)

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
