var host = '127.0.0.1';
var port = 10000;
var dgram = require('dgram');
var sequence = 1;
var timeSent = 0;
var timeReceived = 0;
var i = 1;

console.log('pinging', host, port);
var socket = dgram.createSocket('udp4');

var message = Buffer.from("Hi server. This is the " + sequence + ". message")

socket.send(message, 0, message.length, port, host, function() {
  console.log("First message send");
  timeSent = new Date().getUTCMilliseconds();
  sequence++;
});


socket.on('message', function(msg) {
  if (i == 10) {
    socket.close();
  }

  timeReceived = new Date().getUTCMilliseconds();
  console.log("RTT is " + parseInt(timeReceived - timeSent) + "ms. The server message: " + msg.toString())

  setTimeout(function () {
  message = Buffer.from("Hi server. This is the " + sequence + ". message")
  socket.send(message, 0, message.length, port, host, function () {
    timeSent = new Date().getUTCMilliseconds();
    sequence++;
    })
  }, 5000, () => {
    console.log("Package was lost")
  })
  i++
});


