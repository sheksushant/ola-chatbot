const request = require('request');

var getQuote = (lat,lng,type) => {
  request({
    url: `http://sandbox-t.olacabs.com/v1/products?pickup_lat=${lat}&pickup_lng=${lng}&category=${type}`,
    headers: {
        'X-APP-TOKEN': '45ab19818299488888241d353d6105d1'
      },
    json: true
  },(error,response,body) => {


    if(error){
      console.log('Unable to Connect because of Error');
    }
    if(response.statusCode === "404"){
      console.log('404 Error!');
     }
     else{
    console.log(body);
   }

});
};

module.exports = {getQuote}
getQuote(12.9491416,77.64298,"mini");