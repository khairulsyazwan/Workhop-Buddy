import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Cust_Appointment() {
  const [app, setApp] = useState();

  const { id } = useParams();
  useEffect(() => {
    async function getApp(params) {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/customer/appointment/${id}`
        );
        console.log(resp.data.appointment);
        setApp(resp.data.appointment);
      } catch (error) {
        console.log(error);
      }
    }
    getApp();
  }, []);

  return (
    <div>
      <div>
        <Container>
          <h1>Appointment Details</h1>
          {app && app.isAcknowledged ? (
            <span class="badge badge-pill badge-success">Acknowledged</span>
          ) : (
            <span class="badge badge-pill badge-danger">
              Pending Acknowledgement
            </span>
          )}

          <Row>
            <Col>
              <h3>{app && app.date}</h3>
              <h3>{app && app.vehicle.vehicleNumber}</h3>
              <h3>{app && app.vehicle.make + " " + app.vehicle.model}</h3>
              <h3>{app && app.work}</h3>
              <h3>{app && app.workshop.name}</h3>
              <h3>{app && app.workshop.address}</h3>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Cust_Appointment;
