import { useState, useEffect, useContext } from "react";
import { MainContext } from "../pages/mainpage";

const Profile = () => {
  const { email, firstName, position } = useContext(MainContext);
  return (
    <div>
      <h1>Profile</h1>
      {position === "P" ? <h3>Patient Ch</h3> : <h3>MediStaff Ch</h3>}
    </div>
  );
};

export default Profile;
