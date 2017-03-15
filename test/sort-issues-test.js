var assert = require('assert');
var sort = require('../sort-issues.js');
var Issue = require('../issue.js');

describe('sort-issues', function() {

   it('should sort issues according to priority ASC', function() {
      var i1 = issue('p2');
      var i2 = issue('p5');
      var i3 = issue('p10');
      var sorted = sort([i3,i1,i2]);
      assert.deepEqual(sorted, [i1,i2,i3]);
   });

   it('should sort issues according to ASC priority, then appliedOn DESC', function() {
      var i1 = issue('p1', 3);
      var i2 = issue('p1', 2);
      var i3 = issue('p1', 1);
      var sorted = sort([i3,i1,i2]);
      assert.deepEqual(sorted, [i1,i2,i3]);
   });

   function issue(priorityLabel, appliedOn) {
      var i = new Issue();
      i.addLabel(priorityLabel, appliedOn || 1);
      return i;
   }
});
