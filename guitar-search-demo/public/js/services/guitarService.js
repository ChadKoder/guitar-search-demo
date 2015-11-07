//js/services/guitarService.js
angular.module('guitarService', []).factory('guitarService', ['$http', function ($http) {

    var self = {};
    var baseUrl = 'http://localhost:8103/api/guitar',
        jsonCallback = 'callback=JSON_CALLBACK';
    
    self.getAll = function() {
        return $http({
            method: "JSONP",
            url: baseUrl + '?' + jsonCallback
        }).then(function (response) {
            return response.data;
        });
    };

    self.getSearchResults = function (searchText) {
        var url;

        if (searchText) {
            url = self.buildSearchUrl(searchText);
        } else {
            url = self.getAllUrl();
        }

        return $http({
            method: "JSONP",
            url: url,
        }).then(function (response) {
            return response.data;
        });
    };

    self.getAllUrl = function() {
        return baseUrl + '?' + jsonCallback;
    };

    self.buildSearchUrl = function (searchText) {
        return baseUrl + self.buildSearchParameter(searchText) + '&' + jsonCallback;
    };

    self.buildSearchParameter = function (text) {
        return '?searchText=' + text.split(' ').join('+');
    };

    return self;
}]);
