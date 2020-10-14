var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var PORT = 10000;
var HOST = '127.0.0.1';
var sequence = 1;

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});


server.on('message', function (message, remote) {
    var msg = Buffer.from("Hi Client. This is answer to " + sequence);
    sequence ++;
    console.log(remote.address + ':' + remote.port +' - ' + message);
    server.send(msg, 0, msg.length, remote.port, remote.address)
});

server.bind(PORT, HOST);