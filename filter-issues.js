var debug = require('debug')('backlog:filter');

module.exports = function removeIssuesWithoutPriority(issues) {
   debug("Filtering %s issues; removing those without priority", issues.length);
   var output = issues.filter(function(issue) {
      return issue.hasPriority();
   });
   debug("Removed %s issues without priorities", issues.length - output.length);
   return output;
};

