import React, { useState } from 'react'
import { Button, Col, Container, Form, Image } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'

function Register({ setIsRegis, isRegis }) {
  const [newUser, setNewUser] = useState({})

  function changeHandler(e) {
    setNewUser((user) => ({ ...user, [e.target.name]: e.target.value }))
  }

  let Schema = Yup.object().shape({
    firstname: Yup.string(),
    lastname: Yup.string(),
    email: Yup.string().email(),
    password: Yup.string()
      .label('Password')
      .required()
      .min(2, 'Seems a bit short...')
      .max(10, 'We prefer insecure system, try a shorter password.'),
    confirmPassword: Yup.string()
      .required()
      .label('Confirm password')
      .test(
        'passwords-match',
        'Passwords must match ya fool',
        function (value) {
          return this.parent.password === value
        }
      ),
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
      email: '',
      password: '',
    },
    validationScheme: Schema,
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

          <Form.Row className='mb-3'>
            <Form.Control
              placeholder='First Name'
              onChange={changeHandler}
              name='firstname'
            />
          </Form.Row>
          <Form.Row className='mb-3'>
            <Form.Control
              placeholder='Last Name'
              onChange={changeHandler}
              name='lastname'
            />
          </Form.Row>
          <Form.Row className='mb-3'>
            <Form.Control
              placeholder='Username'
              onChange={changeHandler}
              name='username'
            />
          </Form.Row>
          <Form.Row className='mb-3'>
            <Form.Control
              placeholder='email@email.com'
              onChange={changeHandler}
              name='email'
            />
          </Form.Row>
          <Form.Row className='mb-3'>
            <Form.Control
              onChange={changeHandler}
              placeholder='Password'
              name='password'
              type='password'
            />
          </Form.Row>
          <Form.Row className='mb-3'>
            <Button onClick={register} block>
              Register
            </Button>
          </Form.Row>
          <NavLink to='/login'> Back </NavLink>
        </Col>
      </Container>
    </div>
  )
}

export default Register

//FORMIK CONTROL---------------------------------

// import React from 'react'
// import { Formik, Form } from 'formik'
// import * as Yup from 'yup'
// import FormikControl from './FormikControl'

// function Register() {
//   const options = [
//     { key: 'Email', value: 'emailmoc' },
//     { key: 'Telephone', value: 'telephonemoc' },
//   ]
//   const initialValues = {
//     email: '',
//     passworld: '',
//     confirmPassword: '',
//     phone: '',
//   }

//   const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email format').required('Required'),
//     password: Yup.string().required('Required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), ''], 'Passwords must match')
//       .required('Required'),
//     phone: Yup.string().required('Required'),
//   })

//   const onSubmit = (values) => {
//     console.log('Form data', values)
//   }
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       {(formik) => {
//         return (
//           <Form>
//             <Formik control='input' type='email' label='Email' name='email' />
//             <FormikControl
//               control='input'
//               type='password'
//               label='Password'
//               name='password'
//             />
//             <FormikControl
//               control='input'
//               type='password'
//               label='Confirm Password'
//               name='confirmPassword'
//             />
//             <FormikControl
//               control='input'
//               type='text'
//               label='Phone number'
//               name='phone'
//             />
//             <button type='submit' disabled={!formik.isvalid}>
//               Submit
//             </button>
//           </Form>
//         )
//       }}
//     </Formik>
//   )
// }

// export default Register
