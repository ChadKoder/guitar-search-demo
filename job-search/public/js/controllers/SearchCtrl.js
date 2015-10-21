//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', '$http', '$q', 'authenticService', 'gitHubService', 'usaJobsService', function ($scope, $http, $q, authenticService, gitHubService, usaJobsService) {
    var ctrl = this;

    $scope.searchText = null;
    $scope.searchError = false;

    $scope.search = function () {
        $q.all([authenticService.getSearchResults($scope.searchText),
                gitHubService.getSearchResults($scope.searchText),
                usaJobsService.getSearchResults($scope.searchText)])
            .then(ctrl.loadSuccess, ctrl.loadFailure);
    };

    ctrl.combineResults = function(authenticResults, gitHubResults, usaJobsResults) {
        var results = [];
        
        for (var i = 0; i < authenticResults.length; i++) {
            results.push({
                title: authenticResults[i].title + ' (AuthenticJobs Listing)',
                description: authenticResults[i].description
            });
        }

        for (var j = 0; j < gitHubResults.length; j++) {
            results.push({
                title: gitHubResults[j].title + ' (GitHub Listing)',
                description: gitHubResults[j].description
            });
        }

        for (var k = 0; k < usaJobsResults.length; k++) {
            results.push({
                title: usaJobsResults[k].JobTitle + ' (USAJobs Listing)',
                description: usaJobsResults[k].JobSummary
            });
        }

        return results;
    };
    
    ctrl.loadSuccess = function (results) {
            var authenticResults = results[0].data.listings.listing;
            var gitHubResults = results[1].data;
            var usaJobsResults = results[2].data.JobData;

            var allResults = ctrl.combineResults(authenticResults, gitHubResults, usaJobsResults);

            $scope.allListings = allResults;
    };

    ctrl.loadFailure = function () {
        $scope.allListings = null;
        $scope.searchError = true;
    };
}]);
