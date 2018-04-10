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
  var offer = require("../offerClass");
  
  var params = settings;
  settings.layout = false;
    
  res.render('OfferClass', settings, function(err, json) {
      if (err) {
          console.log(err);
      }
      else {
        console.log(json);
        var offer = JSON.parse(json);
        offer.saveClass(offer);
      }
	});
    
  res.render('index', { title: 'Express', OfferClass: "Submitted" });
});

module.exports = router;
