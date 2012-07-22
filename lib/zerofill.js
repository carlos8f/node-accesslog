module.exports = function zerofill(num, length) {
  num += '';
  while (num.length < length) {
    num = '0' + num;
  }
  return num;
};