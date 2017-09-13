const request = require('request');

var getAddress = (lat,lng) => {
var uri = encodeURIComponent(uri);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`,
    json: true
  }, (error,response,body) => {
    if(error){
      callback('Unable to connect to Servers..');
    }
    else if(body.status === 'ZERO_RESULTS'){
      callback('Unable to Find the Address');
    }
  else if(body.status === 'OK'){

  var address = `${body.results[0].address_components[0].short_name},${body.results[0].address_components[1].short_name}`;

    console.log(address);
  }
  });

};

module.exports = {
  getAddress
};