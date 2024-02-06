const twilio = require('twilio');
const config = require('./config');

const accountSID = config.twilio.accountSID;
const authToken = config.twilio.authToken;

module.exports = new twilio(accountSID, authToken);
