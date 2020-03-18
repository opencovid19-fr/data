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

function flattenSourcesData({source, date, rows}) {
  return rows.map(row => ({
    date,
    source,
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
    source_nom: (json.source && json.source.nom) || '',
    source_url: (json.source && json.source.url) || ''
  }
}

async function main() {
  const sourcesFiles = flatten(sources.map(source => glob.sync(`${source}/**/*.yaml`)))

  const sourcesData = await Promise.all(sourcesFiles.map(async sourceFile => {
    const data = await readYamlFile(join(__dirname, sourceFile))
    return {date: data.date, source: data.source, rows: flattenData(data)}
  }))

  const flattenedData = chain(sourcesData)
    .map(flattenSourcesData)
    .flatten()
    .filter(r => 'casConfirmes' in r || 'deces' in r)
    .sortBy(r => `${r.date}-${r.code}`)
    .value()

  await outputJson(join(distPath, 'chiffres-cles.json'), flattenedData, {spaces: 2})
  await outputCsv(join(distPath, 'chiffres-cles.csv'), flattenedData.map(jsonToCsvRow))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
