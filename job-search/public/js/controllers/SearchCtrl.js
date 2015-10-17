//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', 'searchService', function ($scope, searchService) {
    $scope.tagline = searchService.get('another test!');
}]);