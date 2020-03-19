#!/usr/bin/env node
const {join} = require('path')
const {flatten, chain} = require('lodash')
const {outputJson} = require('fs-extra')
const glob = require('glob')
const {ensureArray, readYamlFile, outputCsv} = require('./lib/util')

const sources = [
  'agences-regionales-sante',
  'sante-publique-france',
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

function flattenSourcesData({sourceType, date, source, rows}) {
  return rows.map(row => ({
    date,
    source,
    sourceType,
    ...row
  }))
}

function getGranularite(code) {
  if (code === 'FRA') {
    return 'pays'
  }

  if (code === 'WORLD') {
    return 'monde'
  }

  if (code.startsWith('REG')) {
    return 'region'
  }

  if (code.startsWith('DEP')) {
    return 'departement'
  }

  if (code.startsWith('COM')) {
    return 'collectivite-outremer'
  }

  throw new Error('Type de granularité inconnu')
}

/* eslint camelcase: off */
function jsonToCsvRow(json) {
  return {
    date: json.date,
    granularite: getGranularite(json.code),
    maille_code: json.code,
    maille_nom: json.nom,
    cas_confirmes: 'casConfirmes' in json ? json.casConfirmes : '',
    deces: 'deces' in json ? json.deces : '',
    reanimation: 'reanimation' in json ? json.reanimation : '',
    source_nom: (json.source && json.source.nom) || '',
    source_url: (json.source && json.source.url) || '',
    source_type: json.sourceType
  }
}

function showMetrics(rows) {
  const wCasConfirmes = rows.filter(r => 'casConfirmes' in r)
  const wDeces = rows.filter(r => 'deces' in r)
  const wReanimation = rows.filter(r => 'reanimation' in r)
  const wHospitalises = rows.filter(r => 'hospitalises' in r)
  const woSource = rows.filter(row => !row.source || !row.source.nom)

  console.log(`Nombre d’entrées : ${rows.length}`)
  console.log(`Nombre d’entrées avec le nombre de cas confirmés : ${wCasConfirmes.length}`)
  console.log(`Nombre d’entrées avec le nombre de décès : ${wDeces.length}`)
  console.log(`Nombre d’entrées avec le nombre de réanimations : ${wReanimation.length}`)
  console.log(`Nombre d’entrées avec le nombre d’hospitalisations : ${wHospitalises.length}`)
  console.log(`Nombre d’entrées sans source : ${woSource.length}`)
}

async function main() {
  const sourcesFiles = flatten(sources.map(source => glob.sync(`${source}/**/*.yaml`)))

  const sourcesData = await Promise.all(sourcesFiles.map(async sourceFile => {
    const sourceType = sourceFile.split('/')[0]
    const data = await readYamlFile(join(__dirname, sourceFile))
    return {date: data.date, source: data.source, rows: flattenData(data), sourceType}
  }))

  const flattenedData = chain(sourcesData)
    .map(flattenSourcesData)
    .flatten()
    .filter(r => 'casConfirmes' in r || 'deces' in r)
    .sortBy(r => `${r.date}-${r.code}`)
    .value()

  showMetrics(flattenedData)

  await outputJson(join(distPath, 'chiffres-cles.json'), flattenedData, {spaces: 2})
  await outputCsv(join(distPath, 'chiffres-cles.csv'), flattenedData.map(jsonToCsvRow))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
