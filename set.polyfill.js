(function (root) {

  'use strict'

  // Just return the polyfill
  if (root == undefined) return Set

  // Assign the polyfill to the global scope
  if (!('Set' in root)) root.Set = Set

  // Random internal key
  var data = '[[Data-' + Math.random().toString(36).slice(2) + ']]'

  function Set (iterable) {
    this[data] = []

    if (iterable != null) {
      var length = iterable.length

      for (var i = 0; i < length; i++) {
        this.add(iterable[i])
      }
    }
  }

  Set.prototype = {
    constructor: Set,

    get size () {
      return this[data].length
    },

    clear: function () {
      this[data] = []
    },

    has: function (value) {
      return this[data].indexOf(value) > -1
    },

    add: function (value) {
      if (!this.has(value)) {
        this[data].push(value)
      }

      return this
    },

    delete: function (value) {
      var values = this[data]
      var index = values.indexOf(value)

      return index > -1 && values.splice(index, 1).length === 1
    },

    forEach: function (callback, thisArg) {
      var values = this[data]
      var length = values.length

      for (var i = 0; i < length; i++) {
        var value = values[i]
        callback.call(thisArg, value, value, this)
      }
    },

    entries: function () {
      return createIterator(this, entryGetter)
    },

    values: function () {
      return createIterator(this, valueGetter)
    },

    toString: function () {
      return '[object Set]'
    }
  }

  function entryGetter (value, done) {
    if (!done) return [value, value]
  }

  function valueGetter (value) {
    return value
  }

  // Alias
  Set.prototype.keys = Set.prototype.values

  function createIterator (set, getter) {
    var index = 0

    return Object.create({
      next: function () {
        var done = index >= set.size

        return {
          value: getter(set[data][index++], done),
          done: done
        }
      },

      toString: function () {
        return '[object Set Iterator]'
      }
    })
  }

})(
  typeof global !== 'undefined' ? global :
  typeof window !== 'undefined' ? window :
  this
)
