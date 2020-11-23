import React, { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

function Cust_Dashboard() {
    let {id} = useParams();
    
    const [current, setCurrent] = useState({});

    useEffect(() => {
        getCustomer();
    }, [])
    
    async function getCustomer() {
        try {
          let resp = await axios.get(`http://localhost:8080/api/customer/${id}`);
          console.log(resp.data);
          await setCurrent(resp.data);
        } catch (error) {
          console.log(error);
        }
      }

    console.log(current);
    return (
        <Container fluid>
            <h1>Welcome, {current&&current.customer.firstname}</h1>
            <Row>
                <Col>
                <h2>Vehicle List</h2>
                    <Card>
                        <Card.Body>
                            <div>
                                {current && current.customer.vehicles[0].vehicleNumber}
                            </div>
                            <div>
                                {current && current.customer.vehicles[0].make + " " + current.customer.vehicles[0].model}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                My appointments
                <Button as={Link} to="/appointment">Make Appointment</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Cust_Dashboard
