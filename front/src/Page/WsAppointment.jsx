import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function WsAppointment() {
  const [app, setapp] = useState();
  const { id } = useParams();

  useEffect(() => {
    getApp();
  }, []);

  async function getApp() {
    let resp = await axios.get(
      `http://localhost:8080/api/workshop/appointment/${id}`
    );
    console.log(resp.data.appointment);
    setapp(resp.data.appointment);
  }

  async function confirmApp() {
    await axios.put(`http://localhost:8080/api/workshop/appointment/${id}`);
    getApp();
  }
  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>Workshop Buddy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link to="#home">Home</Nav.Link>
          <Nav.Link>Features</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <h1>Appointment Details</h1>
            {app && app.isAcknowledged ? (
              <span class="badge badge-pill badge-success">Acknowledged</span>
            ) : (
              <span class="badge badge-pill badge-danger">
                Pending Confirmation
              </span>
            )}
            <h3>Customer Details</h3>
            <h3>Name: {app && app.customer.firstname}</h3>
            <h5>Email: {app && app.customer.email}</h5>
            <h3>Vehicle Details</h3>
            <h4>{app && app.vehicle.vehicleNumber}</h4>
            <h4>{app && app.vehicle.make + " " + app.vehicle.model}</h4>
            <h4>Work required: {app && app.work}</h4>
            {app && !app.isAcknowledged && (
              <Button onClick={confirmApp} variant="outline-success">
                Confirm Appointment
              </Button>
            )}
            <Button as={Link} to={`/ws/job/${id}`} variant="outline-primary">
              Complete Job
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default WsAppointment;
