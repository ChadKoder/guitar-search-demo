//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', '$http', 'searchService', function ($scope, $http, searchService) {

    $scope.searchText = '';

    $scope.search = function () {
        searchService.getSearchResults($scope.searchText)
       .success(function (data) {
            $scope.allListings = data.listings.listing;
            //alert(data.listings.listing[0].id);
            //return JSON.stringify(data.listings.listing);
        });
    };
}]);
