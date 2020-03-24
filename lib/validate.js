const departements = require('@etalab/decoupage-administratif/data/departements.json')
const regions = require('@etalab/decoupage-administratif/data/regions.json')
const {stringCompare} = require('./util')

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

module.exports = validate
