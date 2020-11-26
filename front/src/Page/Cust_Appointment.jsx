import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";

function Cust_Appointment({ isAuth, logout, setIsAuth }) {
  const [app, setApp] = useState();

  const { id } = useParams();
  useEffect(() => {
    async function getApp(params) {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.get(`/api/customer/appointment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(resp.data.appointment);
        setApp(resp.data.appointment);
      } catch (error) {
        // console.log(error);
      }
    }
    getApp();
  }, []);

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="cdash">
      <Navbar
        // bg="dark"
        variant="dark"
        className="d-flex justify-content-between navbar"
        expand="lg"
      >
        <Navbar.Brand>
          WORKSHOP <i class="fas fa-tools"></i> BUDDY
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link as={Link} to="/login">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cust/workshops/">
              Workshops
            </Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="cont">
        <Row>
          <Col>
            <div className="mt-3 mx-1">
              <h1>Appointment Details</h1>
            </div>

            {app && app.isAcknowledged ? (
              <span class="badge badge-pill badge-success my-2">
                Acknowledged
              </span>
            ) : (
              <span class="badge badge-pill badge-danger my-2">
                Pending Acknowledgement
              </span>
            )}

            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <h3>{app && app.date}</h3>
                  </Card.Header>
                  <Card.Body>
                    <h5>{app && app.vehicle.vehicleNumber}</h5>
                    <h5>{app && app.vehicle.make + " " + app.vehicle.model}</h5>
                    <h5>{app && app.work}</h5>
                  </Card.Body>
                  <Card.Footer>
                    <h5>{app && app.workshop.name}</h5>
                    <h5>{app && app.workshop.address}</h5>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cust_Appointment;
