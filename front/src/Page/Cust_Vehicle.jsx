import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Nav, Navbar, Row, Table } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";

function Cust_Vehicle({ isAuth, logout, setIsAuth }) {
  const [vehicle, setVehicle] = useState({});
  const { id } = useParams();
  const [records, setrecords] = useState([]);

  useEffect(() => {
    async function getVehicle() {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.get(`/api/customer/vehicle/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVehicle(resp.data.vehicle);

        // console.log(resp.data.vehicle);
      } catch (error) {
        // console.log(error);
      }
    }
    async function getSR() {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.get(`/api/customer/vehicle/${id}/sr`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setrecords(resp.data.vehicle.serviceRecord);
        // console.log(resp.data.vehicle.serviceRecord);
      } catch (error) {
        // console.log(error);
      }
    }
    getVehicle();
    getSR();
  }, []);

  // console.log(records);

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={records && records.length != 0 ? "cdash3" : "cdash2"}>
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
            <Nav.Link as={Link} to="/cust/workshops/">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="cont">
        <Row>
          <Col md={12} className="my-3 mx-3">
            <h1>
              <u>Vehicle Details</u>
            </h1>
            <div className="my-3">
              <h3>
                <strong>Model:</strong> {vehicle && vehicle.make}
              </h3>
              <h3>
                <strong>Make:</strong> {vehicle && vehicle.model}
              </h3>
              <h3>
                <strong>Vehicle Number:</strong>{" "}
                {vehicle && vehicle.vehicleNumber}
              </h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="my-2">
            {records && records.length != 0 ? (
              <h1>Service History</h1>
            ) : (
              <div>
                <h1>
                  <i class="far fa-clipboard"></i>
                  {"  "}
                  <i>Service History will be displayed here.</i>
                </h1>
                <h3>
                  <i class="fas fa-wrench"></i>
                  {"  "}
                  You have no records available.
                </h3>
              </div>
            )}

            {records &&
              records.map((rec) => (
                <Card key={rec._id} className="my-2">
                  <Card.Header>
                    <h4>{rec.date}</h4>
                  </Card.Header>
                  <Card.Body>
                    <h5>{rec.workshop.name}</h5>
                    <Table
                      striped
                      bordered
                      hover
                      size="sm"
                      className="text-center"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      {rec.item.map((it, index) => (
                        <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{it.item}</td>
                            <td>{it.qty}</td>
                            <td>${it.price}</td>
                          </tr>
                        </tbody>
                      ))}
                    </Table>
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cust_Vehicle;
