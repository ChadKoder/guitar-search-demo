//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', '$http', 'searchService', function ($scope, $http, searchService) {
    var ctrl = this;

    $scope.searchText = null;
    $scope.searchError = false;

    $scope.search = function() {
        searchService.getSearchResults(ctrl.getSearchResultsSuccess, $scope.searchText);
        //searchService.getSearchResults($scope.searchText)
        //    .then(ctrl.getSearchResultsSuccess, ctrl.getSearchResultsFailure);
    };

    ctrl.getSearchResultsSuccess = function (data) {
        $scope.allListings = data;
    };

    //ctrl.getSearchResultsFailure = function (data) {
    //    $scope.allListings = null;
    //    $scope.searchError = true;
    //};
}]);
