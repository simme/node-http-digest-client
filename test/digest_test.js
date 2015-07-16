'use strict';
var DigestClient = require('../lib/http-digest-client.js');
/*
 * ======== A Handy Little Nodeunit Reference ========
 * https://github.com/caolan/nodeunit
 * 
 * Test methods: test.expect(numAssertions)
 *  test.done() 
 * Test assertions:
 *  test.ok(value, [message])
 *  test.equal(actual, expected, [message])
 *  test.notEqual(actual, expected, [message])
 *  test.deepEqual(actual, expected, [message]) 
 *  test.notDeepEqual(actual, expected, [message])
 *  test.strictEqual(actual, expected, [message])
 *  test.notStrictEqual(actual, expected, [message])
 *  test.throws(block, [error], [message])
 *  test.doesNotThrow(block, [error], [message]) 
 *  test.ifError(value)
 */


exports.DigestTest = {
   setUp : function(done) {
      // setup here
      done();
   },
   'doing a digest auth works' : function(test) {
      test.expect(1);
      // tests here
      var auth = {
         user : 'yyyy',
         pass : 'xxxx'
      }, digest = DigestClient(auth.user, auth.pass, false), options = {
         url : 'http://xxxx/rest/workspaces',
         method : 'post',
         auth : auth,
         json : true,
         body : {
            workspace : {
               name : 'DeleteMe' + (new Date()).getTime()
            }
         },
         headers : {
            "Accept" : "application/json"
         }
      };
      digest.request(options, function(err, res, body) {
		 if (err !== null)
            console.log("Can't access " + res.req.url + ": " + err);
         if (res.statusCode >= 400)
            console.log("(" + res.statusCode + ") Can't open " + res.req.url  + "\r\n" + body);
         test.ok(res.statusCode < 400, "HTTP Error Code Received: " + res.statusCode);
         test.done();
      });   
   },
   'doing an invalid digest auth fails' : function(test) {
      test.expect(1);
      // tests here
      var auth = {
         user : 'aaaa',
         pass : 'xxxx'
      }, digest = DigestClient(auth.user, auth.pass, false), options = {
         url : 'http://xxxxx/rest/workspaces',
         method : 'post',
         auth : auth,
         json : true,
         body : {
            workspace : {
               name : 'DeleteMe' + (new Date()).getTime()
            }
         },
         headers : {
            "Accept" : "application/json"
         }
      };
      digest.request(options, function(err, res, body) {
         if (err !== null)
            console.log("Can't access " + res.req.url + ": " + err);
         if (res.statusCode > 401)
            console.log("(" + res.statusCode + ") Can't open " + res.req.url  + "\r\n" + body);
         test.equals(res.statusCode, 401, "HTTP Error Code Received: " + res.statusCode);
         
         test.done();
      });   
   },
   'error 404 fails gracefully' : function(test) {
      test.expect(2);
      // tests here
      var testUrl = 'http://xxxx/rest/workspaces/' + (new Date()).getTime(),
         auth = {
            user : 'aaaa',
            pass : 'xxxx'
         }, digest = DigestClient(auth.user, auth.pass, false), options = {
            url : testUrl,
            method : 'get',
            auth : auth,
            json : true,
            body : {
               workspace : {
                  name : 'DeleteMe' + (new Date()).getTime()
               }
            },
            headers : {
               "Accept" : "application/json"
            }
         };
      digest.request(options, function(err, res, body) {
         test.equal(err, null, "Error is not null");
/*         if (err !== null)
            console.log("Can't access location: " + err);
         if (res.statusCode >= 400)
            console.log("(" + res.statusCode + ") Can't open " + testUrl  + "\r\n" + body);*/
         test.equals(res.statusCode, 404, "HTTP Error Code Received: " + res.statusCode);
         test.done();
      });   
   }

};
