import { browserHistory } from 'react-router';
import axios from 'axios';

const ROOT_URL = 'http://www.hy0936.com.tw:9980/api';
const EVENT_URL = 'http://www.hy0936.com.tw:9980/api/Events/';
const TEAM_URL = 'http://www.hy0936.com.tw:9980/api/Teams/';

import { FETCH_EVENTS, FETCH_EVENT } from './types';

export function fetchEvents(){

	return function(dispatch) {
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

	// return function(dispatch){
	// 	$.ajax({
	// 		type: 'GET',
	// 		url: EVENT_URL,
	// 		success: function(data){
	// 			dispatch

	// 			//console.log(data.length);
	// 			// var $events = $("#edit_event_list");
	// 			// $events.empty();
	// 			// $.each(data, function(index, item){
	// 			// 	$events.append(
	// 			// 		"<tr><td><div class='alert alert-info' role ='alert'><strong>" + item.name + "</strong> -- max: " + item.maxnum +" / min: "+ item.minnum + "</div></td>"+
	// 			// 		"<td><button type='button' class='btn btn-primary btn-circle btn-lg'>Edit</button></td>" + "<td><button type='button' class='btn btn-warning btn-circle btn-lg'>Delete</button></td>" + "</tr>"
	// 			// 	);
	// 			// })
	// 		}
	// 	});
	// }
}


export function fetchEvent(event_id){

	return function(dispatch) {
		axios.get(`${EVENT_URL}` + event_id)
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
