var db = require('./db.js');

db.getAllRelevantIssues()
.then(sortByLabelAndDate)
.then(redistributeInBuckets(require('./bucket-config.js')
