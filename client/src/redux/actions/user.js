import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

export const signupAction = (data) => async dispatch => {
  try {
    const response = await axios.post('/api/users/signup', data)

    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to empty object thus isAuthenticated to false
  dispatch(setCurrentUser({}))
  dispatch({
    type: 'GET_MY_WEBINARS',
    payload: []
  })
  dispatch({
    type: 'GET_MY_COMMUNITIES',
    payload: []
  })
  dispatch({
    type: 'GET_MY_PROFILE',
    payload: {}
  })
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: 'SET_CURRENT_USER',
    payload: decoded
  }
}