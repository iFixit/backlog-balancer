var Issue = require('./issue.js');
var config = require('./config.js');
var debug = require('debug')('backlog:load-issues');
var github = require('./github.js');
var paraflow = require('paraflow');

// Max number of github requests in parallel
const PARALLEL_LIMIT = 5;

module.exports = () => {
   return github.getOpenBacklogIssues()
   .then(createIssuesFromGithubResponses)
   .then(getPreviousLabelsForIssues)
}

function createIssuesFromGithubResponses(githubIssues) {
   return githubIssues.map(createIssueFromGithubResponse)
}

function createIssueFromGithubResponse(ghIssue) {
   var issue = new Issue(ghIssue.number)
   // Note: this is a date/time string, but because it's an ISO 8601 date
   // format, the values can be comapred lexigraphically without conversion
   issue.setCreatedOn(issue.created_at);
   ghIssue.labels.forEach((label) => {
      // Since we're grabbing the current state of the labels,
      // we don't know when they were added. To keep them equivalent, let's
      // just give all them an "applied_on" date of 1.
      // We may use the label events to retrieve the applied on date in the
      // future, but for now, this is easier.
      issue.addLabel(label.name, 1)
   })
   return issue
}

function getPreviousLabelsForIssues(issues) {
   debug("Retrieving label events for %s issues", issues.length);
   return new Promise((resolve, reject) => {
      function getPreviousLabelsForIssue(issue, done) {
         github.getIssueEvents(issue)
         .then(addPreviousLabelsToIssue(issue))
         .then(done, reject)
      }
      paraflow(PARALLEL_LIMIT,
               issues,
               getPreviousLabelsForIssue,
            () => {
               debug("Done processing label events for %s issues", issues.length);
               resolve(issues)
            })
   })
}

function addPreviousLabelsToIssue(issue) {
   return (issueEvents) => {
      issueEvents.forEach((event) => {
         // Every "unlabeled" event is a label that's no longer on the issue
         // and thus can safely be called a 'previous' label
         // Note: we exempt the current label in case the current label was
         // removed and re-added.
         if (event.event === 'unlabeled' &&
             event.label.name !== issue.getPriorityLabel()) {
            issue.addPreviousLabel(event.label.name, event.created_at)
         }
      })
   }
}
