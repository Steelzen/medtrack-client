import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import MedTrackLogo from "../images/MedTrack_Logo.png";

const Login = () => {
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  let auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      auth = await getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in, stay on the home page
          // You can perform any additional actions or set states here
          navigate("/home");
        }
      });
    };

    checkCurrentUser();
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (!validator.isEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home");
      } catch (error) {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="logo" theme="dark">
        <img className="logo-img" src={MedTrackLogo} alt="logo" />
      </div>
      <h3 className="text-center">Welcome to MedTrack...</h3>
      <br />
      {loginError && <Alert variant="danger">{loginError}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="position">
          <Form.Label>Choose your position</Form.Label>
          <Form.Control
            as="select"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="patient">Patient</option>
            <option value="medistaff">Healthcare Worker</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="/reset-password">Forgot password?</Link>
          </div>
          <Button className="login-button" variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
      <p className="text-center mt-3">
        New user? <Link to="/signup">Sign Up</Link>
      </p>
    </Container>
  );
};

export default Login;
