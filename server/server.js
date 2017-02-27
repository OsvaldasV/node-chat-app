const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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
	socket.emit('newMessageAdmin', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newBroadcast', generateMessage('Admin', 'New user has joined'));

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
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