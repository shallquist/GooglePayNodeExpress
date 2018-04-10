 /**
 * Save to Wallet success handler
 */
var successHandler = function(params){
  console.log("Object added successfully", params);
};

/**
 * Save to Wallet failure handler
 */
var failureHandler = function(params){
  console.log("Object insertion failed", params);
  var errorLi = $('<li>').text('Error: ' + JSON.stringify(params));
  $('#errors').append(errorLi);
};


document.onload = function() {
//    document.getElementById("offerClass").addEventListener("click", function(){
//        
//    });
    
    script = document.createElement("script");
    script.src = "https://apis.google.com/js/plusone.js";
    document.head.appendChild(script);
};
