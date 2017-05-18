const client = require('../redis')

function setValue ({ key, value }) {
  client.set(key, value)
}

function getValue (key, cb) {
  client.get(key, (err, res) => {
    if (err) return cb(err)
    cb(null, res)
  })
}

function appendValue ({ key, value }) {
  client.append(key, value)
}

function getStringLength (key, cb) {
  client.strlen(key, (err, reply) => {
    if (err) return cb(err)
    cb(null, reply)
  })
}

module.exports = {
  setValue,
  getValue,
  appendValue,
  getStringLength
}
