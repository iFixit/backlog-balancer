module.exports = {
   owner: 'github-repo-owner-name',
   repo: 'github-repo-name',

   // Name of the milestone that defines which issues are to be sorted/balanced
   backlog_milestone: 'Backlog',

   github: { // This is passed straight to github.authenticate()
      type:  'token', // or 'oauth'
      token: 'github user token'
   },

   // Array of buckets, each entry represents the desired relative size of the
   // bucket (in proportion to the others). Note: sizes will be normalized
   // such that 1,1,1 is equivalent to 20,20,20
   buckets: [1,4,10,10]
};
