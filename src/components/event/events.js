import React, { Component } from 'react';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Events extends Component {

	componentWillMount() {
    	this.props.fetchEvents();
	}
	admin_add(){
		if(this.props.authenticated){
			return[
				<Link to={"event/add"} className="btn btn-success">Add</Link>
			]
		}

	}
  renderEvents() {
		//console.log(this.props.events);
  	if (this.props.events && this.props.authenticated) {
    return this.props.events.map((event) => {
      return (
       <li className="list-group-item" key={event.id}>
         <div><Link to={"event/" + event.id}><strong>{event.name}</strong></Link></div>
				 <div><button className="btn btn-danger sm" onClick = {()=>{this.props.deleteEvent(event.id)}}> Delete </button></div>
       </li>
      )
    });

	}
	else if (this.props.events && !this.props.authenticated){
		return this.props.events.map((event) => {
      return (
       <li className="list-group-item" key={event.id}>
         <div><Link to={"event/" + event.id}>
				 	<div><strong>{event.name}</strong></div>
				 	<div><button className="btn btn-info btn-sm">See more...</button></div>
					</Link></div>
       </li>
      )
    });
	}
	else {
		return (
			<div>Loading...</div>
		)
	}
}

  render() {
    return (
      <div>
        <h3>Events   </h3>
        <ul className="list-group">
          {this.renderEvents()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
		events: state.event.all
	};
}


export default connect(mapStateToProps, editActions)(Events);
