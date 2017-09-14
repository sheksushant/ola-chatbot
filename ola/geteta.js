const request = require('request');

var geteta = function(lat,lng,type) {
  return new Promise((resolve, reject) => {
var uri = encodeURIComponent(uri);
  request({
    //url: `http://sandbox-t.olacabs.com/v1/products?pickup_lat=${lat}&pickup_lng=${lng}&category=${type}`,
    url: `http://sandbox-t.olacabs.com/v1/products?pickup_lat=12.9491416&pickup_lng=77.64298&category=mini`,    
    headers: {
        'X-APP-TOKEN': ''
      },
    json: true
  }, (error,response,body) => {
    if(error){
      reject('No Cabs found Nearby...');
      console.log('err');
    }
    else if(body.status === 'ZERO_RESULTS'){
      reject('No Cab Found Nearby');
      console.log('err');
      
    }
  else if(body.status === 'OK'){
    console.log(body);
    console.log('ok');
   var eta = `${body}min(s)`;
  // console.log(eta);
   resolve(eta);
  reject('address not found');
  }
  });
  });
};
console.log('run');

geteta('12.9491416','77.64298','mini');

module.exports = {
  geteta
};