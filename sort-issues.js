var debug = require('debug')('backlog:sort');

module.exports = function sortByLabelAndDate(issues) {
   debug("Sorting %s issues by priority, then label applied date", issues.length);
   return issues.sort(function(a, b) {
      // Sort priority ASC
      if (a.getPriority() < b.getPriority()) {
         return -1;
      } else if (a.getPriority() > b.getPriority()) {
         return 1;
      }

      // Sort applied_on DESC so more recent times come first
      if (a.getAppliedOn() < b.getAppliedOn()) {
         return 1;
      } else if (a.getAppliedOn() > b.getAppliedOn()) {
         return -1;
      } else {
         return 0;
      }
   });
};

