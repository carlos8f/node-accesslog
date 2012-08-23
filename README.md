accesslog
---------

Simple common/combined access log middleware

[![build status](https://secure.travis-ci.org/carlos8f/node-accesslog.png)](http://travis-ci.org/carlos8f/node-accesslog)

Usage
=====

```bash
$ npm install accesslog
```

`accesslog([options])`

Creates a middleware request handler which logs requests to a file or stream in
[common log format](http://en.wikipedia.org/wiki/Common_Log_Format).

- `options`

    - `stream`: Stream to log to. Defaults to `process.stdout`.
    - `path`: Write log to a file at this path.
    - `format`: Format of log, in
      [Apache](http://httpd.apache.org/docs/1.3/logs.html#combined) style. Defaults
      to "combined" format.

Example
=======

```javascript
var accesslog = require('accesslog')()
  , http = require('http')
  , port = 3000
  ;

http.createServer(function(req, res) {
  accesslog(req, res, function() {
    var content = JSON.stringify({'hello': 'world'});
    res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': content.length});
    res.write(content);
    res.end();
  });
}).listen(port, function() {
  console.log('test server listening on port ' + port);
});
```

Developed by [Terra Eclipse](http://www.terraeclipse.com)
---------------------------------------------------------

Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

[http://www.terraeclipse.com](http://www.terraeclipse.com)

License: MIT
------------

Copyright (C) 2012 Carlos Rodriguez

Copyright (C) 2012 Terra Eclipse, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

