module.exports = accesslog;

function accesslog(req, res, format, func) {
  format = format || ':method :statusCode :url (:timems)';
  func = func || console.log;

  req._received_date = new Date();

  // override res.end to capture all responses
  var res_end = res.end;
  res.end = function() {
    // call the original
    res_end.apply(res, arguments);

    var s = format
      .replace(':method', req.method)
      .replace(':statusCode', res.statusCode)
      .replace(':url', req.url)
      .replace(':time', new Date() - req._received_date);

    // log it
    func(s);
  };
}
