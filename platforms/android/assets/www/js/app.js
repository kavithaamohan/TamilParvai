'use strict';
/* App Module */
var tamilPaarvaiApp = angular.module('tamilPaarvaiApp', ['ngRoute', 'ngSanitize', 'ngTouch', 'tamilPaarvaiControllers', 'underscore']);

tamilPaarvaiApp.config(function ($provide) {
  $provide.value('CAT_5', 'HEALTH_TIPS');
  $provide.value('CAT_3', 'COOKING_TIPS');
  $provide.value('CAT_10', 'TREATMENT');
  $provide.value('CAT_6', 'BEAUTY_TIPS');
  $provide.value('CAT_11', 'KURAL');
});

tamilPaarvaiApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).
			/*
			when('/tips/:cat', {
				templateUrl : 'partials/tips.html',
				controller : 'ListTipsCtrl'
			}).
			when('/tip/:id', {
				templateUrl : 'partials/tip.html',
				controller : 'TipCtrl'
			}).
			when('/tip/:cat/:index', {
				templateUrl : 'partials/tip.html',
				controller : 'CategoryTipCtrl'
			}).
			when('/tip/:cat/:id', {
				templateUrl : 'partials/tip.html',
				controller : 'CategoryTipCtrl'
			}).
			*/
			otherwise({
				redirectTo : '/home'
			});
		}
	]);

/*	
tamilPaarvaiApp.config(function ($translateProvider) {
        $translateProvider.translations('en', {
          TITLE: '1500+ Tamil Tips',
          HOME: 'Home',
		  HEALTH_TIPS: 'Health Tips',
		  BEAUTY_TIPS: 'Beauty Tips',
		  KURAL: 'Kural',
          BUTTON_LANG_EN: 'english',
          BUTTON_LANG_DE: 'german',
          TIP:'Tip'
        });
        $translateProvider.translations('tn', {
          TITLE: '1500+ \u0ba4\u0bae\u0bbf\u0bb4\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd',
          HOME: '\u0bae\u0bc1\u0b95\u0baa\u0bcd\u0baa\u0bc1',
		  HEALTH_TIPS: '\u0b86\u0bb0\u0bc7\u0bbe\u0b95\u0bcd\u0b95\u0bbf\u0baf \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd',
		  COOKING_TIPS: '\u0b9a\u0bae\u0bc8\u0baf\u0bb2\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd', 
		  TREATMENT: '\u0ba8\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1 \u0bb5\u0bc8\u0ba4\u0bcd\u0ba4\u0bbf\u0baf\u0bae\u0bcd',
		  BEAUTY_TIPS: '\u0b85\u0bb4\u0b95\u0bc1 \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd',
		  KURAL: '\u0ba4\u0bbf\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bb1\u0bb3\u0bcd',
		  TIP: '\u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1',
          BUTTON_LANG_EN: 'englisch',
          BUTTON_LANG_DE: 'deutsch'
        });
        $translateProvider.preferredLanguage('tn');
      });
*/
