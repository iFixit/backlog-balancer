var db = require('./db.js');
var debug = require('debug')('backlog');
var config = require('./config.js');

db.getIssuesAndLabelRows()
.then(db.createIssueObjects)
.then(require('./filter-issues.js'))
.then(require('./sort-issues.js'))
.then(function(issues) {
   return require('./bucketize-issues.js')(issues, config.numBuckets);
})
.then(require('./apply-labels.js')(require('./github.js')))
.done(function () {
   debug("Balancing complete");
});

