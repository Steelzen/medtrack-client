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
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Advice from "./components/advice";
import MainContent from "./components/mainContent";
import Profile from "./components/profile";
import ResetPassword from "./components/resetPassword";
import Medication from "./components/medication";
import Management from "./components/management";
import MedicalHistory from "./components/medicalHistory";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

function App() {
  if (process.env.NODE_ENV === "test") {
    unstable_mockFirebase();
  }

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = getAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<MainPage />}>
            <Route index element={<MainContent />} />
            <Route path="advice" element={<Advice />} />
            <Route path="profile" element={<Profile />} />
            <Route path="medication" element={<Medication />} />
            <Route path="management/:patientID" element={<MedicalHistory />} />
            <Route exact path="management" element={<Management />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
