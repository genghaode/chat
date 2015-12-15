angular.module('chat').controller('NavCtrl', function($rootScope, $scope, $location, socket, api){
	$scope.isActive = function(path){
		return path === $location.path();
	}
	$scope.logout = function(){
		api.get('/users/logout').success(function(){
			$rootScope.me = null;
			$location.path('/login');
		}).error(function(){
			$location.path('/login');
		});
	}
});