//js/app.js
var app = angular.module('guitarSearchApp', ['ngRoute', 'appRoutes', 'ngResource', 'ngMaterial', 'ngAnimate', 'ToastCtrl','HomeCtrl', 'SearchCtrl',
    'guitarService', 'startFrom', 'mdTable', 'mdColresize', 'ui.bootstrap']);


// Configure Angular Materials Theme
app.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
       .primaryPalette('indigo')
       .accentPalette('grey')
       .warnPalette('red');

    //$mdThemingProvider.theme('default').primaryPalette('indigo');


    //var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    //    'contrastDefaultColor': 'light',
    //    'contrastDarkColors': ['50'],
    //    '50': 'ffffff'
    //});
    //$mdThemingProvider.definePalette('customBlue', customBlueMap);
    //$mdThemingProvider.theme('default')
    //  .primaryPalette('customBlue', {
    //      'default': '500',
    //      'hue-1': '50'
    //  })
    //  .accentPalette('pink');
    //$mdThemingProvider.theme('input', 'default')
    //    .primaryPalette('grey');



   
});