var mysql = require('/opt/pulldasher/lib/db.js')
var Issue = require('./issue.js')

module.exports = {
   getIssuesAndLabelRows: function() {
      return mysql.query(
         "SELECT number, title AS label, labels.date as 'applied_on'  \
         FROM issues \
         LEFT JOIN pull_labels labels USING (number) \
         WHERE milestone_title = ? \
         AND status = 'open' \
         AND labels.title LIKE 'p%'", ["Backlog"])
   },

   createIssueObjects: function(rows) {
      return rows.reduce(function(issues, row) {
         if (!issues[row.number]) {
            issues[row.number] = new Issue(row.number);
         }
         issues[row.number].addLabel(row.title, row.applied_on);
         return issues;
      }, {})
   }
}

