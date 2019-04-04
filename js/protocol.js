const net = require('net');
window.$ = window.jQuery = require('jquery');


function createsv() {

	const server = net.createServer();
	
	server.listen(7070);
	console.log("Server Created!");

	server.on('listening', function () {
		console.log("Server is Listening!");
	});

	server.on('connection', function (sock) {
		sock.on('data', function (data) {
			updateHTML(data,2);
			console.log("Recieved : ");
		});
	})
}

function sender(data) {
	const socket = net.Socket();
	socket.connect(7070, '127.0.0.1', function () {
		socket.write(data, function () {
			console.log("Sent!");
		});
	});
}

$(document).ready(function () {
	createsv();
	console.log("ready working!");
})















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