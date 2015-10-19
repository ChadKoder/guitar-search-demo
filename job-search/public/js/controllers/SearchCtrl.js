//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', '$http', 'searchService', function ($scope, $http, searchService) {
    var ctrl = this;

    $scope.searchText = null;

    $scope.search = function() {
        searchService.getSearchResults(ctrl.getSearchResultsSuccess, $scope.searchText);
    };

    ctrl.getSearchResultsSuccess = function (data) {
        $scope.allListings = data;
    };
}]);
