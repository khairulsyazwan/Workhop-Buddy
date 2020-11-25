import './App.css'
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Image,
} from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cust_Dashboard from './Page/Cust_Dashboard'
import Cust_Vehicle from './Page/Cust_Vehicle'
import Cust_Appointment from './Page/Cust_Appointment'
import Login from './Auth/Login'
import Register from './Auth/Register'
import WsDashboard from './Page/WsDashboard'
import WsAppointment from './Page/WsAppointment'
import WsJob from './Page/WsJob'
import WsCustomers from './Page/WsCustomers'
import Cust_Workshops from './Page/Cust_Workshops'
import AdminRegister from './Auth/AdminRegister'
import AdminLogin from './Auth/AdminLogin'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isRegis, setIsRegis] = useState(false)

  function logout() {
    localStorage.removeItem('token')
    setIsAuth(false)
  }

  return (
    <Router>
      <Switch>
        <Route path='/dashboard/cust/:id'>
          <Cust_Dashboard />
        </Route>
        <Route path='/cust/vehicle/:id'>
          <Cust_Vehicle />
        </Route>
        <Route path='/cust/appointment/:id'>
          <Cust_Appointment />
        </Route>
        <Route path='/cust/workshops/'>
          <Cust_Workshops />
        </Route>
        <Route path='/dashboard/ws/:id'>
          <WsDashboard />
        </Route>
        <Route path='/ws/appointment/:id'>
          <WsAppointment />
        </Route>
        <Route path='/ws/job/:id'>
          <WsJob />
        </Route>

        <Route path='/ws/customers/:id'>
          <WsCustomers />
        </Route>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <Route path='/login'>
          <Login setIsAuth={setIsAuth} isAuth={isAuth} />
        </Route>
        <Route exact path='/register'>
          <Register setIsRegis={setIsRegis} isRegis={isRegis} />
        </Route>
        <Route exact path='/register/ws'>
          <AdminRegister setIsAuth={setIsAuth} isAuth={isAuth} />
        </Route>
        <Route exact path='/ws/login'>
          <AdminLogin setIsAuth={setIsAuth} isAuth={isAuth} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
