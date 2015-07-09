'use strict';

/* Controllers */

var tamilPaarvaiControllers = angular.module('tamilPaarvaiControllers', []);

tamilPaarvaiControllers.controller('HomeCtrl', ['$scope', '$http', 
  function($scope, $http) {
	
	$scope.displayHome = function () {       
		console.log('Display Home Screen');


		//FIXME = Collect this from service
		$http.get('data/category.json').success(function(data) {
			$scope.categories = data;
		});
 
	};	

	//Show Home
	$scope.displayHome();
  }]
);

