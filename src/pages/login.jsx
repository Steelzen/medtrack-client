import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import getCookie from "../components/getCookie";
import axios from "axios";

const Login = () => {
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redirect to home if logged in");

    if (auth.currentUser) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login");

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
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
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Enter
        </Button>
      </Form>
    </div>
  );
};

export default Login;
