'use strict';

/* Controllers */

var tamilPaarvaiControllers = angular.module('tamilPaarvaiControllers', []);

tamilPaarvaiControllers.controller('HomeCtrl', ['$scope',
  function($scope) {
	
	$scope.displayHome = function () {       
		console.log('Display Home Screen');
		$scope.home = "Home Screen";
	};	

	//Show Home
	$scope.displayHome();
  }]
);

