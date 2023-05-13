import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import getCookie from "../components/getCookie";
import axios from "axios";

const SignUp = ({ db }) => {
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Validate email and password before signing up
      if (
        !email ||
        !password ||
        email.trim() === "" ||
        password.trim() === ""
      ) {
        throw new Error("Email and password are required");
      }
      if (!validator.isEmail(email)) {
        throw new Error("Invalid email address");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;

      const uid = user.uid;
      const group = position === "medistaff" ? "medistaff" : "patient";
      const document_id = email;

      // Get the CSRF token from the cookie
      const csrftoken = getCookie("csrftoken");

      // Add the CSRF token to the axios headers
      axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

      const options = {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      };

      // Add the user's license number to the "add_medistaff" endpoint
      const endpoint =
        position === "medistaff"
          ? `http://localhost:4001/add_medistaff/${group}/${document_id}/${uid}/${licenseNumber}/`
          : `http://localhost:4001/add_patient/${group}/${document_id}/${uid}/`;
      await axios.post(endpoint, {}, options);

      // After create user and automatically sign in
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          // Redirect to the main page
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      // Handle sign-up error
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSignUp}>
        <Form.Select
          aria-label="Default select example"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option>Choose your position</option>
          <option value="patient">Patient</option>
          <option value="medistaff">Healthcare Worker</option>
        </Form.Select>
        <Form.Control
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <Form.Control
          type="password"
          placeholder="Confirm your password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          name="passwordConfirm"
        />
        {position === "medistaff" && (
          <Form.Control
            type="text"
            placeholder="Enter your license number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            name="licenseNumber"
          />
        )}
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Enter
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
