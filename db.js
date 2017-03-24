var mysql = require('/opt/pulldasher/lib/db.js');
var Issue = require('./issue.js');
var config = require('./config.js');
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
         AND labels.title LIKE 'p%'", [config.backlog_milestone]
      ).then(function(rows) {
         debug("Selected %s issue + label rows", rows.length);
         mysql.end();
         return rows;
      });
   },

   createIssueObjects: function(rows) {
      var issueMap = {};
      var issues = [];
      debug("Instantiating issue objects from %s rows", rows.length);
      rows.forEach(function(row) {
         if (!issueMap[row.number]) {
            var issue = new Issue(row.number);
            issues.push(issue);
            issueMap[row.number] = issue;
         }
         issueMap[row.number].addLabel(row.label, row.applied_on);
      });
      debug("Instantiated %s issue objects", issues.length);
      return issues;
   }
}

