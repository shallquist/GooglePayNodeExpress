var key = require("../privatekey.json");
var fs = require('fs');
var path = require('path');
var jws = require('jws');

const {google} = require('googleapis');

exports.generateJWT = function() {
	var payload = getUncodedJWT(creatObject());
	
	console.log(JSON.stringify(payload));
	
	var signature = jws.sign({
	  header: { alg: 'RS256' }, 
	  payload: payload,
	  privateKey: key.private_key
	});
	
	console.log(signature);
	
	return signature;
};

//exports.authJWT = function() {
//    const jwtClient = new google.auth.JWT({
//      email: key.client_email,
//      key: key.private_key,
//      scopes: ['https://www.googleapis.com/auth/wallet_object.issuer']
//    });
//
//    jwtClient.getAccessToken()
//        .then(response => {
//            console.log(response);
//        }).catch(error => {
//            console.error;
//        });
//};



function creatObject() {
	var gpPath = __dirname + "/gpaySettings.json";
	var settings = require(gpPath); //JSON.parse(fs.readFileSync(gpPath, "utf8"));

	var issuerid = settings.issuerID;
	var offer = {};
	
	offer.classId = issuerid + "." + coupon.className;
	offer.id = issuerid + "." + coupon.objectName;
	offer.version = "1";
	offer.state = "active";
	offer.barcode = createBarcode(coupon.barCode);
	
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

function createImage() {
	var imageData = [{
		mainImage :{
			kind : "walletobjects#image",
			sourceUri : {
				kind : "walletobjects#uri",
				uri : "",
				description : ""
			}
		}
	}];
}


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
		"https://localhost:8080/"//, 
// 		"http://127.0.0.1/",
// 		"https://127.0.0.1/"
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
    
    
    
