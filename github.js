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

exports.getOpenBacklogIssues = function() {
   debug("Getting all open backlog issues");
   return github.issues.getForRepo({
      owner:  config.owner,
      repo:   config.repo,
      state:  'open',
      milestone: config.backlog_milestone_id,
      per_page: 100
   }).then(getAllPages);
};

function includeDefaultParams(issue,  params) {
   return Object.assign({
      owner:  config.owner,
      repo:   config.repo,
      number: issue.getNumber()
   }, params);
}

/**
 * Traverses github's pagination to retrieve *all* the records.
 * Takes in the first page of results and returns a promise for *all* the
 * results.
 */
function getAllPages(currentPage, allResults) {
   debug("Got %s results", currentPage.length);
   return new Promise(function (resolve, reject) {
      allResults = allResults || [];
      allResults.push(currentPage);

      if (!github.hasNextPage(currentPage)) {
         debug("No more results");
         return resolve([].concat(...allResults));
      }

      resolve(github.getNextPage(currentPage).then(function (nextPage) {
         return getAllPages(nextPage, allResults);
      }));
   });
}
