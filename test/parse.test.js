var sinon = require('sinon');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var scrapist = require('..');
var config = require('./configs/seligson');
var fixturePath = path.join(__dirname + '/fixtures/seligson.html');
var fixture = fs.readFileSync(fixturePath, 'utf8');

describe('Parsing tests', function () {
  var sandbox;

  before(function(done) {
    sandbox = sinon.sandbox.create();
    sandbox.stub(scrapist, 'request', function(url, callback) {
      callback(null, {}, fixture);
    })
    done();
  });

  it('should convert to json based on config', function(done) {
    scrapist.parse(config, function(err, res) {
      assert.equal(res.length, 15);
      assert.equal(res[0].arvo, '2,2258');
      done();
    });
  });
});