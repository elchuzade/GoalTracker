import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
// import goalReducer from './goalReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  // goal: goalReducer
})

export type RootState = ReturnType<typeof rootReducer>