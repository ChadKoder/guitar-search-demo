//js/services/authenticService.js
angular.module('authenticService', []).factory('authenticService', ['$http', function ($http) {

    var self = {};
    var baseUrl = 'http://www.authenticjobs.com/api/?api_key=';
    self.apiKey = null;
    var searchMethod = '&method=aj.jobs.search';
    self.reader = new XMLHttpRequest();// || new ActiveXObject('MSXML2.XMLHTTP');

    self.retrieveApiKey = function () {
        self.reader.open('GET', 'authentic-jobs-api-key.xml', false);
        self.reader.onreadystatechange = self.setApiKey;
        self.reader.send();

    };

    self.setApiKey = function () {
        if (self.reader.readyState == 4) {
            self.apiKey = self.reader.responseXML.getElementsByTagName("key")[0].childNodes[0].nodeValue;
        }
    };
    
    self.buildAuthenticJobsUrl = function (searchParam) {
        self.retrieveApiKey();
        return baseUrl + self.apiKey + searchMethod + '&telecommuting=1&format=json' + searchParam + '&perpage=5&callback=JSON_CALLBACK';
    };

    self.buildSearchParameter = function (text) {
        return '&keywords=' + text.split(' ').join('+');
    };

    self.getSearchResults = function (searchText) {
        //$http.defaults.useXDomain = true;
        var searchParameter = self.buildSearchParameter(searchText);
        var url = self.buildAuthenticJobsUrl(searchParameter);

        return $http.jsonp(url);
    };

    return self;

}]);
