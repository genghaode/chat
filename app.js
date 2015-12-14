var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var settings = require('./settings');

var PORT = process.env.PORT | 3000;
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(expressSession({
	secret: settings.cookieSecret,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		url: settings.url
	})
}));

var index = require('./routes/index');
var users = require('./routes/users');

app.use('/', index);
app.use('/users', users);

var server = app.listen(PORT);

var io = require('socket.io').listen(server);

var messages = [];
var users = [];

io.sockets.on('connection', function(socket){
	socket.emit('connected');
	socket.on('getAllMessages', function(){
		socket.emit('allMessages', {messages: messages, users: users});
	});
	socket.on('createMessage', function(message){
		messages.push(message);
		io.emit('message.add', message);
	})

});
