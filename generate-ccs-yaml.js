#!/usr/bin/env node
require('dotenv').config()

const {join} = require('path')
const {readdir, writeFile} = require('fs-extra')
const {extractData} = require('./lib/airtable')

const CCS_PATH = join(__dirname, 'centre-crise-sanitaire')

async function computeExistingDates() {
  const files = await readdir(CCS_PATH)
  return files.map(f => f.split('.')[0])
}

function parseValue(string) {
  return parseFloat(string
    .replace(/\s/g, '')
    .replace(/,/g, '.')
  ) || null
}

function formatWeekNumber(week) {
  const weekNumber = week.split(' ')[1]
  return `2020-S${weekNumber}`
}

async function buildFile(row) {
  const week = formatWeekNumber(row.Semaine)
  const content = `date: ${week}
source:
  nom: Centre de crise sanitaire
masquesSoignants:
  chirurgicauxFr: ${parseValue(row.productionFR_masques_chirurgicaux)}
  ffp2Fr: ${parseValue(row.productionFR_FFP2)}
  chirurgicauxChine: ${parseValue(row.import_chine_masques_chirugicaux)}
  ffp2Chine: ${parseValue(row.import_chine_FFP2)}
  chirurgicauxDistribution: ${parseValue(row.distribution_masques_chirurgicaux)}
  ffp2Distribution: ${parseValue(row.distribution_FFP2)}
  totalFR: ${parseValue(row.productionFR)}
  totalImport: ${parseValue(row.import)}
  totalDistribution: ${parseValue(row.distribution)}`

  await writeFile(join(CCS_PATH, `${week}.yaml`), content)
  console.log(`Nouvelles données du jour : ${week}`)
}

async function main() {
  const rows = await extractData('appvqjbgBnxfnGtka', 'Masques soignants')
  const existingDates = await computeExistingDates()
  const newRows = rows.filter(r => !existingDates.includes(formatWeekNumber(r.Semaine)))
  await Promise.all(newRows.map(newRow => buildFile(newRow)))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
