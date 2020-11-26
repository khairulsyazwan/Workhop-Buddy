import React, { useState } from 'react'
import { Button, Col, Container, Form, Image } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Field, ErrorMessage, useFormik } from 'formik'
function Register({ setIsRegis, isRegis }) {
  const [newUser, setNewUser] = useState({})

  function changeHandler(e) {
    setNewUser((user) => ({ ...user, [e.target.name]: e.target.value }))
  }

  let Schema = Yup.object().shape({
    firstname: Yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(70, 'Too Long!'),
    lastname: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),

    username: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),

    password: Yup.string()
      .label('Password')
      .required('Required')
      .min(2, 'Seems a bit short...')
      .max(10, 'We prefer insecure system, try a shorter password.'),
  })

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      register(values)
    },
  })
  async function register(user) {
    try {
      let resp = await axios.post(
        'http://localhost:8080/api/auth/register',
        newUser
      )
      setIsRegis(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (isRegis) {
    return <Redirect to={'/'} />
  }

  return (
    <div className='cdash2 d-flex align-items-center'>
      <Container className='text-center'>
        <Col md={4} className='mx-auto py-4 cont2 shadow'>
          <h3>
            <strong>
              WORKSHOP <i class='fas fa-tools'></i> BUDDY
            </strong>
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Row className='mb-3'>
              <Form.Control
                placeholder='First Name'
                values={values.firstname}
                onChange={handleChange}
                name='firstname'
                className={
                  touched.firstname && errors.firstname ? `is-invalid` : null
                }
              />
              {touched.firstname && errors.firstname ? (
                <div className='invalid-feedback'>{errors.firstname}</div>
              ) : null}
            </Form.Row>
            <Form.Row className='mb-3'>
              <Form.Control
                placeholder='Last Name'
                values={values.lastname}
                onChange={handleChange}
                name='lastname'
                className={
                  touched.lastname && errors.lastname ? `is-invalid` : null
                }
              />
              {touched.lastname && errors.lastname ? (
                <div className='invalid-feedback'>{errors.lastname}</div>
              ) : null}
            </Form.Row>
            <Form.Row className='mb-3'>
              <Form.Control
                placeholder='Username'
                values={values.username}
                onChange={handleChange}
                name='username'
                className={
                  touched.username && errors.username ? `is-invalid` : null
                }
              />
              {touched.username && errors.username ? (
                <div className='invalid-feedback'>{errors.username}</div>
              ) : null}
            </Form.Row>
            <Form.Row className='mb-3'>
              <Form.Control
                placeholder='email@email.com'
                values={values.email}
                onChange={handleChange}
                name='email'
                className={touched.email && errors.email ? `is-invalid` : null}
              />
              {touched.email && errors.email ? (
                <div className='invalid-feedback'>{errors.email}</div>
              ) : null}
            </Form.Row>
            <Form.Row className='mb-3'>
              <Form.Control
                onChange={handleChange}
                placeholder='Password'
                values={values.password}
                name='password'
                type='password'
                className={
                  touched.password && errors.password ? `is-invalid` : null
                }
              />
              {touched.password && errors.password ? (
                <div className='invalid-feedback'>{errors.password}</div>
              ) : null}
            </Form.Row>
            <Form.Row className='mb-3'>
              <Button type='submit' block>
                Register
              </Button>
            </Form.Row>
          </Form>
          <NavLink to='/login'> Back </NavLink>
        </Col>
      </Container>
    </div>
  )
}

export default Register
