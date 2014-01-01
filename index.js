var _request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');

exports.parse = function(config, callback) {
  var values = [];
  var selectors = config.values.selectors;
  request(config.url, function(error, response, body) {
    var $ = cheerio.load(body);
    var rowSelector = selectors.main + ' ' + selectors.rows;
    var rows = $(rowSelector);
    rows.each(function(i, elem) {
      var row = {};
      var includeRow = config.values.rows.indexOf(i) > -1;
      if(includeRow) {
        var cols = $(this).children(selectors.cols);
        cols.each(function(colIdx) {
          var columnConfig = _.find(config.values.cols, {index: colIdx});
          if(columnConfig) {
            row[columnConfig.label] = $(this).text();
          }
        });
        values.push(row);
      }
    });
    callback(null, values);
  });
}

var request = exports.request = function(url, callback) {
  _request(url, callback)
}