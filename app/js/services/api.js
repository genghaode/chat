angular.module('chat').factory('api', function($rootScope, $http){
	return {
		host: '',
		get: function(url){
			return $http({
				url: this.host+url,
				method: 'get'
			});
		},
		post: function(url, data){
			return $http({
				url: this.host+url,
				method: 'post',
				data: data
			});
		}
	}
});