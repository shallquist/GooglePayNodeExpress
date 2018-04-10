var express = require('express');
var path = require('path');
var router = express.Router();

var baseDir = path.parse(__dirname).dir;
var settings = require("../gpaySettings.json");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', OfferClass: settings.offerClass });
});

router.post('/postClass', function(req, res, next) {
  var offer = require("../offer");

  offer.authJWT();
    
  res.render('index', { title: 'Express', OfferClass: "Submitted" });
});

module.exports = router;
