var sinon = require('sinon');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var scrapist = require('..');
var fixturePath = path.join(__dirname + '/fixtures/seligson.html');
var fixture = fs.readFileSync(fixturePath, 'utf8');

describe('Parsing tests', function () {
  var config = require('./configs/seligson');
  var sandbox;

  before(function(done) {
    sandbox = sinon.sandbox.create();
    sandbox.stub(scrapist, 'request', function(url, callback) {
      callback(null, {}, fixture);
    })
    done();
  });

  it('should parse to json based on config', function(done) {
    scrapist.process(config, {}, function(err, res) {
      assert.equal(res.length, 15);
      assert.equal(res[0].arvo, '2,2258');
      done();
    });
  });

  it('should convert data to csv', function(done) {
    scrapist.process(config, {format: 'csv'}, function(err, res) {
      assert(res);
      done();
    });
  });


});