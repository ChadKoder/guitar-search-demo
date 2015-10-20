//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', '$http', '$q', 'authenticService', function ($scope, $http, $q, authenticService) {
    var ctrl = this;

    $scope.searchText = null;
    $scope.searchError = false;

    $scope.search = function () {
        $q.all([authenticService.getSearchResults($scope.searchText)])
            .then(ctrl.loadSuccess, ctrl.loadFailure);
    };
    
    ctrl.loadSuccess = function (results) {
        var authenticResults = results[0].data.listings.listing;
        $scope.allListings = authenticResults;
    };

    ctrl.loadFailure = function () {
        //alert('Load Failure - searchctrl');
        $scope.allListings = null;
    };
}]);
