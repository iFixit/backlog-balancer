var assert = require('assert');
var bucketize = require('../bucketize-issues.js');
var Issue = require('../issue.js');

describe('bucketize-isues', function() {
   it('should bucketize an array', function() {
      var input = [1,2,3,4,5,6];
      // Even split
      var output = bucketize(input, evenBuckets(2));
      assert.deepEqual(output, [[1,2,3],[4,5,6]]);

      // Uneven split
      input = [1,2,3];
      output = bucketize(input, evenBuckets(2));
      assert.deepEqual(output, [[1,2],[3]]);

      // Uneven split
      input = [1,2,3,4];
      output = bucketize(input, evenBuckets(3));
      assert.deepEqual(output, [[1,2],[3],[4]]);

      // Uneven split #2
      // We want bucketize([1,2,3,4,5,6], 4) to give buckets like [[1,2],
      // [3,4], [5], [6]] and not [1,2], [3,4], [5,6], []]
      input = [1,2,3,4,5,6];
      output = bucketize(input, evenBuckets(4));
      assert.deepEqual(output, [[1,2],[3,4],[5],[6]]);

      // Not enough
      input = [1,2];
      output = bucketize(input, evenBuckets(3));
      assert.deepEqual(output, [[1],[2],[]]);
   });

   it('should bucketize an array with non-uniform buckets', function() {
      var input = [1,2,3,4,5,6];
      // Even split
      var output = bucketize(input, [1,5]);
      assert.deepEqual(output, [[1],[2,3,4,5,6]]);

      output = bucketize(input, [1,3]);
      assert.deepEqual(output, [[1,2],[3,4,5,6]]);

      output = bucketize([1,2,3,4,5], [1,2,3]);
      assert.deepEqual(output, [[1],[2,3],[4,5]]);

      output = bucketize([1,2,3,4,5,6,7,8,9], [1,2,3]);
      assert.deepEqual(output, [[1,2],[3,4,5],[6,7,8,9]]);

      output = bucketize([1,2,3,4], [1,100]);
      assert.deepEqual(output, [[1],[2,3,4]]);

      output = bucketize([1,2,3], [1,2]);
      assert.deepEqual(output, [[1],[2,3]]);

      // Really, the only unexpected case, and not that big of a deal.
      output = bucketize([1,2,3], [2,3]);
      assert.deepEqual(output, [[1,2],[3]]);

      output = bucketize([1,2,3,4,5,6], [2,3]);
      assert.deepEqual(output, [[1,2,3],[4,5,6]]);

      output = bucketize([1,2,3,4], [1,3,2]);
      assert.deepEqual(output, [[1],[2,3],[4]]);

      // Not enough
      input = [1,2];
      output = bucketize(input, [1,2,3]);
      assert.deepEqual(output, [[1],[2],[]]);
   });

   function evenBuckets(num) {
      return Array(num).fill(1);
   }
});
