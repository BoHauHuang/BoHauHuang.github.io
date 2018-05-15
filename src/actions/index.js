import { browserHistory } from 'react-router';
const ROOT_URL = 'http://localhost:8080';
const EVENT_URL = 'http://www.hy0936.com.tw:9980/api/Events';
const TEAM_URL = 'http://www.hy0936.com.tw:9980/api/Teams/';
import axios from 'axios';
import { AUTH_USER, UNAUTH_USER } from './types';

export function RegisterTeam({name}){
	return function(dispatch){
		$.post(TEAM_URL,{name: name});
	}
}

export function edit_event_list(){
	return function(dispatch){
		$.ajax({
			type: 'GET',
			url: EVENT_URL,
			success: function(data){
				//console.log(data.length);
				var $events = $("#edit_event_list");
				$events.empty();
				$.each(data, function(index, item){
					$events.append(
						"<tr><td><div class='alert alert-info' role ='alert'><strong>" + item.name + "</strong> -- max: " + item.maxnum +" / min: "+ item.minnum + "</div></td>"+
						"<td><button type='button' class='btn btn-primary btn-circle btn-lg'>Edit</button></td>" + "<td><button type='button' class='btn btn-warning btn-circle btn-lg'>Delete</button></td>" + "</tr>"
					);
				})
			}
		});
	}
}

export function view_event(){
	return function(dispatch){
		$.ajax({
      type: 'GET',
      url: EVENT_URL,
      success: function(data){
        //console.log(data.length);
        var $events = $("#view_event");
        $events.empty();
        $.each(data, function(index, item){
          $events.append(
            "<div class='row'>"+
            "<div class='col-md-9 cta-contents'>"+
            "<h1 class='cta-title'>"+ item.name + "</h1>"+
            "<div class='cta-desc'><p> capacity: "+ data.length + " / " + item.maxnum + "</p>"+
            "</div></div>"+
            "<div class='col-md-3 cta-button'><button class='btn btn-lg btn-block btn-default'>Join !</button>"+
            "</div></div>"
          );
        })
      }
    });
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
