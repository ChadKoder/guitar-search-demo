//js/services/searchService.js
angular.module('searchService', []).factory('searchService', ['$http', '$resource', function ($http, $resource) {
    //API KEY: 94b7acb384894b18cdca339bab11b574
    //http://www.authenticjobs.com/api/?api_key=94b7acb384894b18cdca339bab11b574&method=aj.jobs.search&keywords=php,mysql&perpage=1

    var apiKey = '94b7acb384894b18cdca339bab11b574';
    var baseUrl = 'http://www.authenticjobs.com/api/?' + apiKey;
    var searchMethod = '&method=aj.jobs.search';
    
    return {
        get: function (searchCriteria) {
            //var tempUrl = 'http://www.authenticjobs.com/api/?api_key=94b7acb384894b18cdca339bab11b574&method=aj.jobs.search&format=json&keywords=php,mysql&perpage=1';
            $http.defaults.useXDomain = true;
            //var defaultParams = {
            //    pageNr: 1,
            //    pageSize: 5,
            //    enqueteId: "foo",
            //    sortColumn: "undefined",
            //    sortDirection: "undefined"
            //};

            //var temp =  $http({
            //    method: "JSONP",
            //    //params: params,
            //    url: tempUrl,
            //    headers: {
            //        'Accept': 'application/json, text/javascript',
            //        'Content-Type': 'application/json; charset=utf-8'
            //    },
            //    callback: 'JSON_CALLBACK',
            //    isArray: false
            //});

          //  return temp.data[0];
            var testResponse = { "listings": { "listing": [{ "id": "25963", "title": "Front-End Designer\/Developer", "description": "<p>Northeastern University<br \/><br \/>Front-End Designer\/Developer<br \/><br \/>Requisition Number: STFR002574<br \/><br \/>Division\/College: Marketing and Communications<br \/><br \/>Location: Boston Main Campus<br \/><br \/>Full-time\/Part-time: Full Time<br \/><br \/>Responsibilities:<br \/><br \/>The Front-End Designer\/Developer is a super-skilled HTML \/ CSS designer and developer who plays a critical role in creating exciting digital experiences for our audiences. He\/she knows what great digital storytelling is and understands how front-end design can support it. He\/she is well-versed in JavaScript, JQuery and is experienced in using parallax effects, scrolling animation and various interactive elements. He\/she is also experienced in applying UI and UX best practices to create engaging digital experiences for users. He\/she is experienced in creating responsive designs for all devices, user interfaces, landing pages, emails, etc.<br \/><br \/>He\/she has excellent taste and standards, as well as a creative mind that never stops coming up with new ideas&mdash;and never runs out of energy to execute them. He\/she can find inspiration anywhere and isn't afraid to experiment. He\/she is particularly knowledgeable about the latest trends and follows those who do it best.<br \/><br \/>The Front-end Designer\/Developer can develop and test across multiple browsers, platforms, and devices and able to maintain consistency in all visual elements. He\/she understands when mobile web apps are appropriate as opposed to native applications. He\/she is super-comfortable in Photoshop, Sketch, Illustrator, Fireworks and InVision, and is experienced with Style Guides and Typography.<br \/><br \/>He\/she is skilled at applying visual elements, including photography and video to create engaging environments and interactive functionality.<br \/><br \/>He\/she loves designing and creating amazing digital experiences and never gets tired of trying new ideas. He\/she thrives on working in a fast-paced environment with multiple projects going on at any given time. He\/she is constantly looking for inspirations, bouncing ideas around, collaborating with colleagues and creating beautiful\/smart\/engaging experiences from scratch.<br \/><br \/>The Front-End Designer\/Developer reports to the Assistant Vice President of Communications.<br \/><br \/>Qualifications:<br \/><br \/>Must have:<br \/><br \/>Bachelor&rsquo;s degree<br \/>3-5 years of experience in front end design\/development<br \/>Strong background in interactive web design<br \/>Strong background in Adobe Creative Suite<br \/>Skilled in parallax and other interactive effects<br \/>Skilled in HTML5, CSS , JavaScript, JQuery, PHP<br \/>Experienced in content management systems, including WordPress and Drupal<br \/>Familiar with UI \/ UX best practices<br \/>Curiosity<br \/>Love designing beautiful things and making them come alive<br \/>Great taste; adventurous spirit; innovative mind; tireless work ethic; consistently proactive\/positive attitude<br \/>Ability to multitask<br \/>Enjoy collaborating with others<br \/><br \/>Plus:<br \/><br \/>Wireframing and schematics, prototyping where useful and necessary<br \/>Experience with using Balsamiq<br \/>Ability to write well, tell stories well<br \/>Great sense of humor<br \/><br \/>Additional Information:<br \/><br \/>To be considered for this position please visit our web site and apply on line at the following link: http:\/\/apptrkr.com\/690479<br \/><br \/>Northeastern University is an Equal Opportunity, Affirmative Action Educational Institution and Employer, Title IX University. Northeastern University particularly welcomes applications from minorities, women and persons with disabilities. Northeastern University is an E-Verify Employer.<br \/><br \/>Copyright &copy;2015 Jobelephant.com Inc. All rights reserved.<br \/><br \/>http:\/\/www.jobelephant.com\/<br \/><br \/>jeid-42bdc33cc916b849b0295cee1c6d2559<\/p>", "perks": null, "howto_apply": "", "post_date": "2015-10-16 15:08:18", "relocation_assistance": 0, "telecommuting": 0, "category": { "id": "4", "name": "Front-end Development" }, "type": { "id": "1", "name": "Full-time" }, "company": { "id": "northeasternuniversity", "name": "Northeastern University", "url": "http:\/\/www.neu.edu", "type": "6", "location": { "id": "bostonmamaus", "name": "Boston, MA, MA, US", "city": "Boston, MA", "country": "US", "lat": "42.3587", "lng": "-71.0567", "state": "MA" }, "tagline": "Front-End Designer\/Developer at Northeastern University" }, "keywords": "heshe,frontend,university,interactive,experiences,experienced,designerdeveloper,creating,digital,never,elements,northeastern,ux,best,jquery,using,applying,create,parallax,ui,creative,from,applications,including,collaborating,ideas,designing,background,vis", "apply_url": "http:\/\/apptrkr.com\/690479", "url": "http:\/\/www.authenticjobs.com\/jobs\/25963\/front-end-designer-developer" }], "total": 101, "perpage": "1", "page": 1, "pages": 101, "last_update": "2015-10-16T17:57:01-05:00" }, "stat": "ok" };
            return testResponse;
            //return JSON.stringify('<div>' + JSON.stringify(temp.data) + '</div>');


//     $http.jsonp(tempUrl + "?callback=JSON_CALLBACK")
            //.success(function (data) {
            //    //$scope.realTimeData = data;
            //    console.log($scope.realTimeData);
            //    return data;
            //});


//return $http.jsonp(tempUrl).then(function (json) {
            //    alert('test!!! data ==> ' + JSON.Stringify(json.data.data));


            //    //return json.data.data;
            //});
            //return $http.jsonp(tempUrl + '?callback=JSON_CALLBACK').then(function (json) {
            //    alert('test!!! data ==> ' + json.data.data);
            //    //return json.data.data;
            //});

            //var authenticJobsAPI = $resource(tempUrl,
            //    { callback: "JSON_CALLBACK" },
            //    { get: { method: "JSONP" } });

            //return authenticJobsAPI.get();


//var tempUrl = 'http://www.authenticjobs.com/api/?api_key=94b7acb384894b18cdca339bab11b574&method=aj.jobs.search&keywords=php,mysql&perpage=1';
            //return $http.get(tempUrl)
            ////return $http.get(baseUrl + searchMethod + '&keywords=' + searchCriteria + '&perpage=5')
            //    .then(function (result) {
            //    alert('found some results!');
            //    return result.data.count;
            //});
            // return searchCriteria;
        },

        create: function (data) {
            return 'created ' + data;
        },

        remove: function (id) {
            return 'deleted ' + id;
        }
    };
}]);
