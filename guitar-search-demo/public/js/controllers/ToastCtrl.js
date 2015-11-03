//js/controllers/HomeCtrl.js
angular.module('ToastCtrl', []).controller('ToastCtrl', ['$scope', '$mdToast', function ($scope, $mdToast) {
    $scope.closeToast = function () {
        $mdToast.hide();
    };
}]);
