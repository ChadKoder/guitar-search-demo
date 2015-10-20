describe("usaJobsService", function () {
    var usaJobsService;

    beforeEach(function () {
        angular.mock.module('usaJobsService');

        inject(function (_usaJobsService_) {
            usaJobsService = _usaJobsService_;
        });

        spyOn(usaJobsService, 'getSearchResults').and.returnValue('search-results');
    });

    describe("getSearchResults", function () {
        it("should return results", function () {
            var searchResults = usaJobsService.getSearchResults();
            expect(searchResults).toBe('search-results');
        });
    });
});