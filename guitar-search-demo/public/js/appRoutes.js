//js/appRoutes.js
var module = angular.module('appRoutes', []).config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
              .when('/', {
                  templateUrl: 'views/home.html',
                  controller: 'HomeCtrl'
              })
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchCtrl'
            })
            .when('/toast-template', {
                templateUrl: 'views/toast-template.html',
                controller: 'ToastCtrl'
            })
            .when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl'
            })
            .otherwise({
                redirectTo: 'index.html'
        });
        
        $locationProvider.html5Mode(true);

    }
]);