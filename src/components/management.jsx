/** TODO: patient management **/
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import getCSRFHeader from "../common/csrfHeader";
import { fetchAllUser, fetchAllUserDoc } from "../common/fetchData";
import MedicalHistory from "./medicalHistory";
import UsersTable from "./usersTable";
import { MainContext } from "../pages/mainpage";

const Management = () => {
  const { patientID } = useParams();
  const [users, setUsers] = useState([]);
  const [userDoc, setUserDoc] = useState([]);
  const [UID, setUID] = useState("");
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { userID } = useContext(MainContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await fetchAllUser();
      console.log(users);
      setUsers(users);
    };

    const fetchUserProfile = async () => {
      let userDoc = [];

      try {
        userDoc = await fetchAllUserDoc();
        setUserDoc(userDoc);

        userDoc.forEach((doc) => {
          if (doc["user_id"] === patientID) {
            setUID(doc["user_id"]);
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

    fetchAllUsers();
    fetchUserProfile();
  }, []);

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredUsers = users.data.filter((user) =>
      user.email.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filteredUsers);
    setSearchQuery(event.target.value);
  };

  const handleRegister = async (user) => {
    // Logic to handle registration of the user
    const endPoint = `http://localhost:4001/register_patient_list/patient_list/${userID}/add_patient_on_list/${user.uid}/`;
    const options = await getCSRFHeader();

    await axios.post(endPoint, {}, options);

    console.log("Register:", user);
  };

  return (
    <div>
      <h1>Management</h1>
      {patientID ? (
        <MedicalHistory
          userID={UID}
          fullName={fisrtName + " " + lastName}
          dateOfBirth={dateOfBirth}
          contactInfo={phone}
        />
      ) : (
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

          <UsersTable
            users={userDoc}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
        </div>
      )}
    </div>
  );
};

export default Management;
