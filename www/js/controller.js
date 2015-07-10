'use strict';

/* Controllers */

var tamilPaarvaiControllers = angular.module('tamilPaarvaiControllers', []);

tamilPaarvaiControllers.controller('HomeCtrl', ['$scope', '$http', 'StorageService', 'CategoryService', 
  function($scope, $http, storageService, categoryService) {
	
	$scope.displayHome = function () {       
		//console.log('Display Home Screen');

		var promise =  categoryService.collectCategories();
		promise.then (
  			function(data) {
			 	$scope.categories = data.categories;
			 	//console.log("Data Collected " + JSON.stringify(data));
  			},
  			function(error) {
  				//FIXME - Display Error
    			console.log('No Categories Found.');
  			});

		//Sync Local Data
		//window.plugins.spinnerDialog.show();
		storageService.syncDate();


	};

	//Show Home
	$scope.displayHome();
  }]
);

//Controller To Load Tips
tamilPaarvaiControllers.controller('ArticlesCtrl', ['$scope', 'ArticleService', '$routeParams',
  function($scope, articleService, $routeParams) {
	$scope.displayArticles = function () {
		var categoryId = $routeParams.cat;
		console.log("Article Category : " + categoryId);
		/*
		var ctgry = Category.collectCategorty(categoryId);
		if(ctgry) {
			console.log("Category : " + ctgry.ctgryname);
		}
		*/
		var articles = articleService.fetchArticlesByCategory(categoryId);
		if (articles === undefined || articles === null) {
			console.log('JSON is empty. Display Error');
			//FIXME - Display Message
		} else {
			$scope.articles = articles;
		}
		//$scope.category = categoryId;
		//UI Changes 
		//$("#main-title").text(ctgry.ctgryname);
		//hidePopup();
		//showBannerAd();
	}
	
	//Loading the Tips
	$scope.displayArticles();
}]);

