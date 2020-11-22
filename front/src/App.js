import './App.css'
import LoginPage from './LoginPage/LoginPage'
import About from './LoginPage/About'
import Contact from './LoginPage/Contact'
import Services from './LoginPage/Services'
import WorkShop from './LoginPage/WorkShop'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path='/' exact component={LoginPage} />
      <Route path='/About' component={About} />
      <Route path='/Contact' component={Contact} />
      <Route path='/Services' component={Services} />
      <Route path='/WorkShop' component={WorkShop} />
    </Router>
  )
}

export default App
