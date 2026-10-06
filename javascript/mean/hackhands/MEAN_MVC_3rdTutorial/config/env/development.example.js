// Copy to development.local.js (gitignored) or set env vars before running.
// See ../../../../../docs/security-exposed-credentials.md

var port = process.env.PORT || 1337;

module.exports = {
	port: port,
	db: process.env.MONGODB_URI || 'mongodb://localhost/todos',
	facebook: {
		clientID: process.env.FACEBOOK_CLIENT_ID || 'YOUR_FACEBOOK_APP_ID',
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'YOUR_FACEBOOK_APP_SECRET',
		callbackURL: 'http://localhost:' + port + '/oauth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_CLIENT_ID || 'YOUR_TWITTER_CONSUMER_KEY',
		clientSecret: process.env.TWITTER_CLIENT_SECRET || 'YOUR_TWITTER_CONSUMER_SECRET',
		callbackURL: 'http://localhost:' + port + '/oauth/twitter/callback'
	}
};
