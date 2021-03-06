'use strict'

const test = require('tape')
const pss = require('../src/parse-style-string.js')
const gcc = pss.getColorCode
const getUI = pss.getUI

test('getColorCode:', t => {
  const colors = {
    azul: '#bbddff'
  }

  t.is(gcc(''), false, 'NONE')
  t.is(gcc('-'), false, 'NONE')
  t.is(gcc('.'), '.', 'empty')
  t.is(gcc('azul', colors), '#bbddff', 'from colors archive')
  t.is('#aabbcc', '#aabbcc', 'real hexadecimal color')
  t.throws(
    () => gcc(3, colors, 'part', 'schemaName'),
    /wrong part in schemaName/,
    'throws on not valid color'
  )
  t.end()
})

test('getUI', t => {
  t.is(getUI(''), false, 'empty value')
  t.is(getUI(false), false, 'false value')
  t.throws(
    () => getUI(1, 'schemaName'),
    /wrong ui in schemaName/,
    'throws on bad type'
  )
  t.is(getUI('NONE'), 'NONE', 'NONE')
  t.is(getUI('br'), 'br', 'valid formatted')
  t.is(getUI('bu'), 'bu', 'valid formatted')
  t.is(getUI('uir'), 'uir', 'valid formatted')
  t.is(getUI('ubri'), 'ubri', 'valid formatted')
  t.is(getUI('.'), '.', 'skip style')
  t.throws(
    () => getUI('aui', 'schemaName'),
    /wrong ui in schemaName/,
    'throws on bad type'
  )
  t.end()
})

test('parseString:', t => {
  let colors = {
    rojo: '#ff5555'
  }

  let noValue = pss('     ')
  t.is(Object.keys(noValue).length, 0, 'empty schema')

  let full = pss('#bbddff rojo bi', colors)
  t.is(full.fore, '#bbddff', 'full foreground')
  t.is(full.back, '#ff5555', 'full background')
  t.is(full.ui, 'bi', 'full gui')

  let two = pss('- rojo', colors)
  t.is(two.fore, false, 'two foreground')
  t.is(two.back, '#ff5555', 'two background')
  t.is(two.ui, false, 'two gui')

  let empty = pss('. . bu', colors)
  t.is(empty.fore, '.', 'empty foreground')
  t.is(empty.back, '.', 'empty background')
  t.is(empty.ui, 'bu', 'two gui')

  let linked = pss('@other', colors)
  t.is(linked.link, 'other', 'linked link')
  t.notOk(linked.fore, 'linked foreground')
  t.notOk(linked.back, 'linked background')
  t.notOk(linked.ui, 'linked gui')

  t.end()
})
