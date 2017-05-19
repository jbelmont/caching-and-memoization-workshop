'use strict'

const test = require('ava')

const hashes = require('../../playground/hashes')

test.cb('setHash should return a hashed data type', t => {
  t.plan(1)

  const args = {
    key: 'hashes:test',
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
