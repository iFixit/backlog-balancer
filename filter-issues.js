module.exports = function removeIssuesWitoutPriority(issues) {
   return issues.filter(function(issue) {
      return issue.hasPriority();
   });
}

