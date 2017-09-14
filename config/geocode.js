const request = require('request');

var getAddress = (lat,lng) => {
  return new Promise((resolve, reject) => {
var uri = encodeURIComponent(uri);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`,
    json: true
  }, (error,response,body) => {
    if(error){
      reject('Unable to connect to Servers..');
    }
    else if(body.status === 'ZERO_RESULTS'){
      reject('Unable to Find the Address');
    }
  else if(body.status === 'OK'){

  var address = `${body.results[0].address_components[0].short_name},${body.results[0].address_components[1].short_name}`;
  resolve(address);
  reject('address not found');
  }
  });
  });
};
//getAddress(51.5033640,-0.1276250).then(function(ans,err){ console.log(ans);});
module.exports = {
  getAddress
};