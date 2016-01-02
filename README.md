# HTTP Digest Client

Hacked together snippet for talking to HTTP servers that employ digest
authentication.

## Disclaimer

Only tested against one server and spec is not followed fully. It works for me
and for what I am doing.

## Usage
````javascript
var digest = require('http-digest-client')('username', 'password');
var postData = {message: 'Hello'};
var req = digest.request({
    host: 'hostname.com',
    path: '/path.json',
    port: 80,
    method: 'POST',
    headers: {
       "User-Agent": "Simon Ljungberg",
       "Content-Type": "application/json"
     } // Set any headers you want
  }, function responseCallback(res) {
    res.on('data', function (data) {
      console.log(data.toString());
    });
    res.on('error', function (err) {
      console.log('oh noes');
    });
  }, function requestCallback(req) {
      req.write(postData);
      req.end();
   });
// Uncomment the line below, in case the end point demands that the post should be include in the first request.
// req.write(postData)
req.end();
```

The digest client will make one reques to the server, authentication response
is calculated and then the request is made again. Hopefully you will then
be authorized.

## Writing to `req`

I haven't yet figured out a way to write data to the final `req` object.
Mainly because I haven't really needed it. Feel free to suggest solutions! :)

# License

See LICENSE.

