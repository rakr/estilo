'use strict'

const mkdirp = require('mkdirp')
const fs = require('../src/super-fs.js')
const path = require('path')
const bases = ['info.yml', 'base.yml']

function init () {
  const schemeFolder = path.resolve(__dirname, '../../..')
  const estiloFolder = schemeFolder + '/estilo'
  const pkgPath = schemeFolder + '/package.json'
  // check for package.json
  if (!fs.existsSync(pkgPath)) {
    throw new Error('Estilo requires a package.json')
  }
  if (fs.existsSync(estiloFolder)) {
    console.log('estilo folder already created. Skipping...')
    addScripts(pkgPath)
    console.log('ok postinstall')
  } else {
    mkdirp.sync(estiloFolder)
    const basePath = path.resolve(__dirname, '..', 'templates')
    console.log('Installing base template...')

    Promise.all(bases.map(n => {
      return fs.readProm(path.resolve(basePath, n))
    }))
    .then(files => {
      return Promise.all(bases.map((f, i) => {
        return fs.writeProm(path.resolve(estiloFolder, f), files[i].data)
      }))
    })
    .then(() => {
      console.log('installed: base template')
      addScripts(pkgPath)
      console.log('ok postinstall')
    })
    .catch(err => {
      console.log(err)
      process.exit(0)
    })
  }
}

function addScripts (pkgPath) {
  let pkg = require(pkgPath)
  pkg.scripts = pkg.scripts || {}
  pkg.scripts.build = 'node node_modules/estilo/scripts/build.js'
  pkg.scripts['add-template'] = 'node node_modules/estilo/scripts/add-template.js'
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '  '))
}

if (path.basename(path.resolve('..')) === 'node_modules') {
  init()
}
