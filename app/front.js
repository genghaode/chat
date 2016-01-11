angular.module('chat', ['ngRoute', 'angularMoment']).config(function($locationProvider, $routeProvider){
	//去掉路径中的#
	$locationProvider.html5Mode(false);
	$routeProvider.when('/', {
		templateUrl: '/pages/room.html',
		controller: 'RoomCtrl'
	}).when('/login', {
		templateUrl: '/pages/login.html',
		controller: 'LoginCtrl'
	}).when('/reg', {
		templateUrl: 'pages/reg.html',
		controller: 'RegCtrl'
	}).when('/home', {
		templateUrl: 'pages/home.html'
	}).otherwise({
		redirectTo: '/'
	});
});

angular.module('chat').run(function($rootScope, $location, validator){
	validator.then(function(){
		$location.path('/');
	}, function(){
		$location.path('/login');
	});
	$rootScope.me = {"username": "geng"};
});