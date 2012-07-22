module.exports = function getHeader(res, name) {
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
};