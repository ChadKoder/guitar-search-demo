//js/services/searchService.js
angular.module('searchService', []).factory('searchService', ['$http', function ($http) {
    //API KEY: 94b7acb384894b18cdca339bab11b574
    //http://www.authenticjobs.com/api/?api_key=a446a0eefe6f5699283g34f4d5b51fa0&method=aj.jobs.search&keywords=php,mysql&perpage=1

    var apiKey = '94b7acb384894b18cdca339bab11b574';
    var baseUrl = 'http://www.authenticjobs.com/api/?' + apiKey;
    var searchMethod = '&method=aj.jobs.search';
    
    return {
        get: function (searchCriteria) {
            return $http.get(baseUrl + searchMethod + '&keywords=' + searchCriteria + '&perpage=5');
        },

        create: function (data) {
            return 'created ' + data;
        },

        remove: function (id) {
            return 'deleted ' + id;
        }
    };
}]);