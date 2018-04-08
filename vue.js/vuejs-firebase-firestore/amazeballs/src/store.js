import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase, copy this from the cloud console
// Or use mine :)
var config = {
  apiKey: "AIzaSyDaYUV0wvYFHqaQu9mARCbARQoDns6Hw8k",
  authDomain: "amazeballs-619a2.firebaseapp.com",
  databaseURL: "https://amazeballs-619a2.firebaseio.com",
  projectId: "amazeballs-619a2",
  storageBucket: "amazeballs-619a2.appspot.com",
  messagingSenderId: "804636226549"
};
firebase.initializeApp(config);

// The shared state object that any vue component can get access to.
// Has some placeholders that we’ll use further on!
export const store = {
  ballsInFeed: null,
  currentUser: null,
  writeBall: message =>
    ballsCollection.add({
      createdOn: new Date(),
      author: store.currentUser,
      message
    })
};

// a reference to the Balls collection
const ballsCollection = firebase.firestore().collection("balls");

// onSnapshot is executed every time the data
// in the underlying firestore collection changes
// It will get passed an array of references to
// the documents that match your query
ballsCollection.onSnapshot(ballsRef => {
  const balls = [];
  ballsRef.forEach(doc => {
    const ball = doc.data();
    ball.id = doc.id;
    balls.push(ball);
  });
  store.ballsInFeed = balls;
});

// When a user logs in or out, save that in the store
firebase.auth().onAuthStateChanged(user => {
  store.currentUser = user;
});
