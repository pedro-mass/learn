// expose our config directly to our application using module.exports
module.exports = {
  'facebookAuth': {
    'clientID'      : '468474709987736',
    'clientSecret'  : '0fb1720272710596a4696a572a742653',
    'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
  },

  'twitterAuth': {
    'consumerKey'       : 'your-consumer-key-here',
    'consumerSecret'    : 'your-client-secret-here',
    'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
  },

  'googleAuth': {
    'clientID'      : 'your-secret-clientID-here',
    'clientSecret'  : 'your-client-secret-here',
    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  }
};
