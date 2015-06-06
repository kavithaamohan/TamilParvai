'use strict';
/* App Module */
var tamilPaarvaiApp = angular.module('tamilPaarvaiApp', ['ngRoute', 'tamilPaarvaiControllers']);

tamilPaarvaiApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).
			otherwise({
				redirectTo : '/home'
			});
		}
	]);
