var assert = require('assert');
var Issue = require('../issue.js');

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
      it('should return null if there is no label', function() {
         var i = new Issue(1);
         assert.equal(null, i.getPriority());
      });
   });

   describe('#getAppliedOn()', function() {
      function issueWithLabels() {
         var i = new Issue();
         i.addLabel('p1', 1);
         i.addLabel('p1', 3);
         i.addLabel('p1', 2);
         return i;
      }
      it('should choose the date from the most recent label', function() {
         var i = issueWithLabels();
         assert.equal(3, i.getAppliedOn());
      });
      it('should return null if there is no label', function() {
         var i = new Issue(1);
         assert.equal(null, i.getAppliedOn());
      });
   });

   describe('#hasPriority()', function() {
      it('should return false if there are no priority labels', function() {
         var i = new Issue()
         assert.equal(false, i.hasPriority());
         i.addLabel('blah', 1);
         assert.equal(false, i.hasPriority());
         i.addLabel('p', 1);
         assert.equal(false, i.hasPriority());
         i.addLabel('p1', 1);
         assert.equal(true, i.hasPriority());
      });
   });
});
