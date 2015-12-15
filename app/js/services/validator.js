angular.module('chat').factory('validator', function($rootScope, $q, api){
	var deferred = $q.defer();
	api.get('/users/validate').success(function(user){
		$rootScope.me = user;
		deferred.resolve(user);
	}).error(function(){
		deferred.reject();
	});
	return deferred.promise;
});