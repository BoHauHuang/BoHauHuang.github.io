import React, { Component } from 'react';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Events extends Component{

	componentWillMount() {
			this.props.fetchEvent(this.props.match.params.id);
			this.props.fetchTeams();
	}

	renderEvent() {
		 if(this.props.targetevent){
			//console.log(this.props.targetevent);
			//console.log(this.props.teams);
			const event_id = this.props.targetevent.id;
			const event_name = this.props.targetevent.name;
			const mem_min = this.props.targetevent.member_min;
 		 	const maximum = this.props.targetevent.team_max;
			const joined_people = this.props.teams.length;
 		 	const capacity = (maximum-joined_people);

			 return(
 			 <ul className="list-group-item" key={event_id}>
 				<li><strong>Event name:  {event_name}</strong>
        <Link to={event_id+"/edit"}><button className="btn btn-warning btn-sm">Edit</button></Link>
        </li>
        <li>Min member required: {mem_min}</li>
        <li>capacity: {capacity}/{maximum}</li>
 			 </ul>
 			)
		 }
		else{
			<a>Loading...</a>
		}
	}

	render() {
    return (
      <div>
        <h3>Event</h3>
        <ul className="list-group">
          {this.renderEvent()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state){
	return {
		targetevent: state.event.event,
		teams: state.event.teams
	};
}

export default connect(mapStateToProps,editActions)(Events);
