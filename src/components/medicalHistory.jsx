import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import getCSRFHeader from "../common/csrfHeader";
import {
  fetchAllUser,
  fetchAllUserDoc,
  fetchPatientList,
} from "../common/fetchData";

const MedicalHistory = () => {
  const { patientID } = useParams();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await fetchAllUserDoc();

      users.forEach((user) => {
        if (user["user_id"] === patientID) {
          setProfile(user);
        }
      });
    };
    fetchAllUsers();
  });

  return (
    <div>
      {patientID === "" ? (
        <div>
          <h4>Not Found</h4>
        </div>
      ) : (
        <div>
          {" "}
          <h3>Medical History</h3>
          <p>User ID: {patientID}</p>
          <p>First Name: {profile["first_name"]}</p>
          <p>Last Name: {profile["last_name"]}</p>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
