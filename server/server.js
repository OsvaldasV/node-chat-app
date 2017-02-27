const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		// callback yra acknowledgement from server side sitoje vietoje, nueina atgal i emit createMessage callback'a
		callback('This is from the server');
		// broadcasting reiskia, kad emmitinam visiems isskyrus tam, kuris prisijunge
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text, 
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('User disconnected from the server');
	});
});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};