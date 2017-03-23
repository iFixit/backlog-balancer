var debug = require('debug')('backlog:apply-labels');
var Promise = require('promise');

module.exports = function(github) {
   return function(buckets) {
      var tasks = [];
      buckets.forEach(function(bucket, index) {
         bucket.forEach(function(issue) {
            tasks.push(function() {
               return assignPriority(issue, index);
            });
         });
      });

      function next() {
         var task = tasks.pop();
         return task ? task().then(next) : Promise.resolve();
      }

      return next();
   };

   function assignPriority(issue, priority) {
      var newPriorityLabel = makeLabel(priority);
      var labels = issue.getPriorityLabels();

      var found = false;
      var promises = [];
      labels.forEach(function(label) {
         if (label == newPriorityLabel) {
            found = true;
         } else {
            promises.push(github.removeLabel(issue, label));
         }
      });
      if (!found) {
         promises.push(github.addLabel(issue, newPriorityLabel));
      }

      return Promise.all(promises);
   }
};

function makeLabel(priority) {
   // + 1 so that 0-indexed buckets (from bucketize) become 1-indexed priority
   // labels.
   return "p" + (priority + 1);
}

