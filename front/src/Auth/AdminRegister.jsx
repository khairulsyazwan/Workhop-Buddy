import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, Form, Image } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import * as Yup from "yup";

function AdminRegister({ isAuth, setIsAuth }) {
  const [newUser, setNewUser] = useState({});

  function changeHandler(e) {
    setNewUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  let Schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    name: Yup.string().min(5, "Too Short!").required("Required"),
    phone: Yup.number().required("Required"),
    address: Yup.string().min(8, "Too Short!").required("Required"),
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
      name: "",
      phone: "",
      address: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);
      register(values);
    },
  });

  async function register(user) {
    try {
      let resp = await axios.post(
        "http://localhost:8080/api/auth/register/ws",
        user
      );
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (isAuth) {
    return <Redirect to={"/ws/login"} />;
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
          <div className="my-1">REGISTER</div>
          <Form onSubmit={handleSubmit}>
            <Form.Row className="mb-3">
              <Form.Control
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={values.email}
                className={touched.email && errors.email ? `is-invalid` : null}
              />
              {touched.email && errors.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Control
                onChange={handleChange}
                placeholder="Password"
                value={values.password}
                name="password"
                type="password"
                className={
                  touched.password && errors.email ? `is-invalid` : null
                }
              />
              {touched.password && errors.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Control
                placeholder="Workshop Name"
                onChange={handleChange}
                value={values.name}
                name="name"
                className={touched.name && errors.name ? `is-invalid` : null}
              />
              {touched.name && errors.name ? (
                <div className="invalid-feedback">{errors.name}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Control
                placeholder="Address"
                onChange={handleChange}
                value={values.address}
                name="address"
                className={
                  touched.address && errors.address ? `is-invalid` : null
                }
              />
              {touched.address && errors.address ? (
                <div className="invalid-feedback">{errors.address}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Control
                placeholder="Phone Number"
                onChange={handleChange}
                value={values.phone}
                name="phone"
                className={touched.phone && errors.phone ? `is-invalid` : null}
              />
              {touched.phone && errors.phone ? (
                <div className="invalid-feedback">{errors.phone}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Button type="submit" block>
                Register
              </Button>
            </Form.Row>
          </Form>
          <NavLink to="/ws/login"> Back </NavLink>
        </Col>
      </Container>
    </div>
  );
}

export default AdminRegister;
