angular.module('chat').controller('RegCtrl', function($rootScope, $scope, $location, socket, api){
	$scope.user = {};
	$scope.save = function(){
		api.post('/users/reg', $scope.user).success(function(user){
			$rootScope.me = user;
			$location.path('/');
		}).error(function(){
			$location.path('/reg');
		});
	}
});