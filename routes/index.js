var express = require('express');
var router = express.Router();
const fs = require('fs')
const JSZip = require('jszip')
const WebsiteGenerator = require('../lib/websiteGenerator')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
  res.attachment('website.zip')

  const zip = new JSZip()
  zip.file('hello.txt', 'Hello world!')
  zip
    .generateNodeStream({ streamFiles:true })
    .pipe(fs.createWriteStream('website.zip'))
    .on('finish', content => {
      console.log('content: ', content)
      res.end()
    })
});

module.exports = router;
