const net = require('net');

const server = net.createServer();
const socket = net.Socket();
server.listen(7070)


function connetclient(){
	socket.connect(7070,"192.168.1.8",() => console.log("Connected to :") );
}

function sender(data){
	socket.write(data.toString());
}


















// let sockets = [];

// server.on('connection',function (sock) {
// 	console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
// 	sockets.push(sock);

// 	sock.on('data', function (data) {
// 		console.log('DATA ' + sock.remoteAddress + ': ' + data);
// 		sockets.forEach(function (sock, index, array) {
// 			sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
// 		});
// 	});


// 	sock.on('close', function (data) {
// 		let index = sockets.findIndex(function (o) {
// 			return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
// 		})
// 		if (index !== -1) sockets.splice(index, 1);
// 		console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
// 	});
// });