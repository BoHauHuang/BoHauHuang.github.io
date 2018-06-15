import React, { Component } from 'react';
import * as editActions from '../../actions/EventAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Events extends Component {

	componentWillMount() {
    	this.props.fetchEvents();
	}

  renderEvents() {
		//console.log(this.props.events);
  	if (this.props.events) {
    return this.props.events.map((event) => {
      return (
       <li className="list-group-item" key={event.id}>
         <Link to={"event/" + event.id}>
           <div><strong>{event.name}</strong></div>
         </Link>
				 <button onClick="this.props.deleteEvent()" className="btn btn-danger sm" >Delete</button>

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
        <h3>Events   <Link to={"event/add"} className="btn btn-success">Add</Link></h3>
        <ul className="list-group">
          {this.renderEvents()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { events: state.event.all};
}


export default connect(mapStateToProps, editActions)(Events);
