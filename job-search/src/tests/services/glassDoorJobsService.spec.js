describe("glassDoorJobsService", function () {
    var glassDoorJobsService,
        httpBackend,
        url = 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=id&t.k=key&action=jobs-prog&jobTitle=title&userip=1.2.3.4&usergent=chrome&callback=JSON_CALLBACK';
    
    var fakeHttpPromise = {
        success: function () { }
    };

    beforeEach(function () {
        angular.mock.module('glassDoorJobsService');
       
        inject(function (_glassDoorJobsService_, $httpBackend) {
            glassDoorJobsService = _glassDoorJobsService_;
            httpBackend = $httpBackend;

            glassDoorJobsService.getUserIp = jasmine.createSpy().and.callFake(function () {
                glassDoorJobsService.ip = '1.2.3.4';
            });
            glassDoorJobsService.setApiKey = jasmine.createSpy();
            glassDoorJobsService.reader.send = jasmine.createSpy();

            glassDoorJobsService.reader.onreadystatechange = jasmine.createSpy().and.callFake(function() {
                glassDoorJobsService.partnerId = 'id';
                glassDoorJobsService.partnerKey = 'key';
            });
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.resetExpectations();
    });

    it('should set self.partnerId to null', function () {
        expect(glassDoorJobsService.partnerId).toBe(null);
    });

    it('should set self.partnerKey to null', function () {
        expect(glassDoorJobsService.partnerKey).toBe(null);
    });

    describe("getSearchResults", function () {
        it("should return results", function () {
            
            httpBackend.expectJSONP(url)
                .respond(fakeHttpPromise);
            
            spyOn(glassDoorJobsService, 'retrieveApiIdAndKey').and.callThrough();
            spyOn(glassDoorJobsService, 'buildglassDoorJobsUrl').and.callThrough();
            spyOn(glassDoorJobsService, 'buildSearchParameter').and.callThrough();
            glassDoorJobsService.partnerKey = null;
            glassDoorJobsService.partnerId = null;
            glassDoorJobsService.getSearchResults('title').success(function () {
                expect(glassDoorJobsService.partnerKey).toBe('key');
                expect(glassDoorJobsService.partnerId).toBe('id');
                expect(glassDoorJobsService.retrieveApiIdAndKey).toHaveBeenCalled();
                expect(glassDoorJobsService.buildglassDoorJobsUrl).toHaveBeenCalled();
                expect(glassDoorJobsService.buildSearchParameter).toHaveBeenCalled();
            });
            httpBackend.flush();
        });
    });
});