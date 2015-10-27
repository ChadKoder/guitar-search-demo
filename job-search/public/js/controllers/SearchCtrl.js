//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', '$http', '$q', 'authenticService', 'gitHubService',
    'usaJobsService', 'glassDoorJobsService', function ($scope, $http, $q, authenticService, gitHubService, usaJobsService, glassDoorJobsService) {
    var ctrl = this;
    $scope.searchText = null;
    $scope.searchError = false;

    $scope.search = function () {
        $q.all([authenticService.getSearchResults($scope.searchText),
                gitHubService.getSearchResults($scope.searchText),
                usaJobsService.getSearchResults($scope.searchText),
                glassDoorJobsService.getSearchResults($scope.searchText)])
            .then(ctrl.loadSuccess, ctrl.loadFailure);
    };

    ctrl.combineResults = function (data) {
        var authenticData = data[0].data.listings.listing;
        var gitHubData = data[1].data;
        var usaJobsData = data[2].data.JobData;
        var glassDoorJobsData = data[3].data.response.results;
     
        var authenticResults = ctrl.buildAuthenticResults(authenticData);
        var gitHubResults = ctrl.buildGitHubResults(gitHubData);
        var usaJobsResults = ctrl.buildUsaJobsResults(usaJobsData);
        var glassDoorResults = ctrl.buildGlassDoorResults(glassDoorJobsData);

        var results = [];
        results.push.apply(results, authenticResults);
        results.push.apply(results, gitHubResults);
        results.push.apply(results, usaJobsResults);
        results.push.apply(results, glassDoorResults);
        
        return results;
    };
   
    ctrl.buildGitHubResults = function (results) {
        var gitHubResults = [];

        if (_.isEmpty(results)) {
            console.log('no search results found from git hub');
            gitHubResults.length = 0;
            return gitHubResults;
        }

        for (var j = 0; j < results.length; j++) {
            //TODO: make listing text a directive
            gitHubResults.push({
                title: results[j].title + ' (GitHub Listing)',
                description: results[j].description,
                url: 'GitHub URL',
                companyName: 'GitHub Company Name'
            });
        }
        
        return gitHubResults;
    };

    ctrl.buildGlassDoorResults = function(results) {
        var glassDoorResults = [];
        if (_.isEmpty(results)) {
            console.log('no search results found from glass door jobs');
            glassDoorResults.length = 0;
            return glassDoorResults;
        }

        for (var i = 0; i < results.length; i++) {
            glassDoorResults.push({
                title: results[i].nextJobTitle + ' (GlassDoor Listing)',
                description: '',
                url: 'glassdoor URL',
                companyName: 'glassdoor Company Name'
            });
        }

        return glassDoorResults;
    };

    ctrl.buildUsaJobsResults = function (results) {
        var usaJobsResults = [];
        if (_.isEmpty(results)) {
            console.log('no search results found from usa jobs');
            usaJobsResults.length = 0;
            return usaJobsResults;
        }

        for (var i = 0; i < results.length; i++) {
            usaJobsResults.push({
                title: results[i].JobTitle + ' (USAJobs Listing)',
                description: results[i].JobSummary,
                url: 'usaJbos URL',
                companyName: 'usaJobs Company Name'
            });
        }

        return usaJobsResults;
    };
    
    ctrl.buildAuthenticResults = function (results) {
        var authResults = [];
        if (_.isEmpty(results)) {
            console.log('no search results found from authentic jobs');
            authResults.length = 0;
            return authResults;
        }
        
        for (var i = 0; i < results.length; i++) {


            authResults.push({
                title: results[i].title + ' (AuthenticJobs Listing)',
                description: results[i].description,
                url: results[i].apply_url,
                companyName: results[i].company.name//results[i].url
            });
        }

        return authResults;
    };
    
    ctrl.loadSuccess = function (results) {
        var allResults = ctrl.combineResults(results);
        $scope.allListings = allResults;
    };

    ctrl.loadFailure = function () {
        $scope.allListings = null;
        $scope.searchError = true;
    };
   
    $scope.toggleFavorite = function (index, job) {

        $http.post('/add', { title: job.title, description: job.description, url: job.url, companyName: job.companyName }).success(function() {
            
        });
    };
}]);
