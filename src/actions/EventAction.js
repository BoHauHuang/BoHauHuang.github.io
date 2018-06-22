import axios from 'axios';

const ROOT_URL = 'http://www.hy0936.com.tw:9990/api';
const EVENT_URL = 'http://www.hy0936.com.tw:9990/api/Events/';
const TEAM_URL = 'http://www.hy0936.com.tw:9990/api/Teams/';

import {
	FETCH_EVENTS,
	FETCH_EVENT,
	FETCH_TEAMS,
 	ADD_EVENT
} from './types';

const token = localStorage.getItem('token');

export function fetchEvents(){
	return function(dispatch){
		axios.get(EVENT_URL)
			.then((response) => {
				console.log(response.data);
				dispatch({type: FETCH_EVENTS, payload: response.data});
				console.log("Fetch all events successfully");
			})
			.catch((response) => {
				console.log("Cannot get all events");
				console.log(response);
			});
	}
}

export function fetchEvent(event_id){
	return function(dispatch) {
		axios.get(`${EVENT_URL}` + event_id+'/')
			.then((response) => {
				console.log(response.data);
				dispatch({type: FETCH_EVENT, payload: response.data});
				console.log("Fetch a event successfully");
			})
			.catch((response) => {
				console.log("Cannot get a event");
				console.log(response);
			});
	}
}

export function fetchTeams(){
	return function(dispatch) {
		axios.get(TEAM_URL)
			.then((response) => {
				console.log(response.data);
				dispatch({type: FETCH_TEAMS, payload: response.data});
				console.log("Fetch teams successfully");
			})
	}
}


export function addEvent({name, teamMax, memMin, datetime}){
	return function(dispatch){
		var data = {
			name : name,
			team_max: teamMax,
			member_min: memMin,
			time: datetime
		};
		axios.post(EVENT_URL, data).then((response) => {
						console.log(response);
						console.log("Event added.");
						location.reload();
						dispatch({type: ADD_EVENT, payload: response.data});
		})
		.catch((response) => {
						console.log("Cannot add event.");
						console.log(response);
		});
	}
}


export function deleteEvent(event_id) {
	return (dispatch) => {

		axios.delete(`${EVENT_URL}` + event_id +'/')
			.then((response) => {
				location.reload();
				dispatch({type: DELETE_EVENT});
			})
			.catch((response) => {
				console.log(response);
			});
	}
}
