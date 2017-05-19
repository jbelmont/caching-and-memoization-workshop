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
