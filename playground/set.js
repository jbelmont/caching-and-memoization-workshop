'use strict'

const client = require('../redis')

function setAdd ({ key, members }) {
  members.map(member => {
    client.sadd(key, member)
  })
}

function getMembers (key, cb) {
  client.smembers(key, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

function getCardinality (key, cb) {
  client.scard(key, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

function getIntersection (keys, cb) {
  client.sinter(keys, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

function setIsMember (key, value, cb) {
  client.sismember(key, value, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

module.exports = {
  setAdd,
  getMembers,
  getCardinality,
  getIntersection,
  setIsMember
}
