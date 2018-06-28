import {
  FETCH_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT
} from "../actions/types";

import _ from 'lodash';

const INITIAL_STATE = {
  ids: [],
  objs: {},
  currentAnnouncementId: ``,
  isLoaded: false,
  msg: ``
};

// [
// {id: 3, haha:4}
// ,
// {id:5, haha:6}
//         ]
// ids: [3, 5],
// objs: {
//   3: { id:3, haha:4}
//   5: { id:5, haha:6}
// }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ANNOUNCEMENTS:
      const objs = Object.assign(
        {},
        state.objs,
        ...action.payload.map(announcement => ({
          [announcement.id]: announcement
        }))
      );
      return { ...state, objs, ids: Object.keys(objs), isLoaded: true, msg: `fetch_all_success` };
    case FETCH_ANNOUNCEMENT:
      return { ...state, currentAnnouncementId: action.payload, msg: `fetch_success` };
    case UPDATE_ANNOUNCEMENT:
      return { ...state, objs: Object.assign({}, state.objs, {[action.payload.id]: action.payload}), ids: state.ids, msg: `update_success` };
    case CREATE_ANNOUNCEMENT:
      return { ...state, objs: Object.assign({}, state.objs, {[action.payload.id]: action.payload}), ids: _.union(state.ids, [action.payload.id]), msg: `create_success` };
    case DELETE_ANNOUNCEMENT: 
      return { ...state, objs: _.omit(state.objs, action.payload), ids: state.ids.filter(id => id != action.payload), msg: `delete_success` };
    default:
      return state;
  }
}
