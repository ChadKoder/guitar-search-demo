//js/services/guitarService.js
angular.module('guitarService', []).factory('guitarService', ['$http', function ($http) {

    var self = {};
    var baseUrl = 'http://localhost:8103/api/guitar?callback=JSON_CALLBACK';
   
    self.getAll = function() {
        return $http({
            method: "JSONP",
            url: baseUrl,
        }).then(function (response) {
            return response.data;
        });
    };

    return self;

}]);
