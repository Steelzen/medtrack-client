import React, { useState, useEffect } from "react";

const MedicalHistory = (props) => {
  const { userID, fullName, dateOfBirth, contactInfo } = props;
  return (
    <div>
      {userID === "" ? (
        <div>
          <h4>Not Found</h4>
        </div>
      ) : (
        <div>
          {" "}
          <h3>Medical History</h3>
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
