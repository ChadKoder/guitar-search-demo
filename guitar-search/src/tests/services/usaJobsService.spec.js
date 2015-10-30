describe("usaJobsService", function () {
    var usaJobsService,
        httpBackend,
        url = 'https://data.usaguitars.gov/api/guitars?title=title&callback=JSON_CALLBACK';

    beforeEach(function () {
        angular.mock.module('usaJobsService');

        inject(function (_usaJobsService_, $httpBackend) {
            usaJobsService = _usaJobsService_;
            httpBackend = $httpBackend;
        });
    });

    describe("getSearchResults", function () {
        it("should return results", function () {
            var returnData = { test: 'test' };
            httpBackend.expectJSONP(url)
                .respond(returnData);

            usaJobsService.getSearchResults('title').success(function (data) {
                expect(data.test).toBe('test');
            });

            httpBackend.flush();
        });
    });
});