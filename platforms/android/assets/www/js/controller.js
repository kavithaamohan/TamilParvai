'use strict';

/* Controllers */

var tamilPaarvaiControllers = angular.module('tamilPaarvaiControllers', []);

tamilPaarvaiControllers.controller('HomeCtrl', ['$scope', '$http', 'StorageService', 'CategoryService', 
  function($scope, $http, storageService, categoryService) {
	
	$scope.displayHome = function () {       
		//console.log('Display Home Screen');
		//window.plugins.spinnerDialog.show();
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
		storageService.syncDate();
    	//window.plugins.spinnerDialog.hide();
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
		window.plugins.spinnerDialog.show();
		//console.log("Article Category : " + categoryId);
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
		$scope.categoryId = categoryId;
		//UI Changes 
		//$("#main-title").text(ctgry.ctgryname);
		//hidePopup();
		//showBannerAd();
		window.plugins.spinnerDialog.hide();
	}
	
	//Loading the Tips
	$scope.displayArticles();
}]);


//Controller to display Tip Details
tamilPaarvaiControllers.controller('ArticleCtrl', ['$scope', '$routeParams', 'ArticleService', '$sce', '$interval',
	function($scope, $routeParams, articleService, $sce, $interval) {

	$scope.displaySelectedArticle = function() {
		var categoryId = $routeParams.cat;
		var idx = $routeParams.index;
		$scope.index = idx;
		$scope.categoryId = categoryId;
		//$interval(showInterstitial, 5000);
		$scope.displayArticleDetail();
	}

	//Method to display tip detail
	$scope.displayArticleDetail = function () {         
		//console.log("Tip Category : " + $scope.categoryId);
		//var categoryId = $routeParams.cat;
		//var index = $routeParams.index;
		//console.log("Tip Category : " + categoryId);
		//var ctgry = Category.collectCategorty(categoryId);
		//if(ctgry) {
		//	console.log("Category : " + ctgry.ctgryname);
		//}
		var article = articleService.collectArticle($scope.categoryId, $scope.index);
		if (article === undefined || article === null) {
			console.log('JSON is empty. Display Error');
			//FIXME - Display Error Message
		} else {
			console.log("Article : " + JSON.stringify(article));
			//article.contentHtml = $sce.trustAsHtml(tip.content);
			$scope.article = article;
		}
		//$scope.category = $scope.categoryId;
		//$scope.size = tip.size;
		//hidePopup();
		//hideBannerAd();
	}

	/*
	//Older Article  
	$scope.older = function () {
		$scope.index = ($scope.index < $scope.size) ? ++$scope.index : $scope.size;
		$scope.displayTipDetail();
	};

	//Newer Article  
	$scope.newer = function () {
		$scope.index = ($scope.index > 0) ? --$scope.index : 0;
		$scope.displayTipDetail();
	};

	$scope.share = function ($event, tip) {         
		//console.log('Gesture ' + $event.type + ' - tip ' + JSON.stringify(tip));
		window.plugins.socialsharing.share('\n Download Tamil Kuripugal App https://play.google.com/store/apps/details?id=com.smart.droid.tamil.tips', tip.title + ' Read More - ' + tip.link)
	};
	*/

	//Loading the Article
	$scope.displaySelectedArticle();

}]);	


