import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams, Link } from "react-router-dom";
import { Form, Button, Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import getCSRFHeader from "../common/csrfHeader";
import {
  fetchAllUser,
  fetchAllUserDoc,
  fetchPatientList,
} from "../common/fetchData";
import validator from "validator";
import { Base64 } from "js-base64";
import MedicalHistoryTable from "./medicalHistoryTable";

const MedicalHistory = () => {
  const { patientID } = useParams();
  const [authID, setAuthID] = useState({});
  const [profile, setProfile] = useState([]);
  const [medicationName, setMedicationName] = useState("");
  const [dosageInstructions, setDosageInstructions] = useState("");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastRefillDate, setLastRefillDate] = useState("");
  const [allergies, setAllergies] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [addStatus, setAddStatus] = useState("");

  useEffect(() => {
    const fetchAuthID = async () => {
      const auth = await getAuth();
      const authID = auth.currentUser.uid;
      setAuthID(authID);
    };
    const fetchAllUsers = async () => {
      const users = await fetchAllUserDoc();

      users.forEach((user) => {
        if (user["user_id"] === patientID) {
          setProfile(user);
        }
      });
    };

    fetchAuthID();
    fetchAllUsers();
  }, [addStatus]);

  const validateForm = () => {
    let newErrors = {};

    if (validator.isEmpty(medicationName)) {
      newErrors.medicationName = "Medication name is required.";
    }

    if (validator.isEmpty(dosageInstructions)) {
      newErrors.dosageInstructions = "Dosage instructions are required.";
    }

    if (validator.isEmpty(frequency)) {
      newErrors.frequency = "Frequency is required.";
    }

    if (validator.isEmpty(startDate)) {
      newErrors.startDate = "Start date is required.";
    }

    if (validator.isEmpty(lastRefillDate)) {
      newErrors.lastRefillDate = "Last refill date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Generate a unique medication ID
  const generateMedicationId = () => {
    const medicationId = uuidv4();
    return medicationId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Generate a unique medication ID
      const medicationId = generateMedicationId();

      // Get the current date and time
      const submittingDate = new Date().toISOString();

      const encodedMedicationName = Base64.encode(medicationName);
      const encodedDosageInstructions = Base64.encode(dosageInstructions);
      const encodedFrequency = Base64.encode(frequency);
      const encodedAllergies = Base64.encode(allergies);
      const encodedSpecialInstructions = Base64.encode(specialInstructions);

      // Logic to handle form submission
      // You can make an API call here to save the medication information and allergies to the server
      const endPoint = `http://localhost:4001/add_medication/medication/${medicationId}/${submittingDate}/${medicationId}/${patientID}/${authID}/${encodedMedicationName}/${encodedDosageInstructions}/${encodedFrequency}/${startDate}/${lastRefillDate}/${encodedAllergies}/${encodedSpecialInstructions}/`;
      const options = await getCSRFHeader();

      await axios.post(endPoint, {}, options);

      console.log("Form submitted");
      setAddStatus("success");
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div>
      <div>
        <h3>Medical History</h3>
        <div className="name-container">
          <h4>
            Patient Name: {profile["first_name"] + " " + profile["last_name"]}
          </h4>
        </div>
      </div>
      <div>
        <MedicalHistoryTable patientID={patientID} addStatus={addStatus} />
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={toggleForm}>
            Add Medication
          </Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="medicationName">
                <Form.Label>Medication Name</Form.Label>
                <Form.Control
                  type="text"
                  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)}
                  isInvalid={!!errors.medicationName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.medicationName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="dosageInstructions">
                <Form.Label>Dosage Instructions</Form.Label>
                <Form.Control
                  type="text"
                  value={dosageInstructions}
                  onChange={(e) => setDosageInstructions(e.target.value)}
                  isInvalid={!!errors.dosageInstructions}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dosageInstructions}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="frequency">
                <Form.Label>Frequency</Form.Label>
                <Form.Control
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  isInvalid={!!errors.frequency}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.frequency}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  isInvalid={!!errors.startDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.startDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="lastRefillDate">
                <Form.Label>Last Refill Date</Form.Label>
                <Form.Control
                  type="date"
                  value={lastRefillDate}
                  onChange={(e) => setLastRefillDate(e.target.value)}
                  isInvalid={!!errors.lastRefillDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastRefillDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="allergies">
                <Form.Label>Allergies</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="specialInstructions">
                <Form.Label>Special Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default MedicalHistory;
