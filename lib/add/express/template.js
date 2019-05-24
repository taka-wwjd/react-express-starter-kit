const express = require('express')
const router = express.Router()

const extension = require('./lib/extension.js')
const appConfig = require('../app.config.js')

router.get('/', function (req, res, next) {
  if (!extension.validateRequestHeader(req, res)) return false

  // Working here
})

module.exports = router
