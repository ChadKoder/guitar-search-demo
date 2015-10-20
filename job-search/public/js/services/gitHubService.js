//js/services/authenticService.js
angular.module('gitHubService', []).factory('gitHubService', ['$http', function ($http) {
    
    var buildGitHubUrl = function (searchParam) {
        return 'https://jobs.github.com/positions.json' + searchParam + '&location=&page=1&callback=JSON_CALLBACK';
    };

    var buildSearchParam = function(searchText) {
        return '?title=' + searchText;
    };

    return {
        getSearchResults: function (searchText) {
            $http.defaults.useXDomain = true;

            var url = buildGitHubUrl(buildSearchParam(searchText));
            return $http.jsonp(url);
        }
    };
}]);
