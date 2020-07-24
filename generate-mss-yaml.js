#!/usr/bin/env node
require('dotenv').config()

const {join} = require('path')
const {readdir, writeFile} = require('fs-extra')
const {extractData} = require('./lib/airtable')

const MSS_PATH = join(__dirname, 'ministere-sante')

async function computeExistingDates() {
  const files = await readdir(MSS_PATH)
  return files.map(f => f.slice(0, 10))
}

function parseValue(string) {
  return parseInt(string.replace(/\s/g, ''), 10)
}

const valuesMap = {
  casConfirmes: 'Cas confirmés',
  deces: 'Décès à l’hôpital',
  decesEhpad: 'Décès en EHPAD et EMS',
  hospitalises: 'Hospitalisations',
  reanimation: 'En réanimation',
  gueris: 'Retours à domicile',
  casConfirmesEhpad: 'Cas confirmés EHPAD/EMS',
  nouvellesHospitalisations: 'Nouveaux patients hospitalises',
  nouvellesReanimations: 'nouveaux patients en reanimation'
}

function getKeyValuesMap(row) {
  return Object.keys(valuesMap).filter(key => valuesMap[key] in row && Number.isInteger(parseValue(row[valuesMap[key]])))
    .map(key => `  ${key}: ${parseValue(row[valuesMap[key]])}`)
    .join('\n')
}

async function buildFile(row) {
  const date = row.Date
  const content = `date: ${date}
source:
  nom: Ministère des Solidarités et de la Santé
  # Airtable complété par la DGS
donneesNationales:
${getKeyValuesMap(row)}
`

  await writeFile(join(MSS_PATH, `${date}.yaml`), content)
  console.log(`Nouvelles données du jour : ${date}`)
}

async function main() {
  const rows = await extractData('appvqjbgBnxfnGtka', 'Onglet vue d\'ensemble')
  const existingDates = await computeExistingDates()
  const newRows = rows.filter(r => !existingDates.includes(r.Date))
  await Promise.all(newRows.map(newRow => buildFile(newRow)))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
