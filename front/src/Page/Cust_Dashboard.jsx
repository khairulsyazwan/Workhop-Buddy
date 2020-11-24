import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardDeck,
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
  const [appointment, setAppointment] = useState();
  const [workshop, setWorkshop] = useState();
  const [currentAppointments, setCurrentAppointments] = useState([]);

  //add vehicle modal controls
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //add appointments modal controls
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const { id } = useParams();

  useEffect(() => {
    getCustomer();
    getWorkshop();
    getCustomerApp();
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

  async function getCustomerApp() {
    try {
      let resp = await axios.get(
        `http://localhost:8080/api/customer/${id}/app`
      );
      console.log(resp.data.customer.appointments);
      await setCurrentAppointments(resp.data.customer.appointments);
    } catch (error) {
      console.log(error);
    }
  }

  async function getWorkshop() {
    try {
      let resp = await axios.get(`http://localhost:8080/api/workshop`);
      console.log(resp.data);
      await setWorkshop(resp.data.workshop);
    } catch (error) {
      console.log(error);
    }
  }

  function changeHandler(e) {
    setAddVehicles({ ...addVehicles, [e.target.name]: e.target.value });
    console.log(addVehicles);
  }

  function changeHandler2(e) {
    setAppointment((content) => ({
      ...content,
      [e.target.name]: e.target.value,
    }));
  }
  async function addVehicle() {
    try {
      await axios.post(
        `http://localhost:8080/api/customer/newvehicle/${id}`,
        addVehicles
      );
      getCustomer();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  async function addAppointment() {
    try {
      let { vehicle, date, work, others, workshop } = appointment;
      let appoint;
      if (work === "others") {
        appoint = {
          vehicle,
          date,
          work: others,
          workshop,
        };
      } else {
        appoint = { vehicle, date, work, workshop };
      }
      let resp = await axios.post(
        `http://localhost:8080/api/appointment/new/${id}`,
        appoint
      );
      getCustomer();
      getCustomerApp();
      handleClose2();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>Workshop Buddy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Workshops
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container className="my-3">
        <Row>
          <Col md={8}>
            <div className="mb-3">
              <h1>Welcome, {current && current.firstname}!</h1>
            </div>

            <Row>
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
                  <Col md={4} sm={6}>
                    <Card key={veh._id} className="text-center mb-3 shadow">
                      <Card.Body>
                        {veh.type === "Car" ? (
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
                        <div>{veh.vehicleNumber}</div>
                        <div>{veh.make}</div>
                        <div>{veh.model}</div>
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

          <Col md={4} className="text-center">
            <div className="d-flex justify-content-center mb-3">
              <h2>Appointments</h2>
              <Button
                className="my-1 mx-2 rounded-circle"
                variant="primary"
                onClick={handleShow2}
              >
                +
              </Button>
            </div>

            <Container className="text-center">
              <Row>
                {currentAppointments &&
                  currentAppointments.map((app) => (
                    <Col md={6}>
                      <Card
                        key={app._id}
                        className="border-primary text-center mb-3 shadow"
                      >
                        <Card.Header>
                          {app.date}
                          <br />
                          {app.isAcknowledged ? (
                            <span class="badge badge-pill badge-success">
                              Acknowledged
                            </span>
                          ) : (
                            <span class="badge badge-pill badge-danger">
                              Pending
                            </span>
                          )}
                        </Card.Header>
                        <Card.Body>
                          <div>{app.vehicle.vehicleNumber}</div>
                          <div>{app.work}</div>
                          <div>{app.workshop.name}</div>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            className="btn-block"
                            variant="outline-primary"
                            as={Link}
                            to={`/cust/appointment/${app._id}`}
                          >
                            View
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Container>

            {/* New Appointment Modal */}

            <Modal show={show2} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>Make Appointment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Label>Vehicle</Form.Label>
                  <Form.Control
                    name="vehicle"
                    as="select"
                    onChange={changeHandler2}
                  >
                    <option>Select One</option>
                    {current &&
                      current.vehicles.map((el) => (
                        <option value={el._id}>
                          {el.vehicleNumber} {el.make} {el.model}
                        </option>
                      ))}
                  </Form.Control>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    placeholder="Appointment Date"
                    onChange={changeHandler2}
                  />
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    name="work"
                    as="select"
                    onChange={changeHandler2}
                  >
                    <option>Select One</option>
                    <option value="annual servicing">Annual Servicing</option>
                    <option value="engine/fluids">Engine/Fluids</option>
                    <option value="brakes/suspension">Brakes/Suspension</option>
                    <option value="tyres/rims">Tyres/Rims</option>
                    <option value="body/paint">Body/Paint</option>
                    <option value="others">Others</option>
                  </Form.Control>
                  {appointment && appointment.work === "others" && (
                    <>
                      <Form.Label>If others, please specify:</Form.Label>
                      <Form.Control
                        name="others"
                        placeholder="Type"
                        onChange={changeHandler2}
                      />
                    </>
                  )}
                  <Form.Label>Workshop</Form.Label>
                  <Form.Control
                    name="workshop"
                    as="select"
                    onChange={changeHandler2}
                  >
                    <option>Select One</option>
                    {workshop &&
                      workshop.map((el) => (
                        <option value={el._id}>{el.name}</option>
                      ))}
                  </Form.Control>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                  Close
                </Button>
                <Button onClick={addAppointment}>Submit</Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cust_Dashboard;
