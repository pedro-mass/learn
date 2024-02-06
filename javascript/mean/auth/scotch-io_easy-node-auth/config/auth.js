// expose our config directly to our application using module.exports
module.exports = {
  'facebookAuth': {
    'clientID'      : '468474709987736',
    'clientSecret'  : '0fb1720272710596a4696a572a742653',
    'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
  },

  'twitterAuth': {
    'consumerKey'       : '07ju7qENiXfdHTpjDcTa6g',
    'consumerSecret'    : 'TjiqvGakew1wTutMjqGUJI4091Vhe6x1SzRTNm4G0',
    'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
  },

  'googleAuth': {
    'clientID'     : '861535298665-2j08jhoin302iv5fhsd72mvn7013qofk.apps.googleusercontent.com',
    'clientSecret'  : 'qZo0NeDLLt3dduxz_51mCp3U',
    'callbackURL'       : 'http://localhost:3000/auth/google/callback'
  }
};
