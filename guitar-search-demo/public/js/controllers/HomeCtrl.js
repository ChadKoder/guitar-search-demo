//js/controllers/HomeCtrl.js
angular.module('HomeCtrl', []).controller('HomeCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    var ctrl = this;
    $scope.guitars = null;

    ctrl.getFavorites = function () {
        $http.get('/guitars').success(function (result) {
            $scope.guitars = result;
        });
    };

    $scope.delete = function (guitar) {
        ctrl.removeFavorite(guitar);
            $route.reload();
    };

    ctrl.removeFavorite = function (guitar) {
        $http.put('/update', guitar).success(function () {

        });
    };

    ctrl.getFavorites();
}]);