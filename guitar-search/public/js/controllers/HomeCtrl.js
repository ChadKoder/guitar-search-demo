//js/controllers/HomeCtrl.js
angular.module('HomeCtrl', []).controller('HomeCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    var ctrl = this;
    ctrl.retrieveSavedGuitars = function() {
        $http.get('/guitars').success(function (result) {
            var favGuitars = result;
            //alert(JSON.stringify(favGuitars[0].Model));
            $scope.guitars = favGuitars;
        });
    };

    $scope.delete = function (guitar) {
        ctrl.removeFavoriteGuitar(guitar);
            $route.reload();
    };

    ctrl.removeFavoriteGuitar = function (guitar) {
        $http.put('/update', { title: guitar.title }).success(function () {
            console.log('guitar successfully removed');
        });
    };

    ctrl.retrieveSavedGuitars();
}]);