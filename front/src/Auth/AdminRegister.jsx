// import axios from "axios";
// import React, { useState } from "react";
// import { Button, Col, Container, Form, Image } from "react-bootstrap";
// import { NavLink, Redirect } from "react-router-dom";

// function AdminRegister({ isAuth, setIsAuth }) {
//   const [newUser, setNewUser] = useState({});

//   function changeHandler(e) {
//     setNewUser((user) => ({ ...user, [e.target.name]: e.target.value }));
//   }

//   async function register() {
//     try {
//       let resp = await axios.post(
//         "http://localhost:8080/api/auth/register/ws",
//         newUser
//       );
//       setIsAuth(true);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   if (isAuth) {
//     return <Redirect to={"/login"} />;
//   }
//   return (
//     <div>
//       <Container className="text-center">
//         <Col md={4} className="mx-auto py-5">
//           <Image
//             src="../images/WS.png"
//             style={{ height: "25vh", marginBottom: "-5vh" }}
//           ></Image>

//           <Form.Row className="mb-3">
//             <Form.Control
//               placeholder="email@email.com"
//               onChange={changeHandler}
//               name="email"
//             />
//           </Form.Row>
//           <Form.Row className="mb-3">
//             <Form.Control
//               onChange={changeHandler}
//               placeholder="password"
//               name="password"
//               type="password"
//             />
//           </Form.Row>
//           <Form.Row className="mb-3">
//             <Form.Control
//               placeholder="name"
//               onChange={changeHandler}
//               name="name"
//             />
//           </Form.Row>
//           <Form.Row className="mb-3">
//             <Form.Control
//               placeholder="address"
//               onChange={changeHandler}
//               name="address"
//             />
//           </Form.Row>
//           <Form.Row className="mb-3">
//             <Form.Control
//               placeholder="phone"
//               onChange={changeHandler}
//               name="phone"
//             />
//           </Form.Row>
//           <Form.Row className="mb-3">
//             <Button onClick={register} block>
//               Register
//             </Button>
//           </Form.Row>
//           <NavLink to="/login"> Back </NavLink>
//         </Col>
//       </Container>
//     </div>
//   );
// }

// export default AdminRegister;
