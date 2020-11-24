import React, { useState } from "react";
import Carousels from './Carousels'
import { Button, Col, Container, Form, Image } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";


function Login({ setIsAuth, isAuth }) {
  const [user, setUser] = useState({});

  // const [loggedIn, setloggedIn] = useState(false);

  function changeHandler(e) {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }

  async function login() {
    try {
      let resp = await axios.post("http://localhost:8080/api/auth/login", user);
      //token is here
      console.log(resp.data);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("id", resp.data.id);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (isAuth) {
    let id = localStorage.getItem("id");
    return <Redirect to={`/dashboard/${id}`} />;
  }

  return (
    <>
    <div style={{ height: "100vh" }} className="splash">
      <Container className="text-center">
        <Col md={4} className="mx-auto py-5">
          <Image
            src="./images/WS.png"
            style={{
              height: "25vh",
              marginBottom: "-5vh",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          ></Image>

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
            <Button block onClick={login}>
              Login
            </Button>
          </Form.Row>
          <NavLink to="/register">Sign Up Now</NavLink>
        </Col>
      </Container>
      <Carousels />
    </div>
    </>
  );
}

export default Login;
