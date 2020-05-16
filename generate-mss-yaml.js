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

async function buildFile(row) {
  const date = row.Date
  const content = `date: ${date}
source:
  nom: Ministère des Solidarités et de la Santé
  # Airtable complété par la DGS
donneesNationales:
  casConfirmes: ${parseValue(row['Cas confirmés'])}
  deces: ${parseValue(row['Décès à l’hôpital'])}
  decesEhpad: ${parseValue(row['Décès en EHPAD et EMS'])}
  hospitalises: ${parseValue(row.Hospitalisations)}
  reanimation: ${parseValue(row['En réanimation'])}
  gueris: ${parseValue(row['Retours à domicile'])}
  casEhpad: ${parseValue(row['Cas total EHPAD / EMS'])}
  casConfirmesEhpad: ${parseValue(row['Cas confirmés EHPAD/EMS'])}`

  await writeFile(join(MSS_PATH, `${date}.yaml`), content)
  console.log(`Nouvelles données du jour : ${date}`)
}

async function main() {
  const rows = await extractData('appvqjbgBnxfnGtka', 'Onglet vue d\'ensemble')
  const validRows = rows.filter(r => r['Décès à l’hôpital'])
  const existingDates = await computeExistingDates()
  const newRows = validRows.filter(r => !existingDates.includes(r.Date))
  await Promise.all(newRows.map(newRow => buildFile(newRow)))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
