import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Table,
} from "react-bootstrap";
import { Redirect, useParams } from "react-router-dom";

function WsJob() {
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
      let resp = await axios.get(
        `http://localhost:8080/api/workshop/appointment/${id}`
      );
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
    console.log(job);
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
      let resp = await axios.post(
        `http://localhost:8080/api/workshop/complete/${id}`,
        job
      );
      console.log(resp);

      setredirect(true);
    } catch (error) {
      console.log(error);
    }
    setJob({ ...job, item: newItems });
    console.log(job);
    console.log(newItems);
  }

  if (redirect) {
    return <Redirect to={`/dashboard/ws/${app.workshop}`} />;
  }

  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>Workshop Buddy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link to="#home">Home</Nav.Link>
          <Nav.Link>Features</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <h1>Complete Job</h1>
        <h4>{app && app.vehicle.vehicleNumber}</h4>
        <h4>{app && app.vehicle.make + " " + app.vehicle.model}</h4>
        <h4>{app && app.work}</h4>

        <Form>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            placeholder="Job Completion Date"
            onChange={changeHandler2}
          />

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
      </Container>
    </>
  );
}

export default WsJob;
