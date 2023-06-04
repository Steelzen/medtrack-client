import { useState, useEffect, useContext } from "react";
import { MainContext } from "../pages/mainpage";

const Profile = () => {
  const {
    userID,
    email,
    firstName,
    lastName,
    position,
    dateOfBirth,
    address,
    city,
    state,
    zip,
    phone,
    role,
    licenseNumber,
    organisation,
  } = useContext(MainContext);
  return (
    <div>
      <h1>Profile</h1>
      {position === "P" ? (
        <h3>Patient Ch</h3>
      ) : (
        <div>
          <h3>MediStaff Ch</h3>
          <p>{role}</p>
          <p>{licenseNumber}</p>
          <p>{organisation}</p>
        </div>
      )}
      <p>{userID}</p>
      <p>{email}</p>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{position}</p>
      <p>{dateOfBirth}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{state}</p>
      <p>{zip}</p>
      <p>{phone}</p>
    </div>
  );
};

export default Profile;
