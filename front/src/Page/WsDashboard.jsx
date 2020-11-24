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
import { Link, useParams } from "react-router-dom";

function WsDashboard() {
  const [current, setCurrent] = useState();
  const [apps, setApps] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getWs() {
      try {
        let resp = await axios.get(`http://localhost:8080/api/workshop/${id}`);
        console.log(resp.data.workshop);
        setCurrent(resp.data.workshop);
      } catch (error) {
        console.log(error);
      }
    }
    async function getWsApp() {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/workshop/${id}/app`
        );
        console.log(resp.data.workshop);
        // setApps(resp.data.workshop.appointments.vehicle);
      } catch (error) {
        console.log(error);
      }
    }
    getWs();
    // getWsApp();
  }, []);

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
        <h1>Welcome, {current && current.name} !</h1>

        <Row>
          <Col md={8}>
            <h2>Appointments</h2>
            <Row>
              {current && current.appointments.length === 0 && (
                <Col md={6}>
                  <Card className="text-center">
                    <Card.Body>
                      <i
                        style={{ fontSize: "3rem" }}
                        class="fas fa-traffic-light mb-2"
                      ></i>
                      <div>Upcoming appointments will be shown here!</div>
                    </Card.Body>
                  </Card>
                </Col>
              )}
              {current &&
                current.appointments.map((app) => (
                  <Col md={12} sm={6}>
                    <div
                      key={app._id}
                      className="border border-secondary text-center mb-3 d-flex flex-row bd-highlight mb-3 justify-content-around"
                    >
                      <div>
                        {app.isAcknowledged ? (
                          <span class="badge badge-pill badge-success">
                            Acknowledged
                          </span>
                        ) : (
                          <span class="badge badge-pill badge-danger">
                            Pending
                          </span>
                        )}
                      </div>
                      <div>{app.date}</div>
                      <div>{app.work}</div>
                      <div>
                        <Button
                          variant="outline-info"
                          as={Link}
                          to={`/ws/appointment/${app._id}`}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default WsDashboard;
