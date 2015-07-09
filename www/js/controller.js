'use strict';

/* Controllers */

var tamilPaarvaiControllers = angular.module('tamilPaarvaiControllers', []);

tamilPaarvaiControllers.controller('HomeCtrl', ['$scope', '$http', 'StorageService', 
  function($scope, $http, storageService) {
	
	$scope.displayHome = function () {       
		console.log('Display Home Screen');

		//Sync Local Data
		//window.plugins.spinnerDialog.show();
		storageService.syncDate();

		//FIXME = Collect this from service
		$http.get('files/category.json').success(function(data) {
			$scope.categories = data;
		});
 
	};	

	//Show Home
	$scope.displayHome();
  }]
);

