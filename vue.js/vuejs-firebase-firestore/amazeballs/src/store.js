import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

// a reference to the Balls collection
const ballsCollection = firebase.firestore().collection("balls");

// the shared state object that any vue component
// can get access to
export const store = {
  ballsInFeed: null,
  currentUser: null,
  writeBall: message => {
    const newBall = {
      createdOn: new Date(),
      author: store.currentUser.uid,
      author_name: store.currentUser.displayName,
      author_image: store.currentUser.photoURL,
      message
    };
    return ballsCollection
      .add(newBall)
      .catch(e => console.error("error inserting", newBall, e));
  }
};

// onSnapshot is executed every time the data
// in the underlying firestore collection changes
// It will get passed an array of references to
// the documents that match your query
ballsCollection
  .orderBy("createdOn", "desc")
  .limit(5)
  .onSnapshot(ballsRef => {
    const balls = [];
    ballsRef.forEach(doc => {
      const ball = doc.data();
      ball.id = doc.id;
      balls.push(ball);
    });
    console.log("Received Balls feed:", balls);
    store.ballsInFeed = balls;
  });

// When a user logs in or out, save that in the store
firebase.auth().onAuthStateChanged(user => {
  console.log("Logged in as:", user);
  store.currentUser = user;
});
