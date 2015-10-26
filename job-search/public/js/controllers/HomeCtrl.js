//js/controllers/HomeCtrl.js
  
angular.module('HomeCtrl', []).controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/jobs').success(function (jobs) {
        $scope.jobs = jobs;
    });
}]);