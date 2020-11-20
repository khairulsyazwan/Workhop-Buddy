import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

function App() {
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
