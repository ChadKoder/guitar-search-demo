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
            
            spyOn(ctrl, 'getFavorites').and.callThrough();
            spyOn(ctrl, 'init');

            $httpBackend.expectGET(getUrl)
              .respond(fakeHttpPromise);
            
        });
    });
    
    /*TODO: Fix this test for ctrl.init being called on load of the SearchCtrl*/
    //it('should call ctrl.init()', function () {
    //    expect(ctrl.init).toHaveBeenCalled();
    //});
    

    describe('ctrl.init()', function () {
        beforeEach(function () {
            ctrl.init();
        });

        it('should set $scope.allGuitars to null', function () {
            expect($scope.allGuitars).toBe(null);
        });

        it('should set $scope.selectedGuitarIndex to undefined', function () {
            expect($scope.selectedGuitarIndex).toBe(undefined);
        });

        it('should set $scope.favoriteGuitars to empty', function () {
            expect($scope.favoriteGuitars).toEqual({});
        });

        it('should set $scope.searching to false', function () {
            expect($scope.searching).toBeFalsy();
        });

        it('should set $scope.searchText to null', function () {
            expect($scope.searchText).toBe(null);
        });

        it('should set $scope.searchError to false', function () {
            expect($scope.searchError).toBe(false);
        });
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
            $scope.searchText = 'txt';
            $scope.allGuitars = 'notEmpty';
            $scope.searching = false;
            $scope.searchError = true;
            spyOn(guitarService, 'getSearchResults').and.callThrough();
            
            $scope.search();
        });

        it('should call ctrl.getFavorites()', function () {
            expect(ctrl.getFavorites).toHaveBeenCalled();
        });

        it('should call guitarService.getAll()', function() {
            expect(guitarService.getSearchResults).toHaveBeenCalledWith('txt');
        });      

        it('should set $scope.allGuitars to null to clear results', function () {
            expect($scope.allGuitars).toBe(null);
        });

        it('should set $scope.searching to true', function () {
            expect($scope.searching).toBeTruthy();
        });

        it('should set $scope.searchError to false', function () {
            expect($scope.searchError).toBeFalsy();
        });      
    });

    describe('ctrl.searchSuccess()', function () {
        beforeEach(function () {
            spyOn(ctrl, 'flagFavorites');
            ctrl.searchSuccess('result');
        });

        it('should set $scope.allGuitars', function () {
            expect($scope.allGuitars).toBe('result');
        });

        it('should set $scope.searching to false', function () {
            expect($scope.searching).toBeFalsy();
        });

        it('should call ctrl.flagFavorites()', function () {
            expect(ctrl.flagFavorites).toHaveBeenCalled();
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

        it('should set $scope.searching to null', function () {
            expect($scope.searching).toBeFalsy();
        });
    });
});
