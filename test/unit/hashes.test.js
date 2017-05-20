'use strict'

const test = require('ava')

const hashes = require('../../playground/hashes')

const key = 'hashes:test'

test.cb('setHash should return a hashed data type', t => {
  t.plan(1)

  const args = {
    key: key,
    fields: ['one', 'two', 'three'],
    values: [1, 2, 3]
  }
  hashes.setHash(args)
  hashes.getAll(args.key, (err, res) => {
    if (err) t.fail(err)
    t.deepEqual(res, { one: '1', two: '2', three: '3' })
    t.end()
  })
})

test.cb('getKeys should return list of keys', t => {
  hashes.getHKeys(key, (err, res) => {
    if (err) t.fail(err)
    t.deepEqual(res, [ 'one', 'two', 'three' ])
    t.end()
  })
})


test.cb('hashDelete should remove hash', t => {
  hashes.hashDelete(key, 'three', (err, res) => {
    if (err) t.fail(err)
    t.is(res, 1)
    t.end()
  })
})
