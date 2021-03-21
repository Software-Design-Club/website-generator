var express = require('express');
const WebsiteGenerator = require('../lib/websiteGenerator');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

module.exports = router;

