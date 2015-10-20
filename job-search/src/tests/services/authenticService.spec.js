describe("authenticService", function () {
    var authenticService;

    beforeEach(function () {
        angular.mock.module('authenticService');
        
        inject(function (_authenticService_) {
            authenticService = _authenticService_;
        });
        
        spyOn(authenticService, 'getSearchResults').and.returnValue('search-results');
    });

    describe("getSearchResults", function() {
     it("should return results", function () {
         var searchResults = authenticService.getSearchResults();
            expect(searchResults).toBe('search-results');
        });
    });
});