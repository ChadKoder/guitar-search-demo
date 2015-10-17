//js/services/testService.js
angular.module('testService', []).factory('testService', [function () {

    return {
        get: function () {
            return 'get';
        },

        create: function(data) {
            return 'created ' + data;
        },

        remove: function(id) {
            return 'deleted ' + id;
        }
    };
}]);