import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

function Cust_Workshops({ isAuth, logout, setIsAuth }) {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    async function getWs() {
      let token = localStorage.getItem("token");
      let resp = await axios.get(`http://localhost:8080/api/workshop/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data.workshop);
      await setWorkshops(resp.data.workshop);
    }
    getWs();
  }, []);

  if (!isAuth) {
    return <Redirect to="/login" />;
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
          <Nav.Link as={Link} to="/login">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/cust/workshops/">
            Workshops
          </Nav.Link>
          <Nav.Link as={Link} to="/cust/workshops/">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container className="cont">
        <Row>
          <div className="my-3 mx-3">
            <h1>Workshops</h1>
          </div>
        </Row>
        <Row>
          {workshops &&
            workshops.map((ws) => (
              <Col>
                <Card>
                  <Card.Header>
                    <Card.Title>{ws.name}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Contact Details</Card.Title>
                    {ws.address} <br /> {ws.email} <br /> {ws.phone}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Cust_Workshops;
