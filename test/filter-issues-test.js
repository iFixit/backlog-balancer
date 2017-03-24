var assert = require('assert');
var filter = require('../filter-issues.js');
var Issue = require('../issue.js');

describe('filter-issues', function() {
   it('should filter out issues with no priority', function() {
      var noPriority = new Issue(), hasPriority = new Issue();
      hasPriority.addLabel("p1", 1);
      var filtered = filter([noPriority, hasPriority]);
      assert.deepEqual(filtered, [hasPriority]);
   });
});
