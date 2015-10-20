//js/services/usaJobsService.js
angular.module('usaJobsService', []).factory('usaJobsService', ['$http', function ($http) {

    var baseUrl = 'https://data.usajobs.gov/api/jobs?';
    
    var buildSearchParam = function(searchText) {
        return 'title=' + searchText;
    };

    var buildUsaJobsUrl = function(searchParam) {
        return baseUrl + searchParam;
    };
    
    return {
        getSearchResults: function (callback, searchText) {
            $http.defaults.useXDomain = true;

            var url = buildUsaJobsUrl(buildSearchParam(searchText));
            return $http.jsonp(url).success(function (data) {
                alert(data);
                callback(data);
            });
        }
    };
}]);
