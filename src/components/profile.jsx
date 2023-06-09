import React, { useContext } from "react";
import { MainContext } from "../pages/mainpage";
import { Container, Row, Col, Card } from "react-bootstrap";

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
    <Container>
      <h1>Profile</h1>
      <Card>
        <Card.Body>
          <Card.Title>{position === "P" ? "Patient" : "MediStaff"}</Card.Title>
          {position !== "P" && (
            <div>
              <Card.Text>Role: {role}</Card.Text>
              <Card.Text>License Number: {licenseNumber}</Card.Text>
              <Card.Text>Organisation: {organisation}</Card.Text>
            </div>
          )}
          <Row>
            <Col>
              <Card.Text>UserID: {userID}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>First Name: {firstName}</Card.Text>
              <Card.Text>Last Name: {lastName}</Card.Text>
              <Card.Text>Position: {position}</Card.Text>
            </Col>
            <Col>
              <Card.Text>Date of Birth: {dateOfBirth}</Card.Text>
              <Card.Text>Address: {address}</Card.Text>
              <Card.Text>City: {city}</Card.Text>
              <Card.Text>State: {state}</Card.Text>
              <Card.Text>ZIP: {zip}</Card.Text>
              <Card.Text>Phone: {phone}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
