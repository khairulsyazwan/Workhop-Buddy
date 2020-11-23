import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      let token = localStorage.getItem('token')
      let resp = await axios.get('http://localhost:8080/api/auth/test', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(resp.data.user._id);
      localStorage.setItem('user', resp.data.user._id)
      setIsAuth(true)
    } catch (error) {}
  }

  function logout() {
    localStorage.removeItem('token')
    setIsAuth(false)
  }

  return (
    <Router>
      {isAuth && (
        <Navbar>
          <Navbar.Brand>
            <Image
              style={{
                width: '12vw',
                marginBottom: '-3vh',
                marginTop: '-3vh',
              }}
              src='./images/WS.png'
              alt='WorkShop Buddy'
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <NavDropdown title='' id='collasible-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/'>
                Home
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
            </NavDropdown>
            <Nav className=''>
              <Image
                roundedCircle
                src='https://i.imgur.com/iOil1li.png'
                alt='Image'
                style={{ height: '50px', width: '50px' }}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}

      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>

        <Route path='/login'>
          <Login setIsAuth={setIsAuth} isAuth={isAuth} />
        </Route>
        <Route exact path='/register'>
          <Register setIsAuth={setIsAuth} isAuth={isAuth} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
