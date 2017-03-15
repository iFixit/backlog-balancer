var assert = require('assert');
var Issue = require('../issue.js')

describe('Issue', function() {
   describe('#addLabel()', function() {
      it('should be a method', function() {
         var i = new Issue();
         i.addLabel("p1", 1);
      });
   });

   describe('#getPriority()', function() {
      function issueWithLabels() {
         var i = new Issue();
         i.addLabel('p4', 1);
         i.addLabel('p9', 3);
         i.addLabel('p2', 2);
         return i;
      }
      it('should choose the most recent label', function() {
         var i = issueWithLabels();
         assert.equal(9, i.getPriority());
      });
   });
});
