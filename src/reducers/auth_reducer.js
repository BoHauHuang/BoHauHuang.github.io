import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_USER,
  FETCH_USER_PROFILE
} from "../actions/types";

const INITIAL_STATE = { authenticated: false, user: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case FETCH_USER:
      return { ...state, ...action.payload };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        role_id: action.payload.role_id,
        name: action.payload.name,
        gender: action.payload.gender
      };
    // case AUTH_ERROR:
  }
  return state;
}
