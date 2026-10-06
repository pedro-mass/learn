var port = process.env.PORT || 1337;

module.exports = {
	port: port,
	db: process.env.MONGODB_URI || 'mongodb://localhost/todos',
	facebook: {
		clientID: process.env.FACEBOOK_CLIENT_ID || '',
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
		callbackURL: 'http://localhost:' + port + '/oauth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_CLIENT_ID || '',
		clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
		callbackURL: 'http://localhost:' + port + '/oauth/twitter/callback'
	}
};
