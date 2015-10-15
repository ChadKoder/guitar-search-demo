describe("testService", function() {
    var test;

    beforeEach(function() {
        module('testService');
       
        inject(function(testService) {
            test = testService;
        });
    });

    it("should get stuff successfully", function() {
        expect(test.get()).toEqual('get');
    });
    
    it("should create stuff successfully", function () {
        var x = test.create('7');
        expect(x).toEqual('created 7');
    });

    it("should delete stuff successfully", function () {
        var y = test.remove('123');
        expect(y).toEqual('deleted 123');
    });
});