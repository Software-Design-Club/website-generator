const express = require('express')
const GeneratorService = require('../services/generatorService')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/', function(req, res, next) {
  new GeneratorService(req.body)
  res.end()
})

module.exports = router
