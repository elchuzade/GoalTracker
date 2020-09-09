import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './utils/PrivateRoute'
import { logoutUser, setCurrentUser } from './redux/actions/auth'
import './assets/styles/App.scss'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import CalendarPage from './pages/CalendarPage'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/reducers'
function App() {
  const dispatch = useDispatch()
  // const auth = useSelector(state => state)
  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = () => {
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken)
      // Decode Token and get user info and expiration
      const decoded: jwtDecode = jwt_decode(localStorage.jwtToken)
      if (decoded.profile)
        return true
      // Set user and isAuthenticated
      dispatch(setCurrentUser(decoded))
      // Check for expired token
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        // Logout user
        dispatch(logoutUser())
        // Redirect to login
        window.location.href = '/signin'
      } 
    }
    return false
  }

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={CalendarPage} isAuthenticated={checkToken()} />
        <Route exact path='/signup' component={SignupPage} />
        <Route exact path='/signin' component={SigninPage} />
      </Switch>
    </Router>
  );
}

export default App;
