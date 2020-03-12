#!/usr/bin/env node
const {join} = require('path')
const {flatten, chain} = require('lodash')
const yaml = require('js-yaml')
const {readFile, outputJson} = require('fs-extra')
const glob = require('glob')

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

  if (initialData.donneesRegionales) {
    initialData.donneesRegionales.forEach(row => rows.push(row))
  }

  if (initialData.donneesDepartementales) {
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

async function main() {
  const sourcesFiles = flatten(sources.map(source => glob.sync(`${source}/**/*.yaml`)))

  const sourcesData = await Promise.all(sourcesFiles.map(async sourceFile => {
    const data = await readYamlFile(join(__dirname, sourceFile))
    return {date: data.date, source: data.source, rows: flattenData(data)}
  }))

  const flattenedData = chain(sourcesData)
    .map(flattenSourcesData)
    .flatten()
    .sortBy(r => `${r.date}-${r.code}`)
    .value()

  await outputJson(join(distPath, 'chiffres-cles.json'), flattenedData, {spaces: 2})
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
