#!/usr/bin/env node
const {join} = require('path')
const {flatten, chain} = require('lodash')
const yaml = require('js-yaml')
const {readFile, outputJson, outputFile} = require('fs-extra')
const glob = require('glob')
const Papa = require('papaparse')

const sources = [
  'sante-publique-france',
  'prefectures'
]

const distPath = join(__dirname, 'dist')

async function readYamlFile(filePath) {
  const content = await readFile(filePath, {encoding: 'utf8'})
  return yaml.safeLoad(content)
}

function flattenData(initialData) {
  const rows = []

  if (initialData.donneesRegionales && Array.isArray(initialData.donneesRegionales)) {
    initialData.donneesRegionales.forEach(row => rows.push(row))
  }

  if (initialData.donneesDepartementales && Array.isArray(initialData.donneesDepartementales)) {
    initialData.donneesDepartementales.forEach(row => rows.push(row))
  }

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
    cas_confirmes: json.casConfirmes || '',
    deces: json.deces || '',
    source_nom: (json.source && json.source.nom) || '',
    source_url: (json.source && json.source.url) || ''
  }
}

async function outputCsv(filePath, data) {
  const csvData = Papa.unparse(data)
  await outputFile(filePath, csvData)
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
