const express = require('express')
const GeneratorService = require('../services/generatorService')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/', async function (req, res, next) {
  const generatorService = new GeneratorService(req.body)
  const { fileName, filePath } = await generatorService.generateArchive()
  res.contentType('application/zip')
  res.header('Content-disposition', `attachment;filename=${fileName}`)
  res.sendFile(`${filePath}`)
})

module.exports = router
