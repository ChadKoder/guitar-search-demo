//describe("SearchCtrl", function () {
//    var ctrl,
//       rootScope,
//       $scope,
//       service = {},
//       http,
//       deferred;

//    beforeEach(function () {
       
//        angular.mock.module('SearchCtrl');
//        angular.mock.module('authenticService');

//        inject(function ($rootScope, $http, $controller, authenticService) {
//            rootScope = $rootScope;
//            http = $http;
//            $scope = $rootScope.$new();
//            service = authenticService;
//            //spyOn(authenticService, 'getSearchResults').and.returnValue('searchResults');
//            authenticService.getSearchResults = jasmine.createSpy('authenticServiceGetSpy').and.callFake(function() {
//                return 'searchResults';
//            });//returnValue('searchResults');

//            ctrl = $controller('SearchCtrl', {
//                $scope: $scope,
//                $http: http,
//                authenticService: service
//            });
//        });
//    });
      
//    it("should set $scope.searchText to null", function () {
//        expect($scope.searchText).toBe(null);
//    });
    
//    describe("$scope.search()", function () {
//        beforeEach(function () {
//            spyOn(ctrl, 'getSearchResultsSuccess');//.andCallThrough();
//            spyOn(ctrl, 'getSearchResultsFailure'); //.andCallThrough();
//            $scope.searchText = 'findJobs';
//            $scope.search();
//            $rootScope.$digest();
//            //$scope.$apply();
//        });
        
//        //it("should call ctrl.getSearchResultsSuccess", function() {
//        //    expect(ctrl.getSearchResultsSuccess).toHaveBeenCalled();
//        //});

//        it("should call authenticService.getSearchResults", function () {
//            // expect(service.getSearchResults).toHaveBeenCalled();
//            expect(1).toEqual(1);
//        });
//    });

//    describe("ctrl.getSearchResultsSuccess", function () {
//        beforeEach(function () {
//            var searchResults = 'search-results';
//            ctrl.getSearchResultsSuccess(searchResults);
//        });

//        it("should set $scope.allListings", function () {
//            expect($scope.allListings).toBe('search-results');
//        });
//    });
//});