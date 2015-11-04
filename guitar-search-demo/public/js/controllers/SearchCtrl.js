//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', [
    '$scope', '$http', 'guitarService', function($scope, $http, guitarService) {
    var ctrl = this;
    $scope.searchText = null;
    $scope.searchError = false;
    $scope.favoriteGuitars = {};
    $scope.allGuitars = null;
    $scope.isDisabled = true;
    $scope.toggleSearch = false;

    $scope.selectedUserIndex = undefined;

    $scope.selectUserIndex = function (index) {
        if ($scope.selectedUserIndex !== index) {
            $scope.selectedUserIndex = index;
        }
        else {
            $scope.selectedUserIndex = undefined;
        }
    };

    //$scope.custom = { name: 'bold', description: 'grey', last_modified: 'grey' };
    //$scope.sortable = ['Company', 'Model', 'Price'];
    //$scope.thumbs = 'ImgUrl';
    //$scope.count = 3;
   
    ctrl.searchSuccess = function (result) {
        $scope.allGuitars = result;
        ctrl.flagFavorites();
    };

    ctrl.flagFavorites = function() {
        _.each($scope.allGuitars, function (gtr) {
            gtr.isFavorite = getFavoriteFlag(gtr);
        });
    };

    ctrl.searchFailure = function() {
        $scope.searchError = true;
        $scope.allGuitars = null;
    };

    $scope.search = function () {
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
        });
    };

    ctrl.addFavoriteGuitar = function (guitar) {
        $http.post('/addFavorite', guitar);
    };

    $scope.toggleFavorite = function ($event, guitar) {
        $event.preventDefault();
        $event.stopPropagation();
        if (guitar.isFavorite) {
            ctrl.removeFavoriteGuitar(guitar);
            guitar.isFavorite = false;
        } else {
            ctrl.addFavoriteGuitar(guitar);
            guitar.isFavorite = true;
        }
    };
}]);
