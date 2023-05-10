import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  redirect,
  Route,
  Routes,
} from "react-router-dom";
import MainPage from "./pages/mainpage";
import SignUp from "./pages/signup";

import { unstable_mockFirebase } from "@firebase/rules-unit-testing";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDE_TxF7-POkszvqbvyQlLGj82aCHQAhMM",
  authDomain: "medtrack-b54f3.firebaseapp.com",
  projectId: "medtrack-b54f3",
  storageBucket: "medtrack-b54f3.appspot.com",
  messagingSenderId: "33639966885",
  appId: "1:33639966885:web:deee45b2be3d88f31a454c",
  measurementId: "G-2FR635ZJNC",
};

function App() {
  if (process.env.NODE_ENV === "test") {
    unstable_mockFirebase();
  }

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
