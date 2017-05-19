'use strict'

const client = require('../redis')

const BEGIN_INDEX = 0
const END_INDEX = -1

function setList ({ key, values }) {
  client.lpush(key, ...values)
}

function getList (key, cb) {
  client.lrange(key, BEGIN_INDEX, END_INDEX, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

module.exports = {
  setList,
  getList
}
