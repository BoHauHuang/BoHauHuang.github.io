import axios from 'axios';

const ROOT_URL = 'http://www.hy0936.com.tw:9990/api';
const EVENT_URL = 'http://www.hy0936.com.tw:9990/api/Events/';
const TEAM_URL = 'http://www.hy0936.com.tw:9990/api/Teams/';

import { FETCH_EVENTS, FETCH_EVENT } from './types';

export function fetchEvents(){
	return function(dispatch) {
		axios.get(EVENT_URL)
			.then((response) => {

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
				//console.log(response.data);
				dispatch({type: FETCH_EVENT, payload: response.data});
				console.log("Fetch a event successfully");
			})
			.catch((response) => {
				console.log("Cannot get a event");
				console.log(response);
			});
	}
}

export function addEvent(){
	return function(dispatch){
		
	}
}
