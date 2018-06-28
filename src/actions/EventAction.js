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
  EVENT_MSG
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
      })
      .catch(response => {
        console.log("Cannot add event.");
        console.log(response);
      });
  };
}

export function deleteEvent(event_id) {
  return dispatch => {
    axios
      .delete(`${EVENT_URL}` + event_id + "/")
      .then(response => {
        dispatch({ type: DELETE_EVENT, payload: event_id });
        history.push('/event/');
      })
      .catch(response => {
        console.log(response);
      });
  };
}

export function updateEvent({
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
        // dispatch({ type: CREATE_TEAM, payload: response.data});
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

// export function FetchPlayers({ leader, member1, member2 }) {
//   return dispatch => {
//     var data = [leader, member1, member2];
//     axios
//       .get(USER_URL)
//       .then(response => {
//         console.log("fetch players successfully");
//         var length = response.data.length;
//         var num = data.length;

//         while (num >= 0) {
//           var count = 0;
//           while (count < length) {
//             if (
//               response.data[count].is_active &&
//               response.data[count].username == data[num]
//             ) {
//               console.log(response.data[count]);
//               dispatch({ type: FETCH_PLAYERS, payload: response.data[count] });
//             }
//             count++;
//           }
//           num--;
//         }
//       })
//       .catch(response => {
//         console.log(response);
//         console.log("fetch failed");
//       });
//   };
// }

// export function FetchTeamID({ team_name }) {
//   return dispatch => {
//     axios.get(TEAM_URL).then(response => {
//       var length = response.data.length;
//       while (length--) {
//         if (response.data[length].name == team_name) {
//           console.log("got team id.");
//           dispatch({ type: FETCH_TEAMID, payload: response.data[length] });
//         }
//       }
//     });
//   };
// }


