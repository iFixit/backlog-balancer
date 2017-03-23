module.exports = {
   owner: 'github-repo-owner-name',
   repo: 'github-repo-name',
   github: { // This is passed straight to github.authenticate()
      type:  'token', // or 'oauth'
      token: 'github user token'
   },
   numBuckets: 9
};
