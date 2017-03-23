var assert = require('assert');
var LabelApplier = require('../apply-labels.js');
var Issue = require('../issue.js');
var Promise = require('promise');

describe('apply-labels', function() {
   it('should not change labels when the existing labels are correct', function() {
      var i = new Issue(1);
      i.addLabel('p1');
      return assertLabelsAreChanged([[i]], [], []);
   });

   it('should call addLabel appropriately', function() {
      var i = new Issue(1);
      return assertLabelsAreChanged([[i]], ["1:p1"], []);
   });

   it('should call addLabel appropriately for several issues', function() {
      var i1 = new Issue(1), i2 = new Issue(2);
      return assertLabelsAreChanged([[i1],[i2]], ["1:p1", "2:p2"], []);
   });

   it('should call removeLabel appropriately', function() {
      var i = new Issue(1);
      i.addLabel('p2', 1);
      return assertLabelsAreChanged([[i]], ["1:p1"], ["1:p2"]);
   });

   it('should call removeLabel appropriately', function() {
      var i1 = new Issue(1), i2 = new Issue(2);
      i1.addLabel('p2', 1);
      i2.addLabel('p1', 1);
      return assertLabelsAreChanged(
         [[i1],[i2]],
         ["1:p1", "2:p2"],
         ["1:p2", "2:p1"]);
   });

   it('should call removeLabel appropriately for multiple labels', function() {
      var i = new Issue(1);
      i.addLabel('p3', 1);
      i.addLabel('p2', 1);
      return assertLabelsAreChanged(
         [[i]],
         ["1:p1"],
         ["1:p2", "1:p3"]);
   });
});

function MockGithub() {
   var addLabelCalls    = this._addLabelCalls    = [];
   var removeLabelCalls = this._removeLabelCalls = [];
   var resolvers        = this._resolvers        = [];

   this.addLabel = function(issue, label) {
      addLabelCalls.push(issue.getNumber() + ":" + label);
      return new Promise(function(resolve) {
         resolvers.push(resolve);
      });
   };

   this.removeLabel = function(issue, label) {
      removeLabelCalls.push(issue.getNumber() + ":" + label);
      return new Promise(function(resolve) {
         resolvers.push(resolve);
      });
   };
}

function assertSameValues(ar1, ar2) {
   assert.deepEqual(ar1.sort(), ar2.sort());
}

function assertLabelsAreChanged(bucketedIssues, expectedAddCalls, expectedRemoveCalls) {
   var mockGh = new MockGithub();
   var labeler = LabelApplier(mockGh);

   return new Promise(function(done) {
      var completed = false;
      labeler(bucketedIssues).done(function () {
         completed = true;
         assertSameValues(mockGh._addLabelCalls,    expectedAddCalls);
         assertSameValues(mockGh._removeLabelCalls, expectedRemoveCalls);
         done();
      });

      function resolveNext() {
         process.nextTick(function() {
            var resolve = mockGh._resolvers.pop();
            if (resolve) {
               resolve();
               resolveNext();
            } else {
               assert(completed);
            }
         });
      }

      resolveNext();
   });
}
