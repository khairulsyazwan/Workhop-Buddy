import React, { useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import moment from "moment";

function Cust_Dashboard({ isAuth, logout, setIsAuth }) {
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
      let token = localStorage.getItem("token");
      let resp = await axios.get(`http://localhost:8080/api/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await setCurrent(resp.data.customer);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCustomerApp() {
    try {
      let token = localStorage.getItem("token");
      let resp = await axios.get(
        `http://localhost:8080/api/customer/${id}/app`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await setCurrentAppointments(resp.data.customer.appointments);
    } catch (error) {
      console.log(error);
    }
  }

  async function getWorkshop() {
    try {
      let token = localStorage.getItem("token");
      let resp = await axios.get(`http://localhost:8080/api/workshop`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      let token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8080/api/customer/newvehicle/${id}`,
        addVehicles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCustomer();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  if (!isAuth) {
    return <Redirect to="/login" />;
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
      let token = localStorage.getItem("token");
      let resp = await axios.post(
        `http://localhost:8080/api/appointment/new/${id}`,
        appoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCustomer();
      getCustomerApp();
      handleClose2();
    } catch (error) {
      console.log(error);
    }
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
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="cont shadow">
        <Row>
          <Col md={8}>
            <div className="my-3">
              <h1>
                Hello <strong>{current && current.firstname}</strong>!
              </h1>
            </div>
            <div className="my-3">
              <h2>
                <i class="far fa-calendar-check"></i> You have
                {currentAppointments && currentAppointments.length === 0
                  ? ` no appointments scheduled.`
                  : ` ${currentAppointments.length} appointments scheduled.`}
              </h2>
            </div>
            <div className="my-3">
              <Button
                className="mx-1 my-1"
                variant="secondary"
                onClick={handleShow2}
              >
                <i class="fas fa-plus"></i> Make an Appointment
              </Button>
            </div>

            <Row>
              {currentAppointments &&
                currentAppointments.map((app) => (
                  <Col lg={4} md={6}>
                    <Card
                      key={app._id}
                      className="text-center mb-3 shadow card"
                      text="dark"
                      style={{ height: "18rem" }}
                    >
                      <Card.Header>
                        {moment(app.date).format("dddd, DD MMMM YYYY")}
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
                        <div>
                          <strong>{app.workshop.name}</strong>
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="btn-block"
                          variant="info"
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
            <Row></Row>
          </Col>

          <Col md={4}>
            <div className="my-3 text-center">
              <h2>Vehicles</h2>
              <Button className="" variant="secondary" onClick={handleShow}>
                <i class="fas fa-plus"></i> Add New Vehicle
              </Button>
            </div>
            <div className="my-3"></div>

            <Container className="text-center">
              <Row>
                {current && current.vehicles.length === 0 && (
                  <Col lg={12}>
                    <Card className="text-center rounded">
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
                    <Col md={12}>
                      <Card key={veh._id} className="text-center mb-3 shadow">
                        <Card.Body>
                          {veh.type === "Car" ? (
                            <i
                              style={{ fontSize: "2rem" }}
                              class="fas fa-car-side"
                            ></i>
                          ) : (
                            <i
                              style={{ fontSize: "2rem" }}
                              class="fas fa-motorcycle"
                            ></i>
                          )}
                          <div>{veh.vehicleNumber}</div>
                          <div>{veh.make + " " + veh.model}</div>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            className="btn-block"
                            variant="info"
                            as={Link}
                            to={`/cust/vehicle/${veh._id}`}
                          >
                            View
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                {/* ADD VEHICLE MODAL */}
                <Container className="text-center"></Container>

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
    </div>
  );
}

export default Cust_Dashboard;
