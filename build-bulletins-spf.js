#!/usr/bin/env node
const {join} = require('path')
const yaml = require('js-yaml')
const {readdir, readFile, outputJson} = require('fs-extra')

const bulletinsPath = join(__dirname, 'bulletins-spf')
const distPath = join(__dirname, 'dist')

async function buildBulletins() {
  const files = await readdir(bulletinsPath)

  const bulletins = await Promise.all(files.map(async fileName => {
    const filePath = join(bulletinsPath, fileName)
    const content = await readFile(filePath, {encoding: 'utf8'})
    return yaml.safeLoad(content)
  }))

  await outputJson(join(distPath, 'bulletins-spf.json'), bulletins, {spaces: 2})
}

async function main() {
  await buildBulletins()
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
