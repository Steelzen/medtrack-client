import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

const Login = () => {
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redirect to home if logged in");

    if (auth.currentUser) {
      navigate("/home");
    }
  }, [auth.currentUser]);

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
    console.log("Login");

    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed ins
            const user = userCredential.user;
            // ...
            navigate("/home");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } catch (error) {
        console.log(error);
      }
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
          isInvalid={!!emailError}
        />
        <Form.Control.Feedback type="invalid">
          {emailError}
        </Form.Control.Feedback>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          isInvalid={!!passwordError}
        />
        <Form.Control.Feedback type="invalid">
          {passwordError}
        </Form.Control.Feedback>
        <a href="#">Forget password?</a>
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Enter
        </Button>
        <p> Are you new? </p>
        <Button
          as={Link}
          to="/signup"
          variant="outline-secondary"
          id="button-addon2"
          type="button"
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Login;
