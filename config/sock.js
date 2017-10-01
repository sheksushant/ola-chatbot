var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var geo = require('./geocode');
var eta = require('../ola/geteta');

var conn = function() {
  server.listen(8010);

  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });
};

var fromClient = function() {

io.on('connection', function (socket) {
  socket.on('getRides', function (data) {
     //console.log(data);
      eta.geteta(data.lat,data.lng,data.type).then(function(res) {
        //console.log(res);
        socket.emit('etaIS', { 'eta' : res});
      });
  });

  // socket.on('eta', function (data) {
  //   console.log(data);
  //   eta.geteta(data.lat,data.lng,data.type).then(function(ans){ console.log(ans);});

  // });
});
}
module.exports = {conn,fromClient}