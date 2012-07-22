var compile = require('./lib/compile');

exports = module.exports = function accesslog(options) {
  options || (options = {});

  var stream;
  if (options.path) {
    stream = require('fs').createWriteStream(options.path, {flags: 'a+'});
  }
  else if (options.stream) {
    stream = options.stream;
  }
  else {
    stream = process.stdout;
  }
  options.format || (options.format = "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\"");
  var render = compile(options.format, {options: options});

  return function accessLogger(req, res, next) {
    var end = res.end;
    res.end = function(chunk, encoding) {
      res.end = end;
      res.end(chunk, encoding);
      stream.write(render(exports.tokens, req, res) + '\n', 'ascii');
    };

    next && next();
  };
};

exports.tokens = require('./lib/tokens');