var db = require('./db.js');

db.getIssuesAndLabelRows()
.then(db.createIssueObjects)
.then(require('./sort-issues.js'))
.then(require('./bucketize.js'))
.then(require('./apply-labels.js'))

