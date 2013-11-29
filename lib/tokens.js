var addr = require('addr')
  , dateable = require('dateable')
  , getHeader = require('./getHeader')
  , zerofill = require('./zerofill')
  ;

exports['h'] = exports['a'] = function(req) {
  return addr(req, this.options.proxies);
};

exports['l'] = function(req) {
  return null;
};

exports['u'] = function(req) {
  return null;
};

exports['t'] = function(req) {
  var d = new Date();
  var offset = d.getTimezoneOffset();
  var tz = zerofill(Math.abs(offset) / 60, 2) + zerofill(Math.abs(offset) % 60, 2);
  tz = (offset > 0 ? '-' : '+') + tz;
  return '[' + dateable.format(d, 'DD/MMM/YYYY:HH:mm:ss') + ' ' + tz + ']';
};

exports['r'] = function(req) {
  return req.method + ' ' + req.url.replace('"', '\\"') + ' HTTP/' + req.httpVersionMajor + '.' + req.httpVersionMinor;
};

exports['>s'] = exports['s'] = function(req, res) {
  return res.statusCode;
};

exports['b'] = function(req, res) {
  var length = parseInt(getHeader(res, 'Content-Length'), 10);
  return isNaN(length) ? null : length;
};

exports['{Referer}i'] = function(req) {
  return req.headers['referer'] || req.headers['referrer'];
};

exports['{User-agent}i'] = function(req) {
  return req.headers['user-agent'];
};
