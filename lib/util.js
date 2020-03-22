const {deburr} = require('lodash')
const yaml = require('js-yaml')
const Papa = require('papaparse')
const {readFile, outputFile} = require('fs-extra')

function ensureArray(array) {
  if (array && Array.isArray(array)) {
    return array
  }

  if (array) {
    return [array]
  }

  return []
}

async function readYamlFile(filePath) {
  const content = await readFile(filePath, {encoding: 'utf8'})
  return yaml.safeLoad(content, {schema: yaml.JSON_SCHEMA})
}

async function outputCsv(filePath, data) {
  const csvData = Papa.unparse(data)
  await outputFile(filePath, csvData)
}

function _normalizeCompare(string) {
  return deburr(string).toLowerCase().replace(/\W/g, '')
}

function stringCompare(string1, string2) {
  return _normalizeCompare(string1) === _normalizeCompare(string2)
}

module.exports = {ensureArray, readYamlFile, outputCsv, stringCompare, _normalizeCompare}
