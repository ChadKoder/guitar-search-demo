//js/appRoutes.js

angular.module('appRoutes', []).config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainCtrl'
            })
            .when('/nerds', {
                templateUrl: 'views/nerd.html',
                controller: 'NerdCtrl'
            }).
            otherwise({
            redirectTo: 'views/index.html'
        });

        $locationProvider.html5Mode(true);

    }
]);