import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import getCSRFHeader from "../common/csrfHeader";
import {
  fetchAllUser,
  fetchAllUserDoc,
  fetchPatientList,
} from "../common/fetchData";
import { MainContext } from "../pages/mainpage";

const Management = () => {
  const [users, setUsers] = useState([]);
  const [patientRegistered, setPatientRegistered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { userID } = useContext(MainContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await fetchAllUser();
      setUsers(users);
    };

    const fetchPatientRegistered = async () => {
      const patientList = await fetchPatientList(userID);
      const userDoc = await fetchAllUserDoc();
      let patientRegistered = [];

      patientList.patient_list.forEach((patient) => {
        userDoc.forEach((doc) => {
          if (doc["user_id"] === patient) {
            patientRegistered.push(doc);
          }
        });
      });

      setPatientRegistered(patientRegistered);
    };

    fetchAllUsers();
    fetchPatientRegistered();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredUsers = users.data.filter((user) =>
      user.email.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filteredUsers);
    setSearchQuery(event.target.value);
  };

  const handleRegister = async (user) => {
    // Check if the user is already registered
    const isRegistered = patientRegistered.some(
      (patient) => patient.user_id === user.uid
    );

    if (isRegistered) {
      // User is already registered, show an error message or perform any necessary action
      console.log("User is already registered");
      return;
    }

    // Logic to handle registration of the user
    const endPoint = `http://localhost:4001/register_patient_list/patient_list/${userID}/add_patient_on_list/${user.uid}/`;
    const options = await getCSRFHeader();

    await axios.post(endPoint, {}, options);

    console.log("Register:", user);

    // Update the patientRegistered state by fetching the updated list of registered patients
    const updatedPatientList = await fetchPatientList(userID);
    const userDoc = await fetchAllUserDoc();

    let updatedPatientRegistered = [];

    updatedPatientList.patient_list.forEach((patient) => {
      userDoc.forEach((doc) => {
        if (doc["user_id"] === patient) {
          updatedPatientRegistered.push(doc);
        }
      });
    });

    setPatientRegistered(updatedPatientRegistered);
  };

  const handleUnregister = async (patient) => {
    // Logic to handle unregistration of the user
    const endPoint = `http://localhost:4001/register_patient_list/patient_list/${userID}/delete_patient_on_list/${patient["user_id"]}/`;
    const options = await getCSRFHeader();

    await axios.post(endPoint, {}, options);

    console.log("Unregister:", patient);

    // Update the patientRegistered state by filtering out the removed patient
    const updatedPatientRegistered = patientRegistered.filter(
      (registered) => registered["user_id"] !== patient["user_id"]
    );

    setPatientRegistered(updatedPatientRegistered);
  };

  return (
    <div>
      <h1>Management</h1>
      <div className="management-container">
        <div>
          <label htmlFor="search">Search users</label>
          <input
            className="search-input"
            type="text"
            placeholder="Search by email"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {filteredUsers.length > 0 && (
          <div className="search-result-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.uid}>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => handleRegister(user)}>
                        Register
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="registered-patient-wrapper">
          <h3>Registered Patients</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Contact Info</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientRegistered.map((patient) => (
                <tr key={patient["user_id"]}>
                  <td>
                    <Link to={`/home/management/${patient["user_id"]}/`}>
                      {patient["first_name"] + " " + patient["last_name"]}
                    </Link>
                  </td>
                  <td>{patient["date_of_birth"]}</td>
                  <td>{patient["phone"]}</td>
                  <td>
                    <button onClick={() => handleUnregister(patient)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Management;
