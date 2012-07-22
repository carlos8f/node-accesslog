var accesslog = require('../')()
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