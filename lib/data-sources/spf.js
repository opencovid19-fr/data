const Papa = require('papaparse')
const {keyBy, chain} = require('lodash')
const got = require('got')
const departements = require('@etalab/decoupage-administratif/data/departements.json')
const regions = require('@etalab/decoupage-administratif/data/regions.json')

const departementsIndex = keyBy(departements, 'code')
const regionsIndex = keyBy(regions, 'code')

const covidHospitUrl = 'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7'
const covidHospitNouveauxUrl = 'https://www.data.gouv.fr/fr/datasets/r/6fadff46-9efd-4c53-942a-54aca783c30c'

async function getCovidHospit() {
  const csvContent = await got(covidHospitUrl, {responseType: 'text', resolveBodyOnly: true})
  return Papa.parse(csvContent, {header: true}).data
    .filter(r => r.sexe === '0' && r.dep in departementsIndex)
}

async function getCovidHospitNouveaux() {
  const csvContent = await got(covidHospitNouveauxUrl, {responseType: 'text', resolveBodyOnly: true})
  return Papa.parse(csvContent, {header: true}).data
    .filter(r => r.dep in departementsIndex)
}

function normalizeDate(date) {
  if (date.startsWith('2020-')) {
    return date
  }

  if (date.endsWith('/2020')) {
    return `2020-${date.slice(3, 5)}-${date.slice(0, 2)}`
  }
}

async function loadData() {
  const covidHospitRows = await getCovidHospit()
  const covidHospitNouveauxRows = await getCovidHospitNouveaux()

  const mergedRows = chain([...covidHospitRows, ...covidHospitNouveauxRows])
    .groupBy(r => `${r.jour}-${r.dep}`)
    .map(rows => {
      return rows.length === 1 ? rows[0] : {...rows[0], ...rows[1]}
    })
    .sortBy(['jour', 'dep'])
    .value()

  const departementsData = mergedRows
    .map(r => {
      return {
        code: `DEP-${r.dep}`,
        nom: departementsIndex[r.dep].nom,
        date: normalizeDate(r.jour),
        hospitalises: Number.parseInt(r.hosp, 10),
        reanimation: Number.parseInt(r.rea, 10),
        nouvellesHospitalisations: Number.parseInt(r.incid_hosp, 10),
        nouvellesReanimations: Number.parseInt(r.incid_rea, 10),
        deces: Number.parseInt(r.dc, 10),
        gueris: Number.parseInt(r.rad, 10),
        source: {nom: 'Santé publique France Data'},
        sourceType: 'sante-publique-france-data'
      }
    })

  const regionsData = chain(mergedRows)
    .filter(r => r.sexe === '0' && r.dep in departementsIndex)
    .groupBy(r => `${r.jour}-${departementsIndex[r.dep].region}`)
    .map(regionRows => {
      const firstRow = regionRows[0]
      const region = regionsIndex[departementsIndex[firstRow.dep].region]

      return regionRows.reduce((region, row) => {
        region.hospitalises += Number.parseInt(row.hosp, 10)
        region.reanimation += Number.parseInt(row.rea, 10)
        region.nouvellesHospitalisations += Number.parseInt(row.incid_hosp, 10)
        region.nouvellesReanimations += Number.parseInt(row.incid_rea, 10)
        region.deces += Number.parseInt(row.dc, 10)
        region.gueris += Number.parseInt(row.rad, 10)

        return region
      }, {
        code: `REG-${region.code}`,
        nom: region.nom,
        date: normalizeDate(firstRow.jour),
        hospitalises: 0,
        reanimation: 0,
        nouvellesHospitalisations: 0,
        nouvellesReanimations: 0,
        deces: 0,
        gueris: 0,
        source: {nom: 'OpenCOVID19-fr'},
        sourceType: 'opencovid19-fr'
      })
    })
    .value()

  const franceData = chain(regionsData)
    .groupBy('date')
    .map(regionsRows => {
      const firstRow = regionsRows[0]

      return regionsRows.reduce((france, region) => {
        france.hospitalises += region.hospitalises
        france.reanimation += region.reanimation
        france.nouvellesHospitalisations += region.nouvellesHospitalisations
        france.nouvellesReanimations += region.nouvellesReanimations
        france.deces += region.deces
        france.gueris += region.gueris

        return france
      }, {
        code: 'FRA',
        nom: 'France',
        date: normalizeDate(firstRow.date),
        hospitalises: 0,
        reanimation: 0,
        nouvellesHospitalisations: 0,
        nouvellesReanimations: 0,
        deces: 0,
        gueris: 0,
        source: {nom: 'OpenCOVID19-fr'},
        sourceType: 'opencovid19-fr'
      })
    })
    .value()

  const concatRows = [...departementsData, ...regionsData, ...franceData]

  concatRows.forEach(r => {
    if (r.date === '2020-03-18') {
      r.nouvellesHospitalisations = undefined
      r.nouvellesReanimations = undefined
    }
  })

  return concatRows
}

module.exports = {loadData}
