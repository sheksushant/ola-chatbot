const request = require('request');
const config = require('../config');

var geteta = function(lat,lng,type){
var options = {
  url: `http://sandbox-t.olacabs.com/v1/products?pickup_lat=${lat}&pickup_lng=${lng}&category=${type}`,
  headers: {
    'X-APP-TOKEN': config.xapp
  }
};
return new Promise((resolve, reject) => {

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    try {
        var eta = info.categories[0].eta;
    }
    catch (err) {
        console.log(err);
    }
 if( typeof(eta) === 'number') {
    resolve(info.categories[0].eta);
 }
   else {
       reject("No Cabs Nearby...");
   }
   reject("No Cabs Nearby...");

  }
}

request(options, callback);
});
};

//geteta(12.9491416,77.64298,'mini').then(function(res,err) {console.log(res)});

module.exports = {geteta};