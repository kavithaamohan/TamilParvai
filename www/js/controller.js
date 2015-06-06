'use strict';

/* Controllers */

var tamilPaarvaiControllers = angular.module('tamilPaarvaiControllers');

tamilPaarvaiControllers.controller('HomeCtrl', ['$scope', '_',
  function($scope) {
	//Show Home Page
	/*
	$scope.collectStatistics = function () {    
		//var tips = Storage.collectTips();
		var tips = Article.fetchArticles();
		//if (tips === undefined || tips === null) {
			$scope.arokyam = _.chain(tips).filter(function(tip){ return _.contains(tip.category, 5);}).size().value();
			$scope.samayal = _.chain(tips).filter(function(tip){ return _.contains(tip.category, 3);}).size().value();
			$scope.naattu = _.chain(tips).filter(function(tip){ return _.contains(tip.category, 10);}).size().value();
			$scope.azagu = _.chain(tips).filter(function(tip){ return _.contains(tip.category, 6);}).size().value();
			$scope.kural = _.chain(tips).filter(function(tip){ return _.contains(tip.category, 11);}).size().value();
		//}
	};
	*/ 
	
	$scope.displayHome = function () {       
		console.log('Display Home Screen');
		$scope.home = "Home Screen";
	};	

	//Show Home
	$scope.displayHome();
  }]
);

/*
//Controller To Load Tips
tamiltipsControllers.controller('ListTipsCtrl', ['$scope', 'ArticleService', '$routeParams',
  function($scope, Article, $routeParams) {
	$scope.displayTips = function () {
		var categoryId = $routeParams.cat;
		console.log("Tip Category : " + categoryId);
		var tips = Article.fetchArticlesByCategory(categoryId);
		if (tips === undefined || tips === null) {
			console.log('JSON is empty. Display Error');
			//FIXME - Display Message
		} else {
			$scope.tips = tips;
		}
		$scope.category = categoryId;
		//UI Changes 
		//$("#main-title").text(ctgry.ctgryname);
		hidePopup();
		showBannerAd();
	}
	
	//Loading the Tips
	$scope.displayTips();
}]);

tamiltipsControllers.controller('TipCtrl', ['$scope', '$routeParams', 'StorageService',  
  function($scope, $routeParams, Storage) {
	$scope.loadTip = function () {       
		var tips = Storage.collectTips();
		if (!angular.isUndefined(tips) && !angular.isUndefined($routeParams.id)) {
			for (var i = 0, len = tips.length; i < len; i++) {
				var tip = tips[i];
				if (tip.id == $routeParams.id) {
					$scope.tip = tip;
					break;
				}
			};
		} else {
			console.log('Tip not found sipaly error message');
		}
	}	
	
	//Collecting the details of the tip
	$scope.loadTip();
}]);

//Controller to display Tip Details
tamiltipsControllers.controller('CategoryTipCtrl', ['$scope', '$routeParams', 'ArticleService', '$sce',
	function($scope, $routeParams, Article, $sce) {

	$scope.displaySelectedTip = function() {
		var categoryId = $routeParams.cat;
		var idx = $routeParams.index;
		$scope.index = idx;
		$scope.categoryId = categoryId;
		$scope.displayTipDetail();
	}

	//Method to display tip detail
	$scope.displayTipDetail = function () {         
		console.log("Tip Category : " + $scope.categoryId);
		//var categoryId = $routeParams.cat;
		//var index = $routeParams.index;
		//console.log("Tip Category : " + categoryId);
		//var ctgry = Category.collectCategorty(categoryId);
		//if(ctgry) {
		//	console.log("Category : " + ctgry.ctgryname);
		//}
		var tip = Article.collectArticle($scope.categoryId, $scope.index);
		if (tip === undefined || tip === null) {
			console.log('JSON is empty. Display Error');
			//FIXME - Display Error Message
		} else {
			//console.log(tip.content);
			tip.contentHtml = $sce.trustAsHtml(tip.content);
			$scope.tip = tip;
		}
		$scope.category = $scope.categoryId;
		$scope.size = tip.size;
		hidePopup();
		hideBannerAd();
	}


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
	
	//Loading the Tips
	$scope.displaySelectedTip();

}]);	

*/
