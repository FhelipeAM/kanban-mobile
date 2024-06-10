import firebase from "firebase/compat/app";

import 'firebase/compat/auth';

import { getStorage } from "firebase/storage";

import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbWk6D2UJCyVO1b2oqvkOIama6UWERFYs",
  authDomain: "valve-manager.firebaseapp.com",
  projectId: "valve-manager",
  storageBucket: "valve-manager.appspot.com",
  messagingSenderId: "255209996337",
  appId: "1:255209996337:web:0e7ce7056af344bd4dd510"

};



const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export const storage = getStorage(app);

export { db, auth, provider }