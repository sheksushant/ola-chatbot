var botui = new BotUI('api-bot');

 var socket = io.connect('http://localhost:8010');
let type = "";
let eta = 0;

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
      delay: 2000,
      content: 'Which cab will you like?'
    }).then(function() {
      botui.action.button({
        delay: 100,
        action: [
          { 
            text: 'Micro',
            value: 'micro'
          },
          { 
            text: 'Mini',
            value: 'mini'
          }
        ]
      }).then(function (res) {
        type = res.value;
        getLocation();
        botui.message.add({
          delay: 100,
          content: 'Let me find a cab near your location now....'
        });
      })
      .then(
          socket.on('etaIS', function (eta) {
            botui.message.add({
              delay: 300,
              content: "so..There is a Cab " + eta.eta + " min(s) away!"
            });
            botui.message.add({
              delay: 900,
              content: "Should I book it for you?"
            }).then(
              botui.action.button({
                delay: 1000,
                action: [
                  { 
                    text: 'Yes',
                    value: 'yes'
                  },
                  { 
                    text: 'No',
                    value: 'no'
                  }
                ]
              }).then(function (res) { // will be called when a button is clicked.
                console.log(res.value);
                  if(res.value == 'yes') {

                    botui.message.add({
                      delay : 100,
                      content: 'Go ahead, [Login to your Ola Account!]()^'
                    });

                  }
              })
            );
          })
          
      );
    });
  }
});

//geolocation stuff : 
function getLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {

    socket.emit('getRides', { 'lat' : position.coords.latitude,'lng' : position.coords.longitude, type : type});
  });
}

