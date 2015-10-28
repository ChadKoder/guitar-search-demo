//public/js/controllers/SearchCtrl
angular.module('SearchCtrl', []).controller('SearchCtrl', ['$scope', '$http', '$q', 'authenticService', 'gitHubService',
    'usaJobsService', 'glassDoorJobsService', '$sce', function ($scope, $http, $q, authenticService, gitHubService, usaJobsService, glassDoorJobsService, $sce) {
    var ctrl = this;
    $scope.searchText = null;
    $scope.searchError = false;
    $scope.savedJobs = {};
    
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
                title: results[j].title,
                description: results[j].description,
                url: 'GitHub URL',
                companyName: 'GitHub Company Name',
                siteListing: '(GitHub Listing)',
                isFavorite: false
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
                title: results[i].nextJobTitle,
                description: '',
                url: 'glassdoor URL',
                companyName: 'glassdoor Company Name',
                siteListing: '(GlassDoor Listing)',
                isFavorite: false
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
                title: results[i].JobTitle,
                description: results[i].JobSummary,
                url: 'usaJbos URL',
                companyName: 'usaJobs Company Name',
                siteListing: '(USAJobs Listing)',
                isFavorite: false
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
            var isFavorite = ctrl.getFavoriteFlag(results[i]);
            authResults.push({
                title: results[i].title,
                description: results[i].description,
                url: results[i].apply_url,
                companyName: results[i].company.name,//results[i].url,
                siteListing: '(AuthenticJobs Listing)',
                isFavorite: isFavorite
            });
        }

        return authResults;
    };

    ctrl.getFavoriteFlag = function(job) {
        var isFavorite = false;
        var currentListing = _.find($scope.savedJobs, function (favJob) {
            return favJob.title == job.title;
        });

        if (currentListing) {
            isFavorite = true;
        }

        return isFavorite;
    };

    ctrl.loadSuccess = function (results) {
        var allResults = ctrl.combineResults(results);
        $scope.allListings = allResults;
    };

    ctrl.loadFailure = function () {
        $scope.allListings = null;
        $scope.searchError = true;
    };
        
    ctrl.retrieveSavedJobs = function () {
        $http.get('/jobs').success(function (jobs) {
            $scope.savedJobs = jobs;
        });
    };

    ctrl.removeFavoriteJob = function (job) {
        $http.put('/update', { title:job.title }).success(function () {
            console.log('job successfully removed');
        });
    };

    ctrl.addFavoriteJob = function(job) {
        $http.post('/add', { title: job.title, description: job.description, url: job.url, companyName: job.companyName }).success(function () {
            
        });
    };

    $scope.toggleFavorite = function (index, job) {
        if (job.isFavorite) {
            ctrl.removeFavoriteJob(job);
            job.isFavorite = false;
        } else {
            ctrl.addFavoriteJob(job);
            job.isFavorite = true;
        }
    };

    ctrl.retrieveSavedJobs();

}]);
