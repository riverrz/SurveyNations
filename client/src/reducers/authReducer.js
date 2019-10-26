import { FETCH_USER, LOADING } from "../actions/types";

const initialState = {
  loading: false,
  user: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_USER:
      // empty string when not logged in so return false if empty string
      return {
        loading: false,
        user: action.payload || false
      }
    default:
      return state;
  }
}
