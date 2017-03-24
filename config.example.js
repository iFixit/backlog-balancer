module.exports = {
   owner: 'github-repo-owner-name',
   repo: 'github-repo-name',
   // Name of the milestone that defines which issues are to be sorted/balanced
   backlog_milestone: 'Backlog',
   github: { // This is passed straight to github.authenticate()
      type:  'token', // or 'oauth'
      token: 'github user token'
   },
   numBuckets: 9
};
