const express = require('express')
const router = express.Router()
const { createOwner } = require('../controllers/owner.controller')
const { ownerCreateValidator } = require('../validator/owner.validator')
const validate = require('../middleware/validate.middleware')

if (process.env.NODE_ENV == 'development') {
  router.post('/create', ownerCreateValidator, validate, createOwner)
}

router.get('/', (req, res) => {
  res.send('this is owners routes')
})





module.exports = router