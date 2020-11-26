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
import { Link, Redirect, useParams } from "react-router-dom";
import moment from "moment";

function WsCustomers({ isAuth, logout, setIsAuth }) {
  const { id } = useParams();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function getWs() {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.get(
          `http://localhost:8080/api/workshop/${id}/cust`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(resp.data.workshop.customers);
        setCustomers(resp.data.workshop.customers);
      } catch (error) {
        console.log(error);
      }
    }
    getWs();
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
      <Container className="cont">
        <Row>
          <div className="mt-3 mx-3">
            <h1>Customers</h1>
          </div>
          {customers &&
            customers.map((cus) => (
              <Col md={12}>
                <Card key={cus._id} className="my-3 shadow">
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
                      <h5>
                        <u>Vehicles</u>
                      </h5>
                    </div>
                    {cus.vehicles.map((veh) => (
                      <div>
                        <h6>
                          <strong>{veh.make + " " + veh.model}</strong>
                        </h6>

                        {veh.serviceRecord.map((serv) => (
                          <div className="table-responsive">
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
                                      <td>
                                        {moment(serv.date).format(
                                          "dddd, DD MMMM YYYY"
                                        )}
                                      </td>
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
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default WsCustomers;
