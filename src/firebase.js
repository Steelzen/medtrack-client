import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./firebase";

firebase.initializeApp(firebaseConfig);

// Set up Firebase emulator UI for local development
if (process.env.NODE_ENV === "development") {
  firebase.auth().useEmulator("http://localhost:9099");
}
