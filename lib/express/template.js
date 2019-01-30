const express = require('express');
const router = express.Router();

const extension = require('../extension.js');
const configApp = require('../config/app.js');

router.get('/', function (req, res, next) {
  if (!extension.authApiKey(req, res)) return false;



});

module.exports = router;