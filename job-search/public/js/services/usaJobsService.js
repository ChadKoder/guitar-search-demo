//js/services/usaJobsService.js
angular.module('usaJobsService', []).factory('usaJobsService', ['$http', function ($http) {
    //https://data.usajobs.gov/api/jobs?title=engineer
    var baseUrl = 'https://data.usajobs.gov/api/jobs?';
    
    var buildSearchParam = function(text) {
        return 'title=' + text.split(' ').join('+');
    };

    var buildUsaJobsUrl = function(searchParam) {
        return baseUrl + searchParam + '&callback=JSON_CALLBACK';
    };
    
    return {
        getSearchResults: function (searchText) {
            $http.defaults.useXDomain = true;

            var url = buildUsaJobsUrl(buildSearchParam(searchText));
            return $http.jsonp(url);
        }
    };
}]);
