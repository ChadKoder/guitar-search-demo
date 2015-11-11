//js/app.js
var app = angular.module('guitarSearchApp', ['ngRoute', 'appRoutes', 'ngResource', 'ngMaterial', 'ngAnimate', 'ngAria',
    'ToastCtrl', 'HomeCtrl', 'SearchCtrl', 'AdminCtrl', 'onLastRepeat', 'guitarService', 'ToastCtrl', 'ngMdIcons', 'ui.bootstrap']);


// Configure Angular Materials Theme
app.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('blue')
       .primaryPalette('green', {
           'default': '900', // by default use shade 900 from the grey palette for primary intentions
       })
        .accentPalette('indigo')
        .warnPalette('red')
        .backgroundPalette('blue-grey');

    //$mdThemingProvider.setDefaultTheme('');


    //$mdThemingProvider
    //.theme('default')
    //.primaryPalette('indigo')
    //.accentPalette('pink')
    //.warnPalette('red')
    //.backgroundPalette('blue-grey')
    //$mdThemingProvider.theme('default')
    //   .primaryPalette('indigo')
    //   .accentPalette('grey')
    //   .warnPalette('red');

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