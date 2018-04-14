var fs = require('fs');
var path = require('path');
var jws = require('jws');
const {google} = require('googleapis');

var baseUrl = "";

exports.generateJWT = function(url) {
    baseUrl = url;
	var payload = getUncodedJWT(creatObject());
    
    var key = require("./privatekey.json");

	
	console.log(JSON.stringify(payload));
	
	var signature = jws.sign({
	  header: { alg: 'RS256' }, 
	  payload: payload,
	  privateKey: key.private_key
	});
	
	console.log(signature);
	
	return signature;
};

function creatObject() {
//	var gpPath = __dirname + "/gpaySettings.json";
	var settings = require("./gpaySettings.json"); //JSON.parse(fs.readFileSync(gpPath, "utf8"));

	var issuerid = settings.issuerId;
	var offer = {};
	
	offer.classId = issuerid + "." + settings.offerClass;
	offer.id = issuerid + "." + settings.offerObject;
	offer.version = "1";
	offer.state = "active";
	offer.barcode = createBarcode(settings.barcode);
	
	return offer;
}

function createBarcode(code) {
	var barcode = {};
	barcode.type = "upcA";
	barcode.value = code;
	barcode.label = "User Id";
	barcode.alternateText = "12345";
	
	return barcode;
}

//function createImage() {
//	var imageData = [{
//		mainImage :{
//			kind : "walletobjects#image",
//			sourceUri : {
//				kind : "walletobjects#uri",
//				uri : "",
//				description : ""
//			}
//		}
//	}];
//}


function getUncodedJWT(offer) {
	var adate = new Date();
	var seconds = Math.ceil(adate.getTime() / 1000);
		
	var uJWT = {};
	
	uJWT.iss = "usps-offer-poc@usps-offer-poc.iam.gserviceaccount.com";
	uJWT.aud = "google";
	uJWT.typ = "savetoandroidpay";
	uJWT.iat = seconds;
		
	uJWT.origins = [
		"http://" + baseUrl, 
		"https://" + baseUrl, 
		"http://localhost:8080/", 
		"https://localhost:8080/"
	];
	
	uJWT.payload = {
		offerObjects:[offer],
		offerClasses: [],
		loyaltyObjects: [],
		giftCardClasses: [],
		loyaltyClasses: [],
		giftCardObjects: []
	};

	return uJWT;
}
    
    
    
