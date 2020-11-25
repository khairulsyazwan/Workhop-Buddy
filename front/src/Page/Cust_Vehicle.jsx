import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Nav, Navbar, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Cust_Vehicle() {
  const [vehicle, setVehicle] = useState({});
  const { id } = useParams();
  const [records, setrecords] = useState([]);

  useEffect(() => {
    async function getVehicle() {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.get(
          `http://localhost:8080/api/customer/vehicle/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVehicle(resp.data.vehicle);

        // console.log(resp.data.vehicle);
      } catch (error) {
        console.log(error);
      }
    }
    async function getSR() {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.get(
          `http://localhost:8080/api/customer/vehicle/${id}/sr`, {
            headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        setrecords(resp.data.vehicle.serviceRecord);
        console.log(resp.data.vehicle.serviceRecord);
      } catch (error) {
        console.log(error);
      }
    }
    getVehicle();
    getSR();
  }, []);

  console.log(records);

  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>Workshop Buddy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link>Features</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col md={12} className="my-2">
            <h1>Vehicle Details</h1>
            <h3>{vehicle && vehicle.make}</h3>
            <h3>{vehicle && vehicle.model}</h3>
            <h3>{vehicle && vehicle.vehicleNumber}</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="my-2">
            {records && records.length != 0 && <h1>Service History</h1>}

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
    </>
  );
}

export default Cust_Vehicle;
