var botui = new BotUI('api-bot');

 var socket = io.connect('http://localhost:8010');
// // read the BotUI docs : https://docs.botui.org/


botui.message.add({
  delay: 300,
  content: 'Hello, I am a Bot!🤖 '
});
botui.message.add({
  delay: 500,
  content: 'I can help you instantly Book an Ola! '
});
botui.message.add({
  delay: 800,
  content: 'Are You ready?'
});
botui.action.button({
  delay: 1000,
  action: [
    { // show only one button
      text: 'Yes!',
      value: 'yes'
    },
    { // show only one button
      text: 'Not Sure..',
      value: 'no'
    }
  ]
}).then(function (res) { // will be called when a button is clicked.
  if(res.value === 'yes') {
    botui.message.add({
      delay: 100,
      content: 'I need your Location..'
    });
    getLocation();


  }
  
  console.log(res.value); // will print "one" from 'value'
});

//geolocation stuff : 
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    showError(showError);
  }
}
function showPosition(position) {
//console.log(position.coords.latitude,position.coords.longitude) ;
socket.emit('getAddress', { 'lat' : position.coords.latitude,'lng' : position.coords.longitude});
}


// botui.message.add({
//     content: 'Lets Start Talking...',
//     delay: 1500,
//   }).then(function () {
//     botui.action.text({
//       action: {
//         placeholder: 'Say Hello', }
//     }
//   ).then(function (res) {
//     socket.emit('fromClient', { client : res.value }); // sends the message typed to server
//       console.log(res.value); // will print whatever was typed in the field.

//     }).then(function () {

//       socket.on('fromServer', function (data) { // recieveing a reply from server.
//         console.log(data.server);
//       botui.message.add({
//           content: data.server,
//           delay: 500,
//         });
//       });

//     })
//   });
