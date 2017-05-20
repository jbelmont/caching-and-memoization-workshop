'use strict'

const client = require('../redis')

function setHash ({ key, fields, values }) {
  const [
    field1,
    field2,
    field3
  ] = fields
  const [
    val1,
    val2,
    val3
  ] = values
  client.hmset(key, field1, val1, field2, val2, field3, val3)
}

function getAll (key, cb) {
  client.hgetall(key, (err, res) => {
    if (err) return cb(err)
    cb(null, res)
  })
}

function getHKeys (key, cb) {
  client.hkeys(key, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

function hashDelete (key, field, cb) {
  client.hdel(key, field, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

module.exports = {
  setHash,
  getAll,
  getHKeys,
  hashDelete
}
