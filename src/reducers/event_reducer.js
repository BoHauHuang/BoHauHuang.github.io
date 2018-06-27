import {
  FETCH_EVENTS,
  FETCH_EVENT,
  FETCH_TEAMS,
  DELETE_EVENT,
  ADD_EVENT,
  UPDATE_EVENT,
  REGISTER_TEAM,
  FETCH_PLAYERS,
  REGISTER_PLAYER,
  FETCH_TEAMID
} from '../actions/types';

const INITIAL_STATE = { all: [], event: null , teams: null, player: [], myteam: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_EVENT:
    return { ...state, event: action.payload };
  case FETCH_TEAMS:
    return { ...state, teams: action.payload };
  case FETCH_EVENTS:
    return { ...state, all: action.payload };
  case FETCH_PLAYERS:
  return { ...state, player: action.payload };
  case FETCH_TEAMID:
  return { ...state, myteam: action.payload };
    default:
      return state;
  }
}
