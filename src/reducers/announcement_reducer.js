import {
  FETCH_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT
} from "../actions/types";

const INITIAL_STATE = {
  ids: [],
  objs: {},
  currentAnnouncementId: ``
};

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
      return { ...state, objs, ids: Object.keys(objs) };
    case FETCH_ANNOUNCEMENT:
      return { ...state, currentAnnouncementId: action.payload };
    case UPDATE_ANNOUNCEMENT:
      return { ...state, objs: Object.assign({}, state.objs, action.payload), ids: state.ids };
    default:
      return state;
  }
}
