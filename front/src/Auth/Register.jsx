import React, { useState } from 'react'
import { Button, Col, Container, Form, Image } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'

function Register({ setIsRegis, isRegis }) {
  const [newUser, setNewUser] = useState({})


  function changeHandler(e) {
    setNewUser((user) => ({ ...user, [e.target.name]: e.target.value }))
  }

  async function register() {
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
    <div style={{ height: '400vh' }} className='splash'>
      <Container className='text-center'>
        <Col md={4} className='mx-auto py-5'>
          <Image
            src='../images/WS.png'
            style={{ height: '25vh', marginBottom: '-5vh' }}
          ></Image>

          <Form.Row className='mb-3'>
            <Form.Control
              placeholder='firstname'
              onChange={changeHandler}
              name='firstname'
            />
          </Form.Row>
          <Form.Row className='mb-3'>
            <Form.Control
              placeholder='lastname'
              onChange={changeHandler}
              name='lastname'
            />
          </Form.Row>
          <Form.Row className='mb-3'>
            <Form.Control
              placeholder='username'
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
              placeholder='password'
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
