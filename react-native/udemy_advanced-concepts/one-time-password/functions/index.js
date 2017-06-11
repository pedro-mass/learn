const functions = require('firebase-functions');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const createUser = require('./create_user');
const requestOneTimePassword = require('./request_one_time_password');

// configures the admin service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-15ad1.firebaseio.com"
});


exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);

// twilio phone #: +15853765124
