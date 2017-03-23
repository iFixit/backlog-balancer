var mysql = require('/opt/pulldasher/lib/db.js');
var Issue = require('./issue.js');
var debug = require('debug')('backlog:db');

module.exports = {
   getIssuesAndLabelRows: function() {
      debug("Selecting issue rows from the database");
      return mysql.query(
         "SELECT number, labels.title AS label, labels.date as 'applied_on' \
         FROM issues \
         LEFT JOIN pull_labels labels USING (number) \
         WHERE milestone_title = ? \
         AND status = 'open' \
         AND labels.title LIKE 'p%'", ["Backlog"]
      ).then(function(rows) {
         mysql.end();
         return rows;
      });
   },

   createIssueObjects: function(rows) {
      debug("Instantiating %s issue objects and labels", rows.length);
      var issueMap = {};
      var issues = [];
      rows.forEach(function(row) {
         if (!issueMap[row.number]) {
            var issue = new Issue(row.number);
            issues.push(issue);
            issueMap[row.number] = issue;
         }
         issueMap[row.number].addLabel(row.label, row.applied_on);
      });
      return issues;
   }
}

