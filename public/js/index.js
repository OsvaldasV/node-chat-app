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

	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');
	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li);
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

var locationButton = $('#send-location');
locationButton.on('click', function() {
	if(!navigator.geolocation) {
		return alert(' Geolocation not supported by your browser');
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		alert('Unable to fetch location.');
	});
});













