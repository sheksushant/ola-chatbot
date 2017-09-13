var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var geo = require('./geocode');

var conn = function() {
  server.listen(8010);

  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });
};

var fromClient = function() {

io.on('connection', function (socket) {
  socket.on('getAddress', function (data) {
      console.log(data);
     geo.getAddress(data.lat,data.lng);
           // socket.emit('fromServer', { server: "n" });

  });
});
}
module.exports = {conn,fromClient}