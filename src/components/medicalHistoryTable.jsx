import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams, Link } from "react-router-dom";
import { Table, Collapse, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import getCSRFHeader from "../common/csrfHeader";
import { fetchMedicationList } from "../common/fetchData";
import validator from "validator";
import { Base64 } from "js-base64";

const MedicalHistoryTable = (props) => {
  const { patientID, addStatus } = props;
  const [medicationList, setMedicationList] = useState([]);
  const [activeCollapseId, setActiveCollapseId] = useState(null);

  useEffect(() => {
    const fetchMedication = async () => {
      const medications = await fetchMedicationList();
      let medicationList = [];
      medications.forEach((medication) => {
        if (medication["patient_id"] === patientID) {
          medicationList.push(medication);
        }
      });

      setMedicationList(medicationList);
      console.log(medicationList);
    };
    fetchMedication();
  }, [addStatus]);

  const handleCollapseToggle = (medicationId) => {
    setActiveCollapseId(
      activeCollapseId === medicationId ? null : medicationId
    );
  };

  return (
    <div>
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

export default MedicalHistoryTable;
