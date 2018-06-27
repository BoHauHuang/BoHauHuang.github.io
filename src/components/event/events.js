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
				<div className="row mb-4 mt-4">
					<div className="col">
        		<h3>活動</h3>
					</div>
					<div className="col text-right">
            <Link to={"/event/add"} className="btn btn-primary">
              新增活動
            </Link>
          </div>
				</div>
				<div>
					<ul className="list-group">
						{this.renderEvents()}
        	</ul>
				</div>
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
