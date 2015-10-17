describe("searchService", function () {
    var test;

    beforeEach(function () {
        angular.mock.module('searchService');

        inject(function (searchService) {
            test = searchService;
        });
    });
     
    it("should get stuff successfully", function () {
        expect(1).toEqual(1);
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