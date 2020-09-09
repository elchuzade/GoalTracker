import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const signupAction = (data: SignupData) => async (dispatch: any) => {
  try {
    const res = await axios.post('/api/users/signup', data)
    if (res.status === 200) {
      dispatch(signinProcess(res.data))
    }
  } catch (err) {
    console.log(err)
  }
}

export const signinAction = (userData: SigninData) => async (dispatch: any) => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      dispatch(signinProcess(res.data))
    })
    .catch(err => console.log(err))
}

export const logoutUser = () => (dispatch: any) => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken') 
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to empty object thus isAuthenticated to false
  dispatch(setCurrentUser())
}

//////   COMMONLY USED FUNCTIONS   //////

const signinProcess = (data: SigninResponse) => (dispatch: any) => {
  // Save to local storage
  const { token } = data
  // Set token to local storage
  localStorage.setItem('jwtToken', token)
  // Set token to auth header
  setAuthToken(token)
  // Decode token to get user data
  const decoded: jwtDecode = jwt_decode(token)
  // Set current user
  dispatch(setCurrentUser(decoded))
  // dispatch(getMyProfile(decoded.profile))
}

// Set logged in user
export const setCurrentUser = (decoded?: jwtDecode) => (dispatch: any) => {
  dispatch({
    type: 'SET_CURRENT_USER',
    payload: decoded ? decoded : {}
  })
}