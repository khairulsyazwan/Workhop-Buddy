import React, { useState } from 'react'
import Carousels from './Carousels'
import { Button, Col, Container, Form, Image } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import imgs from '../Public/WS.png'
// import { Formik, Field, Form } from 'formik'
import { useFormik } from 'formik'
import { Schema } from 'mongoose'

function Login({ setIsAuth, isAuth }) {
  const [user, setUser] = useState({})
  const [loggedIn, setloggedIn] = useState(false)

  function changeHandler(e) {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }))
  }

  let Schema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string(),
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
      email: '',
      password: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      // console.log(values)
      login(values)
    },
  })

  async function login(user) {
    try {
      let resp = await axios.post('http://localhost:8080/api/auth/login', user)
      //token is here
      console.log(resp.data)
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('id', resp.data.id)
      setIsAuth(true)
    } catch (error) {
      console.log(error)
    }
  }
  if (isAuth) {
    let id = localStorage.getItem('id')
    return <Redirect to={`/dashboard/cust/${id}`} />
  }
  return (
    <div>
      <Container className='text-center'>
        <Col md={4} className='mx-auto py-5'>
          <Form onSubmit={handleSubmit}>
            <Image
              src={imgs}
              style={{
                height: '25vh',
                marginBottom: '1vh',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            ></Image>

            <Form.Row className='mb-3'>
              <Form.Control
                placeholder='email@email.com'
                value={values.email}
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
                placeholder='password'
                value={values.password}
                name='password'
                type='password'
              />
            </Form.Row>
            <Form.Row className='mb-3'>
              <Button type='submit' block>
                Login
              </Button>
            </Form.Row>
          </Form>
          <NavLink to='/register'>Sign Up Now </NavLink>
          <div>
            <NavLink to='/ws/login'>Admin Login</NavLink>
          </div>
        </Col>
      </Container>
    </div>
  )
}

export default Login

// import React, { useState } from "react";
// import Carousels from "./Carousels";
// import { Button, Col, Container, Form, Image } from "react-bootstrap";
// import { NavLink, Redirect } from "react-router-dom";
// import FormikControl from './FormikControl'

// function Login({ setIsAuth, isAuth }) {
//   const [user, setUser] = useState({});

//   // const [loggedIn, setloggedIn] = useState(false);

//   function changeHandler(e) {
//     setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
//   }

//   async function login() {
//     try {
//       let resp = await axios.post("http://localhost:8080/api/auth/login", user);
//       //token is here
//       console.log(resp.data);
//       localStorage.setItem("token", resp.data.token);
//       localStorage.setItem("id", resp.data.id);
//       setIsAuth(true);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   if (isAuth) {
//     let id = localStorage.getItem("id");
//     return <Redirect to={`/dashboard/customer/${id}`} />;
//   }

//   return (
//     <>
//       <div style={{ height: "100vh" }} className="splash">
//         <Container className="text-center">
//           <Col md={4} className="mx-auto py-5">
//             <Image
//               src="./images/WS.png"
//               style={{
//                 height: "25vh",
//                 marginBottom: "-5vh",
//                 maxWidth: "100%",
//                 maxHeight: "100%",
//               }}
//             ></Image>

//             <Form.Row className="mb-3">
//               <Form.Control
//                 placeholder="email@email.com"
//                 onChange={changeHandler}
//                 name="email"
//               />
//             </Form.Row>
//             <Form.Row className="mb-3">
//               <Form.Control
//                 onChange={changeHandler}
//                 placeholder="password"
//                 name="password"
//                 type="password"
//               />
//             </Form.Row>
//             <Form.Row className="mb-3">
//               <Button block onClick={login}>
//                 Login
//               </Button>
//             </Form.Row>
//             <NavLink to="/register">Sign Up Now </NavLink>
//             <div>
//             <NavLink to="/AdminLogin">Admin Login</NavLink>
//             </div>
//           </Col>
//         </Container>
//         <Carousels />
//       </div>
//     </>
//   );
// }

// export default Login;
