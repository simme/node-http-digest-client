'use strict';
var DigestClient = require('../lib/http-digest-client.js');
/*
 * ======== A Handy Little Nodeunit Reference ========
 * https://github.com/caolan/nodeunit
 * 
 * Test methods: 
 * test.expect(numAssertions) 
 * test.done() 
 * Test assertions:
 * test.ok(value, [message]) 
 * test.equal(actual, expected, [message])
 * test.notEqual(actual, expected, [message]) 
 * test.deepEqual(actual, expected, [message]) 
 * test.notDeepEqual(actual, expected, [message])
 * test.strictEqual(actual, expected, [message])
 * test.notStrictEqual(actual, expected, [message]) 
 * test.throws(block, [error], [message])
 * test.doesNotThrow(block, [error], [message]) 
 * test.ifError(value)
 */

exports.DigestTest = {
	setUp : function(done) {
		// setup here
		done();
	},
	'constructs' : function(test) {
		test.expect(1);
		test.done();
	},
	'doing a digest auth works' : function(test) {
		test.expect(1);
		// tests here
		var auth = {
				user: 'admin',
				pass: '******'
			}, 
			digest = DigestClient(auth.user, auth.pass, false), options = {
				url : 'http://*****/rest/workspaces/CreateMe',
				method: 'post',
				auth: auth,
				json:true,
				headers: {
					"Accept" : "application/json"
				}
			};
		digest.request(options, function(err, res, body) {
			
			console.log(res.message.headers);
			if (err !== null)
				endError("Can't access " + url + ": " + err);
			if (res.statusCode >= 400)
				endError("(" + res.statusCode + ") Can't open " + url + "\r\n"
						+ body);
			callback(body);
		});

	}
};
