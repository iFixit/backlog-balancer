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

      // Sort trending priority DESC (issues that have moved up into bucket X
      // should be below the issues that have moved down into bucket X)
      if (getTrendingPriority(a) < getTrendingPriority(b)) {
         return 1;
      } else if (getTrendingPriority(a) > getTrendingPriority(b)) {
         return -1;
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

/**
 * Get -1/0/1 representing the trend of the most recent priority change for
 * this issue.
 */
function getTrendingPriority(issue) {
   // previous < current == it's going up
   if (issue.getPreviousPriority() < issue.getPriority()) {
      return 1;
   // previous > current == it's going down
   } else if (issue.getPreviousPriority() > issue.getPriority()) {
      return -1;
   }
   // Doesn't have a previous.
   return 0;
}

