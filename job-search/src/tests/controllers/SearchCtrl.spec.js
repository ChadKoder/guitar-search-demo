describe("SearchCtrl", function () {
    var ctrl,
       rootScope,
       $scope,
       service,
           http;

    beforeEach(function () {
       
        angular.mock.module('SearchCtrl');
        angular.mock.module('searchService');

        inject(function ($rootScope, $http, $controller, searchService) {
            rootScope = $rootScope;
            http = $http;
            $scope = $rootScope.$new();
            service = searchService;
            spyOn(searchService, 'getSearchResults').and.returnValue('searchResults');

            ctrl = $controller('SearchCtrl', {
                $scope: $scope,
                $http: http
            });
        });
    });
      
    it("should set $scope.searchText to null", function () {
        expect($scope.searchText).toBe(null);
    });
    
    describe("$scope.search()", function () {
        beforeEach(function () {
            $scope.searchText = 'findJobs';
            $scope.search();
        });

        it("should call searchService.getSearchResults", function () {
            expect(service.getSearchResults).toHaveBeenCalled();
        });
    });

    describe("ctrl.getSearchResultsSuccess", function () {
        beforeEach(function () {
            var searchResults = 'search-results';
            ctrl.getSearchResultsSuccess(searchResults);
        });

        it("should set $scope.allListings", function () {
            expect($scope.allListings).toBe('search-results');
        });
    });
});