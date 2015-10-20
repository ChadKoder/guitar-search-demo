describe("gitHub api service", function () {
    var gitHubService,
        httpBackend,
        url = 'https://jobs.github.com/positions.json?title=title&location=&page=1&callback=JSON_CALLBACK';

    beforeEach(function () {
        angular.mock.module('gitHubService');

        inject(function (_gitHubService_, $httpBackend) {
            gitHubService = _gitHubService_;
            httpBackend = $httpBackend;
           
        });
    });

    describe("getSearchResults", function () {
        it("should return results", function() {
            var returnData = { test: 'test' };
            httpBackend.expectJSONP(url)
            .respond(returnData);
            
            gitHubService.getSearchResults('title').success(function (data) {
                expect(data.test).toBe('test');
            });
            
            httpBackend.flush();
        });
    });
});