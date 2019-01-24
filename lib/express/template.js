const express = require('express');
const router = express.Router();
const config = require('../config.js');
const extension = require('../extension.js');

router.get('/', function (req, res, next) {
  if (!extension.apiKeyCheck(req, res)) return false;

});

module.exports = router;