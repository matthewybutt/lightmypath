import { FETCH_USER } from '../actions/types'

const initialAuthState = {}

export default function (state = initialAuthState, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
