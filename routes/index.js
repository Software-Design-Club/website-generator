var express = require('express');
var router = express.Router();
const WebsiteGenerator = require('../lib/websiteGenerator')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next){
  res.contentType('application/octet-stream')
  res.sendFile('/Users/emamnuel/Workspace/website-generator/public/stylesheets/style.css')

});

module.exports = router;
