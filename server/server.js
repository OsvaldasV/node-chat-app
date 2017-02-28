const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', {
	// 	from: 'VasiaSuper@myliukas.lt',
	// 	text: 'Valio!',
	// 	createdAt: 123
	// });
	// socket.emit('newMessageAdmin', generateMessage('Admin', 'Welcome to the chat app'));

	// socket.broadcast.emit('newBroadcast', generateMessage('Admin', 'New user has joined'));

	socket.on('join', (params,callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and Room name are required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name, params.room);

		io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
		// socket.leave('The Office Fans');

		// io.emit -> io.to('The Office Fans').mit
		// socket.broadcast.emit-> socket.broadcast.to('The Office Fans').mit
		// socket.emit
		socket.emit('newMessageAdmin', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newBroadcast', generateMessage('Admin', `${params.name} has joined`));
		callback();
	});



	socket.on('createMessage', (message, callback) => {
		// console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		// callback yra acknowledgement from server side sitoje vietoje, nueina atgal i emit createMessage callback'a
		callback();
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
		var user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
		}

	});

});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};