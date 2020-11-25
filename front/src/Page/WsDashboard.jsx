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
        let token = localStorage.getItem("token");
        let resp = await axios.get(`http://localhost:8080/api/workshop/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
          <Nav.Link as={Link} to={`/ws/customers/${id}`}>
            Customers
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <div className="my-3">
          <h1>Welcome, {current && current.name} !</h1>
        </div>

        <Row>
          <Col md={12}>
            <div className="my-3">
              <h2>Appointments</h2>
            </div>

            <Row>
              {current && current.appointments.length === 0 && (
                <Col md={12}>
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
                  <Col md={4} sm={6}>
                    <Card key={app._id} className="text-center shadow">
                      <Card.Header>
                        <Card.Title>
                          <div>{app.date}</div>
                        </Card.Title>

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
                      </Card.Header>
                      <Card.Body>
                        <i
                          style={{ fontSize: "4rem" }}
                          class="fas fa-tools"
                        ></i>
                        <div className="my-3">
                          <h5>{app.work}</h5>
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          variant="outline-info"
                          as={Link}
                          to={`/ws/appointment/${app._id}`}
                          className="btn-block"
                        >
                          View
                        </Button>
                      </Card.Footer>
                    </Card>
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
