import "./App.css";
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Image,
} from "react-bootstrap";


import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cust_Dashboard from "./Page/Cust_Dashboard";
import Cust_Vehicle from "./Page/Cust_Vehicle";
import Cust_Appointment from "./Page/Cust_Appointment";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import WsDashboard from "./Page/WsDashboard";
import WsAppointment from "./Page/WsAppointment";
import WsJob from "./Page/WsJob";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      let token = localStorage.getItem("token");
      let resp = await axios.get("http://localhost:8080/api/auth/authtoken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(resp.data.user._id);
      localStorage.setItem("user", resp.data.user._id);
      setIsAuth(true);
    } catch (error) {}
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
  }

  return (
    <Router>
      {isAuth && (
        <Navbar>
          <Navbar.Brand>
            <Image
              style={{
                width: "12vw",
                marginBottom: "-3vh",
                marginTop: "-3vh",
              }}
              src="Public/WS.png"
              alt="WorkShop Buddy"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar>
      )}

      <Switch>
        <Route path="/dashboard/cust/:id">
          <Cust_Dashboard />
        </Route>
        <Route path="/cust/vehicle/:id">
          <Cust_Vehicle />
        </Route>
        <Route path="/cust/appointment/:id">
          <Cust_Appointment />
        </Route>
        <Route path="/dashboard/ws/:id">
          <WsDashboard />
        </Route>
        <Route path="/ws/appointment/:id">
          <WsAppointment />
        </Route>
        <Route path="/ws/job/:id">
          <WsJob />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login setIsAuth={setIsAuth} isAuth={isAuth} />
        </Route>
        <Route exact path="/register">
          <Register setIsAuth={setIsAuth} isAuth={isAuth} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
