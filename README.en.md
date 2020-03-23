[🇫🇷 Français](README.md)

# COVID19 epidemic french national data

Official information on the progression of the epidemic in France is quite fragmented, and is almost never structured in the form of data.

The objective of this repository is to consolidate official information, and make it available in open and easily reusable formats (JSON, CSV…).

It's useless to waste time writing scrappers, at this stage it is more efficient to copy the data by hand, and to indicate the source.

## Output data files

- [chiffres-cles.json](https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.json)
- [chiffres-cles.csv](https://github.com/opencovid19-fr/data/raw/master/dist/chiffres-cles.csv)

## Sources used

- [Santé publique France](https://www.santepubliquefrance.fr)

- Regional Health Agencies - Please take the open issues to treat ARS x date, and that this work is not done repeatedly.

- Prefectures

## Source files

The source information is in PDF format or in press releases in HTML format.

This information is collected and gathered in YAML files.

1 YAML file per source and per date of publication.


## How to contribute ?

You can volunteer on a [departmental or region level](https://lite.framacalc.org/9fl9-opencovid19-frdata-volontaires).

You can also visit the [contribution guide for all data collection projects](https://github.com/opencovid19-fr/comment-contribuer).

Contributions are made via YAML files and not in the output file (CSV / JSON).

Tasks :

- create the missing YAML files (:warning: make sure in the [PR](https://github.com/opencovid19-fr/data/pulls) the file hasn't been proposed already)

- check the [pull requests](https://github.com/opencovid19-fr/data/pulls) by performing a [code review](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews) ([video tutorial](https://www.youtube.com/watch?v=HW0RPaJqm4g)).

The easiest way to contribute is to copy an existing YAML file and put in the new data. The data must be copied by hand from the different data sources. The YAML file must be placed in the correct directory and its name must be in the form YYYY-MM-DD.yaml (date of the bulletin).

Data sources (PDF or website) are noted in each YAML file. If you are looking for data sources, the current sources are grouped in the output file (CSV / JSON).

### How to complete YAML files

General note : the number of spaces at the beginning of the line is very important, as well as the position of the dashes `-`, be careful when completing the files.

#### YAML file header

Here is an example of a YAML block for a file header :

```yaml
date: 2020-03-10
source:
  nom: name-of-the-information-source
  url: https://site.web/lien-vers-le-bulletin.pdf
  archive: https://web.archive.org/web/XXXXXX/https://site.web/lien-vers-le-bulletin
```
The YAML file must start with the date of the bulletin, followed by a source block. It is advisable to write the name and the url of the source (preferably a PDF bulletin or failing this a web page). For web pages, add an `archive:`. To do so, go to https://web.archive.org/save, paste your url, then press 'save page'. A link starting with `https://web.archive.org/web/` will be created. Paste this link behind the `archive:` tag. Note that the link may take time to be functional. It is also possible to archive a PDF file. Some web or PDF newsletters are overwritten every day so remember to archive it on https://web.archive.org/save.

#### YAML block by region or department

Here is an example of a YAML block for a region or a department:

```yaml
  nom: region-or-departement-example
  code: Example
  casConfirmes: 500                  # confirmed cases
  gueris: 40                         # recovered: value copied from the previous YAML file
  deces: 10                          # deaths
  hospitalises: 10                   # hospitalized
  reanimation: 5                     # critical
  victimes:
    - age: 85
      date: 2020-03-10
      sexe: homme                    # sex: male
    - sexe: femme                    # sex: female
      date: 2020-03-10
    - date: 2020-03-10
```

The fields `casConfirmes`,` gueris` and `deces` count the total by category since the start of the Covid-19 crisis. On the other hand, the fields `hospitalized` and `reanimation` give the number of patients by category at the time of publication of the newsletter, these 2 figures can of course go up or down.

Note that it is possible if necessary to add comments at the end of the line using the character `#`

The `victims` block details the information in the bulletin concerning the deceased (and not the infected). Please note that this field does not count all the victims since the start of the crisis, but only the victims announced in the bulletin. For each victim, we add a dash `-`, then the information about the person. If you have no information, add the date of death `- date: 2020-03-10`. If you have more information, add a dash `-` per victim, then all the information available` age`, `sexe` and / or `date` (see example above)

Note that some bulletins may be incorrect. In this case, correct the YAML file to which the correction applies. The reason for the difference between the number indicated in the YAML and the number indicated in its source should be noted via a `#` comment. Example :

```yaml
  casConfirmes: 29 # Correction of the bulletin 13/03 : 1 case counted twice. The value 30 of the bulletin of 12/03 is therefore wrong
```

## How to create JSON and CSV files

### Prerequisites

- Node.js >= 10
- yarn or npm

### How to run

```
yarn
yarn build
```

or

```
npm install
npm run build
```

## Licence

2020 © The contributors of this repository.

The data are published under [Open License 2.0](https://spdx.org/licenses/etalab-2.0.html) (unless stated otherwise).

The source is published under the [MIT license](https://spdx.org/licenses/MIT.html).
