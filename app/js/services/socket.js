angular.module('chat').factory('socket', function($rootScope){
	var socket = io.connect('http://'+window.location.host);
	return {
		on: function(eventName, callback){
			//在这移除所有监听，或调用下面的clear方法
			socket.removeAllListeners(eventName);
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data){
			socket.emit(eventName, data);
		},
		clear: function(){
			socket.removeAllListeners();
		}
	}
});