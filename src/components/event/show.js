import React, { Component } from 'react';
import * as editActions from '../../actions/edit';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Events extends Component{

	componentWillMount() {
			this.props.fetchEvent(this.props.match.params.id);
	}

	renderEvent() {
		 //console.log(this.props.targetevent);
		 
		 if(this.props.targetevent){
			 return (
 			 <li className="list-group-item" key={this.props.targetevent.id}>
 				<strong>{this.props.targetevent.name}</strong>
 			 </li>
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
