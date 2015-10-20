describe("SearchCtrl", function () {
    var ctrl,
        rootScope,
        $scope,
        $q,
        authenticService = {},
        gitHubService = {},
        usaJobsService = {},
        http;

    beforeEach(function () {
       
        angular.mock.module('SearchCtrl');
        angular.mock.module('authenticService');
        angular.mock.module('gitHubService');
        angular.mock.module('usaJobsService');

        inject(function ($rootScope, $http, _$q_, $controller, _authenticService_, _gitHubService_, _usaJobsService_) {
            rootScope = $rootScope;
            http = $http;
            $q = _$q_;
            $scope = $rootScope.$new();
            authenticService = _authenticService_;
            gitHubService = _gitHubService_;
            usaJobsService = _usaJobsService_;
            
            authenticService.getSearchResults = jasmine.createSpy('authenticServiceGetSpy').and.callFake(function () {
                return 'authentic-results';
            });

            gitHubService.getSearchResults = jasmine.createSpy('gitHubServiceGetSpy').and.callFake(function () {
                return 'gitHub-Results';
            });

            usaJobsService.getSearchResults = jasmine.createSpy('usaJobsServiceGetSpy').and.callFake(function () {
                return 'usaJobs-Results';
            });

            ctrl = $controller('SearchCtrl', {
                $scope: $scope,
                $http: http,
                $q: $q,
                authenticService: authenticService,
                gitHubService: gitHubService,
                usaJobsService: usaJobsService
            });
        });
    });
      
    it("should set $scope.searchText to null", function () {
        expect($scope.searchText).toBe(null);
    });
    
    //describe("$scope.search()", function () {
    //    beforeEach(function () {
    //        spyOn(ctrl, 'getSearchResultsSuccess');//.andCallThrough();
    //        spyOn(ctrl, 'getSearchResultsFailure'); //.andCallThrough();
    //        $scope.searchText = 'findJobs';
    //        $scope.search();
    //        $rootScope.$digest();
    //        //$scope.$apply();
    //    });
        
    //    //it("should call ctrl.getSearchResultsSuccess", function() {
    //    //    expect(ctrl.getSearchResultsSuccess).toHaveBeenCalled();
    //    //});

    //    it("should call authenticService.getSearchResults", function () {
    //        // expect(service.getSearchResults).toHaveBeenCalled();
    //        expect(1).toEqual(1);
    //    });
    //});

    //describe("ctrl.getSearchResultsSuccess", function () {
    //    beforeEach(function () {
    //        var searchResults = 'search-results';
    //        ctrl.getSearchResultsSuccess(searchResults);
    //    });

    //    it("should set $scope.allListings", function () {
    //        expect($scope.allListings).toBe('search-results');
    //    });
    //});
});