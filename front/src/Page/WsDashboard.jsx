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
import moment from "moment";

function WsDashboard({ isAuth, logout, setIsAuth }) {
  const [current, setCurrent] = useState();
  const [apps, setApps] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getWs() {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.get(`/api/workshop/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(resp.data.workshop);
        setCurrent(resp.data.workshop);
      } catch (error) {
        console.log(error);
      }
    }
    async function getWsApp() {
      try {
        let resp = await axios.get(`/api/workshop/${id}/app`);
        // console.log(resp.data.workshop);
        // setApps(resp.data.workshop.appointments.vehicle);
      } catch (error) {
        console.log(error);
      }
    }
    getWs();
    getWsApp();
  }, []);

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
          <Nav.Link as={Link} to={`/ws/customers/${id}`}>
            Customers
          </Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="cont shadow">
        <Row>
          <Col md={12}>
            <div className="my-3 mx-3">
              <h1>Welcome, {current && current.name} !</h1>
            </div>
            <div className="my-3 mx-3">
              <h2>
                <i class="far fa-clipboard"></i> You have{" "}
                {current && current.appointments.length} appointments.
              </h2>
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
                    <Card key={app._id} className="text-center shadow my-2">
                      <Card.Header>
                        <Card.Title>
                          <div>
                            {moment(app.date).format("dddd, DD MMMM YYYY")}
                          </div>
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
    </div>
  );
}
export default WsDashboard;
