'use strict'

const test = require('ava')

const set = require('../../playground/set')

const key = 'set:test'
const setMembers = ['mike', 'jane', 'zhou', 'joseph', 'mary']

test.cb('setAdd should add set data type', t => {
  const args = {
    key: key,
    members: setMembers
  }
  set.setAdd(args)
  set.getMembers(key, (err, members) => {
    if (err) t.fail(err)
    t.deepEqual(members.sort(), setMembers.sort())
    t.end()
  })
})

test.cb('getCardinality should return cardinality of set', t => {
  const expected = 5
  set.getCardinality(key, (err, cardinality) => {
    if (err) t.fail(err)
    t.is(cardinality, expected)
    t.end()
  })
})
