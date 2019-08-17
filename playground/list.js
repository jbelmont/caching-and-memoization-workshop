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

function getIndex (key, index, cb) {
  client.lindex(key, index, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

function popTillYouDropFromTheRight (key, cb) {
  client.rpop(key, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

function listLength (key, cb) {
  client.llen(key, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

module.exports = {
  setList,
  getList,
  getIndex,
  listLength,
  popTillYouDropFromTheRight
}
