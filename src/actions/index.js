import { withRouter } from "react-router-dom";

const ROOT_URL = "http://www.hy0936.com.tw:9990/api";
const AUTH_URL = "http://www.hy0936.com.tw:9990/api-token-auth/";

import axios from "axios";
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_USERS,
  FETCH_USER_PROFILES,
  FETCH_SESSION_USER,
  FETCH_SESSION_USER_PROFILE,
  SET_ISLOADING_TRUE,
  CREATE_SUCCESS,
  AUTH_MSG
} from "./types";
import history from "../history";

const token = localStorage.getItem("token");

const jwtDecode = t => {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split(".")[0]));
  token.payload = JSON.parse(window.atob(t.split(".")[1]));
  return token;
};

const setAuthorization = token => {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = "JWT " + token;
    return config;
  });
};

export function fetchUsers() {
  return function(dispatch) {
    console.log("Start [fetchUsers].");
    //console.log(id);
    dispatch({type: SET_ISLOADING_TRUE});
    axios
      .get(`${ROOT_URL}/user/`)
      .then(response => {
        console.log("Success [fetchUsers].");
        dispatch({ type: FETCH_USERS, payload: response.data });
        dispatch(fetchUserProfiles());
      })
      .catch(response => {
        console.log("Failed [fetchUsers].");
        console.log(response);
      });
  };
}

export function fetchUserProfiles(id) {
  return function(dispatch) {
    console.log("Start [fetchUserProfiles].");
    axios
      .get(`${ROOT_URL}/user_profile/`)
      .then(response => {
        console.log("Success [fetchUserProfiles].");
        dispatch({ type: FETCH_USER_PROFILES, payload: response.data });
      })
      .catch(response => {
        console.log("Failed [fetchUserProfiles].");
        console.log(response);
      });
  };
}

export function fetchUserProfile(id) {
  return function(dispatch) {
    console.log("Start [fetchUserProfile].");
    // console.log(id);
    if (id) {
      axios
        .get(`${ROOT_URL}/user_profile/` + id + `/`)
        .then(response => {
          console.log("Success [fetchUserProfile].");
          dispatch({
            type: FETCH_SESSION_USER_PROFILE,
            payload: response.data
          });
        })
        .catch(response => {
          console.log("Failed [fetchUserProfile].");
          console.log(response);
        });
    }
  };
}

export function fetchUser(id) {
  return function(dispatch) {
    console.log("Start [fetchUser].");
    //console.log(id);
    axios
      .get(`${ROOT_URL}/user/` + id + `/`)
      .then(response => {
        console.log("Success [fetchUser].");
        dispatch({ type: FETCH_SESSION_USER, payload: response.data });
        dispatch(fetchUserProfile(response.data.userid, "session"));
      })
      .catch(response => {
        console.log("Failed [fetchUser].");
        console.log(response);
      });
  };
}

export function initialUser() {
  return dispatch => {
    console.log("Start [initialUser]");
    let token = localStorage.getItem("token");
    //console.log({token});
    if (token) {
      token = jwtDecode(token);
      const user_id = token.payload.user_id;
      dispatch(fetchUser(user_id));
    }
  };
}

export function signinUser(creds) {
  return function(dispatch) {
    console.log("Start [signinUser].");
    axios
      .post(`${AUTH_URL}`, creds)
      .then(response => {
        console.log("Success [signinUser].");
        console.log(response);
        console.log(response.data.token);
        const token = response.data.token;

        localStorage.setItem("token", token);
        setAuthorization(token);

        dispatch(initialUser());
        dispatch({ type: AUTH_USER });

        history.push("/");
        // xhr.setRequestHeader("Authorization","JWT "+auth.token);
      })
      .catch(response => {
        console.log("Failed [signinUser].");
        dispatch({ type: AUTH_MSG, payload: { type: 'danger', 'msg': '帳號或密碼有誤，請重新輸入。' } });
        console.log(response);
      });
  };
}

export function createUserProfile({ user, name, gender, role_id }) {
  return dispatch => {
    console.log("Start [createUserProfile].");

    var profile_data = {
      user,
      name,
      gender,
      role_id
    };

    console.log(profile_data);

    axios
      .post(`${ROOT_URL}/user_profile/`, profile_data)
      .then(response => {
        console.log("[createUserProfile] Success.");
      })
      .catch(response => {
        console.log("[createUserProfile] Failed.");
        console.log(response);
      });
  };
}

export function createUser({
  username,
  password,
  email,
  name,
  gender,
  role_id
}) {
  return dispatch => {
    var user_data = {
      username,
      password,
      email,
      is_active: 1
    };

    console.log("Start [createUser].");

    axios
      .post(`${ROOT_URL}/user/`, user_data)
      .then(response => {
        console.log("[createUser] Success.");
        return response.data.id;
      })
      .then(user_id => {
        dispatch(createUserProfile({ user: user_id, name, gender, role_id }));
        dispatch({ type: CREATE_SUCCESS });
        history.push("/");
        //dispatch(signinUser({ username, password }));
      })
      .catch(response => {
        console.log("[createUser] Failed.");
        console.log(response);
      });
  };
}

export function signoutUser() {
  localStorage.removeItem("token");
  return {
    type: UNAUTH_USER
  };
}
