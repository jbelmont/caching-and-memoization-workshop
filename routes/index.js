const express = require('express')
const router = express.Router()

const path = require('path')
const db = require(path.join(__dirname, '../db'))
const client = require(path.join(__dirname, '../redis'))

const cache = (req, res, next) => {
  client.get('users', (err, users) => {
    if (err) throw err
    if (users !== null) {
      res.json(JSON.parse(users).usersModel)
    } else {
      next()
    }
  })
}

router.get('/users', cache, async (req, res, next) => {
  const users = await db.dbActions()
  res.json(users.usersModel)
})

module.exports = router
