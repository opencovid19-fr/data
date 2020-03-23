#!/usr/bin/env node
const {join} = require('path')
const {flatten, chain, omit} = require('lodash')
const {outputJson} = require('fs-extra')
const glob = require('glob')
const {ensureArray, readYamlFile, outputCsv, stringCompare} = require('./lib/util')
const departements = require('@etalab/decoupage-administratif/data/departements.json')
const regions = require('@etalab/decoupage-administratif/data/regions.json')

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
    hospitalises: 'hospitalises' in json ? json.hospitalises : '',
    gueris: 'gueris' in json ? json.gueris : '',
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

function validate(flattenedData) {
  let hasErrors = false

  function notValid(row, errorMessage) {
    console.error(`${row.sourceFile} | ${errorMessage}`)
    hasErrors = true
  }

  flattenedData.forEach(row => {
    if (!row.code) {
      return notValid(row, 'Code non défini')
    }

    const [codeType, codeValue] = row.code.split('-')

    if (!['REG', 'DEP', 'COM', 'FRA', 'WORLD'].includes(codeType)) {
      return notValid(row, `Type de code non valide : ${codeType}`)
    }

    if (codeType === 'REG') {
      const region = regions.find(r => r.code === codeValue)
      if (!region) {
        return notValid(row, `Code région inconnu : ${codeValue}`)
      }

      if (!stringCompare(region.nom, row.nom)) {
        return notValid(row, `Incohérence entre le code région et le nom associé : ${region.nom} => ${row.nom}`)
      }
    }

    if (codeType === 'DEP') {
      const departement = departements.find(d => d.code === codeValue)
      if (!departement) {
        return notValid(row, `Code département inconnu : ${codeValue}`)
      }

      if (!stringCompare(departement.nom, row.nom)) {
        return notValid(row, `Incohérence entre le code département et le nom associé : ${departement.nom} => ${row.nom}`)
      }
    }
  })

  if (hasErrors) {
    throw new Error('Échec de validation')
  }
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
