import React, { useState } from "react";
import Carousels from "./Carousels";
import { Button, Col, Container, Form, Image } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import imgs from "../Public/WS.png";
// import { Formik, Field, Form } from 'formik'
import { useFormik } from "formik";
import { Schema } from "mongoose";

function Login({ setIsAuth, isAuth }) {
  const [user, setUser] = useState({});
  const [loggedIn, setloggedIn] = useState(false);

  function changeHandler(e) {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }

  let Schema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string(),
  });
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      // console.log(values)
      login(values);
    },
  });

  async function login(user) {
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
    return <Redirect to={`/dashboard/cust/${id}`} />;
  }
  return (
    <div className="cdash2 d-flex align-items-center">
      <Container className="text-center">
        <Col md={4} className="mx-auto py-4 cont2 shadow">
          <h3>
            <strong>
              WORKSHOP <i class="fas fa-tools"></i> BUDDY
            </strong>
          </h3>
          <Form onSubmit={handleSubmit}>
            <div className="my-2">USER LOGIN</div>
            <Form.Row className="mb-3">
              <Form.Control
                placeholder="email@email.com"
                value={values.email}
                onChange={handleChange}
                name="email"
                className={touched.email && errors.email ? `is-invalid` : null}
              />
              {touched.email && errors.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Control
                onChange={handleChange}
                placeholder="password"
                value={values.password}
                name="password"
                type="password"
              />
            </Form.Row>
            <Form.Row className="mb-3">
              <Button type="submit" block>
                Login
              </Button>
            </Form.Row>
          </Form>
          <NavLink to="/register">Sign Up Now </NavLink>
          <div className="my-1">
            <NavLink to="/ws/login">Admin Login</NavLink>
          </div>
        </Col>
      </Container>
    </div>
  );
}

export default Login;
