//js/controllers/HomeCtrl.js
angular.module('HomeCtrl', []).controller('HomeCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    var ctrl = this;
    $scope.guitars = null;
     
    ctrl.getFavorites = function () {
        $http.get('/guitars').success(function (result) {
            $scope.guitars = result;
        });
    };
    
    ctrl.delete = function (guitar) {
        $http.put('/update', guitar).success(function () {
            $route.reload();
        });
    };

    $scope.selectedUserIndex = undefined;

    $scope.selectUserIndex = function (index) {
        if ($scope.selectedUserIndex !== index) {
            $scope.selectedUserIndex = index;
        }
        else {
            $scope.selectedUserIndex = undefined;
        }
    };
    /*begin toast*/
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function (pos) { return $scope.toastPosition[pos]; })
          .join(' ');
    };
    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }
    //$scope.showCustomToast = function () {
    //    $mdToast.show({
    //        controller: 'ToastCtrl',
    //        templateUrl: 'toast-template.html',
    //        parent: $document[0].querySelector('#toastBounds'),
    //        hideDelay: 6000,
    //        position: $scope.getToastPosition()
    //    });
    //};
    //$scope.showSimpleToast = function () {
    //    $mdToast.show(
    //      $mdToast.simple()
    //        .content('Simple Toast!')
    //        .position($scope.getToastPosition())
    //        .hideDelay(3000)
    //    );
    //};

    //$scope.closeToast = function () {
    //    /*todo: is this redundant?*/
    //    $mdToast.hide();
    //};

    $scope.removeFavorite = function (guitar) {
        ctrl.delete(guitar);
        //var toast = $mdToast.simple()
        //      .content('Favorite removed.')
        //      .action('X')
        //      .highlightAction(false)
        //      .position($scope.getToastPosition());
        //$mdToast.show(toast).then(function (response) {
        //    if (response == 'X') {
        //        $mdToast.close();                
        //    }
        //});       

    };

    /*end toast*/


    ctrl.getFavorites();
}]);