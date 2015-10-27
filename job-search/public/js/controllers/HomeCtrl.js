//js/controllers/HomeCtrl.js
  
angular.module('HomeCtrl', []).controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    var ctrl = this;

    $http.get('/jobs').success(function (jobs) {

        //var xmlDesc = ctrl.parseXml(results[i].description);
        //if (xmlDesc) {
        //    description = xmlDesc;
        //} else {
        //    description = results[i].description;
        //}
        //var cleanJobs = jobs;

        //for (var i = 0; i < cleanJobs.length; i++) {
        //    var xmlDesc = ctrl.parseXml(cleanJobs[i].description);
        //    if (xmlDesc) {
        //        cleanJobs[i].description = xmlDesc;
        //        //alert(xmlDesc);
        //    }

        //}

        $scope.jobs = jobs;
    });

    //ctrl.parseXml = function (xmlStr) {
    //    var xmlDoc = new window.DOMParser().parseFromString(xmlStr, 'text/xml');
    //    return xmlDoc;

      

    //};


    //function AccordionDemoCtrl($scope) {
        //$scope.animals = {
        //    vertibrates:
        //{
        //    mammals: ['lion', 'dog'],
        //    birds: ['hawk', 'sparrow']
        //},
        //    invertibrates: { 'insects': ['bee', 'ant'] }
        //};
  //  }
    //$scope.oneAtATime = true;

    //$scope.groups = [
    //  {
    //      title: 'Dynamic Group Header - 1',
    //      content: 'Dynamic Group Body - 1'
    //  },
    //  {
    //      title: 'Dynamic Group Header - 2',
    //      content: 'Dynamic Group Body - 2'
    //  }
    //];

    //$scope.items = ['Item 1', 'Item 2', 'Item 3'];

    //$scope.addItem = function () {
    //    var newItemNo = $scope.items.length + 1;
    //    $scope.items.push('Item ' + newItemNo);
    //};

    //$scope.status = {
    //    isFirstOpen: true,
    //    isFirstDisabled: false
    //};
}]);