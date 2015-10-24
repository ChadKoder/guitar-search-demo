describe('SearchCtrl', function() {
    var ctrl,
        rootScope,
        $scope,
        $q,
        authenticService = {},
        gitHubService = {},
        usaJobsService = {},
        http;

    var authenticResponse = { "data": { "listings": { "listing": [{  "title": "title1", "description": "desc1" }] } } };
    var gitHubResponse = [{ "title": "title2", "description": "desc2" }];
    var usaJobsResponse = { "data": { "JobData": [{ "JobTitle": "title3", "JobSummary": "desc3" }] } };

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
      
    it('should set $scope.searchText to null', function () {
        expect($scope.searchText).toBe(null);
    });

    it('should set $scope.searchError to false', function() {
        expect($scope.searchError).toBe(false);
    });

    describe('$scope.search()', function() {
        beforeEach(function () {
            $scope.searchText = 'findJobs';
            $scope.search();
        });

        it('should call authenticService.getSearchResults', function() {
            expect(authenticService.getSearchResults).toHaveBeenCalledWith('findJobs');
        });

        it('should call gitHubService.getSearchResults', function () {
            expect(gitHubService.getSearchResults).toHaveBeenCalledWith('findJobs');
        });

        it('should call usaJobsService.getSearchResults', function () {
            expect(usaJobsService.getSearchResults).toHaveBeenCalledWith('findJobs');
        });
    });

    //describe('ctrl.combineResults()', function () {
        
    //    it('should combine all search results', function () {
    //        var authenticData = authenticResponse.data.listings.listing;
    //        var gitHubData = gitHubResponse;
    //        var usaJobsData = usaJobsResponse.data.JobData;
    //        var allResults = ctrl.combineResults(authenticData, gitHubData, usaJobsData);
            
    //        expect(allResults.length).toBe(3);
    //        expect(allResults[0].title).toBe('title1 (AuthenticJobs Listing)');
    //        expect(allResults[1].title).toBe('title2 (GitHub Listing)');
    //        expect(allResults[2].title).toBe('title3 (USAJobs Listing)');

    //        expect(allResults[0].description).toBe('desc1');
    //        expect(allResults[1].description).toBe('desc2');
    //        expect(allResults[2].description).toBe('desc3');
    //    });
    //});

    describe('$scope.loadSuccess()', function () {
        var allResults;
        beforeEach(function () {
            allResults = [authenticResponse, gitHubResponse, usaJobsResponse];
            spyOn(ctrl, 'combineResults').and.returnValue('combinedResults');
        });

        it('should call ctrl.combineResults', function () {
            ctrl.loadSuccess(allResults);
            expect(ctrl.combineResults).toHaveBeenCalled();
        });

        it('should set $scope.allListings', function () {
            ctrl.loadSuccess(allResults);
            expect($scope.allListings).toBe('combinedResults');
        });
    });

    describe('ctrl.loadFailure()', function () {
        beforeEach(function () {
            $scope.allListings = 'notNull';
            $scope.searchError = false;

            ctrl.loadFailure();
        });

        it('should set $scope.allListings to null', function() {
            expect($scope.allListings).toBe(null);
        });

        it('should set $scope.searchError to true', function () {
            expect($scope.searchError).toBe(true);
        });
    });
});
