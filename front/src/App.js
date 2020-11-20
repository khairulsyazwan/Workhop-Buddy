import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

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
        <Route exact path="/"></Route>
        {/* home page */}
        <Route path="login"></Route>
        {/* login page */}
        <Route path="/register"></Route>
        {/* register page */}
        <Route path="/dashboard/cust/:id"></Route>
        {/* customer dashboard */}
        <Route path="/dashboard/ws/:id"></Route>
        {/* workshop dashboard */}
        <Route></Route>
      </Switch>
    </Router>
  );
}

export default App;
