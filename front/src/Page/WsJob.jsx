import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
  Table,
} from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";

function WsJob({ isAuth, logout, setIsAuth }) {
  const [job, setJob] = useState();
  const [app, setapp] = useState();
  const [newItems, setNewItems] = useState([]);
  const [temp, settemp] = useState();
  const { id } = useParams();
  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    getApp();
  }, []);

  async function getApp() {
    try {
      let token = localStorage.getItem("token");
      let resp = await axios.get(`/api/workshop/appointment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(resp.data.appointment);
      setapp(resp.data.appointment);
    } catch (error) {
      console.log(error);
    }
  }

  // addnewitems
  function changeHandler(e) {
    settemp({ ...temp, [e.target.name]: e.target.value });
    // console.log(temp);
  }

  function changeHandler2(e) {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
      workshop: app.workshop,
    });
    // console.log(job);
  }

  // items in list
  function addItems() {
    setNewItems([...newItems, temp]);
    if (job.item) {
      let rand = job;
      //   console.log(rand.item);
      rand.item.push(temp);
      setJob(rand);
    } else {
      setJob({ ...job, item: [temp] });
    }

    // console.log(items);
    // console.log(job);
  }

  function addJob() {}

  async function completeJob() {
    try {
      let token = localStorage.getItem("token");
      let resp = await axios.post(`/api/workshop/complete/${id}`, job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(resp);

      setredirect(true);
    } catch (error) {
      console.log(error);
    }
    setJob({ ...job, item: newItems });
    // console.log(job);
    // console.log(newItems);
  }

  if (redirect) {
    return <Redirect to={`/dashboard/ws/${app.workshop}`} />;
  }

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
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="cont">
        <Row>
          <Col>
            <div className="my-3 mx-3">
              <h1>Complete Job</h1>
              <h4>{app && app.vehicle.vehicleNumber}</h4>
              <h4>{app && app.vehicle.make + " " + app.vehicle.model}</h4>
              <h4>{app && app.work}</h4>
            </div>

            <Form>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                placeholder="Job Completion Date"
                onChange={changeHandler2}
              />
              <div className="my-2">
                <Form.Label>Items</Form.Label>
                <Form.Row>
                  <Col>
                    <Form.Control
                      onChange={changeHandler}
                      name="item"
                      placeholder="Item"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      onChange={changeHandler}
                      name="qty"
                      placeholder="Quantity"
                      type="number"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      onChange={changeHandler}
                      name="price"
                      placeholder="Price"
                      type="number"
                    />
                  </Col>

                  <Button onClick={addItems}>+</Button>
                </Form.Row>
              </div>
            </Form>
            {newItems.length > 0 && (
              <Table className="mt-3" striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {newItems.map((it, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{it.item}</td>
                      <td>{it.qty}</td>
                      <td>{it.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Button onClick={completeJob} className="btn-block mt-4">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WsJob;
