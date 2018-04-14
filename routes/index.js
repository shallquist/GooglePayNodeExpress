var express = require('express');
//var path = require('path');
var router = express.Router();
var settings = require("../gpaySettings.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', OfferClass: settings.offerClass });
});

router.post('/postClass', function(req, res, next) {
  var offerClass = require("../offerClass");
  var offerObject = require("../offerObject");
  
  var params = settings;
  settings.layout = false;
    
  res.render('OfferClass', settings, function(err, json) {
      if (err) {
          console.log(err);
      }
      else {
        console.log(json);
        offerClass.saveClass(json);
      }
      
      var jwt = offerObject.generateJWT(req.headers.host);
      res.render('index', { title: 'Express', OfferClass: "Submitted", jwt: jwt });
	});
    
//  res.render('index', { title: 'Express', OfferClass: "Submitted" });
});

module.exports = router;
