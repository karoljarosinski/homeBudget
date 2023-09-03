import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const config = {
  apiKey: "AIzaSyALs5w0ZTfrCDAmK4R025LI2S6nHFZXwbE",
  authDomain: "homebudget-def94.firebaseapp.com",
  databaseURL: "https://homebudget-def94-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "homebudget-def94",
  storageBucket: "homebudget-def94.appspot.com",
  messagingSenderId: "341238453787",
  appId: "1:341238453787:web:715537b09aca8c7cf9cabe",
  measurementId: "G-FCYB9BPNM7"
};
// firebase.initializeApp(config);
// const db = firebase.firestore();
//
// export { db };
// export default firebase;

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth, db}
