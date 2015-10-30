//js/services/guitarService.js
angular.module('guitarService', []).factory('guitarService', ['$http', function ($http) {

    var self = {};
    var baseUrl = 'http://localhost:8103/api/guitar?callback=JSON_CALLBACK';
   
    self.getAllGuitars = function() {
        return $http({
            method: "JSONP",
            url: baseUrl,
        }).then(function (response) {
            return response.data;
        });
    };

    //$scope.getApiTest = function () {
        
        //$http({
        //    method: "JSONP",
        //    url: url,
        //}).success(function (data) {
        //    $scope.testCall = data.ProductDescription;
        //}).error(function (err) {
        //    $scope.testCall = 'Call to api failed.';
        //});
    //};

    return self;

}]);
