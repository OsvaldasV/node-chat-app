const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', {
	// 	from: 'VasiaSuper@myliukas.lt',
	// 	text: 'Valio!',
	// 	createdAt: 123
	// });
	socket.emit('newMessageAdmin', {
		from: 'admin@myliukas.lt',
		text: 'Welcome to chat app!',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newBroadcast', {
		from: 'admin@myliukas.lt',
		text: 'New user joined(broadcast)!',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text, 
			createdAt: new Date().getTime()
		});
		// broadcasting reiskia, kad emmitinam visiems isskyrus tam, kuris prisijunge
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text, 
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('User disconnected from the server');
	});
});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};