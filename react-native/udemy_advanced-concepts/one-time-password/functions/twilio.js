const twilio = require('twilio');
const config = require('./config');

const accountSID = config.accountSID;
const authToken = config.authToken;

module.exports = new twilio(accountSID, authToken);
