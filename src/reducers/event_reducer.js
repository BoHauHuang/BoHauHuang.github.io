import {
  FETCH_EVENTS,
  FETCH_EVENT,
  FETCH_TEAMS,
  FETCH_TEAM,
  DELETE_EVENT,
  CREATE_EVENT,
  UPDATE_EVENT,
  REGISTER_TEAM,
  FETCH_PLAYERS,
  REGISTER_PLAYER,
  FETCH_TEAMID,
  SET_EVENTS_LOADED,
  SET_TEAMS_LOADED,
  EVENT_MSG,
  SETTLE_TEAM
} from "../actions/types";

const INITIAL_STATE = {
  event: {
    ids: [],
    objs: {}
  },
  isEventLoaded: false,
  currentEventId: ``,
  team: {
    ids: [],
    objs: {}
  },
  isTeamLoaded: false,
  isTeamSettled: false,
  currentTeamId: ``,
  message: ``
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      const objs = Object.assign(
        {},
        state.event.objs,
        ...action.payload.map(event => ({
          [event.id]: event
        }))
      );
      return {
        ...state,
        event: { objs, ids: Object.keys(objs) },
        isEventLoaded: true
      };
    case FETCH_EVENT:
      return { ...state, currentEventId: action.payload };
    case UPDATE_EVENT:
      return {
        ...state,
        event: {
          objs: Object.assign({}, state.event.objs, {[action.payload.id]: action.payload}),
          ids: state.event.ids
        },
        isEventLoaded: true
      };
    case CREATE_EVENT:
      return {
        ...state,
        event: {
          objs: Object.assign({}, state.event.objs, {[action.payload.id]: action.payload}),
          ids: _.union(state.ids, [action.payload.id])
        },
        isEventLoaded: true, 
        message: ``
      };
    case FETCH_TEAMS:
      const team_objs = Object.assign(
        {},
        state.team.objs,
        ...action.payload.map(team => ({
          [team.id]: {
            id: team.id,
            event_id: team.event_id,
            verify: team.verify,
            created_at: team.created_at,
            name: team.name,
            userIds: team.track_team.map(entry => {
              return entry.user_id;
            })
          }
        }))
      );
      return {
        ...state,
        team: { objs: team_objs, ids: Object.keys(team_objs) },
        isTeamLoaded: true
      };
    case SET_TEAMS_LOADED:
      return { ...state, isTeamLoaded: action.payload };
    case FETCH_TEAM:
      return { ...state, currentTeamId: action.payload };
    case SETTLE_TEAM:
      return { ...state, isTeamSettled: action.payload };
    case EVENT_MSG: 
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
