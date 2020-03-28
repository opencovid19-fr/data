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
    depistes: 'depistes' in json ? json.depistes : '',
    source_nom: (json.source && json.source.nom) || '',
    source_url: (json.source && json.source.url) || '',
    source_archive: (json.source && json.source.archive) || '',
    source_type: json.sourceType
  }
}

module.exports = {jsonToCsvRow}
