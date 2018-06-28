import axios from "axios";
import {
  CREATE_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENTS
} from "./types";

const ROOT_URL = "http://www.hy0936.com.tw:9990/api";
import history from "../history";

export function fetchAnnouncements() {
  return (dispatch, getState) => {
    const isLoaded = getState().announcement.isLoaded;
    if (!isLoaded) {
      axios
        .get(`${ROOT_URL}/announcement/`)
        .then(response => {
          dispatch({ type: FETCH_ANNOUNCEMENTS, payload: response.data });
        })
        .catch(response => {
          console.log(response);
        });
    }
  };
}

export function fetchAnnouncement(id) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_ANNOUNCEMENT, payload: id });
  };
}

export function createAnnouncement(announcement) {
  return (dispatch, getState) => {
    console.log("Start [createAnnouncement]");
    console.log(announcement);
    axios
      .post(`${ROOT_URL}/announcement/`, announcement)
      .then(response => {
        console.log("Success [createAnnouncement]");
        console.log(response);
        dispatch({ type: CREATE_ANNOUNCEMENT, payload: response.data });
      })
      .catch(response => {
        console.log("Failed [createAnnouncement]");
        console.log(response);
      });
  };
}

export function updateAnnouncement({ id, announcement: { announcement } }) {
  return (dispatch, getState) => {
    console.log(announcement);
    axios
      .put(`${ROOT_URL}/announcement/${id}/`, announcement)
      .then(response => {
        dispatch({ type: UPDATE_ANNOUNCEMENT, payload: response.data });
        history.push(`/announcement/${id}/`)
      })
      .catch(response => {
        console.log(response);
      });
  };
}

export function deleteAnnouncement(id) {
  return (dispatch, getState) => {
    axios
      .delete(`${ROOT_URL}/announcement/${id}`)
      .then(response => {
        console.log(response);
        dispatch({ type: DELETE_ANNOUNCEMENT, payload: id });
        history.push(`/`)
      })
      .catch(response => {
        console.log(response);
      });
  };
}
