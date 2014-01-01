var scrapist = require('..');
var config = require('./configs/seligson');

describe('Config tests', function () {
  it('should convert to json based on config', function(done) {
    scrapist.parse(config, function(err, res) {
      console.log(res);
      done();
    });
  });
});