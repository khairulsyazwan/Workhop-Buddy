import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cust_Workshops() {
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
  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>Workshop Buddy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <div className="my-3">
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
                    {ws.address} <br /> {ws.email} <br /> {ws.phone}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default Cust_Workshops;
