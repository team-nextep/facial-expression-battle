function getParam(val) {
  var p = location.search;
  var v = '(?:(?:^|.*\s*)' + val + '\s*\=\s*([^&]*).*$)|^.*$';
  var param = p.replace(new RegExp(v), '$1');
  return param;
}