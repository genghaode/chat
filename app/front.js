angular.module('chat', ['ngRoute']).config(function($locationProvider, $routeProvider){
	//去掉路径中的#
	$locationProvider.html5Mode(false);
	$routeProvider.when('/', {
		templateUrl: '/pages/room.html',
		controller: 'RoomCtrl'
	}).otherwise({
		redirectTo: '/'
	});
});