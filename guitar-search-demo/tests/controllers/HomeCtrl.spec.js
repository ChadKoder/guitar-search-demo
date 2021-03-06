﻿describe('HomeCtrl', function() {
    var ctrl,
        rootScope,
        $scope,
        $route,
        $http,
        $mdToast,
        $httpBackend,
        response = 'response',
        getUrl = '/guitars',
        putUrl = '/update';

    beforeEach(function() {
        angular.mock.module('HomeCtrl');
        angular.mock.module('ngRoute');
        
        inject(function($injector, $controller) {
            $http = $injector.get('$http');
            $httpBackend = $injector.get('$httpBackend');
            rootScope = $injector.get('$rootScope');
            $scope = rootScope.$new();
            $route = $injector.get('$route');

            ctrl = $controller('HomeCtrl', {
                $scope: $scope,
                $http: $http,
                $route: $route
            });
        });
        
        $httpBackend.expectGET(getUrl)
            .respond(response);
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should set $scope.guitars to null', function() {
        expect($scope.guitars).toBe(null);
        $httpBackend.flush();
    });
    describe('$scope.removeFavorite', function() {
        beforeEach(function () {
            
            $httpBackend.expectPUT(putUrl)
            .respond(response);
            
            spyOn(ctrl, 'delete').and.callThrough();
            //spyOn($route, 'reload');
            var deleteMe = {};
            $scope.removeFavorite(deleteMe);
        });

        it('should call ctrl.delete', function () {
            expect(ctrl.delete).toHaveBeenCalled();
            $httpBackend.flush();
        });

        //it('should call $route.reload()', function () {
        //    expect($route.reload).toHaveBeenCalled();
        //    $httpBackend.flush();
        //});
    });

    describe('ctrl.delete ', function() {
        beforeEach(function () {
            spyOn($route, 'reload');
            $httpBackend.expectPUT(putUrl)
                .respond(response);
            var removeMe = {};
            ctrl.delete(removeMe);
        });

        //it('should call $route.reload()', function () {
        //    expect($route.reload).toHaveBeenCalled();
        //    $httpBackend.flush();
        //});
    });
    //describe('ctrl.removeFavorite', function () {
    //    beforeEach(function() {
    //        $httpBackend.expectPUT(putUrl)
    //        .respond(response);
    //        var removeMe = {};
    //        ctrl.removeFavorite(removeMe);
    //    });

    //    it('should call put', function () {
    //        $httpBackend.flush();
    //    });
    //});

    describe('ctrl.getFavorites', function () {
        it('should set $scope.guitars', function () {
            $httpBackend.expectGET(getUrl).respond(response);
            ctrl.getFavorites();
            $httpBackend.flush();
            expect($scope.guitars).toBe(response);
        });
    });

});