import { browserHistory } from 'react-router';
const ROOT_URL = 'http://www.hy0936.com.tw:9980/api';
import axios from 'axios';
import { ANNCS_ADD, ANNCS_EDIT, ANNCS_DELETE } from './types';


export function addAnncs(anncs) {
	console.log("Add......");
	return function(dispatch) {
		axios.post(`${ROOT_URL}/anncs/`, anncs, {'Authorization': "JWT "+ auth.token})
			.then((response) => {
				dispatch({type: ANNCS_ADD, payload: response.data});
				console.log("Add Anncs Successfully");
			})
			.catch((response) => {
				console.log("Cannot add anncs");
				console.log(response);
			});
	}
}

export function editAnncs(anncs) {
	console.log("edit......");
	return function(dispatch) {
		axios.put(`${ROOT_URL}/anncs/`, anncs, {'Authorization': "JWT "+ auth.token})
			.then((response) => {
				dispatch({type: ANNCS_EDIT, payload: response.data});
				console.log("edit Anncs Successfully");
			})
			.catch((response) => {
				console.log("Cannot edit anncs");
				console.log(response);
			});
	}
}

export function removeAnncs({anncs_id}) {
	console.log("remove......");
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/anncs/`, anncs_id, {'Authorization': "JWT "+ auth.token})
			.then((response) => {
				dispatch({type: ANNCS_DELETE});
				console.log("remove Anncs Successfully");
			})
			.catch((response) => {
				console.log("Cannot remove anncs");
				console.log(response);
			});
	}
}