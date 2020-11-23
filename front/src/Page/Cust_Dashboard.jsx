import React, { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {Button, ButtonGroup, Card, Col, Container, Form, Modal, Row} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';


function Cust_Dashboard() {
    let {id} = useParams();
    
    const [current, setCurrent] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [appointment, setAppointment] = useState({});
    const [workshop, setWorkshop] = useState({});

    useEffect(() => {
        getCustomer();
        getWorkshop();
    }, [])
    
    async function getWorkshop() {
        try {
          let resp = await axios.get(`http://localhost:8080/api/workshop`);
          console.log(resp.data);
          await setWorkshop(resp.data.workshop);
        } catch (error) {
          console.log(error);
        }
      }

      async function getCustomer() {
        try {
          let resp = await axios.get(`http://localhost:8080/api/customer/${id}`);
          console.log(resp.data);
          await setCurrent(resp.data);
        } catch (error) {
          console.log(error);
        }
      }

    function changeHandler(e){
        setAppointment((content)=>({...content, [e.target.name]:e.target.value}));
    };
    
    async function addAppointment(){
        try {
            let {vehicle, date, work, others, workshop} = appointment;
            let appoint;
            if(work==="others"){
            appoint = {
                vehicle,
                date,
                work: others,
                workshop,
            };
            } else {
                appoint = {vehicle,date,work, workshop}
            };
            let resp = await axios.post(`http://localhost:8080/api/appointment/new/${id}`,appoint);
        } catch (error) {
            console.log(error);        
        }
    };

    console.log(workshop);
    return (
        <Container fluid>
            {/* <h1>Welcome, {current&&current.customer.firstname}</h1> */}
            <Row>
                <Col>
                <h2>Vehicle List</h2>
                    <Card>
                        <Card.Body>
                            <div>
                                {/* {current && current.customer.vehicles[0].vehicleNumber} */}
                            </div>
                            <div>
                                {/* {current && current.customer.vehicles[0].make + " " + current.customer.vehicles[0].model} */}
                            </div>
                        </Card.Body>
                    </Card>
                <Button as={Link} to="/newvehicle">Add Vehicle</Button>
                </Col>
                <Col>
                My appointments
                <Button onClick={handleShow}>Make Appointment</Button>
                </Col>
            </Row>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Vehicle</Form.Label>
            <Form.Control name="vehicle" as="select" onChange={changeHandler}>
                <option>Select One</option>
                {current.customer.vehicles.map(el=>(
                    <option value={el._id}>{el.vehicleNumber} {el.make} {el.model}</option>
                ))}
            </Form.Control>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder="Appointment Date"
              onChange={changeHandler}
            />
            <Form.Label>Type</Form.Label>
            <Form.Control name="work" as="select" onChange={changeHandler}>
                    <option>Select One</option>
                    <option value="annual servicing">Annual Servicing</option>
                    <option value="engine/fluids">Engine/Fluids</option>
                    <option value="brakes/suspension">Brakes/Suspension</option>
                    <option value="tyres/rims">Tyres/Rims</option>
                    <option value="body/paint">Body/Paint</option>
                    <option value="others">Others</option>
            </Form.Control>
            {appointment.work==="others"&&
            <>
            <Form.Label>If others, please specify:</Form.Label>
            <Form.Control name="others" placeholder="Type" onChange={changeHandler}/>
            </>}
            <Form.Label>Workshop</Form.Label>
            <Form.Control name="workshop" as="select" onChange={changeHandler}>
                <option>Select One</option>
                {workshop.map(el=>(
                    <option value={el._id}>{el.name}</option>
                ))}
            </Form.Control>
            <ButtonGroup>
              <Button onClick={addAppointment}>Submit</Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
        </Container>
    )
}

export default Cust_Dashboard
