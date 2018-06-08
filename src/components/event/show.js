import React, { Component } from 'react';
import * as editActions from '../../actions/edit';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const mapStateToProps = (state)=>{
	return { targetevent: state.event.event};
}

class Events extends Component{

	componentWillMount() {
			this.props.fetchEvent(this.props.match.params.id);
			console.log(this.props.targetevent);
	}

	renderEvent() {
		//console.log(this.props.targetevent);
		return this.props.targetevent.map((event) => {
			return (
			 <li className="list-group-item" key={event.id}>
				<strong>{event.name}</strong>
			 </li>
			)
		});
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

export default connect(mapStateToProps,editActions)(Events);
