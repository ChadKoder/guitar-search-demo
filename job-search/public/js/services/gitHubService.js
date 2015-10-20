//js/services/authenticService.js
angular.module('gitHubService', []).factory('gitHubService', ['$http', function ($http) {
    
    var buildGitHubUrl = function(searchText) {
        return 'https://jobs.github.com/positions.json?description=' + searchText + '&location=&page=1&callback=JSON_CALLBACK';
    };

    return {
        getSearchResults: function (callback, searchText) {
            $http.defaults.useXDomain = true;
            var searchParameter = '&keywords=' + searchText;

            var url = buildGitHubUrl(searchParameter);
            return $http.jsonp(url);
        }
    };
}]);
