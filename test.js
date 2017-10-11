'use strict'

var test = require('tape')

var nativeSet = Set
delete global.Set

require('./set.polyfill')

if (nativeSet === Set) {
  throw new Error(
    'Native `Set` object could not be removed. ' +
    'Aborting test cases...'
  )
}

// TODO: Globalize cases to test

// Get random internal key
var data = Object.keys(new Set())[0]

test('Set#constructor', function (t) {
  var emptySet = new Set()

  t.equal(emptySet[data].length, emptySet.size)
  t.equal(emptySet.size, 0)

  var iterable = 'abc'
  var iterableSet = new Set(iterable)

  t.equal(iterableSet[data].join(''), iterable)

  var duplicateSet = new Set('aabbcc')

  t.equal(duplicateSet[data].join(''), 'abc')

  t.end()
})

test('Set#clear', function (t) {
  var expected = ['1', '2', '3']
  var set = new Set(expected)

  t.deepEqual(set[data], expected)

  set.clear()

  t.deepEqual(set[data], [])

  t.end()
})

test('Set#has', function (t) {
  var set = new Set('123')

  t.ok(set.has('2'))
  t.false(set.has(2))

  t.end()
})

test('Set#add', function (t) {
  var casee = ['a', 'b']
  var set = new Set(casee)

  t.deepEqual(set[data], casee)

  set.add('c')
  set.add('a')

  t.deepEqual(set[data], casee.concat('c'))

  t.end()
})

test('Set#delete', function (t) {
  var casee = [1, 2, 3]
  var set = new Set(casee)

  t.deepEqual(set[data], casee)

  set.delete(1)
  set.delete(4)

  casee.shift()

  t.deepEqual(set[data], casee)

  t.end()
})

test('Set#forEach', function (t) {
  var casee = [3, 4, 5, 6, 10]
  var set = new Set(casee)
  var index = 0

  set.forEach(function (value, key) {
    var caseValue = casee[index++]

    t.equal(value, caseValue)
    t.equal(key, caseValue)
  })

  t.end()
})

test('Set#toString', function (t) {
  var set = new Set()
  var expected = '[object Set]'

  t.equal(set.toString(), expected)
  t.equal(String(set), expected)

  t.end()
})

// TODO: test #entries()
// TODO: test #values()
