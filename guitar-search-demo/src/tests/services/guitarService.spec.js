describe("guitarService", function () {
    var guitarService,
        $httpBackend,
        url = 'http://localhost:8103/api/guitar?callback=JSON_CALLBACK';
      
    var fakeHttpPromise;
    beforeEach(function () {
        angular.mock.module('guitarService');
                    
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            guitarService = $injector.get('guitarService');
        });
    });
   
    describe("getSearchResults", function () {
        it("should return results", function () {
            
            fakeHttpPromise = {
                success: function() { }};
            
            $httpBackend.expectJSONP(url)
                .respond(fakeHttpPromise);
           
            guitarService.getAll().then(function () {
            });
            

            $httpBackend.flush();
        });
    });
});