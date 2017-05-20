'use strict'

const client = require('../redis')

const BEGIN_INDEX = 0
const END_INDEX = -1

function zSetAdd (args) {
  client.zadd(args)
}

function zGetAll (key, cb) {
  client.zrange(key, BEGIN_INDEX, END_INDEX, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

function sortedSetCardinality (key, cb) {
  client.zcard(key, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

module.exports = {
  zSetAdd,
  zGetAll,
  sortedSetCardinality
}
