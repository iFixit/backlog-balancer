var db = require('./db.js');
var debug = require('debug')('backlog:app');
var config = require('./config.js');
var github = require('./github.js');

db.getIssuesAndLabelRows()
.then(db.createIssueObjects)
.then(require('./filter-issues.js'))
.then(require('./sort-issues.js'))
.then(function(issues) {
   return require('./bucketize-issues.js')(issues, config.numBuckets);
})
.then(require('./apply-labels.js')(github))
.done(function () {
   debug("Balancing complete");
});

