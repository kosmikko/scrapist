var _request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');
var json2csv = require('json2csv');

exports.parse = function(config, callback) {
  var values = [];
  var selectors = config.values.selectors;
  exports.request(config.url, function(error, response, body) {
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
    convert(values, config, callback);
  });
}

exports.request = function(url, callback) {
  _request(url, callback)
}

var convert = exports.convert = function(obj, config, callback) {
  var labels = _.pluck(config.values.cols, 'label');
  if(config.format === 'csv') {
    json2csv({data: obj, fields: labels}, callback);
  }
  else {
    callback(null, obj);
  }
}