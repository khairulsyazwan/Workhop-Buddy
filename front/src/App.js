import "./App.css";
import LoginPage from "./LoginPage/LoginPage";
import About from "./LoginPage/About";
import Contact from "./LoginPage/Contact";
import Services from "./LoginPage/Services";
import WorkShop from "./LoginPage/WorkShop";
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
      <Switch>
        <Route path="/" exact component={LoginPage} />
        {/* home page */}
        <Route path="/About" component={About} />
        <Route path="/Contact" component={Contact} />
        <Route path="/Services" component={Services} />
        <Route path="/WorkShop" component={WorkShop} />
        <Route path="/register"></Route>
        {/* register page */}
        <Route path="/dashboard/cust/:id">
          <Cust_Dashboard />
        </Route>
        <Route path="/cust/vehicle/:id">
          <Cust_Vehicle />
        </Route>
        <Route path="/cust/appointment/:id">
          <Cust_Appointment />
        </Route>

        {/* customer dashboard */}
        <Route path="/dashboard/ws/:id"></Route>
        {/* workshop dashboard */}
        <Route></Route>
      </Switch>
    </Router>
  );
}

export default App;
