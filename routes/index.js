const express = require('express')
const router = express.Router()

const path = require('path')
const db = require(path.join(__dirname, '../db'))

router.get('/users', async (req, res, next) => {
  const users = await db.dbActions()
  res.json(users.usersModel)
})

module.exports = router
