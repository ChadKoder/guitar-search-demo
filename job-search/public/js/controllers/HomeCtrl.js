//js/controllers/HomeCtrl.js
angular.module('HomeCtrl', []).controller('HomeCtrl', ['$scope', '$http', '$sce', '$route', function ($scope, $http, $sce, $route) {
    var ctrl = this;

    ctrl.retrieveSavedJobs = function() {
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
    };

    $scope.delete = function (job) {
        ctrl.removeFavoriteJob(job);
            $route.reload();
    };

    ctrl.removeFavoriteJob = function (job) {
        $http.put('/update', { title: job.title }).success(function () {
            console.log('job successfully removed');
        });
    };

    ctrl.retrieveSavedJobs();
}]);