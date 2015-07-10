'use strict';
/* App Module */
var tamilPaarvaiApp = angular.module('tamilPaarvaiApp', ['ngRoute', 'ngSanitize', 'pascalprecht.translate', 'tamilPaarvaiControllers', 'parvaiServices', 'parvaiFilters', 'underscore', 'cacheService']);

tamilPaarvaiApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).
      when('/articles/:cat', {
        templateUrl : 'partials/articles.html',
        controller : 'ArticlesCtrl'
      }).
			otherwise({
				redirectTo : '/home'
			});
		}
	]);

tamilPaarvaiApp.config(function ($translateProvider) {
        $translateProvider.translations('en', {
          TITLE: 'Tamil Payanam',
          HOME: 'Home'
        });
        $translateProvider.translations('ta', {
          TITLE: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd \u0baa\u0baf\u0ba3\u0bae\u0bcd',
          HOME: '\u0bae\u0bc1\u0b95\u0baa\u0bcd\u0baa\u0bc1',
          PAZAMOZHI: '\u0baa\u0bb4\u0bae\u0bca\u0bb4\u0bbf\u0b95\u0bb3\u0bcd',
          VIDUGATHAIGAL: '\u0bb5\u0bbf\u0b9f\u0bc1\u0b95\u0ba4\u0bc8\u0b95\u0bb3\u0bcd',
          PUDHIRGAL: '\u0baa\u0bc1\u0ba4\u0bbf\u0bb0\u0bcd\u0b95\u0bb3\u0bcd',
          SINDANAI: '\u0b9a\u0bbf\u0ba8\u0bcd\u0ba4\u0ba9\u0bc8 \u0ba4\u0bc1\u0bb3\u0bbf\u0b95\u0bb3\u0bcd',
          PADALGAL: '\u0baa\u0bbe\u0b9f\u0bb2\u0bcd\u0b95\u0bb3\u0bcd',
          KADHAIGAL: '\u0b95\u0ba4\u0bc8\u0b95\u0bb3\u0bcd',
          ARINDU: '\u0b85\u0bb1\u0bbf\u0ba8\u0bcd\u0ba4\u0bc1 \u0b95\u0bca\u0bb3\u0bcd\u0bb5\u0bcb\u0bae\u0bcd',
          KUZANDHAI: '\u0b95\u0bc1\u0bb4\u0ba8\u0bcd\u0ba4\u0bc8 \u0bb5\u0bb3\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bc1' 
        });
        $translateProvider.preferredLanguage('ta');
      });
