import { browserHistory } from 'react-router';
const ROOT_URL = 'http://localhost:8080';
import axios from 'axios';
import { AUTH_USER, UNAUTH_USER } from './types';

export function RegisterTeam({name}){
	return function(dispatch){
		$.post(TEAM_URL,{name: name});
	}
}

export function signinUser({email, password}) {
	// submit email/password
	console.log("Signin......");
	return function(dispatch) {

		axios.post(`${ROOT_URL}/signin`, {email, password})
			.then((response) => {
				dispatch({type: AUTH_USER});
				console.log("Signin Successfully");
				localStorage.setItem('token', response.data.token);
				//browserHistory.push('/feature');
			})
			.catch((response) => {
				console.log("Cannot signin");
				console.log(response);
			});
	}
}


// export function authError(error) {
// 	return {
// 		type: AUTH_ERROR,
// 		payload: error
// 	};
// }

export function signoutUser() {
	localStorage.removeItem('token');
	return {
		type: UNAUTH_USER
	}
}
