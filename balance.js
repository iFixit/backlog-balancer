var loadIssues = require('./load-issues.js');
var debug = require('debug')('backlog:app');
var config = require('./config.js');
var github = require('./github.js');

loadIssues()
.then(require('./filter-issues.js'))
.then(require('./sort-issues.js'))
.then(function(issues) {
   return require('./bucketize-issues.js')(issues, config.buckets);
})
.then(require('./apply-labels.js')(github))
.then(function () {
   debug("Balancing complete");
}).catch(function(err) {
   process.nextTick(() => {throw err});
});

