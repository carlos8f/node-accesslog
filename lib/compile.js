module.exports = function compile(format, context) {
  format = format.replace(/"/g, '\\"');
  var js = '  return "' + format.replace(/%(>?\w|{[\w-]+}i)/g, function(_, name) {
    return '"\n    + (tokens["' + name + '"].call(this, req, res) || "-") + "';
  }) + '";';
  return new Function('tokens, req, res', js).bind(context);
};