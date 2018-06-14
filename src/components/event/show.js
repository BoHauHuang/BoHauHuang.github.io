import React, { Component } from 'react';
import * as editActions from '../../actions/edit';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Events extends Component{

	componentWillMount() {
			this.props.fetchEvent(this.props.match.params.id);
	}

	renderEvent() {
		 console.log(this.props.targetevent);

		 if(this.props.targetevent){
			 return(
 			 <ul className="list-group-item" key={this.props.targetevent.id}>
 				<li><strong>Event name:  {this.props.targetevent.name}</strong>
        <button type="button" className="btn btn-warning btn-circle btn-lg"><i className="glyphicon glyphicon-remove"></i></button>

        </li>
        <li>Min member required: {this.props.targetevent.member_min}</li>
        // find how many team have registered this event
        <li>Team max: {this.props.matchteam.XXX}/{this.props.targetevent.team_max}</li>
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
	return { targetevent: state.event.event};
}

export default connect(mapStateToProps,editActions)(Events);
