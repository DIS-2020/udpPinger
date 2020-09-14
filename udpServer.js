var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var PORT = 8080;
var HOST = '172.17.150.255';

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});


server.on('message', function (message, remote) {
    var msg = Buffer.from("Something");
    console.log(remote.address + ':' + remote.port +' - ' + message);
    server.send(msg, 0, msg.length, remote.port, remote.address)
});

server.bind(PORT, HOST);