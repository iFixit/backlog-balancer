var assert = require('assert');
var bucketize = require('../bucketize-issues.js');
var Issue = require('../issue.js');

describe('bucketize-isues', function() {
   it('should bucketize an array', function() {
      var input = [1,2,3,4,5,6];
      // Even split
      var output = bucketize(input, 2);
      assert.deepEqual(output, [[1,2,3],[4,5,6]]);

      // Uneven split
      // We want bucketize([1,2,3,4,5,6], 4) to give buckets like [[1,2],
      // [3,4], [5], [6]] and not [1,2], [3,4], [5,6], []]
      output = bucketize(input, 4);
      assert.deepEqual(output, [[1,2],[3,4],[5],[6]]);

      // Uneven split #2
      input = [1,2,3,4];
      output = bucketize(input, 3);
      assert.deepEqual(output, [[1,2],[3],[4]]);

      // Not enough
      input = [1,2];
      output = bucketize(input, 3);
      assert.deepEqual(output, [[1],[2],[]]);
   });
});
