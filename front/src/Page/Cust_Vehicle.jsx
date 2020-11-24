import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Cust_Vehicle() {
  const [vehicle, setVehicle] = useState({});
  const { id } = useParams();
  const [records, setrecords] = useState([]);


  useEffect(() => {
    async function getVehicle() {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/customer/vehicle/${id}`
        );
        setVehicle(resp.data.vehicle);

        // console.log(resp.data.vehicle);
      } catch (error) {
        console.log(error);
      }
    }
    async function getSR() {
      try {
        let resp = await axios.get(
          `http://localhost:8080/api/customer/vehicle/${id}/sr`
        );
        setrecords(resp.data.vehicle.serviceRecord);
        // console.log(resp.data.vehicle.serviceRecord);

      } catch (error) {
        console.log(error);
      }
    }
    getVehicle();
    getSR();
  }, []);

  console.log(records);

  return (
    <div>
      <Container>
        <h1>Vehicle Details</h1>
        <Row>
          <Col>
            <h3>{vehicle && vehicle.make}</h3>
            <h3>{vehicle && vehicle.model}</h3>
            <h3>{vehicle && vehicle.vehicleNumber}</h3>
          </Col>
          <Col>
            <h2>Service History</h2>
            {records &&
              records.map((rec) => (
                <Card key={rec._id}>
                  <Card.Body>
                    <h3>
                      {rec.item.map((it, index) => (
                        <li key={index}>
                          {it.item} {it.qty} {it.price}
                        </li>
                      ))}
                    </h3>


                    <h3>{rec.workshop.name}</h3>

                    <h3>{rec.date}</h3>
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cust_Vehicle;
