var assert = require('assert');
var Issue = require('./issue.js')

describe('Issue', function() {
   describe('#addLabel()', function() {
      it('should add an entry to labels', function() {
		var i = new Issue();
         i.addLabel("a", 1);
         assert.equal(1, i.labels.length);
      });
   });

   describe('#getPriority()', function() {
      function issueWithLabels() {
         var i = new Issue();
         i.addLabel('p-4', 1);
         i.addLabel('p-2', 2);
         i.addLabel('p-9', 3);
         return i;
      }
      it('should get a priority number', function() {
         var i = issueWithLabels();
         assert.equal(2, i.getPriority());
      });
   });
});
