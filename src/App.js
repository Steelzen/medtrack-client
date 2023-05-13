import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/mainpage";
import SignUp from "./pages/signup";
import Login from "./pages/login";

import { unstable_mockFirebase } from "@firebase/rules-unit-testing";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Advice from "./components/advice";
import MainContent from "./components/mainContent";

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<MainPage />}>
            <Route index element={<MainContent />} />
            <Route path="advice" element={<Advice />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
