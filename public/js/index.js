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
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	$('#messages').append(li);
});

socket.on('newMessageAdmin', function(message){
	console.log(message);
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	$('#messages').append(li);
});

socket.on('newBroadcast', function(message){
	console.log('New user', message);
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});

// socket.emit('createMessage', {
// 	from: 'Vytis',
// 	text: 'Hi'
// }, function(data){
// 	console.log('Got it', data);
// });

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message').val()
	}, function() {

	});
});






