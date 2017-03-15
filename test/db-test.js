var assert = require('assert');
var db     = require('../db.js');
var Issue  = require('../issue.js')

describe('DB', function() {
   describe('#createIssueObjects()', function() {
      it('should create an object from a row', function() {
         var issues = db.createIssueObjects([row(1,'p2',3), row(4,'p5',6)]);
         var i = issues[1];
         assert.equal(i.getNumber(), 1);
         assert.equal(i.getPriority(), 2);
         assert.equal(i.getAppliedOn(), 3);
         i = issues[4];
         assert.equal(i.getNumber(), 4);
         assert.equal(i.getPriority(), 5);
         assert.equal(i.getAppliedOn(), 6);
      });
   });
});

function row(num, label, appliedOn) {
   return {
      number: num,
      label: label,
      applied_on: appliedOn
   }
}
