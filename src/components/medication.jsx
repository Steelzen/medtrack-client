// TODO: Medcal history
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Table, Collapse, Button } from "react-bootstrap";
import { fetchMedicationList } from "../common/fetchData";
import { Base64 } from "js-base64";

const Medication = () => {
  const [userID, setUserID] = useState("");
  const [medicationList, setMedicationList] = useState([]);
  const [activeCollapseId, setActiveCollapseId] = useState(null);
  let auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        auth = await getAuth();
        await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUserID(user.uid);
            } else {
              setUserID("");
            }
            resolve(); // Resolve the Promise once the auth state has been handled
          });
          unsubscribe();
        });

        const medications = await fetchMedicationList();

        let medicationList = [];
        medications.forEach((medication) => {
          if (medication["patient_id"] === auth.currentUser.uid) {
            medicationList.push(medication);
          }
        });

        setMedicationList(medicationList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCollapseToggle = (medicationId) => {
    setActiveCollapseId(
      activeCollapseId === medicationId ? null : medicationId
    );
  };
  return (
    <div>
      <h1>Medication History</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Date</th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {medicationList.map((medication) => (
            <tr key={medication.data_id}>
              <td>{Base64.decode(medication.medication_name)}</td>
              <td>{new Date(medication.creation_date).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="primary"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${medication.data_id}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${medication.data_id}`}
                  onClick={() => handleCollapseToggle(medication.data_id)}
                >
                  Show
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Collapsible content */}
      {medicationList.map((medication) => (
        <Collapse
          key={medication.data_id}
          id={`collapse-${medication.data_id}`}
          in={activeCollapseId === medication.data_id}
        >
          <div className="p-3">
            <p>
              Dosage Instructions:{" "}
              {Base64.decode(medication.dosage_instructions)}
            </p>
            <p>Frequency: {Base64.decode(medication.frequency)}</p>
            <p>Start Date: {medication.start_date}</p>
            <p>Last Refill Date: {medication.last_refill_date}</p>
            <p>Allergies: {Base64.decode(medication.allergies)}</p>
            <p>
              Special Instructions:{" "}
              {Base64.decode(medication.special_instructions)}
            </p>
          </div>
        </Collapse>
      ))}
    </div>
  );
};

export default Medication;
