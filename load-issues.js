var Issue = require('./issue.js');
var config = require('./config.js');
var debug = require('debug')('backlog:load-issues');
var github = require('./github.js');

module.exports = function getIssues() {
   return github.getOpenBacklogIssues()
   .then(createIssuesFromGithubResponses)
}

function createIssuesFromGithubResponses(githubIssues) {
   return githubIssues.map(createIssueFromGithubResponse);
}

function createIssueFromGithubResponse(ghIssue) {
   var issue = new Issue(ghIssue.number);
   ghIssue.labels.forEach((label) => {
      issue.addLabel(label.name, 1);
   })
   return issue;
}
