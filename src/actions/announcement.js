import axios from 'axios';
import { 
	CREATE_ANNOUNCEMENT, 
	UPDATE_ANNOUNCEMENT, 
	DELETE_ANNOUNCEMENT, 
	FETCH_ANNOUNCEMENT, 
	FETCH_ANNOUNCEMENTS } from './types';

const ROOT_URL = 'http://www.hy0936.com.tw:9990/api';
const token = localStorage.getItem('token');

export function fetchAnnouncements() {
	return (dispatch, getState) => {
		const auth = getState().authReducer;
		axios.get(`${ROOT_URL}/Announcements/`, {'Authorization': "JWT " + token})
			.then((response) => {
				dispatch({type: FETCH_ANNOUNCEMENTS, payload: response.data});
			})
			.catch((response) => {
				console.log(response);
			});
	}
}


export function fetchAnnouncement(id) {
	return (dispatch, getState) => {
		const auth = getState().authReducer;
		axios.get(`${ROOT_URL}/Announcements/` + id, {'Authorization': "JWT " + token})
			.then((response) => {
				dispatch({type: FETCH_ANNOUNCEMENT, payload: response.data});
			})
			.catch((response) => {
				console.log(response);
			});
	}
}


export function createAnnouncement(announcement) {
	return (dispatch, getState) => {
		const auth = getState().authReducer;
		console.log({...announcement, created_at: new Date(), updated_at: new Date() });
		axios.post(`${ROOT_URL}/Announcements/`, {...announcement, created_at: new Date(), updated_at: new Date() }, {'Authorization': "JWT " + token})
			.then((response) => {
				dispatch({type: CREATE_ANNOUNCEMENT, payload: response.data});
			})
			.catch((response) => {
				console.log(response);
			});
	}
}

export function updateAnnouncement({id, announcement: {announcement}}) {
	return (dispatch, getState) => {
		const auth = getState().authReducer;
		axios.put(`${ROOT_URL}/Announcements/` + announcement.id, announcement, {'Authorization': "JWT " + token})
			.then((response) => {
				dispatch({type: UPDATE_ANNOUNCEMENT, payload: response.data});
			})
			.catch((response) => {
				console.log(response);
			});
	}
}

export function deleteAnnouncement({id}) {
	return (dispatch, getState) => {
		const auth = getState().authReducer;
		axios.delete(`${ROOT_URL}/Announcements/`, announcement, {'Authorization': "JWT " + token})
			.then((response) => {
				dispatch({type: DELETE_ANNOUNCEMENT});
			})
			.catch((response) => {
				console.log(response);
			});
	}
}
