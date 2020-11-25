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
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function WsCustomers() {
  const { id } = useParams();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function getWs() {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/workshop/${id}/cust`
        );
        console.log(resp.data.workshop.customers);
        setCustomers(resp.data.workshop.customers);
      } catch (error) {
        console.log(error);
      }
    }
    getWs();
  }, []);

  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>Workshop Buddy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={`/dashboard/ws/${id}`}>
            Dashboard
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <div className="my-3">
          <h1>Customers</h1>
        </div>
        <Row>
          {customers &&
            customers.map((cus) => (
              <Col md={12}>
                <Card key={cus._id} className=" shadow">
                  <Card.Header>
                    <Card.Title>
                      <div>{cus.firstname + " " + cus.lastname}</div>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {/* <i style={{ fontSize: "4rem" }} class="fas fa-tools"></i> */}
                    <div className="my-3">
                      <h5>{cus.email}</h5>
                    </div>
                    <div>
                      <h5>Vehicles</h5>
                    </div>
                    {cus.vehicles.map((veh) => (
                      <div>
                        <h6>
                          <strong>{veh.make + " " + veh.model}</strong>
                        </h6>

                        {veh.serviceRecord.map((serv) => (
                          <div>
                            <Table
                              striped
                              bordered
                              hover
                              size="sm"
                              className="text-center"
                            >
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Item</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              {serv.workshop == `${id}` &&
                                serv.item.map((it) => (
                                  <tbody>
                                    <tr>
                                      <td>{serv.date}</td>
                                      <td>{it.item}</td>
                                      <td>{it.qty}</td>
                                      <td>${it.price}</td>
                                    </tr>
                                  </tbody>
                                ))}
                            </Table>
                          </div>
                        ))}
                      </div>
                    ))}
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="outline-info"
                      as={Link}
                      //   to={`/ws/appointment/${app._id}`}
                      className="btn-block"
                    >
                      View
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default WsCustomers;
