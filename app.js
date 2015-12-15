var express = require('express');
var path = require('path');
var app = express();
var settings = require('./settings');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var signedCookieParser = cookieParser(settings.cookieSecret);
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);


var PORT = process.env.PORT | 3000;
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(cookieParser());
var sessionStore = new MongoStore({
	url: settings.url
});
app.use(expressSession({
	secret: settings.cookieSecret,
	resave: true,
	saveUninitialized: true,
	store: sessionStore
}));

var index = require('./routes/index');
var users = require('./routes/users');

app.use('/', index);
app.use('/users', users);

var server = app.listen(PORT);

var io = require('socket.io').listen(server);

io.set('authorization', function(request, next){
	signedCookieParser(request, {}, function(err){
		sessionStore.get(request.signedCookies['connect.sid'], function(err, session){
			if(err){
				next(err);
			}else {
				if(session && session.user){
					request.session = session;
					next(null, true);
				}else {
					next('未登录');
				}
			}
		});
	});

});

var SYSTEM = {
	name: '聊天室',
	avatar: ''
};
var messages = [];
var users = [];

io.sockets.on('connection', function(socket){
	var user = socket.request.session.user;
	users.push(user);
	socket.broadcast.emit('message.add', {
		content: user.username+'进入了聊天室',
		creator: SYSTEM,
		createAt: new Date()
	});
	socket.on('disconnect', function(){
		users.splice(users.indexOf(user), 1);
		socket.broadcast.emit('message.add', {
			content: user.username+'退出了聊天室',
			creator: SYSTEM,
			createAt: new Date()
		});
	});
	socket.emit('connected');
	socket.on('getAllMessages', function(){
		socket.emit('allMessages', {messages: messages, users: users});
	});
	socket.on('createMessage', function(message){
		messages.push(message);
		io.emit('message.add', message);
	});

});
