function getParam(val) {
  var p = location.search;
  var v = '(?:(?:^|.*\s*)' + val + '\s*\=\s*([^&]*).*$)|^.*$';
  return p.replace(new RegExp(v), '$1');
}