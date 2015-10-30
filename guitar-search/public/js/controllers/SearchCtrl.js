//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', '$http', 'guitarService', function ($scope, $http, guitarService) {
    var ctrl = this;
    $scope.searchText = null;
    $scope.searchError = false;
    $scope.favoriteGuitars = {};
    $scope.allGuitars = null;

    ctrl.searchSuccess = function (result) {
        $scope.allGuitars = result;
        //ctrl.setFavoriteFlag = result($scope.allGuitars);
        
        _.each($scope.allGuitars, function(gtr) {
            gtr.isFavorite = ctrl.getFavoriteFlag(gtr);
        });
    };
     

    ctrl.searchFailure = function() {
        alert('search failed');
    };

    $scope.search = function () {
        guitarService.getAllGuitars().then(ctrl.searchSuccess, ctrl.searchFailure);
    };
    
    ctrl.getFavoriteFlag = function(guitar) {
        var currentListing = _.find($scope.favoriteGuitars, function (favGuitar) {
            //TODO: Matching on title now to get things working, but needs to match on something better I'd say...
            return favGuitar.title == guitar.title;
        });

        if (currentListing) {
            return true;
        }

        return false;
    };

    ctrl.loadSuccess = function (results) {
        var allResults = ctrl.combineResults(results);
        $scope.allListings = allResults;
    };

    ctrl.loadFailure = function () {
        $scope.allListings = null;
        $scope.searchError = true;
    };
        
    ctrl.retrieveFavorites = function () {
        $http.get('/guitars').success(function (guitars) {
            $scope.favoriteGuitars = guitars;
        });
    };

    ctrl.removeFavoriteGuitar = function (guitar) {
        $http.put('/update', { title:guitar.title }).success(function () {
            console.log('guitar successfully removed');
        });
    };

    ctrl.addFavoriteGuitar = function (guitar) {
        $http.post('/addFavorite', guitar);
    };

    $scope.toggleFavorite = function (index, guitar) {
        if (guitar.isFavorite) {
            ctrl.removeFavoriteGuitar(guitar);
            guitar.isFavorite = false;
        } else {
            ctrl.addFavoriteGuitar(guitar);
            guitar.isFavorite = true;
        }
    };

    //ctrl.retrieveSavedGuitars();

}]);
