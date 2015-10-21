//js/services/authenticService.js
angular.module('authenticService', []).factory('authenticService', ['$http', function ($http) {  
    var apiKey = 'ENTER_PERSONAL_API_KEY';
    var baseUrl = 'http://www.authenticjobs.com/api/?api_key=' + apiKey;
    var searchMethod = '&method=aj.jobs.search';

    var buildAuthenticJobsUrl = function (searchParam) {
        return baseUrl + searchMethod + '&telecommuting=1&format=json' + searchParam + '&perpage=5&callback=JSON_CALLBACK';
    };

    var buildSearchParameter = function (text) {
        return '&keywords=' + text.split(' ').join('+');
    };

    return {
        getSearchResults: function (searchText) {
            $http.defaults.useXDomain = true;

            var searchParameter = buildSearchParameter(searchText);
            var url = buildAuthenticJobsUrl(searchParameter);
            
            return $http.jsonp(url);
        }
    };
}]);
