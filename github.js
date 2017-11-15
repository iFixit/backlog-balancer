var config = require('./config');
var debug = require('debug')('backlog:github');
var Promise = require('promise');
var github = new require('github')(),
    addIssueLabel = github.issues.addLabels,
    removeIssueLabel = github.issues.removeLabel;

github.authenticate(config.github);

exports.removeLabel = function removeLabel(issue, label) {
   if (config.dryRun) {
      debug("[dry run] Issue %s: removing label %s", issue.getNumber(), label);
      return Promise.resolve();
   }
   debug("Issue %s: removing label %s", issue.getNumber(), label);
   return removeIssueLabel(includeDefaultParams(issue, {
      name:   label
   }));
};

exports.addLabel = function addLabel(issue, label) {
   if (config.dryRun) {
      debug("[dry run] Issue %s: adding label %s", issue.getNumber(), label);
      return Promise.resolve();
   }
   debug("Issue %s: adding label %s", issue.getNumber(), label);
   return addIssueLabel(includeDefaultParams(issue, {
      labels: [label]
   }));
};

function includeDefaultParams(issue,  params) {
   return Object.assign({
      owner:  config.owner,
      repo:   config.repo,
      number: issue.getNumber()
   }, params);
}
