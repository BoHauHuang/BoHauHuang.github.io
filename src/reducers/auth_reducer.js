import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_SESSION_USER,
  FETCH_SESSION_USER_PROFILE,
  FETCH_USER_PROFILES,
  FETCH_USERS,
  SET_ISLOADING_TRUE
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: false,
  sessionUser: { name: "" },
  users: { objs: {}, ids: [] },
  isLoading: true,
  teamIds: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case FETCH_SESSION_USER:
      console.log("FETCH_SESSION_USER");
      console.log(action.payload);
      return {
        ...state,
        sessionUser: {
          username: action.payload.username,
          email: action.payload.email,
          userid: action.payload.userid,
          teamIds: action.payload.track_user.map(entry => entry.team_id)
        }
      };
    case FETCH_SESSION_USER_PROFILE:
      console.log("FETCH_SESSION_USER_PROFILE");
      console.log(state.sessionUser);
      console.log(action.payload);
      return {
        ...state,
        sessionUser: {
          ...state.sessionUser,
          isAdmin: action.payload.role_id,
          name: action.payload.name,
          gender: action.payload.gender
        }
      };
    case FETCH_USERS:
      const objs = Object.assign(
        {},
        state.objs,
        ...action.payload.map(user => ({
          [user.id]: user
        }))
      );
      return { ...state, users: { objs: objs, ids: Object.keys(objs) } };
    case FETCH_USER_PROFILES:
      const user_profiles = Object.assign(
        {},
        ...action.payload.map(profile => ({
          [profile.user]: profile
        }))
      );
      // const user_profile_objs = state.users.ids.map(id => {
      //   var user = state.users.objs[id];
      //   if (user.userid) {
      //     user.name = user_profiles[id].name;
      //     user.gender = user_profiles[id].gender;
      //   }
      //   return {id: user};
      // });
      const new_objs = state.users.objs;

      state.users.ids.forEach(id => {
        const profile_id = new_objs[id].userid;
        if (profile_id) {
          new_objs[id].gender = user_profiles[id].gender;
          new_objs[id].name = user_profiles[id].name;
        }
      });

      return {
        ...state,
        users: { objs: new_objs, ids: state.users.ids },
        isLoading: false
      };
    case SET_ISLOADING_TRUE:
      return { ...state, isLoading: true };
  }
  return state;
}
