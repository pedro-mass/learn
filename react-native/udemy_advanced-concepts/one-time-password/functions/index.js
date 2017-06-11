const functions = require('firebase-functions');
const createUser = require('./create_user');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// configures the admin service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-15ad1.firebaseio.com"
});


exports.createUser = functions.https.onRequest(createUser);

// twilio phone #: +15853765124
