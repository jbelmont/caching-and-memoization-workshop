'use strict'

const test = require('ava')

const set = require('../../playground/set')

const key = 'set:test'
const key2 = 'diff:test'
const setMembers = ['mike', 'jane', 'zhou', 'joseph', 'mary']
const diffMembers = ['henry', 'ashley', 'roberto', 'gustav', 'joseph']

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

test.cb('getIntersection should get intersection between 2 or more sets', t => {
  const args = {
    key: key2,
    members: diffMembers
  }
  set.setAdd(args)
  set.getIntersection([key, key2], (err, intersection) => {
    if (err) t.fail(err)
    t.is(intersection[0], 'joseph')
    t.end()
  })
})

// TODO: implement sismember function
test.cb('setIsMember should return a value of 1', t => {
  set.setIsMember('set:test', 'zhou', (err, isTrue) => {
    if (err) t.fail(err)
    t.is(isTrue, 1)
    t.end()
  })
})

// TODO: implement sunion function
