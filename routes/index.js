var express = require('express');
var router = express.Router();

const fs = require('fs')
const archiver = require('archiver')

const WebsiteGenerator = require('../lib/websiteGenerator')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next){
  res.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-disposition': 'attachment; filename=website.zip'
  });

  const zip = archiver('zip')

  // Pipe zip data to the response
  zip.pipe(res)

  const cssPath = '/Users/stride-admin/dev/website-generator/public/stylesheets/style.css'

  zip
    .append('hello world', { name: 'hello.txt' }) // Create a new text file and add it
    .append("console.log('Hello world')", { name: 'js/script.js' }) // Create a js file in a nested directory and add that
    .append(fs.createReadStream(cssPath), { name: 'css/styles.css' }) // Read an existing file and add that
    .finalize() // finalize the archive
});

module.exports = router;
