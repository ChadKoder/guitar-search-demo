describe("authenticService", function () {
    var service;

    beforeEach(function () {
        angular.mock.module('authenticService');

        //inject(function (authenticService, _$resource_) {
        //    test = authenticService;
        //    $resource = $_resource_;
        //});

        inject(function (authenticService) {
            service = authenticService;
        });
        //        spyOn(service, 'getSearchResults').and.returnValue($q.when(destination));
        //spyOn(ctrl, 'getFacValsSuccessHandler').and.callThrough();
        spyOn(service, 'getSearchResults').and.returnValue('search-results');
    });

    describe("getSearchResults", function() {
     it("should return results", function () {
            var searchResults = service.getSearchResults();
            expect(searchResults).toBe('search-results');
            //expect(service.getSearchResults).toHaveBeenCalled();
        });
    });
     
   

    //it("should create stuff successfully", function () {
    //    var x = test.create('7');
    //    expect(x).toEqual('created 7');
    //});

    //it("should delete stuff successfully", function () {
    //    var y = test.remove('123');
    //    expect(y).toEqual('deleted 123');
    //});
});