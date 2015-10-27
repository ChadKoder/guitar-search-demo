describe('SearchCtrl', function() {
    var ctrl,
        rootScope,
        $scope,
        $q,
        authenticService = {},
        gitHubService = {},
        usaJobsService = {},
        glassDoorService = {},
        http;

    var authenticResponse = { "data": { "listings": { "listing": [{ "title": "title1", "description": "desc1", "apply_url": "apply_url", "company": { "name": "company1" } }] } } };
    var gitHubResponse = { "data": [{ "title": "title2", "description": "desc2" }] };
    var usaJobsResponse = { "data": { "JobData": [{ "JobTitle": "title3", "JobSummary": "desc3" }] } };
    var glassDoorResponse = { "data": { "response": { "jobTitle": "title4", "results": [{ "nextJobTitle": "title4" }] } } };

    beforeEach(function () {
        angular.mock.module('jobSearchApp');
        
        inject(function ($rootScope, $http, _$q_, $controller, _authenticService_, _gitHubService_, _usaJobsService_, _glassDoorJobsService_) {
            rootScope = $rootScope;
            http = $http;
            $q = _$q_;
            $scope = $rootScope.$new();
            authenticService = _authenticService_;
            gitHubService = _gitHubService_;
            usaJobsService = _usaJobsService_;
            glassDoorService = _glassDoorJobsService_;
            
            authenticService.getSearchResults = jasmine.createSpy('authenticServiceGetSpy').and.callFake(function () {
                return 'authentic-results';
            });

            gitHubService.getSearchResults = jasmine.createSpy('gitHubServiceGetSpy').and.callFake(function () {
                return 'github-results';
            });

            usaJobsService.getSearchResults = jasmine.createSpy('usaJobsServiceGetSpy').and.callFake(function () {
                return 'usajobs-results';
            });

            glassDoorService.getSearchResults = jasmine.createSpy('glassDoorServiceGetSpy').and.callFake(function () {
                return 'glassdoor-results';
            });

            ctrl = $controller('SearchCtrl', {
                $scope: $scope,
                $http: http,
                $q: $q,
                authenticService: authenticService,
                gitHubService: gitHubService,
                usaJobsService: usaJobsService,
                glassDoorJobsService: glassDoorService
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

        it('should call glassDoorJobsService.getSearchResults', function () {
            expect(glassDoorService.getSearchResults).toHaveBeenCalledWith('findJobs');
        });
    });

    describe('ctrl.combineResults()', function () {
        
        it('should combine all search results', function () {
         
            var allResults = ctrl.combineResults([authenticResponse, gitHubResponse, usaJobsResponse, glassDoorResponse]);
            
            expect(allResults.length).toBe(4);
            expect(allResults[0].title).toBe('title1 (AuthenticJobs Listing)');
            expect(allResults[1].title).toBe('title2 (GitHub Listing)');
            expect(allResults[2].title).toBe('title3 (USAJobs Listing)');
            expect(allResults[3].title).toBe('title4 (GlassDoor Listing)');

            expect(allResults[0].description).toBe('desc1');
            expect(allResults[1].description).toBe('desc2');
            expect(allResults[2].description).toBe('desc3');
            expect(allResults[3].description).toBe('');

            expect(allResults[0].url).toBe('apply_url');
        });
    });

    describe('$scope.loadSuccess()', function () {
        var allResults;
        beforeEach(function () {
            allResults = [authenticResponse, gitHubResponse, usaJobsResponse, glassDoorResponse];
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
