#!/usr/bin/env node
const {join} = require('path')
const {flatten, chain, omit} = require('lodash')
const {outputJson} = require('fs-extra')
const glob = require('glob')
const {ensureArray, readYamlFile, outputCsv} = require('./lib/util')
const validate = require('./lib/validate')
const {jsonToCsvRow} = require('./lib/csv')
const {loadData} = require('./lib/data-sources/spf')

const sources = [
  'agences-regionales-sante',
  'sante-publique-france',
  'ministere-sante',
  'prefectures',
  'lperez31-historical-data'
]

const distPath = join(__dirname, 'dist')

function flattenData(initialData) {
  const rows = []

  ensureArray(initialData.donneesRegionales).forEach(row => rows.push(row))
  ensureArray(initialData.donneesDepartementales).forEach(row => rows.push(row))

  if (initialData.donneesNationales) {
    rows.push({
      ...initialData.donneesNationales,
      nom: 'France',
      code: 'FRA'
    })
  }

  if (initialData.donneesMondiales) {
    rows.push({
      ...initialData.donneesMondiales,
      nom: 'Monde',
      code: 'WORLD'
    })
  }

  return rows
}

function flattenSourcesData({sourceType, sourceFile, date, source, rows}) {
  return rows.map(row => ({
    date,
    source,
    sourceType,
    sourceFile,
    ...row
  }))
}

function showMetrics(rows) {
  const wCasConfirmes = rows.filter(r => 'casConfirmes' in r)
  const wDeces = rows.filter(r => 'deces' in r)
  const wReanimation = rows.filter(r => 'reanimation' in r)
  const wHospitalises = rows.filter(r => 'hospitalises' in r)
  const wGueris = rows.filter(r => 'gueris' in r)
  const woSource = rows.filter(row => !row.source || !row.source.nom)

  console.log(`Nombre d’entrées : ${rows.length}`)
  console.log(`Nombre d’entrées avec le nombre de cas confirmés : ${wCasConfirmes.length}`)
  console.log(`Nombre d’entrées avec le nombre de décès : ${wDeces.length}`)
  console.log(`Nombre d’entrées avec le nombre de réanimations : ${wReanimation.length}`)
  console.log(`Nombre d’entrées avec le nombre d’hospitalisations : ${wHospitalises.length}`)
  console.log(`Nombre d’entrées avec le nombre de personnes guéries : ${wGueris.length}`)
  console.log(`Nombre d’entrées sans source : ${woSource.length}`)
}

async function main() {
  const sourcesFiles = flatten(sources.map(source => glob.sync(`${source}/**/*.yaml`)))

  const sourcesData = await Promise.all(sourcesFiles.map(async sourceFile => {
    const sourceType = sourceFile.split('/')[0]
    const data = await readYamlFile(join(__dirname, sourceFile))
    return {date: data.date, source: data.source, rows: flattenData(data), sourceType, sourceFile}
  }))

  const flattenedData = chain(sourcesData)
    .map(flattenSourcesData)
    .flatten()
    .filter(r => 'casConfirmes' in r || 'deces' in r || 'reanimation' in r || 'hospitalises' in r || 'gueris' in r)
    .concat(await loadData())
    .sortBy(r => `${r.date}-${r.code}`)
    .value()

  validate(flattenedData)
  showMetrics(flattenedData)

  await outputJson(join(distPath, 'chiffres-cles.json'), flattenedData.map(r => omit(r, 'sourceFile')), {spaces: 2})
  await outputCsv(join(distPath, 'chiffres-cles.csv'), flattenedData.map(jsonToCsvRow))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
