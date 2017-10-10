(function (root) {

  'use strict'

  // Just return the polyfill
  if (root == undefined) return Set

  // Assign the polyfill to the global scope
  if (!('Set' in root)) root.Set = Set

  var data = internalSlot('Data')

  function Set (iterable) {
    this[data] = []

    if (typeof iterable !== 'undefined') {
      var length = iterable.length

      for (var i = 0; i < length; i++) {
        this.add(iterable[i])
      }
    }
  }

  Set.prototype = {
    constructor: Set,

    size: 0,

    clear: function () {
      this[data] = []
      this.size = 0
    },

    has: function (value) {
      return this[data].indexOf(value) > -1
    },

    add: function (value) {
      if (!this.has(value)) {
        this[data].push(value)
        this.size++
      }

      return this
    },

    delete: function (value) {
      var values = this[data]
      var index = values.indexOf(value)

      if (index > -1) {
        values.splice(1, index)
        this.size--
        return true
      }

      return false
    },

    forEach: function (callback, thisArg) {
      var iterator = this.entries()

      while (true) {
        var result = iterator.next()
        if (result.done) return

        callback.apply(thisArg, result.value.concat(this))
      }
    },

    entries: function () {
      var iterator = this.values()
      var next = iterator.next.bind(iterator)

      iterator.next = function () {
        var result = next()

        if (!result.done) {
          result.value = [result.value, result.value]
        }

        return result
      }

      return iterator
    },

    values: function () {
      return new SetIterator(this)
    },

    toString: function () {
      return '[object Set]'
    }
  }

  // Alias
  Set.prototype.keys = Set.prototype.values

  var set = internalSlot('Set')

  function SetIterator (setObj) {
    this[set] = setObj
  }

  SetIterator.prototype = {
    constructor: SetIterator,

    next: (function () {
      var index = 0

      return function () {
        var set = this[set]

        return {
          value: set[data][index++],
          done: index >= set.size
        }
      }
    })(),

    toString: function () {
      return '[object Set Iterator]'
    }
  }

  function internalSlot (key) {
    return '[[' + key + '-' + Math.random().toString(36).slice(2) + ']]'
  }

})(this)
