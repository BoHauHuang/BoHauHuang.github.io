import React, { Component } from 'react';
import * as editActions from '../../actions/edit';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


class Events extends Component {

	componentWillMount() {
        this.props.fetchEvent(this.props.match.params.id);
    }

	render() {
		const { event } = this.props;
		if ( event ) {
			return (
				<div>
					<h1>{ event.name }</h1>
					
				</div>
			)	
		} else {
			return (
				<div className="alert alert-warning" role="alert">
					Loading...
				</div>
			)
		}
		
	}
}

const mapStateToProp = (state) => {
	return {event: state.event.event};
}

export default connect(mapStateToProp, editActions)(Events);

