var db = require('./db.js');
var debug = require('debug')('backlog');

db.getIssuesAndLabelRows()
.then(db.createIssueObjects)
.then(require('./filter-issues.js'))
.then(require('./sort-issues.js'))
.then(require('./bucketize-issues.js'))
.then(require('./apply-labels.js')(require('./github.js')))
.done(function () {
   debug("Balancing complete");
});

