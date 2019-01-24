const express = require('express');
const router = express.Router();
const extension = require('../extension.js');
const config = require('../config.js');

router.get('/', function (req, res, next) {
  if (!extension.apiKeyCheck(req, res)) return false;

  res.send({ name: config.app.name });
});

module.exports = router;