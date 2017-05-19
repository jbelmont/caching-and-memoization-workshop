'use strict'

const test = require('ava')
const users = require('../../playground/strings')

test.cb('setValue should set a redis string', t => {
  t.plan(1)

  const actual = {
    key: 'some:prop',
    value: 'I am a prop value'
  }
  const expected = 'I am a prop value'
  users.setValue(actual)
  users.getValue(actual.key, (err, reply) => {
    if (err) t.fail(err)
    t.is(reply, expected)
    t.end()
  })
})

test.cb('appendValue should append value to string', t => {
  t.plan(1)

  const actual = {
    key: 'some:prop',
    value: ' and yet another val'
  }
  const expected = 'I am a prop value and yet another val'
  users.appendValue(actual)
  users.getValue(actual.key, (err, reply) => {
    if (err) t.fail(err)
    t.is(reply, expected)
    t.end()
  })
})

test.cb('getStringLength should return string length', t => {
  t.plan(1)

  users.getStringLength('some:prop', (err, reply) => {
    if (err) t.fail(err)
    t.is(reply, 37)
    t.end()
  })
})

// TODO: Implement incr function
