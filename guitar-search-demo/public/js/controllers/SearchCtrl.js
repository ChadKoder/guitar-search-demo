//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', [
    '$scope', '$http', 'guitarService', '$mdToast', function ($scope, $http, guitarService, $mdToast) {
    var ctrl = this;
    $scope.btnColor = function (guitar) {
        if (guitar.isFavorite) {
            return 'green';
        } else {
            return 'grey';
        }
    };

    $scope.selectGuitarIndex = function (index) {
        if ($scope.selectedGuitarIndex !== index) {
            $scope.selectedGuitarIndex = index;
        }
        else {
            $scope.selectedGuitarIndex = undefined;
        }
    };
   
    ctrl.searchSuccess = function (result) {
        $scope.searching = false;
        $scope.allGuitars = result;
        ctrl.flagFavorites();
    };

    ctrl.flagFavorites = function() {
        _.each($scope.allGuitars, function (gtr) {
            gtr.isFavorite = getFavoriteFlag(gtr);
        });
    };

    ctrl.searchFailure = function () {
        $scope.searching = false;
        $scope.searchError = true;
        $scope.allGuitars = null;
    };

    $scope.search = function () {
        $scope.searching = true;
        $scope.searchError = false;
        $scope.allGuitars = null;
        ctrl.getFavorites();
        guitarService.getSearchResults($scope.searchText).then(ctrl.searchSuccess, ctrl.searchFailure);
    };
    
    var getFavoriteFlag = function(guitar) {
        var currentListing = _.find($scope.favoriteGuitars, function (favGuitar) {
            return favGuitar.Company == guitar.Company && favGuitar.Model == guitar.Model;
        });

        if (currentListing) {
            return true;
        }

        return false;
    };
    
    ctrl.getFavorites = function () {
        $http.get('/guitars').success(function (guitars) {
            $scope.favoriteGuitars = guitars;
        });
    };

    ctrl.removeFavoriteGuitar = function (guitar) {
        $http.put('/update', guitar).success(function () {
            console.log('guitar successfully removed');
            
            var toast = $mdToast.simple()
                  .content('Favorite removed.')
                  .action('X')
                  .highlightAction(false)
                  .position($scope.getToastPosition());
            $mdToast.show(toast).then(function (response) {
                if (response == 'X') {
                    $mdToast.close();                
                }
            });  
        });
    };

    ctrl.addFavoriteGuitar = function (guitar) {
        $http.post('/addFavorite', guitar).success(function () {            
            var toast = $mdToast.simple()
                 .content('Favorite added.')
                 .action('X')
                 .highlightAction(false)
                 .position($scope.getToastPosition());
            $mdToast.show(toast).then(function (response) {
                if (response == 'X') {
                    $mdToast.close();
                }
            });
        });
    };   

    $scope.toggleFavorite = function ($event, guitar) {
        $event.preventDefault();
        $event.stopPropagation();

        if (guitar.isFavorite) {
            guitar.isFavorite = false;
            ctrl.removeFavoriteGuitar(guitar);            
        } else {
            guitar.isFavorite = true;
            ctrl.addFavoriteGuitar(guitar);            
        }
    };

    ctrl.init = function () {
        $scope.searchText = null;
        $scope.searchError = false;
        $scope.favoriteGuitars = {};
        $scope.allGuitars = null;
        $scope.searching = false;
        $scope.selectedGuitarIndex = undefined;
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

        $scope.showCustomToast = function () {
            $mdToast.show({
                controller: 'ToastCtrl',
                templateUrl: 'toast-template.html',
                parent: $document[0].querySelector('#toastBounds'),
                hideDelay: 6000,
                position: $scope.getToastPosition()
            });
        };

        $scope.showSimpleToast = function () {
            $mdToast.show(
              $mdToast.simple()
                .content('Simple Toast!')
                .position($scope.getToastPosition())
                .hideDelay(3000)
            );
        };

        $scope.closeToast = function () {
            /*todo: is this redundant?*/
            $mdToast.hide();
        };

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
        /*End Toast*/

    ctrl.init();
}]);
