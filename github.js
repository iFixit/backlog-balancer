var config = require('./config');
var debug = require('debug')('backlog:github');
var Promise = require('promise');
var github = new require('github')(),
    addIssueLabel = Promise.denodeify(github.issues.addLabels),
    removeIssueLabel = Promise.denodeify(github.issues.deleteLabel);

github.authenticate(config.github);

exports.removeLabel = function removeLabel(issue, label) {
   debug("Issue %s: removing label %s", issue.getNumber(), label);
   return removeIssueLabel({
      owner:  config.owner,
      repo:   config.repo,
      number: issue.getNumber(),
      label:  label
   });
};

exports.addLabel = function addLabel(issue, label) {
   debug("Issue %s: adding label %s", issue.getNumber(), label);
   return addIssueLabel({
      owner:  config.owner,
      repo:   config.repo,
      number: issue.getNumber(),
      labels: [label]
   });
};
