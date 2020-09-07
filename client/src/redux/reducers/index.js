import { combineReducers } from 'redux'
import userReducer from './userReducer'
import profileReducer from './profileReducer'
import goalReducer from './goalReducer'

export default combineReducers({
  user: userReducer,
  profile: profileReducer,
  goal: goalReducer
})
