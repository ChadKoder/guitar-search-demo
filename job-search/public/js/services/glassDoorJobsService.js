//js/services/glassDoorJobsService.js
angular.module('glassDoorJobsService', []).factory('glassDoorJobsService', ['$http', function ($http) {
    //http://api.glassdoor.com/api/api.htm?userip=71.61.78.234KEYSGOHERE&useragent=&format=json&v=1&action=jobs-prog&countryId=1&jobTitle=cashier
    var self = {};
    var baseUrl = 'http://api.glassdoor.com/api/api.htm?v=1&format=json';
    self.partnerId = null;
    self.partnerKey = null;
    self.ip = null;
    self.reader = new XMLHttpRequest();// || new ActiveXObject('MSXML2.XMLHTTP');
   
    self.retrieveApiIdAndKey = function () {
        self.reader.open('GET', 'glass-door-partner-key.xml', false);
        self.reader.onreadystatechange = self.setApiIdAndKey;
        self.reader.send();
    };

    self.buildApiCredentials = function() {
        return '&t.p=' + self.partnerId + '&t.k=' + self.partnerKey;
    };

    self.getUserIp = function () {
        $http.jsonp('http://jsonip.com/?callback=JSON_CALLBACK')
           .success(function (data) {
               self.ip = data.ip;
           });
    };
    
    self.setApiIdAndKey = function () {

        if (self.reader.readyState == 4) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(self.reader.responseText, "text/xml");

            var childNodes = xmlDoc.documentElement.childNodes;
            var keyNode = _.findWhere(childNodes, { tagName: "key" });
            var idNode = _.findWhere(childNodes, { tagName: "id" });
            self.partnerKey = keyNode.textContent;
            self.partnerId = idNode.textContent;
        }
    };

    self.buildglassDoorJobsUrl = function (searchParam) {
        self.retrieveApiIdAndKey();
        return baseUrl + self.buildApiCredentials() + '&action=jobs-prog' + searchParam + '&userip=' + self.ip + '&usergent=chrome&callback=JSON_CALLBACK';
    };

    self.buildSearchParameter = function (text) {
        return '&jobTitle=' + text.split(' ').join('+');
    };

    self.getSearchResults = function (searchText) {
        self.getUserIp();

        var searchParameter = self.buildSearchParameter(searchText);
        var url = self.buildglassDoorJobsUrl(searchParameter);

        return $http.jsonp(url);
    };

    return self;
}]);
