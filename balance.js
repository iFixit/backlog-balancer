var db = require('./db.js');

db.getAllRelevantIssues()
.then(sortByLabelAndDate)
.then(redistributeInBuckets(require('./bucket-config.js')))

function sortByLabelAndDate(issues) {
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
         return 0
      }
   });
}
