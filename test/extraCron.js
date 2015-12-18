var assert = require('assert');
describe('extraCron', function() {
  var Cron = require('../src/cron');
  var cron = new Cron();
  it('result of toArray should not affect object', function() {
    cron.parse('1 1 1 1 1');
    var arr = cron.toArray();
    assert.deepEqual(
        arr,
        [[1],[1],[1],[1],[1]]
    );
    arr[0] = [5];
    assert.deepEqual(
        cron.toArray(),
        [[1],[1],[1],[1],[1]]
    );
    assert.equal(
        cron.toString(),
        '1 1 1 1 1'
    );
  });
});
