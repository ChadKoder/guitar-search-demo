//js/services/glassDoorJobsService.js
angular.module('glassDoorJobsService', []).factory('glassDoorJobsService', ['$http', function ($http) {

    var self = {};
    var buildGlassDoorJobsUrl = function (searchParam) {
        return 'https://jobs.github.com/positions.json?' + searchParam + '&location=&page=1&callback=JSON_CALLBACK';
    };

    var buildSearchParam = function (text) {
        return 'title=' + text.split(' ').join('+');
    };

    return {
        getSearchResults: function (searchText) {
            $http.defaults.useXDomain = true;

            var url = buildGitHubUrl(buildSearchParam(searchText));
            return $http.jsonp(url);
        }
    }

    ;
}]);
