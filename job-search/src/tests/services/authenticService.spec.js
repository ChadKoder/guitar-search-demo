﻿describe("authenticService", function() {
    var authenticService,
        httpBackend,
        url = 'http://www.authenticjobs.com/api/?api_key=94b7acb384894b18cdca339bab11b574&method=aj.jobs.search&telecommuting=1&format=json&keywords=title&perpage=5&callback=JSON_CALLBACK';
    //http://www.authenticjobs.com/api/?api_key=94b7acb384894b18cdca339bab11b574&method=aj.jobs.search&telecommuting=1&format=json&keywords=title&perpage=5&callback=JSON_CALLBACK
    beforeEach(function() {
        angular.mock.module('authenticService');

        inject(function(_authenticService_, $httpBackend) {
            authenticService = _authenticService_;
            httpBackend = $httpBackend;
        });
    });

    describe("getSearchResults", function() {
        it("should return results", function() {
            var returnData = { test: 'test' };
            httpBackend.expectJSONP(url)
                .respond(returnData);

            authenticService.getSearchResults('title').success(function(data) {
                expect(data.test).toBe('test');
            });

            httpBackend.flush();
        });
    });
});