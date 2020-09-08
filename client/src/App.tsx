import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './utils/PrivateRoute'
import { logoutUser, setCurrentUser } from './redux/actions/user'
import store from './store'
import './assets/styles/App.scss'
import SignupPage from './pages/SignupPage'

const checkToken = () => {
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken)
    // Decode Token and get user info and expiration
    const decoded: jwtDecode = jwt_decode(localStorage.jwtToken)
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded))
    if (decoded.profile) {
      return true
    }
    // Check for expired token
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser())
      // Redirect to login
      window.location.href = '/login'
    }
  }
  return false
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/signup' component={SignupPage} />
      </Switch>
    </Router>
  );
}

export default App;
