angular.module('chat').controller('RoomCtrl', function($scope, socket){
	$scope.room = {};
	//向服务器发射getAllMessages事件
	socket.emit('getAllMessages');
	socket.on('allMessages', function(room){
		$scope.room = room;
	});
	socket.on('message.add', function(message){
		$scope.room.messages.push(message);
	});
});