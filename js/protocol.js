const net = require('net');
const dgram = require('dgram');
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
			updateHTML(data, 2);
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

function createpacket() {
	var ip = require('ip');
	var info = {
		name: "John",
		addr: ip.address()
	};
	console.log('Packet' + JSON.stringify(info));
	return JSON.stringify(info);
}

function broadcaster() {

	const udp_server = new dgram.createSocket('udp4');

	udp_server.on('error', (err) => {
		console.log(`server error:\n${err.stack}`);
		server.close();
	});

	udp_server.on('message', (msg, rinfo) => {
		console.log(msg);
		console.log(`Found ${rinfo.address}:${rinfo.port}`);
		append_users(rinfo.address, rinfo.port);
	});

	udp_server.on('listening', () => {
		const address = udp_server.address();
		console.log(`UDP_server listening on ${address.address} :${address.port}`);
	});

	udp_server.bind(7071, () => udp_server.setBroadcast(true));
	udp_server.send(createpacket(), 7071, '255.255.255.255', () => console.log("Packet Send!"));
}

$(document).ready(function () {
	broadcaster();
	createsv();
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