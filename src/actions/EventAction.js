import axios from "axios";

const ROOT_URL = "http://www.hy0936.com.tw:9990/api";
const USER_URL = "http://www.hy0936.com.tw:9990/api/user/";
const EVENT_URL = "http://www.hy0936.com.tw:9990/api/event/";
const TEAM_URL = "http://www.hy0936.com.tw:9990/api/team/";
const TEAMMEM_URL = "http://www.hy0936.com.tw:9990/api/teammember/";

import history from "../history";

import {
  FETCH_EVENTS,
  FETCH_EVENT,
  FETCH_TEAMS,
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  REGISTER_TEAM,
  FETCH_PLAYERS,
  REGISTER_PLAYER,
  SET_EVENTS_LOADED,
  SET_TEAMS_LOADED,
  EVENT_MSG,
  REGISTER_USER_TEAM
} from "./types";

const token = localStorage.getItem("token");

export function fetchEvents() {
  return function(dispatch) {
    console.log("Start [fetchEvents]");
    axios
      .get(EVENT_URL)
      .then(response => {
        // console.log(response.data);
        dispatch({ type: FETCH_EVENTS, payload: response.data });
        dispatch({ type: SET_EVENTS_LOADED });
        console.log("Success [fetchEvents]");
      })
      .catch(response => {
        console.log("Failed [fetchEvents]");
        console.log(response);
      });
  };
}

export function fetchEvent(event_id) {
  return function(dispatch) {
    dispatch({ type: FETCH_EVENT, payload: event_id });
  };
}

export function createEvent({
  name,
  description,
  rule,
  team_max,
  member_min,
  member_max,
  regist_start,
  regist_end,
  event_start,
  event_end
}) {
  return function(dispatch) {
    var data = {
      name,
      description,
      rule,
      team_max,
      member_min,
      member_max,
      regist_start,
      regist_end,
      event_start,
      event_end
    };
    axios
      .post(EVENT_URL, data)
      .then(response => {
        //console.log(response);
        console.log("Event added.");
        history.push('/event/');
        dispatch({ type: CREATE_EVENT, payload: response.data });
        dispatch({ type: EVENT_MSG, payload: { type: 'success', 'msg': '新增活動成功！' } });
      })
      .catch(response => {
        console.log("Cannot add event.");
        dispatch({ type: EVENT_MSG, payload: { type: 'danger', 'msg': '發生錯誤，無法新增該活動。' } });
        console.log(response);
      });
  };
}

export function deleteEvent(event_id) {
  return dispatch => {
    console.log("Start [deleteEvent]");
    axios
      .delete(`${EVENT_URL}` + event_id + "/")
      .then(response => {
        console.log("Success [deleteEvent]");
        dispatch({ type: DELETE_EVENT, payload: event_id });
        dispatch({ type: EVENT_MSG, payload: { type: 'success', 'msg': '成功刪除該活動。' } });
        history.push('/event/');
      })
      .catch(response => {
        console.log(response);
        console.log("Failure [deleteEvent]");
        dispatch({ type: EVENT_MSG, payload: { type: 'danger', 'msg': '發生錯誤，無法刪除該活動。' } });
      });
  };
}

export function updateEvent({
  event_id,
  name,
  description,
  rule,
  team_max,
  member_min,
  member_max,
  regist_start,
  regist_end,
  event_start,
  event_end
}) {
  return function(dispatch) {
    var data = {
      name,
      description,
      rule,
      team_max,
      member_min,
      member_max,
      regist_start,
      regist_end,
      event_start,
      event_end
    };
    axios
      .put(`${EVENT_URL}` + event_id + "/", data)
      .then(response => {
        console.log(response);
        history.push(`/event/${event_id}`);
        dispatch({ type: UPDATE_EVENT, payload: response.data });
      })
      .catch(response => {
        console.log("Edit the event failed.");
        console.log(response);
      });
  };
}

//////////////////////////register/////////////////////////////////

export function registerTeamToEvent({ name, members, event_id }) {
  return dispatch => {
    var data = {
      name: name,
      event_id: event_id,
      verify: 1
    };

    console.log("Start [registerTeamToEvent]");

    axios
      .post(TEAM_URL, data)
      .then(response => {
        const team_id = response.data.id;
        members.forEach((user_id) => {
          dispatch(registerMemberToTeam({ team_id, user_id} ));
        });
        console.log("Success [registerTeamToEvent]");
        history.push("/event/participation");
        // dispatch({ type: CREATE_TEAM, payload: response.data});
      })
      .catch(response => {
        console.log(data);
        console.log("Failed [registerTeamToEvent]");
      });
  };
}

export function registerMemberToTeam({ team_id, user_id }) {
  return dispatch => {
    var data = {
      team_id: team_id,
      user_id: user_id
    };
    console.log("Start [registerMemberToTeam]");
    axios
      .post(TEAMMEM_URL, data)
      .then(response => {
        dispatch({ type: REGISTER_USER_TEAM, payload: response.data});
        console.log("Success user_id: ", user_id, " [registerMemberToTeam]");
      })
      .catch(response => {
        console.log("Failed user_id: ", user_id, " [registerMemberToTeam]");
      });
  };
}

export function fetchTeams() {
  return (dispatch, getState) => {
    if ( !getState().event.isTeamLoaded ) {
      console.log("Start [fetchTeams]");
      axios
        .get(TEAM_URL)
        .then(response => {
          console.log("Success [fetchTeams]");
           // console.log(response.data);
          dispatch({ type: FETCH_TEAMS, payload: response.data});
          dispatch({ type: SET_TEAMS_LOADED });
        })
    }
  }
}

export function deleteParticipate(team_id){
  return dispatch => {
    console.log("Start [delete participation]");
    axios
      .delete(`${TEAM_URL}` + team_id + "/")
      .then(response => {
        console.log("Success [delete participation]");
        history.push('/event/participation');
      })
      .catch(response => {
        console.log(response);
        console.log("Failure [delete participation]");
      });
  };
}
