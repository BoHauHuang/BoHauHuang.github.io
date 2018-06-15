import {
	FETCH_ANNOUNCEMENTS,
	CREATE_ANNOUNCEMENT,
	FETCH_ANNOUNCEMENT,
	UPDATE_ANNOUNCEMENT,
	DELETE_ANNOUNCEMENT } from '../actions/types';

const INITIAL_STATE = { all: [], announcement: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_ANNOUNCEMENT:
    return { ...state, announcement: action.payload };
  case FETCH_ANNOUNCEMENTS:
    return { ...state, all: action.payload };
    default:
      return state;
  }
}
