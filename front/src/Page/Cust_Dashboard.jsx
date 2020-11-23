import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormCheck,
  Modal,
  Nav,
  Navbar,
  Row,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Cust_Dashboard() {
  const [current, setCurrent] = useState();
  const [addVehicles, setAddVehicles] = useState();

  //add vehicle modal controls
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();

  useEffect(() => {
    getCustomer();
  }, []);

  async function getCustomer() {
    try {
      let resp = await axios.get(`http://localhost:8080/api/customer/${id}`);
      console.log(resp.data);
      await setCurrent(resp.data.customer);
    } catch (error) {
      console.log(error);
    }
  }

  function changeHandler(e) {
    setAddVehicles({ ...addVehicles, [e.target.name]: e.target.value });
    console.log(addVehicles);
  }
  async function addVehicle() {
    try {
      let resp = await axios.post(
        `http://localhost:8080/api/customer/newvehicle/${id}`,
        addVehicles
      );
      getCustomer();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  //   console.log(current);

  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>Workshop Buddy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link to="#home">Home</Nav.Link>
          <Nav.Link>Features</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="mt-2">
        <Row>
          <Col md={8}>
            <h1>Welcome, {current && current.firstname}!</h1>
            <Row className="d-flex justify-content-around">
              {current && current.vehicles.length === 0 && (
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <i
                        style={{ fontSize: "3rem" }}
                        class="fas fa-traffic-light mb-2"
                      ></i>
                      <div>
                        Your vehicle will be shown here. <br />
                        Start by adding a new vehicle!
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )}
              {current &&
                current.vehicles.map((veh) => (
                  <Col md={3}>
                    <Card key={veh._id} className="text-center">
                      <Card.Body>
                        <div>{veh.vehicleNumber}</div>
                        <div>{veh.make}</div>
                        <div>{veh.model}</div>

                        {veh.type == "car" ? (
                          <i
                            style={{ fontSize: "3rem" }}
                            class="fas fa-car-side"
                          ></i>
                        ) : (
                          <i
                            style={{ fontSize: "3rem" }}
                            class="fas fa-motorcycle"
                          ></i>
                        )}
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="btn-block"
                          variant="outline-info"
                          as={Link}
                          to={`/cust/vehicle/${veh._id}`}
                        >
                          View
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
            </Row>

            {/* ADD VEHICLE MODAL */}
            <Container className="text-center">
              <Button
                className="mt-4 btn-block"
                variant="primary"
                onClick={handleShow}
              >
                Add New Vehicle
              </Button>
            </Container>

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Vehicle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div class="form-group">
                    <label for="vehicleNumber">Vehicle Number</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="SBA6969K"
                      name="vehicleNumber"
                      onChange={changeHandler}
                    />
                  </div>
                  <div>
                    <Form.Label>Vehicle Type</Form.Label>
                    <Form.Control
                      name="type"
                      onChange={changeHandler}
                      as="select"
                    >
                      <option>Select One..</option>
                      <option>Car</option>
                      <option>Motorcycle</option>
                    </Form.Control>
                  </div>
                  <div class="form-group">
                    <label for="vehicleMake">Vehicle Make</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Honda"
                      name="make"
                      onChange={changeHandler}
                    />
                  </div>
                  <div class="form-group">
                    <label for="vehicleModel">Vehicle Model</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Civic Type R"
                      name="model"
                      onChange={changeHandler}
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={addVehicle} variant="primary">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>

          <Col md={4}>
            <h2>Appointments</h2>
            {current &&
              current.appointments.map((app) => (
                <Col>
                  <Card key={app._id} className="text-center">
                    <Card.Header>{app.date}</Card.Header>
                    <Card.Body>
                      <div>{app.vehicle}</div>
                      <div>{app.work}</div>
                      <div>{app.workshop}</div>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        className="btn-block"
                        variant="outline-info"
                        as={Link}
                        // to={`/cust/vehicle/${veh._id}`}
                      >
                        View
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            <Button className="mt-2" as={Link} to="/appointment">
              Make an Appointment
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cust_Dashboard;
