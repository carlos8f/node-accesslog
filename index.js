var addr = require('addr')
  , dateable = require('dateable')
  ;

exports = module.exports = function accesslog(options) {
  options || (options = {});

  var stream;
  if (options.path) {
    stream = require('fs').createWriteStream(options.path);
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

function compile(format, context) {
  format = format.replace(/"/g, '\\"');
  var js = '  return "' + format.replace(/%(>?\w|{[\w-]+}i)/g, function(_, name) {
    return '"\n    + (tokens["' + name + '"].call(this, req, res) || "-") + "';
  }) + '";';
  return new Function('tokens, req, res', js).bind(context);
};

exports.tokens = {};

exports.tokens['h'] = exports.tokens['a'] = function(req) {
  return addr(req, this.options.proxies);
};

exports.tokens['l'] = function(req) {
  return null;
};

exports.tokens['u'] = function(req) {
  return null;
};

exports.tokens['t'] = function(req) {
  var d = new Date();
  var offset = d.getTimezoneOffset();
  var tz = zerofill(Math.abs(offset) / 60, 2) + zerofill(Math.abs(offset) % 60, 2);
  tz = (offset > 0 ? '-' : '+') + tz;
  return '[' + dateable.format(d, 'DD/MMM/YYYY:HH:MM:ss') + ' ' + tz + ']';
};

exports.tokens['r'] = function(req) {
  return req.method + ' ' + req.url.replace('"', '\\"') + ' HTTP/' + req.httpVersionMajor + '.' + req.httpVersionMinor;
};

exports.tokens['>s'] = exports.tokens['s'] = function(req, res) {
  return res.statusCode;
};

exports.tokens['b'] = function(req, res) {
  var length = parseInt(getHeader(res, 'Content-Length'), 10);
  return isNaN(length) ? null : length;
};

exports.tokens['{Referer}i'] = function(req) {
  return req.headers['referer'] || req.headers['referrer'];
};

exports.tokens['{User-agent}i'] = function(req) {
  return req.headers['user-agent'];
};

function zerofill(num, length) {
  num += '';
  while (num.length < length) {
    num = '0' + num;
  }
  return num;
}

function getHeader(res, name) {
  if (res._header && res._headerSent && !res._sentHeaders) {
    res._sentHeaders = {};
    res._header.split('\r\n').forEach(function(line) {
      var header = line.split(': ');
      if (header.length > 1) {
        res._sentHeaders[header[0]] = header[1];
      }
    });
  }
  return (res._sentHeaders && res._sentHeaders[name]) || null;
}
