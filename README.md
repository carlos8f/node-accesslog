accesslog
---------

Simple common/combined access log middleware

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

License
=======

MIT