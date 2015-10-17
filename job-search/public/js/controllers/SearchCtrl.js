//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['searchService', function ($scope, searchService) {
    $scope.tagline = searchService.get('another test!');
}]);