import React, { useState } from "react";
import { Button, Col, Container, Form, Image } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";

function Register({ setIsAuth, isAuth }) {
  const [newUser, setNewUser] = useState({});

  function changeHandler(e) {
    setNewUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }

  async function register() {
    try {
      let resp = await axios.post(
        "http://localhost:8080/api/auth/register",
        newUser
      );
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (isAuth) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div style={{ height: "400vh" }} className="splash">
      <Container className="text-center">
        <Col md={4} className="mx-auto py-5">
          <Image
            src="../images/WS.png"
            style={{ height: "25vh", marginBottom: "-5vh" }}
          ></Image>

          <Form.Row className="mb-3">
            <Form.Control
              placeholder="firstname"
              onChange={changeHandler}
              name="firstname"
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Control
              placeholder="lastname"
              onChange={changeHandler}
              name="lastname"
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Control
              placeholder="username"
              onChange={changeHandler}
              name="username"
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Control
              placeholder="email@email.com"
              onChange={changeHandler}
              name="email"
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Control
              onChange={changeHandler}
              placeholder="password"
              name="password"
              type="password"
            />
          </Form.Row>
          <Form.Row className="mb-3">
            <Button onClick={register} block>
              Register
            </Button>
          </Form.Row>
          <NavLink to="/login"> Back </NavLink>
        </Col>
      </Container>
    </div>
  );
}

export default Register;
