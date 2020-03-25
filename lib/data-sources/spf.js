const {join} = require('path')
const Papa = require('papaparse')
const {keyBy, chain} = require('lodash')
const {readFile} = require('fs-extra')
const departements = require('@etalab/decoupage-administratif/data/departements.json')
const regions = require('@etalab/decoupage-administratif/data/regions.json')

const departementsIndex = keyBy(departements, 'code')
const regionsIndex = keyBy(regions, 'code')

const spfDataSourcePath = join(__dirname, '..', '..', 'data-sources', 'sante-publique-france')
const covidHospitPath = join(spfDataSourcePath, 'covid_hospit.csv')

async function loadData() {
  const fileContent = await readFile(covidHospitPath, {encoding: 'utf8'})
  const rows = Papa.parse(fileContent, {header: true}).data

  const departementsData = rows
    .filter(r => r.sexe === '0' && r.dep in departementsIndex)
    .map(r => {
      return {
        code: `DEP-${r.dep}`,
        nom: departementsIndex[r.dep].nom,
        date: r.jour,
        hospitalises: Number.parseInt(r.hosp, 10),
        reanimation: Number.parseInt(r.rea, 10),
        deces: Number.parseInt(r.dc, 10),
        gueris: Number.parseInt(r.rad, 10),
        source: {nom: 'Santé publique France Data'},
        sourceType: 'sante-publique-france-data'
      }
    })

  const regionsData = chain(rows)
    .filter(r => r.sexe === '0' && r.dep in departementsIndex)
    .groupBy(r => `${r.jour}-${departementsIndex[r.dep].region}`)
    .map(regionRows => {
      const firstRow = regionRows[0]
      const region = regionsIndex[departementsIndex[firstRow.dep].region]

      return regionRows.reduce((region, row) => {
        region.hospitalises += Number.parseInt(row.hosp, 10)
        region.reanimation += Number.parseInt(row.rea, 10)
        region.deces += Number.parseInt(row.dc, 10)
        region.gueris += Number.parseInt(row.rad, 10)

        return region
      }, {
        code: `REG-${region.code}`,
        nom: region.nom,
        date: firstRow.jour,
        hospitalises: 0,
        reanimation: 0,
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
        france.deces += region.deces
        france.gueris += region.gueris

        return france
      }, {
        code: 'FRA',
        nom: 'France',
        date: firstRow.date,
        hospitalises: 0,
        reanimation: 0,
        deces: 0,
        gueris: 0,
        source: {nom: 'OpenCOVID19-fr'},
        sourceType: 'opencovid19-fr'
      })
    })
    .value()

  return [...departementsData, ...regionsData, ...franceData]
}

module.exports = {loadData}
