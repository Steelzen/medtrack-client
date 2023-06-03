import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import { Field, ErrorMessage } from "formik";
import * as yup from "yup";
import moment from "moment";
import validator from "validator";
import getCookie from "../components/getCookie";
import axios from "axios";

const SignUp = ({ db }) => {
  const { Formik } = formik;
  const schema = yup.object().shape({
    position: yup.string().required("Position is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dateOfBirth: yup
      .date("Invalid date format") // Specify the error message for invalid date format
      .max(new Date(), "Date of Birth cannot be in the future") // Specify the error message for date in the future
      .required("Date of Birth is required"), // Specify the error message for required field
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup.string().required("Zip code is required"),
    phone: yup.string().required("Phone number is required"),
    role: yup.string().test({
      name: "required-if-medistaff",
      exclusive: true,
      message: "Role is required",
      test: function (value) {
        const { position } = this.parent;
        return (
          position !== "medistaff" || (position === "medistaff" && !!value)
        );
      },
    }),
    licenseNumber: yup.string().test({
      name: "required-if-medistaff",
      exclusive: true,
      message: "License number is required",
      test: function (value) {
        const { position } = this.parent;
        return (
          position !== "medistaff" || (position === "medistaff" && !!value)
        );
      },
    }),
    organisation: yup.string().test({
      name: "required-if-medistaff",
      exclusive: true,
      message: "Organization is required",
      test: function (value) {
        const { position } = this.parent;
        return (
          position !== "medistaff" || (position === "medistaff" && !!value)
        );
      },
    }),
    terms: yup
      .bool()
      .required("Terms must be accepted")
      .oneOf([true], "Terms must be accepted"),
  });

  const navigate = useNavigate();

  const auth = getAuth();

  const handleSignUp = async (values) => {
    try {
      // Validate email and password before signing up
      if (
        !values.email ||
        !values.password ||
        values.email.trim() === "" ||
        values.password.trim() === ""
      ) {
        throw new Error("Email and password are required");
      }
      if (!validator.isEmail(values.email)) {
        throw new Error("Invalid email address");
      }
      if (values.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const { user } = userCredential;

      const uid = user.uid;
      const group = values.position === "medistaff" ? "medistaff" : "patient";
      const document_id = values.email;
      const position = values.position === "medistaff" ? "M" : "P";
      const licenseNumber = values.licenseNumber;
      const firstName = values.firstName;
      const lastName = values.lastName;
      const dateOfBirth = values.dateOfBirth;
      const address = encodeURIComponent(values.address);
      const city = values.city;
      const state = values.state;
      const zip = values.zip;
      const phone = values.phone;
      const role = values.role;
      const organisation = values.organisation;

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
        values.position === "medistaff"
          ? `http://localhost:4001/add_medistaff/${group}/${document_id}/${uid}/${licenseNumber}/${position}/${firstName}/${lastName}/${address}/${city}/${state}/${zip}/${phone}/${role}/${organisation}/`
          : `http://localhost:4001/add_patient/${group}/${document_id}/${uid}/${position}/${firstName}/${lastName}/${address}/${city}/${state}/${zip}/${phone}/`;
      await axios.post(endpoint, {}, options);

      // After create user and automatically sign in
      await signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(dateOfBirth);
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
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      <Formik
        validationSchema={schema}
        onSubmit={handleSignUp}
        initialValues={{
          position: "",
          email: "",
          password: "",
          passwordConfirm: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          role: "",
          licenseNumber: "",
          organisation: "",
          terms: false,
        }}
      >
        {({ handleSubmit, touched, errors, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik101"
                className="position-relative"
              >
                <Form.Label>Position </Form.Label>
                <Field
                  name="position"
                  as="select"
                  className={
                    touched.position && errors.position ? "is-invalid" : ""
                  }
                >
                  <option value="">Choose your position</option>
                  <option value="patient">Patient</option>
                  <option value="medistaff">Healthcare Provider</option>
                </Field>
                <ErrorMessage
                  name="position"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
            </Row>
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email"
              as={Field}
              name="email"
              className={touched.email && errors.email ? "is-invalid" : ""}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="invalid-feedback"
            />
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              as={Field}
              name="password"
              className={
                touched.password && errors.password ? "is-invalid" : ""
              }
            />
            <ErrorMessage
              name="password"
              component="div"
              className="invalid-feedback"
            />
            <Form.Label>Password confirm </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              as={Field}
              name="passwordConfirm"
              className={
                touched.passwordConfirm && errors.passwordConfirm
                  ? "is-invalid"
                  : ""
              }
            />
            <ErrorMessage
              name="passwordConfirm"
              component="div"
              className="invalid-feedback"
            />
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              as={Field}
              name="firstName"
              className={
                touched.firstName && errors.firstName ? "is-invalid" : ""
              }
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="invalid-feedback"
            />
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              as={Field}
              name="lastName"
              className={
                touched.lastName && errors.lastName ? "is-invalid" : ""
              }
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="invalid-feedback"
            />
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter your date of birth"
              as={Field}
              name="dateOfBirth"
              className={
                touched.dateOfBirth && errors.dateOfBirth ? "is-invalid" : ""
              }
            />
            <ErrorMessage
              name="dateOfBirth"
              component="div"
              className="invalid-feedback"
            />
            <Form.Control
              type="text"
              placeholder="Enter your address"
              as={Field}
              name="address"
              className={touched.address && errors.address ? "is-invalid" : ""}
            />
            <ErrorMessage
              name="address"
              component="div"
              className="invalid-feedback"
            />
            <Form.Control
              type="text"
              placeholder="Enter your city"
              as={Field}
              name="city"
              className={touched.city && errors.city ? "is-invalid" : ""}
            />
            <ErrorMessage
              name="city"
              component="div"
              className="invalid-feedback"
            />
            <Form.Control
              type="text"
              placeholder="Enter your state"
              as={Field}
              name="state"
              className={touched.state && errors.state ? "is-invalid" : ""}
            />
            <ErrorMessage
              name="state"
              component="div"
              className="invalid-feedback"
            />
            <Form.Control
              type="text"
              placeholder="Enter your zip code"
              as={Field}
              name="zip"
              className={touched.zip && errors.zip ? "is-invalid" : ""}
            />
            <ErrorMessage
              name="zip"
              component="div"
              className="invalid-feedback"
            />
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              as={Field}
              name="phone"
              className={touched.phone && errors.phone ? "is-invalid" : ""}
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="invalid-feedback"
            />
            {values.position === "medistaff" && (
              <>
                <Form.Group controlId="role">
                  <Field
                    name="role"
                    as="select"
                    className={touched.role && errors.role ? "is-invalid" : ""}
                  >
                    <option value="">Choose your role</option>
                    <option value="physician">Physician</option>
                    <option value="dentist">Dentist</option>
                    <option value="pharmacist">Pharmacist</option>
                    <option value="nurse">Nurse</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter your license number"
                  as={Field}
                  name="licenseNumber"
                  className={
                    touched.licenseNumber && errors.licenseNumber
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="licenseNumber"
                  component="div"
                  className="invalid-feedback"
                />
                <Form.Control
                  type="text"
                  placeholder="Enter your clinic/hospital/pharmacy name"
                  as={Field}
                  name="organisation"
                  className={
                    touched.organisation && errors.organisation
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="organisation"
                  component="div"
                  className="invalid-feedback"
                />
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                as={Field}
                type="checkbox"
                id="validationFormik0"
                isInvalid={touched.terms && !!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
              />
            </Form.Group>
            <Button
              variant="outline-secondary"
              id="button-addon2"
              type="submit"
            >
              Enter
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
