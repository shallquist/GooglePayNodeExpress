


exports.saveClass = function (classData) {
    const options = {
      protocol: 'https',
      hostname: 'www.googleapis.com',
      path: '/walletobjects/v1/offerClass?strict=true',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(classData)
      }
    };
    
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    getAuth().then(token => {
        options.auth = {'bearer' : 'Bearer ' + token };
        
        // write data to request body
        req.write(classData);
        req.end();
    }).catch(error => {
        console.error;
    });
};

function getAuth() {
    const jwtClient = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/wallet_object.issuer']
    });
    
    return new Promise(function(resolve, reject) {
        jwtClient.getAccessToken()
        .then(response => {
            console.log(response);
            resolve(response);
        }).catch(error => {
            console.error;
            reject(error);
        });
    });

    
}
