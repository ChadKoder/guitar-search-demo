describe('SearchCtrl', function() {
    var ctrl,
        rootScope,
        $scope,
        guitarService = {},
        $http,
        $httpBackend,
        fakeHttpPromise= {
            success: function () { }
        },
        getUrl = '/guitars';

    var guitarServiceResponse = 'response';

    beforeEach(function () {
        angular.mock.module('SearchCtrl');
        angular.mock.module('ngRoute');
        angular.mock.module('guitarService');

        inject(function ($injector, $controller) {
            guitarService = $injector.get('guitarService');
            $http = $injector.get('$http');
            $httpBackend = $injector.get('$httpBackend');
            rootScope = $injector.get('$rootScope');
            $scope = rootScope.$new();

            ctrl = $controller('SearchCtrl', {
                $scope: $scope,
                $http: $http,
                guitarService: guitarService
            });

            guitarService.getSearchResults = jasmine.createSpy('getAllSpy').and.callFake(function () {
                return {
                    then: function (callback) {
                        return callback([{ test: 'test' }]);
                    }
                };
            });
            
            spyOn(ctrl, 'getFavorites').and.callThrough();

            $httpBackend.expectGET(getUrl)
              .respond(fakeHttpPromise);

        });
    });
      
    it('should set $scope.searchText to null', function () {
        expect($scope.searchText).toBe(null);
    });

    it('should set $scope.searchError to false', function() {
        expect($scope.searchError).toBe(false);
    });

    describe('ctrl.flagFavorites()', function() {
        beforeEach(function() {
            $scope.allGuitars = [{Company: 'co1', Model: 'mo1'}, { Company: 'co2', Model: 'mo2' }, { Company: 'co3', Model: 'mo3'}];
            $scope.favoriteGuitars = [{ Company: 'co1', Model: 'mo1' }, { Company: 'co3', Model: 'mo3' }];
            ctrl.flagFavorites();
        });

        it('should only flag favorites in $scope.allGuitars', function() {
            expect($scope.allGuitars[0].isFavorite).toBe(true);
            expect($scope.allGuitars[1].isFavorite).toBe(false);
            expect($scope.allGuitars[2].isFavorite).toBe(true);
        });
    });

    describe('$scope.search()', function() {
        beforeEach(function () {
            spyOn(ctrl, 'flagFavorites').and.callThrough();
            $scope.searchText = 'txt';
            $scope.search();
        });

        it('should call ctrl.getFavorites()', function () {
            expect(ctrl.getFavorites).toHaveBeenCalled();
        });

        it('should call guitarService.getAll()', function() {
            expect(guitarService.getSearchResults).toHaveBeenCalledWith('txt');
        });

        it('should call ctrl.flagFavorites()', function () {
            expect(ctrl.flagFavorites).toHaveBeenCalled();
        });
      
    });

    describe('$scope.searchSuccess()', function () {
        it('should set $scope.allGuitars', function () {
            ctrl.searchSuccess(guitarServiceResponse);
            expect($scope.allGuitars).toBe('response');
        });
    });

    describe('ctrl.searchFailure()', function () {
        beforeEach(function () {
            $scope.allGuitars = 'notNull';
            $scope.searchError = false;
            ctrl.searchFailure();
        });

        it('should set $scope.allGuitars to null', function() {
            expect($scope.allGuitars).toBe(null);
        });

        it('should set $scope.searchError to true', function () {
            expect($scope.searchError).toBe(true);
        });
    });
});
