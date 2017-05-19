'use strict'

const test = require('ava')

const sortedSet = require('../../playground/sortedSet')
const KEY = 'grades'

test.cb('zadd should add sorted set', t => {
  const args = [
    'grades', 95, 'Jamie', 88, 'John', 89, 'Gustav', 98, 'Linn', 99, 'Mark'
  ]
  sortedSet.zSetAdd(args)
  sortedSet.zGetAll(KEY, (err, sortedSet) => {
    if (err) t.fail(err)
    t.deepEqual(sortedSet, [ 'John', 'Gustav', 'Jamie', 'Linn', 'Mark' ])
    t.end()
  })
})

// implement zcard function
