var accesslog = require('../')
  , http = require('http')
  , assert = require('assert')
  , request = require('request')
  , port = 55222
  , baseUrl = 'http://localhost:' + port
  , tmpLog = '/tmp/' + require('idgen')() + '.log'
  , exec = require('child_process').exec
  , fs = require('fs')
  ;

describe('basic test', function() {
  before(function(done) {
    var logger = accesslog({path: tmpLog});
    http.createServer(function(req, res) {
      logger(req, res, function() {
        var content = JSON.stringify({'hello': 'world'});
        res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': content.length});
        res.write(content);
        res.end();
      });
    }).listen(port, done);
  });
  after(fs.unlink.bind(null, tmpLog));
  
  it('performs a request', function(done) {
    request({url: baseUrl + '/test/url', json: true}, function(err, res, data) {
      assert.equal(res.statusCode, 200);
      assert.strictEqual(data.hello, 'world');
      done();
    });
  });
  it('can tail the log', function(done) {
    exec('tail ' + tmpLog, function(err, stdout, stderr) {
      assert(/^127\.0\.0\.1 \- \- \[[0-9]{2}\/\w{3}\/[0-9]{4}:[0-9]{2}:[0-9]{2}:[0-9]{2} (\+|\-)[0-9]{4}\] "GET \/test\/url HTTP\/1\.1" 200 17 "\-" "\-"\n$/.exec(stdout));
      done();
    });
  });
});
