angular.module('chat').controller('MessageSendCtrl', ['$rootScope', '$scope', 'socket', function($rootScope, $scope, socket){
	$scope.newMessage = '';
	$scope.createMessage = function(){
		if($scope.newMessage){
			socket.emit('createMessage', {
				content: $scope.newMessage,
				createAt: new Date()
			});
			$scope.newMessage = '';
		}
	}
}]);