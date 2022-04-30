import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDGBqRNpjSlNS7sm3z12Z8of3SjPLcQwMM',
  authDomain: 'react-next-firebase-5c3fd.firebaseapp.com',
  projectId: 'react-next-firebase-5c3fd',
  storageBucket: 'react-next-firebase-5c3fd.appspot.com',
  messagingSenderId: '388242859400',
  appId: '1:388242859400:web:55c9fb33fed1a36c58463d',
  measurementId: 'G-XCSPJF6ZGV',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
