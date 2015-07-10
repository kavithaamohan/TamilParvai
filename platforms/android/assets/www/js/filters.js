'use strict';

/* Filters */

var parvaiFilters = angular.module('parvaiFilters',  []);


parvaiFilters.filter('feedicon', function($filter) {
	return function(input) {
		var start = "src=\"";
		var end = "\"";
		if(input.indexOf(start) > 0) {
			var temp = input.substring(input.indexOf(start)+5);
			var imageSrc = temp.substring(0,temp.indexOf(end));
			return '<img class="article-icon-img" src=' +  imageSrc + '>' ; 
		}	
	};
});