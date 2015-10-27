//js/controllers/HomeCtrl.js
angular.module('HomeCtrl', []).controller('HomeCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    
    $http.get('/jobs').success(function (jobs) {
        var cleanJobs = jobs;

        for (var i = 0; i < cleanJobs.length; i++) {
            var xmlDesc = cleanJobs[i].description;
            if (xmlDesc) {
                cleanJobs[i].description = $sce.trustAsHtml(xmlDesc);
            }
        }

        $scope.jobs = cleanJobs;
    });
}]);