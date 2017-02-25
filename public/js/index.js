var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');

	// socket.emit('createMessage', {
	// 	to: 'SuperMaryte@melnikaite.lt',
	// 	text: 'Labs'
	// });
});

socket.on('newMessage', function(message){
	console.log('New message', message);
});

socket.on('newMessageAdmin', function(message){
	console.log(message);
});

socket.on('newBroadcast', function(message){
	console.log('New user', message);
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});


