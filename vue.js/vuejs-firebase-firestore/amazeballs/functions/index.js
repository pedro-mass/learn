const functions = require("firebase-functions");
// import functions from "firebase-functions";

exports.createBall = functions.firestore
  .document("balls/{ballId}")
  .onCreate(event => {
    var createdMessage = event.data.get("message");
    return event.data.ref.set(
      {
        message: createdMessage + ", yo!"
      },
      { merge: true }
    );
  });
