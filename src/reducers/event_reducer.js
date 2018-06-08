import { FETCH_EVENTS, FETCH_EVENT } from '../actions/types';

const INITIAL_STATE = { all: [], event: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_EVENT:
    return { ...state, event: action.payload };
  case FETCH_EVENTS:
    return { ...state, all: action.payload };
    default:
      return state;
  }
}