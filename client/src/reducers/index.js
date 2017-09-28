import { combineReducers } from 'redux';
import authReducer from './authReducer'
import verseReducer from './verseReducer'

export default combineReducers({
  auth: authReducer,
  verse: verseReducer
})
