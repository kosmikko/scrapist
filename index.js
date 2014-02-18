var _request = require('request');
var cheerio = require('whacko');
var async = require('async');
var _ = require('lodash');
var json2csv = require('json2csv');

exports.process = function(config, options, callback) {
  function convertResults(results) {
    options.labels = _.keys(results[0]);
    convert(results, options, callback);
  }

  if(_.isArray(config)) {
    var fns = _.map(config, function(item) {
      return function(cb) {
        //console.log('parsing', item.url);
        exports.parse(item, cb);
      };
    });
    async.parallel(fns, function(err, results) {
      // join results
      results = _.flatten(results);
      convertResults(results);
    });
  } else {
    exports.parse(config, function(err, results) {
      convertResults(results);
    });
  }
};

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
        var staticCols = config.staticCols;
        staticCols && staticCols.forEach(function(col) {
          row[col.label] = col.value;
        });
        values.push(row);
      }
    });
    callback(null, values);
  });
};

exports.request = function(url, callback) {
  _request(url, callback);
};

var convert = exports.convert = function(obj, options, callback) {
  if(options.format === 'csv') {
    json2csv({data: obj, fields: options.labels}, callback);
  }
  else {
    callback(null, obj);
  }
};