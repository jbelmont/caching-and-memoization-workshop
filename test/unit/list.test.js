'use strict'

const test = require('ava')
const list = require('../../playground/list')

test.cb('setList should return a list data type', t => {
  t.plan(1)
  const args = {
    key: 'list:test',
    values: ['orange', 'peach', 'apples', 'strawberries']
  }
  list.setList(args)
  list.getList(args.key, (err, resp) => {
    if (err) t.fail(err)
    t.deepEqual(resp, [ 'strawberries', 'apples', 'peach', 'orange' ])
    t.end()
  })
})

test.cb('getIndex should return value at index', t => {
  const args = {
    key: 'list:test',
    index: 2
  }
  list.getIndex(args.key, args.index, (err, reply) => {
    if (err) t.fail(err)
    t.is(reply, 'peach')
    t.end()
  })
})

// TODO: implement list function llen

// TODO: implement list function rpop
