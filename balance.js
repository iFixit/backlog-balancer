var db = require('./db.js');

db.getIssuesAndLabelRows()
.then(db.createIssueObjects)
.then(require('./filter-issues.js'))
.then(require('./sort-issues.js'))
.then(require('./bucketize-issues.js'))
.then(require('./apply-labels.js'));

