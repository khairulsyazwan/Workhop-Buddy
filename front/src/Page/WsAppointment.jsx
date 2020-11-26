import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";

function WsAppointment({ isAuth, logout, setIsAuth }) {
  const [app, setapp] = useState();
  const { id } = useParams();

  useEffect(() => {
    getApp();
  }, []);

  async function getApp() {
    let token = localStorage.getItem("token");
    let resp = await axios.get(`/api/workshop/appointment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(resp.data.appointment);
    setapp(resp.data.appointment);
  }

  async function confirmApp() {
    let token = localStorage.getItem("token");
    // console.log(token);
    try {
      await axios.put(
        `/api/workshop/appointment/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getApp();
    } catch (error) {
      console.log(error.response);
    }
  }

  if (!isAuth) {
    return <Redirect to="/ws/login" />;
  }
  return (
    <div className="cdash2">
      <Navbar
        // bg="dark"
        variant="dark"
        className="d-flex justify-content-between navbar"
      >
        <Navbar.Brand>
          WORKSHOP <i class="fas fa-tools"></i> BUDDY
        </Navbar.Brand>
        <Nav className="">
          <Nav.Link as={Link} to="/ws/login">
            Home
          </Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="cont">
        <Row>
          <Col>
            <div className="my-3 mx-3">
              <h1>Appointment Details</h1>
              {app && app.isAcknowledged ? (
                <span class="badge badge-pill badge-success">Acknowledged</span>
              ) : (
                <span class="badge badge-pill badge-danger">
                  Pending Confirmation
                </span>
              )}
            </div>

            <Card>
              <Card.Header>
                <h3>{app && app.vehicle.vehicleNumber}</h3>
              </Card.Header>
              <Card.Body>
                <div className="mb-2">
                  <h3>
                    <u>Customer Details</u>
                  </h3>
                  <h5>Name: {app && app.customer.firstname}</h5>
                  <h5>Email: {app && app.customer.email}</h5>
                </div>
                <div className="mb-2">
                  <h3>
                    <u>Vehicle Details</u>
                  </h3>
                  <h5>{app && app.vehicle.vehicleNumber}</h5>
                  <h5>{app && app.vehicle.make + " " + app.vehicle.model}</h5>
                  <div>
                    <h3>
                      <u>Work required</u>
                    </h3>
                    <h4>
                      <strong> {app && app.work}</strong>
                    </h4>
                  </div>
                </div>
              </Card.Body>

              <Card.Footer>
                {app && !app.isAcknowledged && (
                  <Button
                    onClick={confirmApp}
                    variant="outline-success"
                    className="mr-3"
                  >
                    Confirm Appointment
                  </Button>
                )}
                <Button
                  as={Link}
                  to={`/ws/job/${id}`}
                  variant="outline-primary"
                >
                  Complete Job
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WsAppointment;
