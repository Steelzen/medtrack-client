/** TODO: patient management **/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { fetchAllUserDoc } from "../common/fetchData";
import MedicalHistory from "./medicalHistory";

const Management = () => {
  const { patientID } = useParams();
  const [userID, setUserID] = useState("");
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      let userDoc = [];

      try {
        userDoc = await fetchAllUserDoc();

        userDoc.forEach((doc) => {
          if (doc["user_id"] === patientID) {
            setUserID(doc["user_id"]);
            setFirstName(doc["first_name"]);
            setLastName(doc["last_name"]);
            setDateOfBirth(doc["date_of_birth"]);
            setPhone(doc["phone"]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>Management</h1>
      <MedicalHistory
        userID={userID}
        fullName={fisrtName + " " + lastName}
        dateOfBirth={dateOfBirth}
        contactInfo={phone}
      />
    </div>
  );
};

export default Management;
