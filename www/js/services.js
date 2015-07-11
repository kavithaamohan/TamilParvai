/* Services */
var parvaiServices = angular.module('parvaiServices', ['ngResource']);

//Factory for loading the feed from Local Storage
parvaiServices.factory ('StorageService', function () {
	var storageFactory = {}; 
	var keyArticles =  "articles";
	var keySyncTime =  "sync_time";
	var keySyncVersion =  "sync_version";

	//Collect all tips 
	storageFactory.syncDate = function() {
		var fileURL =  "files/articles.json";
		//var syncTime =  window.localStorage.getItem(keySyncTime);
		var version = window.localStorage.getItem(keySyncVersion);
		
		//FIXME - Check if the data check has been done already
		jQuery.getJSON(fileURL, function (data) {
			console.log("Loading Articles from FileSystem");
		}).done(function(data) {
			if(!version || data.version > version) {
				console.log("Updating Local Storage");
				window.localStorage.setItem(keySyncTime, data.time);
				window.localStorage.setItem(keySyncVersion, data.version);
				window.localStorage.setItem(keyArticles, JSON.stringify(data.articles));
			}	
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log("Show Error Message - " + textStatus);
		}).always(function() {
			
		});
	}

	//Collect all articles 
	storageFactory.collectArticles = function() {
		console.log('Collecting Articles from Local Storage');
		var data =  window.localStorage.getItem(keyArticles);
		return JSON.parse(data);
	}

	//Collect tips by category
	/*
	storageFactory.collectArticlesByCat = function(ctgry) {
		var data =  window.localStorage.getItem("articles");
		var allTipsJSON = JSON.parse(data);
		var filtered = [];
		for (var i = 0, len = allTipsJSON.length; i < len; i++) {
			var bCtgryMatch = false;
			var tip = allTipsJSON[i];
			for (var j = 0, length = tip.category.length; j < length; j++) {
				if(tip.category[j] == ctgry) {
					bCtgryMatch = true;
				}
			}
			if(bCtgryMatch == true) {
				filtered.push(tip);
			}
		};
		var sortedFiltered = _.sortBy(filtered, "post_date").reverse();
		return sortedFiltered;
		return allTipsJSON;
	}
	*/
	
	return storageFactory;
});


/* Cache Services */
var cacheServices = angular.module('cacheService', []);
cacheServices.factory('cacheService', ['$cacheFactory', function ($cacheFactory) {
			return $cacheFactory('articles-cache');
		}
	]);



//Factory for managing articles
parvaiServices.factory ('ArticleService', function (StorageService, _, cacheService) {
	var factory = {}; 

	//Fetch Articles By Category
	factory.fetchArticlesByCategory = function(category) {
		var key = 'CTGRY' + category;
		//console.log("CTGRY : " + key);
		var articlesByCtgry = cacheService.get(key);
		if(!articlesByCtgry) {
			var articlesAll = StorageService.collectArticles();
			//articlesByCtgry = articlesAll;
			if(articlesAll) {
				var filtered = [];
				if(category) {
					articlesByCtgry = _.filter(articlesAll, function(item) {  
						var bCtgryMatch = false;
						for (var j = 0, length = item.category.length; j < length; j++) {
							if(item.category[j] == category) {
								bCtgryMatch = true;
							}
						}
						return bCtgryMatch; 
					});
				}	
				articlesByCtgry = _.sortBy(articlesByCtgry, "post_date").reverse();
				//console.log("Filtered Article Length : " + tipsByCtgry.length);
				cacheService.put(key, articlesByCtgry);
			}
		}
		return articlesByCtgry;
	}

	// Collect indexed Article for a category
	factory.collectArticle = function(category, index) {
		var self = this;
		var article;
		var articles = self.fetchArticlesByCategory(category);
		article = articles[index];
		article.position = parseInt(index) + 1;
		article.size = articles.length;
		return article;
    }

	
    return factory;
}); 


//Factory for managing category
parvaiServices.factory ('CategoryService', function (StorageService, _, cacheService, $http, $q) {
	var factory = {}; 

	//Load Categories into Cache
	factory.loadCategories = function() {
		console.log('Load Categories From Filesystem');
		return $http.get('files/category.json');
	};


	//Collect Categories from cache
	factory.collectCategories = function() {
		var deferred = $q.defer();
		var key = 'tp-categories';
		var categories = cacheService.get(key);
		if(!categories) {
			var promise = this.loadCategories();
       		promise.then(
          		function(payload) { 
              		categories = payload.data;
					if(categories) {
						cacheService.put(key, categories);
					}
              		deferred.resolve({categories: categories});
					//console.log('Categories ' + JSON.stringify(categories));
          		},
          		function(errorPayload) {
          			console.log('Failure loading movie ' + errorPayload);
          			deferred.reject(errorPayload);
          		});
		} else {
			deferred.resolve({categories: categories});
		}
		return deferred.promise;
	} 

	
    return factory;
}); 
