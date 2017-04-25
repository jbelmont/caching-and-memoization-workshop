const express = require('express')
const router = express.Router()

const users = [
  {
    name: 'John Rambo'
  },
  {
    name: 'Slvester Stallone'
  }
]

router.get('/users', (req, res, next) => {
  res.json(users)
})

module.exports = router
