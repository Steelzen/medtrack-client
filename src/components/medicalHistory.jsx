import React, { useState, useEffect } from "react";

const MedicalHistory = (props) => {
  const { userID, fullName, dateOfBirth, contactInfo } = props;
  return (
    <div>
      <h3>Medical History</h3>
      {userID === "" ? (
        <div>Not Found</div>
      ) : (
        <div>
          {" "}
          <p>User ID: {userID}</p>
          <p>Full Name: {fullName}</p>
          <p>Date of Birth: {dateOfBirth}</p>
          <p>Contact Info: {contactInfo}</p>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
